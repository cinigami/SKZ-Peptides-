const axios = require('axios');
const crypto = require('crypto');

class TouchNGoPayment {
  constructor(config) {
    this.merchantId = config.merchantId;
    this.apiKey = config.apiKey;
    this.secretKey = config.secretKey;
    this.sandbox = config.sandbox || true;
    this.baseUrl = config.sandbox 
      ? 'https://sandbox-api.touchngo.com.my'
      : 'https://api.touchngo.com.my';
  }

  // Generate payment QR for TouchNGo eWallet
  async generateQRPayment(orderData) {
    try {
      const payload = {
        merchant_id: this.merchantId,
        amount: Math.round(orderData.amount * 100), // Convert to cents
        currency: 'MYR',
        order_id: orderData.orderId,
        description: `SKZ Peptides - Order ${orderData.orderId}`,
        customer: {
          name: orderData.customerName,
          phone: orderData.customerPhone || '',
          email: orderData.customerEmail || ''
        },
        callback_url: `${process.env.WEBHOOK_URL}/touchngo/callback`,
        redirect_url: `${process.env.WEBHOOK_URL}/touchngo/success`,
        metadata: {
          telegram_user_id: orderData.telegramUserId,
          items: JSON.stringify(orderData.items)
        }
      };

      const signature = this.generateSignature(payload);
      payload.signature = signature;

      const response = await axios.post(`${this.baseUrl}/v1/payments`, payload, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === 'success') {
        return {
          success: true,
          paymentUrl: response.data.data.payment_url,
          qrCode: response.data.data.qr_code,
          paymentId: response.data.data.payment_id,
          expiresAt: response.data.data.expires_at
        };
      }

      throw new Error(response.data.message || 'Payment creation failed');

    } catch (error) {
      console.error('TouchNGo Payment Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate signature for API security
  generateSignature(payload) {
    const sortedPayload = Object.keys(payload)
      .sort()
      .reduce((result, key) => {
        if (key !== 'signature') {
          result[key] = payload[key];
        }
        return result;
      }, {});

    const queryString = Object.keys(sortedPayload)
      .map(key => `${key}=${sortedPayload[key]}`)
      .join('&');

    return crypto
      .createHmac('sha256', this.secretKey)
      .update(queryString)
      .digest('hex');
  }

  // Verify webhook callback signature
  verifyWebhook(payload, signature) {
    const expectedSignature = this.generateSignature(payload);
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  // Handle payment status
  async handlePaymentCallback(callbackData) {
    if (!this.verifyWebhook(callbackData, callbackData.signature)) {
      throw new Error('Invalid webhook signature');
    }

    return {
      orderId: callbackData.order_id,
      paymentId: callbackData.payment_id,
      status: callbackData.status, // 'success', 'failed', 'pending'
      amount: callbackData.amount / 100, // Convert back from cents
      paidAt: callbackData.paid_at,
      telegramUserId: callbackData.metadata?.telegram_user_id
    };
  }
}

// Alternative: Manual TouchNGo QR Generator (No API required)
class ManualTouchNGoQR {
  // Generate TouchNGo QR for manual scanning
  static generateQR(orderData) {
    // This creates a simple payment request format
    // Customer scans QR and pays manually
    const qrData = {
      merchant: 'SKZ Peptides',
      amount: orderData.amount,
      reference: orderData.orderId,
      description: `Order ${orderData.orderId}`
    };

    // For now, return payment instructions
    return {
      qrText: `TouchNGo Payment Required:
      
💰 Amount: MYR ${orderData.amount.toFixed(2)}
📱 Method: TouchNGo eWallet
📋 Reference: ${orderData.orderId}
      
🔄 Steps:
1. Open TouchNGo eWallet app
2. Scan QR code or transfer to:
   TouchNGo ID: +60123456789 (SKZ Peptides)
3. Enter amount: MYR ${orderData.amount.toFixed(2)}
4. Reference: ${orderData.orderId}
5. Screenshot payment & send to @nadojiken`,

      instructions: [
        'Open TouchNGo eWallet app',
        `Send MYR ${orderData.amount.toFixed(2)}`,
        'To: +60123456789 (SKZ Peptides)', 
        `Reference: ${orderData.orderId}`,
        'Screenshot & send proof'
      ]
    };
  }
}

module.exports = { TouchNGoPayment, ManualTouchNGoQR };
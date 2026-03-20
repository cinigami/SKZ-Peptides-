# 🤖 SKZ Peptides Telegram Bot

Professional e-commerce bot for SKZ Peptides with Malaysian payment gateway integration.

## 🚀 Features

- **Product Catalog**: Browse all SKZ Peptides products
- **Shopping Cart**: Add/remove items, view totals
- **Malaysian Payments**: Billplz, iPay88 integration
- **Order Management**: Track orders and status
- **Admin Panel**: Manage orders via Telegram
- **Website Integration**: Synced with main website

## 🛠️ Setup Instructions

### 1. Create Telegram Bot

1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Send `/newbot`
3. Choose bot name: `SKZ Peptides Bot`
4. Choose username: `skz_peptides_bot` (or similar)
5. Copy the bot token

### 2. Install Dependencies

```bash
cd telegram-bot
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your settings
```

### 4. Set up Payment Gateway

#### Option A: Billplz (Recommended for Malaysia)
1. Register at [Billplz](https://www.billplz.com)
2. Get API key and Collection ID
3. Add to `.env` file

#### Option B: iPay88 
1. Apply for merchant account at [iPay88](https://www.ipay88.com)
2. Get merchant code and key
3. Add to `.env` file

### 5. Run the Bot

```bash
npm start
# or for development
npm run dev
```

## 💳 Payment Methods Supported

### Billplz
- Online Banking (All Malaysian banks)
- Credit/Debit Cards
- eWallets (GrabPay, Boost, TouchNGo)
- PayPal

### iPay88
- Online Banking
- Credit/Debit Cards  
- eWallets
- QRIS/DuitNow

## 🎯 Bot Commands

- `/start` - Welcome message and main menu
- `🛍️ Browse Products` - View product categories
- `🛒 View Cart` - Check cart contents
- `💳 Checkout` - Create order and payment
- `📋 My Orders` - View order history
- `💬 Contact Support` - Get support info

## 🔧 Admin Features

- Real-time order notifications
- Order status updates
- Inventory management
- Customer support integration

## 📱 Customer Experience

1. **Browse**: Categories → Products → Details
2. **Cart**: Add items, view totals with shipping
3. **Checkout**: Create order, get payment link
4. **Pay**: Malaysian payment methods
5. **Track**: Order status and updates

## 🔗 Integration with Website

- Shared product database
- Unified order management
- Consistent pricing and inventory
- Same admin panel for both channels

## 🛡️ Security

- User data encryption
- Secure payment processing
- Admin verification
- Rate limiting

## 📊 Analytics

- Order tracking
- Customer analytics
- Popular products
- Revenue reporting

## 🚀 Deployment Options

### Local Development
```bash
npm run dev
```

### Production (VPS/Cloud)
1. Deploy to server
2. Set up webhook URL
3. Configure environment
4. Start with PM2 or similar

### Webhook Setup (Production)
```javascript
// Set webhook URL
bot.telegram.setWebhook('https://yourdomain.com/webhook')
```

## 💰 Pricing Structure

- **Products**: Same as website
- **Shipping**: MYR 8.00 (configurable)
- **Payment Fees**: As per gateway (usually 2-3%)

## 🎨 Customization

- Product categories and descriptions
- Payment methods and gateways  
- Shipping rules and zones
- Bot messages and branding
- Admin notifications

## 📞 Support

For technical support:
- Email: support@skzpeptides.com
- Telegram: @nadojiken
- Website: skzpeptides.com

---

*Built for SKZ Peptides - Professional peptide research supplies*
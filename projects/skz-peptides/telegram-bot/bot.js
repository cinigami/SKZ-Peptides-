require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const axios = require('axios');
const { TouchNGoPayment, ManualTouchNGoQR } = require('./touchngo-payment');

// Initialize bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// Database setup
const db = new sqlite3.Database(process.env.DATABASE_URL || './skz_orders.db');

// Initialize database tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id INTEGER,
    username TEXT,
    first_name TEXT,
    items TEXT,
    total_amount REAL,
    shipping_fee REAL,
    status TEXT DEFAULT 'pending',
    payment_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS cart_items (
    user_id INTEGER,
    product_id TEXT,
    product_name TEXT,
    price REAL,
    quantity INTEGER DEFAULT 1,
    PRIMARY KEY (user_id, product_id)
  )`);
});

// Product catalog (synced with your website)
const PRODUCTS = [
  {
    id: 'retatrutide-5mg',
    name: 'Retatrutide 5mg',
    price: 55,
    category: 'Weight Management',
    description: 'Triple agonist peptide for advanced weight management research.',
    image: '/images/retatrutide-vial-mockup.png',
    inStock: 9
  },
  {
    id: 'ss31-elamipretide-10mg',
    name: 'SS-31 (Elamipretide) 10mg',
    price: 90,
    category: 'Mitochondrial',
    description: 'Mitochondrial-targeted peptide for cellular health research.',
    image: '/images/ss31-vial-mockup.png',
    inStock: 25
  },
  {
    id: 'nad-500mg',
    name: 'NAD+ 500mg',
    price: 75,
    category: 'Anti-Aging',
    description: 'Nicotinamide adenine dinucleotide for longevity research.',
    image: '/images/nad-vial-mockup.png',
    inStock: 9
  },
  {
    id: 'glow70-bpc-ghk-tb',
    name: 'GLOW 70 (BPC10+GHK50+TB10)',
    price: 130,
    category: 'Recovery',
    description: 'Powerful peptide blend for comprehensive recovery research.',
    image: '/images/glow70-vial-mockup.png',
    inStock: 8
  },
  {
    id: 'motsc-40mg',
    name: 'MOTS-c 40mg',
    price: 140,
    category: 'Mitochondrial',
    description: 'Mitochondrial-derived peptide for metabolic enhancement.',
    image: '/images/motsc-vial-proper-margins.png',
    inStock: 10
  },
  {
    id: 'bac-water-3ml',
    name: 'BAC Water 3mL',
    price: 5,
    category: 'Supplies',
    description: 'Bacteriostatic water for peptide reconstitution.',
    image: '/images/bacwater-3ml-vial-mockup.png',
    inStock: 15
  },
  {
    id: 'bac-water-10ml',
    name: 'BAC Water 10mL',
    price: 10,
    category: 'Supplies', 
    description: 'Bacteriostatic water for peptide reconstitution.',
    image: '/images/bacwater-10ml-vial-mockup.png',
    inStock: 10
  }
];

// Utility functions
const formatPrice = (price) => `MYR ${price.toFixed(2)}`;
const SHIPPING_FEE = parseFloat(process.env.SHIPPING_FEE) || 8;

// Bot commands and handlers
bot.start((ctx) => {
  const welcomeMessage = `🧬 *Welcome to SKZ Peptides!*

Premium research peptides delivered to your doorstep.

🏷️ *Professional Quality*
💊 All products come with our signature vial labels
📦 Shipping: ${formatPrice(SHIPPING_FEE)} anywhere in Malaysia
🔬 Research grade peptides

*What would you like to do?*`;

  return ctx.replyWithMarkdown(welcomeMessage, 
    Markup.keyboard([
      ['🛍️ Browse Products', '🛒 View Cart'],
      ['📋 My Orders', '💬 Contact Support'],
      ['🌐 Visit Website']
    ]).resize()
  );
});

bot.hears('🛍️ Browse Products', async (ctx) => {
  const categories = [...new Set(PRODUCTS.map(p => p.category))];
  
  const categoryButtons = categories.map(cat => [cat]);
  categoryButtons.push(['« Back to Menu']);
  
  await ctx.reply(
    '🏷️ *Choose a category:*',
    {
      parse_mode: 'Markdown',
      ...Markup.keyboard(categoryButtons).resize()
    }
  );
});

// Handle category selection
PRODUCTS.forEach(product => {
  if (!bot.categoryHandlers) bot.categoryHandlers = new Set();
  
  const category = product.category;
  if (!bot.categoryHandlers.has(category)) {
    bot.categoryHandlers.add(category);
    
    bot.hears(category, async (ctx) => {
      const categoryProducts = PRODUCTS.filter(p => p.category === category);
      
      let message = `🏷️ *${category} Products:*\n\n`;
      
      const productButtons = [];
      categoryProducts.forEach(product => {
        message += `💊 *${product.name}*\n`;
        message += `💰 ${formatPrice(product.price)}\n`;
        message += `📦 Stock: ${product.inStock}\n`;
        message += `${product.description}\n\n`;
        
        productButtons.push([`🛒 Add ${product.name}`]);
      });
      
      productButtons.push(['« Back to Categories']);
      
      await ctx.replyWithMarkdown(message, Markup.keyboard(productButtons).resize());
    });
  }
});

// Handle "Add to Cart" buttons
PRODUCTS.forEach(product => {
  bot.hears(`🛒 Add ${product.name}`, async (ctx) => {
    const userId = ctx.from.id;
    
    db.run(
      `INSERT OR REPLACE INTO cart_items 
       (user_id, product_id, product_name, price, quantity) 
       VALUES (?, ?, ?, ?, 
         COALESCE((SELECT quantity FROM cart_items WHERE user_id = ? AND product_id = ?) + 1, 1))`,
      [userId, product.id, product.name, product.price, userId, product.id],
      function(err) {
        if (err) {
          console.error(err);
          ctx.reply('❌ Error adding to cart. Please try again.');
          return;
        }
        
        ctx.reply(
          `✅ *Added to cart!*\n\n💊 ${product.name}\n💰 ${formatPrice(product.price)}\n\n*Continue shopping or view cart?*`,
          {
            parse_mode: 'Markdown',
            ...Markup.keyboard([
              ['🛒 View Cart', '🛍️ Continue Shopping'],
              ['« Back to Menu']
            ]).resize()
          }
        );
      }
    );
  });
});

bot.hears('🛒 View Cart', async (ctx) => {
  const userId = ctx.from.id;
  
  db.all(
    `SELECT * FROM cart_items WHERE user_id = ?`,
    [userId],
    async (err, rows) => {
      if (err || !rows || rows.length === 0) {
        return ctx.reply(
          '🛒 *Your cart is empty*\n\nStart shopping to add items!',
          {
            parse_mode: 'Markdown',
            ...Markup.keyboard([['🛍️ Browse Products'], ['« Back to Menu']]).resize()
          }
        );
      }
      
      let message = '🛒 *Your Cart:*\n\n';
      let subtotal = 0;
      
      rows.forEach(item => {
        const itemTotal = item.price * item.quantity;
        message += `💊 ${item.product_name}\n`;
        message += `💰 ${formatPrice(item.price)} × ${item.quantity} = ${formatPrice(itemTotal)}\n\n`;
        subtotal += itemTotal;
      });
      
      const total = subtotal + SHIPPING_FEE;
      
      message += `📦 Shipping: ${formatPrice(SHIPPING_FEE)}\n`;
      message += `💯 *Total: ${formatPrice(total)}*`;
      
      await ctx.replyWithMarkdown(message, 
        Markup.keyboard([
          ['💳 Checkout', '🗑️ Clear Cart'],
          ['🛍️ Continue Shopping', '« Back to Menu']
        ]).resize()
      );
    }
  );
});

bot.hears('💳 Checkout', async (ctx) => {
  const userId = ctx.from.id;
  
  db.all(
    `SELECT * FROM cart_items WHERE user_id = ?`,
    [userId],
    async (err, rows) => {
      if (err || !rows || rows.length === 0) {
        return ctx.reply('❌ Your cart is empty!');
      }
      
      // Create order
      const orderId = uuidv4().substring(0, 8);
      const items = JSON.stringify(rows);
      const subtotal = rows.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const total = subtotal + SHIPPING_FEE;
      
      // Generate TouchNGo payment
      const paymentInstructions = await generateTouchNGoPayment(orderId, total, ctx.from, rows);
      
      db.run(
        `INSERT INTO orders (id, user_id, username, first_name, items, total_amount, shipping_fee, payment_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [orderId, userId, ctx.from.username, ctx.from.first_name, items, total, SHIPPING_FEE, paymentInstructions],
        function(err) {
          if (err) {
            console.error(err);
            return ctx.reply('❌ Error creating order. Please try again.');
          }
          
          ctx.reply(
            `🧾 *Order Created!*\n\nOrder ID: \`${orderId}\`\n💰 Total: ${formatPrice(total)}\n\n${paymentInstructions}`,
            {
              parse_mode: 'Markdown',
              ...Markup.keyboard([
                ['📋 My Orders', '💬 Contact Support'],
                ['« Back to Menu']
              ]).resize()
            }
          );
          
          // Clear cart after checkout
          db.run(`DELETE FROM cart_items WHERE user_id = ?`, [userId]);
        }
      );
    }
  );
});

// TouchNGo Payment Generator
async function generateTouchNGoPayment(orderId, amount, user, items) {
  try {
    // Option 1: Manual TouchNGo (works immediately)
    const manualPayment = ManualTouchNGoQR.generateQR({
      orderId,
      amount,
      customerName: user.first_name,
      items
    });

    return manualPayment.qrText;

    // Option 2: Official TouchNGo API (when you get merchant account)
    /*
    const touchngo = new TouchNGoPayment({
      merchantId: process.env.TOUCHNGO_MERCHANT_ID,
      apiKey: process.env.TOUCHNGO_API_KEY,
      secretKey: process.env.TOUCHNGO_SECRET_KEY,
      sandbox: true
    });

    const payment = await touchngo.generateQRPayment({
      orderId,
      amount,
      customerName: user.first_name,
      telegramUserId: user.id,
      items
    });

    if (payment.success) {
      return `🔴 TouchNGo Payment:\n\n${payment.paymentUrl}\n\nQR Code: ${payment.qrCode}`;
    }
    */
    
  } catch (error) {
    console.error('TouchNGo payment error:', error);
    return `❌ Payment error. Please contact support: @nadojiken`;
  }
}

bot.hears('📋 My Orders', async (ctx) => {
  const userId = ctx.from.id;
  
  db.all(
    `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 5`,
    [userId],
    (err, rows) => {
      if (err || !rows || rows.length === 0) {
        return ctx.reply('📋 *No orders found*\n\nStart shopping to place your first order!', {
          parse_mode: 'Markdown',
          ...Markup.keyboard([['🛍️ Browse Products'], ['« Back to Menu']]).resize()
        });
      }
      
      let message = '📋 *Your Recent Orders:*\n\n';
      
      rows.forEach(order => {
        message += `🧾 Order: \`${order.id}\`\n`;
        message += `💰 Total: ${formatPrice(order.total_amount)}\n`;
        message += `📅 Date: ${moment(order.created_at).format('DD/MM/YYYY HH:mm')}\n`;
        message += `📊 Status: ${order.status}\n\n`;
      });
      
      ctx.replyWithMarkdown(message, 
        Markup.keyboard([['« Back to Menu']]).resize()
      );
    }
  );
});

bot.hears('🌐 Visit Website', (ctx) => {
  ctx.reply(
    '🌐 *Visit our website for the full experience:*\n\nhttp://192.168.1.45:3000\n\n🖥️ Browse all products\n📱 Mobile-friendly design\n🛒 Alternative checkout',
    {
      parse_mode: 'Markdown',
      ...Markup.keyboard([['« Back to Menu']]).resize()
    }
  );
});

bot.hears(['« Back to Menu', '« Back to Categories'], (ctx) => {
  return ctx.replyWithMarkdown(
    '🏠 *Main Menu*\n\nWhat would you like to do?',
    Markup.keyboard([
      ['🛍️ Browse Products', '🛒 View Cart'],
      ['📋 My Orders', '💬 Contact Support'],
      ['🌐 Visit Website']
    ]).resize()
  );
});

bot.hears('🗑️ Clear Cart', (ctx) => {
  const userId = ctx.from.id;
  
  db.run(`DELETE FROM cart_items WHERE user_id = ?`, [userId], function(err) {
    if (err) {
      return ctx.reply('❌ Error clearing cart');
    }
    
    ctx.reply(
      '✅ *Cart cleared!*',
      {
        parse_mode: 'Markdown',
        ...Markup.keyboard([['🛍️ Browse Products'], ['« Back to Menu']]).resize()
      }
    );
  });
});

bot.hears('💬 Contact Support', (ctx) => {
  ctx.reply(
    '💬 *Contact SKZ Peptides Support:*\n\n📧 Email: support@skzpeptides.com\n📱 WhatsApp: +60123456789\n⏰ Business Hours: 9AM - 6PM MYT\n\n💬 You can also message @nadojiken directly!',
    {
      parse_mode: 'Markdown',
      ...Markup.keyboard([['« Back to Menu']]).resize()
    }
  );
});

// Error handling
bot.catch((err, ctx) => {
  console.error('Bot error:', err);
  ctx.reply('❌ Something went wrong. Please try again or contact support.');
});

console.log('🤖 SKZ Peptides Telegram Bot starting...');
bot.launch();

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
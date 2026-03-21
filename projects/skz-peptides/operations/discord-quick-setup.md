# SKZ Peptides Discord Server - Quick Setup Guide

## Step 1: Create Server (NOW - 10 minutes)

### Discord Server Creation
1. Open Discord → Click "+" → "Create My Own" → "For me and my friends"
2. **Server Name**: `SKZ Peptides HQ`
3. **Upload Icon**: Use your SKZ profile picture 
4. **Set Privacy**: Private (no public invite link)

### Create Categories & Channels
Copy this structure exactly:

```
📌 GENERAL
   #dashboard
   #announcements

🧪 PRODUCT  
   #website
   #catalog
   #research

📣 MARKETING & SALES
   #content
   #sales
   #customer

📦 OPERATIONS
   #inventory
   #suppliers
   #shipping

💰 FINANCE
   #pricing
   #pnl
   #invoicing
```

### Quick Channel Setup
1. Right-click server name → "Create Category" → Name: "📌 GENERAL"
2. Right-click category → "Create Channel" → Name: "dashboard"
3. Right-click category → "Create Channel" → Name: "announcements"
4. Repeat for all categories and channels

## Step 2: Deploy Bot in #website Channel (PRIORITY)

### Option A: Poe Bot Bridge (Simplest - 5 minutes)
1. Create Poe account
2. Create custom bot with Claude 3.5 Sonnet
3. Set system prompt for website work
4. Add bot to Discord server
5. Test in #website channel

### Option B: Direct Implementation (30 minutes)
Quick Node.js setup for immediate use:

```javascript
// quick-bot.js
const { Client, GatewayIntentBits } = require('discord.js');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Agent configurations
const agents = {
    'website': {
        systemPrompt: `You are StoreFront, the SKZ Peptides website manager. You're in the #website Discord channel.

Your role: Build pages, fix bugs, deploy updates, optimize UX for skzpeptides.netlify.app

Current focus: SKZ Peptides Malaysian peptide business with products:
- Retatrutide 5mg (RM169)
- SS-31 10mg (RM125) 
- NAD+ 500mg (RM119)
- GLOW 70mg (RM199)
- MOTS-c 40mg (RM219)
- BAC Water 10ml (RM35)

You have access to the codebase at ./projects/skz-peptides/frontend/
Be direct, technical, and action-oriented. Suggest specific code changes and improvements.`,
        memory: ''
    },
    
    'content': {
        systemPrompt: `You are BrandLab, the SKZ Peptides marketing content creator. You're in the #content Discord channel.

Your role: Create Threads posts, Instagram content, educational materials for Malaysian biohacking/fitness market.

Brand voice: Professional but accessible, Malaysian context ("rojak" style), educational-first approach.
Products: Research-grade peptides, 30% below market rates, local supply advantage.

Focus on: Education over selling, research disclaimers, authentic Malaysian voice.
Target: Malaysian fitness enthusiasts, biohackers, researchers aged 25-45.

Create content that builds trust and educates about peptide research.`,
        memory: ''
    }
};

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    const channelName = message.channel.name;
    const agentConfig = agents[channelName];
    
    if (!agentConfig) return; // Channel not configured yet
    
    try {
        await message.channel.sendTyping();
        
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1000,
            system: agentConfig.systemPrompt + '\n\nMemory:\n' + agentConfig.memory,
            messages: [{
                role: 'user',
                content: message.content
            }]
        });
        
        // Update memory
        const timestamp = new Date().toISOString();
        agentConfig.memory += `\n[${timestamp}] User: ${message.content}\nAgent: ${response.content[0].text}\n`;
        
        await message.reply(response.content[0].text);
        
    } catch (error) {
        console.error('Error:', error);
        await message.reply('Sorry, I encountered an error. Please try again.');
    }
});

client.on('ready', () => {
    console.log(`SKZ Bot is online as ${client.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
```

### Quick Deploy Instructions
```bash
# Create bot folder
mkdir skz-discord-bot
cd skz-discord-bot

# Create package.json
echo '{
  "name": "skz-bot",
  "version": "1.0.0",
  "dependencies": {
    "discord.js": "^14.14.1",
    "@anthropic-ai/sdk": "^0.15.1",
    "dotenv": "^16.3.1"
  }
}' > package.json

# Install dependencies
npm install

# Create .env file
echo 'DISCORD_BOT_TOKEN=your_bot_token_here
ANTHROPIC_API_KEY=your_anthropic_key_here' > .env

# Create bot file (copy code above)
# Run bot
node quick-bot.js
```

## Step 3: Test #website Channel

### Test Commands
1. Go to #website channel
2. Type: "What's the current status of our product pages?"
3. Type: "Help me optimize the Retatrutide product page"
4. Type: "Check if all pricing is updated to the new strategy"

### Expected Behavior
- Bot responds as StoreFront agent
- Focuses on website development tasks
- Provides specific technical suggestions
- Maintains memory of conversation

## Phase 2: Add #content Channel (Next Priority)

### BrandLab Agent Test
1. Go to #content channel  
2. Type: "Create a Threads post about why COAs matter for peptide research"
3. Type: "Draft educational content about proper peptide storage"
4. Type: "Plan content calendar for next week"

## Dashboard Channel Magic ✨

### Special #dashboard Functionality
When you type in #dashboard, get instant business overview:

```
🧬 SKZ PEPTIDES — DAILY STATUS

🧪 PRODUCT
Website: 70% complete, last task: product page optimization
Catalog: 6 products live, all COAs uploaded  
Research: Evaluating new suppliers from Anna's network

📣 MARKETING  
Last content: 1 day ago (Threads education post)
Engagement: 23 likes, 5 shares
Pending: Draft weekend content batch

📦 OPERATIONS
Stock alerts: SS-31 running low (3 vials remaining)
Supplier order: GLOW x10 from Anna (ETA Mar 25)
Shipping queue: 2 orders ready to dispatch

💰 FINANCE
March revenue: RM2,847 (targeting RM3,500)
Profit margin: 67.3% (healthy)
Payment alerts: 1 pending payment follow-up needed
```

## Implementation Timeline

### TODAY (30 minutes total)
- [ ] Create Discord server (10 min)
- [ ] Deploy bot with #website agent (20 min)
- [ ] Test website development workflow

### TOMORROW
- [ ] Add #content agent (BrandLab)
- [ ] Test content creation workflow  
- [ ] Add #inventory agent (StockPulse)

### THIS WEEK
- [ ] Add remaining operation channels
- [ ] Configure #dashboard aggregation
- [ ] Connect to Telegram bot
- [ ] Test full workflow

### SUCCESS METRICS
- Respond to website tasks in #website ✅
- Create marketing content in #content ✅  
- Track inventory in #inventory ✅
- Get business overview from #dashboard ✅

Start with #website channel - you're actively building the site, so immediate value! 🚀
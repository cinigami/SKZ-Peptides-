# Discord Bot Implementation for SKZ Peptides Back Office

## Option A: OpenClaw Discord Integration (Recommended)

### Check OpenClaw Discord Support
```bash
# Check if OpenClaw supports Discord
openclaw plugins list | grep discord
openclaw help | grep discord
```

If OpenClaw supports Discord:
1. Configure Discord bot token in OpenClaw
2. Set up channel routing in OpenClaw config
3. Map channels to different system prompts

### OpenClaw Configuration (if supported)
```yaml
# openclaw.yaml
discord:
  enabled: true
  token: "YOUR_DISCORD_BOT_TOKEN"
  channels:
    "1234567890": # #website channel ID
      agent: "storefront"
      prompt: "You are StoreFront, SKZ Peptides website manager..."
      memory: "./discord-memory/storefront.md"
    "1234567891": # #catalog channel ID
      agent: "catalogbot"
      prompt: "You are CatalogBot, SKZ Peptides product manager..."
      memory: "./discord-memory/catalog.md"
    # ... more channels
```

## Option B: Custom Discord Bot (If OpenClaw doesn't support Discord)

### Node.js Discord Bot Setup

#### 1. Create Bot on Discord Developer Portal
1. Go to https://discord.com/developers/applications
2. Click "New Application" → Name: "SKZ Peptides Bot"
3. Go to "Bot" section → Click "Add Bot"
4. Copy the bot token (keep it secret)
5. Under "Privileged Gateway Intents" enable:
   - Message Content Intent
   - Server Members Intent

#### 2. Bot Implementation Code

```javascript
// bot.js
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Channel to Agent mapping
const CHANNEL_AGENTS = {
    'website-channel-id': {
        name: 'StoreFront',
        prompt: 'You are StoreFront, the SKZ Peptides website manager. You build pages, fix bugs, deploy updates, and optimize UX. Focus on technical implementation and user experience.',
        memory: './discord-memory/storefront.md'
    },
    'catalog-channel-id': {
        name: 'CatalogBot', 
        prompt: 'You are CatalogBot, the SKZ Peptides product catalog manager. You handle product listings, descriptions, photos, COAs, and inventory sync.',
        memory: './discord-memory/catalog.md'
    },
    'content-channel-id': {
        name: 'BrandLab',
        prompt: 'You are BrandLab, the SKZ Peptides marketing content creator. You create social media posts, educational content, and brand messaging for Malaysian market.',
        memory: './discord-memory/brandlab.md'
    },
    'inventory-channel-id': {
        name: 'StockPulse',
        prompt: 'You are StockPulse, the SKZ Peptides inventory manager. You track stock levels, manage reorder points, and optimize inventory.',
        memory: './discord-memory/stockpulse.md'
    },
    'pricing-channel-id': {
        name: 'MarginCalc',
        prompt: 'You are MarginCalc, the SKZ Peptides pricing strategist. You analyze margins, competitive pricing, and profitability.',
        memory: './discord-memory/margincalc.md'
    }
    // Add more agents...
};

// Load memory for specific agent
async function loadMemory(memoryFile) {
    try {
        const content = await fs.readFile(memoryFile, 'utf8');
        return content;
    } catch (error) {
        return ''; // Return empty if file doesn't exist
    }
}

// Save memory for specific agent
async function saveMemory(memoryFile, content) {
    try {
        await fs.mkdir(path.dirname(memoryFile), { recursive: true });
        await fs.writeFile(memoryFile, content, 'utf8');
    } catch (error) {
        console.error('Error saving memory:', error);
    }
}

// Call Claude API (or OpenClaw API)
async function callClaudeAPI(systemPrompt, userMessage, memory) {
    try {
        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            model: 'claude-3-sonnet-20240229',
            max_tokens: 1000,
            system: `${systemPrompt}\n\nMemory from previous conversations:\n${memory}`,
            messages: [{
                role: 'user',
                content: userMessage
            }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`,
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY
            }
        });
        
        return response.data.content[0].text;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        return 'Sorry, I encountered an error processing your request.';
    }
}

// Handle incoming messages
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    const channelId = message.channel.id;
    const agent = CHANNEL_AGENTS[channelId];
    
    if (!agent) {
        // Not a monitored channel
        return;
    }
    
    try {
        // Show typing indicator
        await message.channel.sendTyping();
        
        // Load agent memory
        const memory = await loadMemory(agent.memory);
        
        // Get response from Claude
        const response = await callClaudeAPI(
            agent.prompt,
            message.content,
            memory
        );
        
        // Update memory with conversation
        const updatedMemory = `${memory}\n\n[${new Date().toISOString()}] User: ${message.content}\nAgent: ${response}`;
        await saveMemory(agent.memory, updatedMemory);
        
        // Send response
        await message.reply(response);
        
    } catch (error) {
        console.error('Error processing message:', error);
        await message.reply('Sorry, I encountered an error processing your request.');
    }
});

// Bot ready event
client.on('ready', () => {
    console.log(`${client.user.tag} is online and ready!`);
    
    // Set bot status
    client.user.setActivity('Managing SKZ Peptides', { type: 'WATCHING' });
});

// Login
client.login(process.env.DISCORD_BOT_TOKEN);
```

#### 3. Package.json
```json
{
    "name": "skz-peptides-discord-bot",
    "version": "1.0.0",
    "description": "Discord back office bot for SKZ Peptides",
    "main": "bot.js",
    "scripts": {
        "start": "node bot.js",
        "dev": "nodemon bot.js"
    },
    "dependencies": {
        "discord.js": "^14.14.1",
        "axios": "^1.6.0",
        "dotenv": "^16.3.1"
    },
    "devDependencies": {
        "nodemon": "^3.0.1"
    }
}
```

#### 4. Environment Variables (.env)
```env
DISCORD_BOT_TOKEN=your_discord_bot_token_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

#### 5. Deployment Options

**Option 1: Local Development**
```bash
npm install
npm run dev
```

**Option 2: VPS Deployment (DigitalOcean, AWS, etc.)**
```bash
# On your VPS
git clone your-repo
cd skz-peptides-discord-bot
npm install
npm install -g pm2
pm2 start bot.js --name "skz-bot"
pm2 startup
pm2 save
```

**Option 3: Railway/Heroku Deployment**
- Push code to GitHub
- Connect Railway/Heroku to GitHub repo
- Set environment variables in platform
- Deploy automatically

## Option C: Hybrid Approach (Recommended)

### Use OpenClaw for Main Business + Discord Bot for Back Office

1. **Keep current OpenClaw setup** for customer-facing Telegram bot
2. **Add Discord bot** specifically for your private back office
3. **Bridge the systems** with shared memory files

### Implementation Steps

#### 1. Create Discord Server (Manual)
- Create "SKZ Peptides HQ" Discord server
- Set up all channels as outlined
- Keep server private (you only)

#### 2. Set Up Discord Bot
- Use Custom Node.js bot (Option B above)
- Deploy on VPS or cloud platform
- Configure channel → agent mapping

#### 3. Create Memory Bridge
```javascript
// shared-memory.js - Bridge between Discord and OpenClaw
const fs = require('fs').promises;

class MemoryBridge {
    constructor() {
        this.openclawPath = '../clawd/memory/';
        this.discordPath = './discord-memory/';
    }
    
    async syncInventory() {
        // Sync inventory between systems
        const openclawInventory = await this.readOpenClaw('inventory.md');
        await this.writeDiscord('stockpulse.md', openclawInventory);
    }
    
    async syncPricing() {
        // Sync pricing between systems
        const discordPricing = await this.readDiscord('margincalc.md');
        await this.writeOpenClaw('pricing.md', discordPricing);
    }
}

// Run sync every 5 minutes
setInterval(async () => {
    const bridge = new MemoryBridge();
    await bridge.syncInventory();
    await bridge.syncPricing();
}, 5 * 60 * 1000);
```

## Testing & Validation

### Test Each Channel
1. Send test message in each Discord channel
2. Verify agent responds with appropriate persona
3. Check memory files are created and updated
4. Test cross-channel coordination

### Integration Tests
1. Update inventory in Discord → verify website reflects changes
2. Pricing changes in Discord → verify customer bot has new prices
3. Order from customer → verify shows up in Discord #sales

## Monitoring & Maintenance

### Bot Health Monitoring
```javascript
// health-check.js
setInterval(() => {
    console.log(`Bot Status: ${client.ws.status}`);
    console.log(`Guilds: ${client.guilds.cache.size}`);
    console.log(`Users: ${client.users.cache.size}`);
}, 60000); // Every minute
```

### Log Management
```javascript
// Enhanced logging
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'skz-discord-bot' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console()
    ],
});
```

This implementation gives you a powerful Discord back office that works alongside your existing OpenClaw setup, providing specialized AI agents for each aspect of your business.
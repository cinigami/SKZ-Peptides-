// SKZ Peptides Discord Bot - Quick Deploy
// Run this to get your #website agent working immediately

const { Client, GatewayIntentBits } = require('discord.js');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// SKZ Peptides specialized agents
const agents = {
    'website': {
        name: 'StoreFront',
        systemPrompt: `You are StoreFront, the SKZ Peptides website development agent.

CURRENT MISSION: Optimize skzpeptides.netlify.app for Malaysian peptide market

YOUR PRODUCTS & NEW PRICING (March 2026):
- Retatrutide 5mg: RM169 (was RM55) - 30% below RM490 market rate
- SS-31 10mg: RM125 (was RM90) - competitive premium positioning  
- NAD+ 500mg: RM119 (was RM75) - premium value positioning
- GLOW 70mg: RM199 (was RM130) - premium blend positioning
- MOTS-c 40mg: RM219 (was RM140) - premium research positioning
- BAC Water 10ml: RM35 (was RM10) - market standard

WEBSITE TASKS:
1. Update all pricing to new strategy levels
2. Optimize product pages for conversions
3. Implement Malaysian market messaging
4. Add value propositions vs RM490 competitors
5. Ensure mobile experience is perfect

CURRENT CODEBASE: ./projects/skz-peptides/frontend/
- React/Vite setup
- Mobile-responsive design
- Purple theme (#A78BFA, #7C3AED)
- Product data in src/data/products.js

Be direct, technical, action-oriented. Suggest specific file edits and improvements.
Focus on revenue optimization and Malaysian market positioning.`,
        memory: `[CREATED] ${new Date().toISOString()} - StoreFront agent initialized for SKZ Peptides website optimization.`
    },

    'content': {
        name: 'BrandLab',
        systemPrompt: `You are BrandLab, the SKZ Peptides marketing content creator.

MISSION: Create compelling content for Malaysian biohacking/fitness market via @skzpeptides

BRAND POSITIONING:
- Quality peptides 30% below market (RM169 vs RM490 for Retatrutide)
- Professional Malaysian supplier vs overseas uncertainty  
- Educational-first approach with proper research disclaimers
- Target: Malaysian fitness enthusiasts, biohackers, researchers 25-45

CONTENT STRATEGY:
- Instagram: Educational posts, behind-scenes, testimonials
- Threads: Join biohacking discussions, answer questions, soft promotion
- Malaysian "rojak" style: Mix English/Malay for authenticity
- Focus: Research benefits, proper usage, safety, COA importance

COMPETITORS CHARGING RM490: Your job is to highlight SKZ value without attacking competition.

Create content that builds trust, educates, and converts through value demonstration.
Always include research disclaimers. Maintain professional but approachable tone.`,
        memory: `[CREATED] ${new Date().toISOString()} - BrandLab agent ready for SKZ Peptides Malaysian market content creation.`
    },

    'dashboard': {
        name: 'Commander',
        systemPrompt: `You are Commander, the SKZ Peptides business overview specialist.

When user types "dashboard" or "status", provide comprehensive business overview:

🧬 SKZ PEPTIDES — DAILY STATUS
[Current Date & Time]

🧪 PRODUCT STATUS
Website: [StoreFront updates from #website]
Catalog: 6 products live with new pricing strategy
Research: Monitoring competitor pricing (market avg RM443 for 10mg Retatrutide)

📣 MARKETING & SALES
Content: @skzpeptides Instagram/Threads launched
Pricing: New strategy 30% below market, 65-74% margins
Sales: [Current month performance]

📦 OPERATIONS  
Inventory: Current stock levels
- Retatrutide 5mg: 8 units
- SS-31 10mg: 20 units
- NAD+ 500mg: 9 units  
- GLOW 70mg: 9 units
- MOTS-c 40mg: 9 units
- BAC Water 10ml: 20 units

💰 FINANCE
Revenue potential: RM9,385 (current inventory at new pricing)
Profit margin: 65-74% across products
Target: RM3,000-4,000 monthly revenue

🎯 PRIORITY ALERTS
[List urgent items needing attention]

Always highlight key business metrics and actionable priorities.`,
        memory: `[CREATED] ${new Date().toISOString()} - Commander dashboard initialized for SKZ Peptides business overview.`
    }
};

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    const channelName = message.channel.name;
    const agent = agents[channelName];
    
    if (!agent) {
        // Channel not configured yet
        return;
    }
    
    console.log(`${agent.name} received message in #${channelName}: ${message.content}`);
    
    try {
        await message.channel.sendTyping();
        
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1500,
            system: agent.systemPrompt + '\n\n=== MEMORY ===\n' + agent.memory,
            messages: [{
                role: 'user',
                content: message.content
            }]
        });
        
        const responseText = response.content[0].text;
        
        // Update agent memory
        const timestamp = new Date().toISOString();
        agent.memory += `\n\n[${timestamp}] User: ${message.content}\n${agent.name}: ${responseText}`;
        
        // Keep memory manageable (last 10 interactions)
        const memoryLines = agent.memory.split('\n\n');
        if (memoryLines.length > 20) {
            agent.memory = memoryLines.slice(-15).join('\n\n');
        }
        
        await message.reply(responseText);
        
    } catch (error) {
        console.error('Error:', error);
        await message.reply(`Sorry, I encountered an error. ${agent.name} is temporarily unavailable. Please try again.`);
    }
});

client.on('ready', () => {
    console.log(`🧬 SKZ Peptides Bot is online as ${client.user.tag}`);
    console.log(`📊 Monitoring channels: ${Object.keys(agents).map(ch => '#' + ch).join(', ')}`);
    
    // Set bot activity
    client.user.setActivity('Managing SKZ Peptides Operations', { type: 'WATCHING' });
});

// Error handling
client.on('error', console.error);
process.on('unhandledRejection', console.error);

// Login
client.login(process.env.DISCORD_BOT_TOKEN);
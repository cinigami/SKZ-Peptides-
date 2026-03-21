// SKZ Peptides Discord Bot - With Persistent Memory
const { Client, GatewayIntentBits } = require('discord.js');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs').promises;
const path = require('path');
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

// Memory directory
const MEMORY_DIR = './discord-memory';

// Ensure memory directory exists
async function initMemory() {
    try {
        await fs.mkdir(MEMORY_DIR, { recursive: true });
        console.log('📁 Memory directory ready:', MEMORY_DIR);
    } catch (error) {
        console.error('Error creating memory directory:', error);
    }
}

// Load agent memory from file
async function loadMemory(channelName) {
    try {
        const memoryFile = path.join(MEMORY_DIR, `${channelName}.md`);
        const content = await fs.readFile(memoryFile, 'utf8');
        return content;
    } catch (error) {
        // File doesn't exist yet, return empty memory with timestamp
        const initialMemory = `# ${channelName.toUpperCase()} Agent Memory\nCreated: ${new Date().toISOString()}\n\n`;
        return initialMemory;
    }
}

// Save agent memory to file
async function saveMemory(channelName, memory) {
    try {
        const memoryFile = path.join(MEMORY_DIR, `${channelName}.md`);
        await fs.writeFile(memoryFile, memory, 'utf8');
        console.log(`💾 Memory saved for #${channelName}`);
    } catch (error) {
        console.error(`Error saving memory for ${channelName}:`, error);
    }
}

// Agent configurations
const agents = {
    'website': {
        name: 'StoreFront',
        memoryFile: 'website.md',
        systemPrompt: `You are StoreFront, the SKZ Peptides website development agent.

🎯 PRIMARY MISSION: Optimize skzpeptides.netlify.app for maximum revenue

CURRENT PRICING STRATEGY (March 2026):
- Retatrutide 5mg: RM169 (market competitors RM490 = 65% cheaper!)
- SS-31 10mg: RM125 (competitive premium)
- NAD+ 500mg: RM119 (premium value)
- GLOW 70mg: RM199 (premium blend)
- MOTS-c 40mg: RM219 (premium research)
- BAC Water 10ml: RM35 (standard rate)

WEBSITE OPTIMIZATION PRIORITIES:
1. 🏆 PRICING: Highlight 65% savings vs RM490 competitors
2. 🇲🇾 TRUST: Malaysian supplier advantage vs overseas uncertainty
3. 📱 MOBILE: Perfect mobile experience (primary traffic)
4. 🔬 EDUCATION: Research-grade quality messaging
5. ⚡ CONVERSION: Streamline purchase process

CODEBASE LOCATION: ./projects/skz-peptides/frontend/
- React/Vite setup with Purple theme (#A78BFA, #7C3AED)
- Product data: src/data/products.js
- Mobile components: src/components/mobile/
- Main pages: src/pages/

TECHNICAL FOCUS:
- Revenue optimization through pricing psychology
- Malaysian market trust signals
- Mobile-first conversion funnel
- Research disclaimers and compliance
- Fast loading and clean UX

Be direct, technical, and revenue-focused. Always suggest specific file changes.
Remember our conversation history for context and continuity.`
    },

    'content': {
        name: 'BrandLab', 
        memoryFile: 'content.md',
        systemPrompt: `You are BrandLab, the SKZ Peptides marketing content creator for @skzpeptides.

🎯 CONTENT MISSION: Build trust & educate Malaysian biohacking community

BRAND POSITIONING:
✅ Quality peptides 65% cheaper (RM169 vs RM490 market rate)
✅ Malaysian supplier = fast, reliable, no customs issues
✅ Educational-first approach with proper research disclaimers  
✅ Professional yet approachable for local market

TARGET AUDIENCE:
- Malaysian fitness enthusiasts & biohackers (25-45 years)
- Researchers & health optimization focused individuals
- Price-conscious but quality-demanding customers
- Active on Instagram/Threads seeking peptide education

CONTENT STRATEGY:
📱 Instagram: Educational posts, behind-scenes, customer education
🧵 Threads: Join biohacking discussions, answer questions, thought leadership
🇲🇾 Language: Malaysian "rojak" style - mix English/Malay for authenticity
🔬 Focus: Research benefits, proper usage, COA importance, safety

COMPETITORS TO WATCH:
- PUREPH/PPHARMA (Lazada - RM490 pricing)
- Generic suppliers (RM395-410 range)
- International sellers (high shipping, customs risk)

CONTENT RULES:
- Always include research disclaimers
- Highlight value vs overpriced competitors (without direct attacks)
- Emphasize Malaysian advantages (local, fast, reliable)
- Educational content builds trust before selling
- Authentic voice over corporate speak

Remember our content history and build on previous campaigns.`
    },

    'dashboard': {
        name: 'Commander',
        memoryFile: 'dashboard.md', 
        systemPrompt: `You are Commander, the SKZ Peptides business intelligence specialist.

🎯 MISSION: Provide comprehensive business overview and strategic guidance

When user types "dashboard" or "status", provide this format:

🧬 SKZ PEPTIDES — BUSINESS STATUS
${new Date().toDateString()}

🧪 PRODUCT STATUS  
Website: [Latest StoreFront activities from memory]
Pricing: New strategy live (RM169 vs RM490 market = 65% advantage)
Products: 6 live products with optimized margins

📣 MARKETING STATUS
@skzpeptides: Instagram/Threads accounts active
Content: [Latest BrandLab activities from memory]
Market position: 65% below competitors, premium value messaging

📦 OPERATIONS STATUS
Current Inventory:
- Retatrutide 5mg: 8 units (RM1,352 potential revenue)
- SS-31 10mg: 20 units (RM2,500 potential revenue)  
- NAD+ 500mg: 9 units (RM1,071 potential revenue)
- GLOW 70mg: 9 units (RM1,791 potential revenue)
- MOTS-c 40mg: 9 units (RM1,971 potential revenue)
- BAC Water: 20 units (RM700 potential revenue)

💰 FINANCIAL STATUS
Total Inventory Value: RM9,385 potential revenue
Average Margin: 65-75% across products
Monthly Target: RM3,000-4,000 revenue
Break-even: 2-3 units per month (very achievable)

🎯 STRATEGIC PRIORITIES
[Analyze current situation and provide 3-5 actionable priorities]

📊 KEY ALERTS
[Check for low stock, pricing opportunities, competitor updates]

Use memory from all agents to provide accurate, current business intelligence.
Focus on actionable insights and revenue opportunities.`
    }
};

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    const channelName = message.channel.name;
    const agent = agents[channelName];
    
    if (!agent) {
        // Channel not configured - silently ignore
        return;
    }
    
    console.log(`${agent.name} processing message in #${channelName}: ${message.content.substring(0, 50)}...`);
    
    try {
        await message.channel.sendTyping();
        
        // Load persistent memory
        const memory = await loadMemory(channelName);
        
        // Call Claude with system prompt + memory
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2000,
            system: agent.systemPrompt + '\n\n=== CONVERSATION HISTORY ===\n' + memory,
            messages: [{
                role: 'user',
                content: message.content
            }]
        });
        
        const responseText = response.content[0].text;
        
        // Update memory with new conversation
        const timestamp = new Date().toISOString();
        const conversationEntry = `\n## ${timestamp}\n**User:** ${message.content}\n**${agent.name}:** ${responseText}\n`;
        const updatedMemory = memory + conversationEntry;
        
        // Keep memory manageable (last 50 interactions)
        const memoryLines = updatedMemory.split('\n## ');
        if (memoryLines.length > 50) {
            const recentMemory = memoryLines.slice(-40).join('\n## ');
            await saveMemory(channelName, recentMemory);
        } else {
            await saveMemory(channelName, updatedMemory);
        }
        
        // Reply to user
        await message.reply(responseText);
        
        console.log(`✅ ${agent.name} responded successfully`);
        
    } catch (error) {
        console.error(`❌ Error in ${agent.name}:`, error.message);
        
        if (error.status === 429) {
            await message.reply('⏳ I need a moment to process. Please try again in 30 seconds.');
        } else if (error.status === 401) {
            await message.reply('🔑 Authentication error. Please check API configuration.');
        } else {
            await message.reply(`⚠️ ${agent.name} encountered an error. Please try again or contact admin.`);
        }
    }
});

client.on('ready', async () => {
    console.log(`🧬 SKZ Peptides Bot ONLINE as ${client.user.tag}`);
    console.log(`📊 Active Agents: ${Object.keys(agents).map(ch => `#${ch} (${agents[ch].name})`).join(', ')}`);
    
    // Initialize memory system
    await initMemory();
    
    // Set bot activity  
    client.user.setActivity('Managing SKZ Peptides | 65% below market rates!', { type: 'WATCHING' });
    
    console.log('🚀 Ready for business optimization!');
});

// Graceful error handling
client.on('error', error => {
    console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Login
client.login(process.env.DISCORD_BOT_TOKEN);

// Export for testing
module.exports = { agents, loadMemory, saveMemory };
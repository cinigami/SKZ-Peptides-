# SKZ Peptides Discord Bot - Complete Implementation

## 📋 Overview
This is the complete Discord bot implementation for SKZ Peptides with file reading capabilities (PDF, Excel, Word, Text files) and persistent memory system.

## 🔧 Prerequisites
- Node.js installed on your Mac
- Discord bot token
- Anthropic API key
- Discord server with proper channels

## 📦 Required Dependencies

Create `package.json`:
```json
{
  "name": "skz-peptides-discord-bot",
  "version": "1.0.0",
  "description": "SKZ Peptides Discord Back Office Bot with File Processing",
  "main": "deploy-with-files.js",
  "scripts": {
    "start": "node deploy-with-files.js",
    "dev": "nodemon deploy-with-files.js"
  },
  "dependencies": {
    "discord.js": "^14.14.1",
    "@anthropic-ai/sdk": "^0.15.1",
    "dotenv": "^16.3.1",
    "pdf-parse": "^1.1.1",
    "xlsx": "^0.18.5",
    "mammoth": "^1.6.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "keywords": ["discord", "bot", "peptides", "business", "automation", "file-processing"],
  "author": "SKZ Peptides",
  "license": "MIT"
}
```

## 🔑 Environment Configuration

Create `.env`:
```env
# SKZ Peptides Discord Bot Configuration
# Replace with your actual tokens

# Discord Bot Token (from Discord Developer Portal)
DISCORD_BOT_TOKEN=your_discord_bot_token_here

# Anthropic API Key (for Claude integration)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional settings
NODE_ENV=production
```

## 🤖 Complete Bot Code

Create `deploy-with-files.js`:
```javascript
// SKZ Peptides Discord Bot - With File Reading Capabilities
const { Client, GatewayIntentBits } = require('discord.js');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');

// File processing libraries
const pdfParse = require('pdf-parse');
const XLSX = require('xlsx');
const mammoth = require('mammoth');

require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageAttachments, // For file attachments
    ],
});

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

const MEMORY_DIR = './discord-memory';
const UPLOADS_DIR = './uploads';

// File processing functions
async function initMemory() {
    try {
        await fs.mkdir(MEMORY_DIR, { recursive: true });
        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        console.log('📁 Directories ready:', MEMORY_DIR, UPLOADS_DIR);
    } catch (error) {
        console.error('Error creating directories:', error);
    }
}

// Download file from Discord
async function downloadFile(url, filename) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https:') ? https : http;
        const filePath = path.join(UPLOADS_DIR, filename);
        
        protocol.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }
            
            const chunks = [];
            response.on('data', chunk => chunks.push(chunk));
            response.on('end', async () => {
                try {
                    const buffer = Buffer.concat(chunks);
                    await fs.writeFile(filePath, buffer);
                    resolve(filePath);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', reject);
    });
}

// Extract text from PDF
async function extractPDF(filePath) {
    try {
        const buffer = await fs.readFile(filePath);
        const data = await pdfParse(buffer);
        return data.text;
    } catch (error) {
        throw new Error(`PDF processing failed: ${error.message}`);
    }
}

// Extract text from Excel/CSV
async function extractExcel(filePath) {
    try {
        const workbook = XLSX.readFile(filePath);
        let allData = '';
        
        workbook.SheetNames.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            
            allData += `\n=== SHEET: ${sheetName} ===\n`;
            jsonData.forEach((row, index) => {
                if (row.length > 0) {
                    allData += `Row ${index + 1}: ${row.join(' | ')}\n`;
                }
            });
        });
        
        return allData;
    } catch (error) {
        throw new Error(`Excel processing failed: ${error.message}`);
    }
}

// Extract text from Word documents
async function extractWord(filePath) {
    try {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    } catch (error) {
        throw new Error(`Word processing failed: ${error.message}`);
    }
}

// Process uploaded file based on type
async function processFile(attachment) {
    try {
        const filename = `${Date.now()}_${attachment.name}`;
        const filePath = await downloadFile(attachment.url, filename);
        const ext = path.extname(attachment.name).toLowerCase();
        
        let extractedText = '';
        
        switch (ext) {
            case '.pdf':
                extractedText = await extractPDF(filePath);
                break;
            case '.xlsx':
            case '.xls':
            case '.csv':
                extractedText = await extractExcel(filePath);
                break;
            case '.docx':
                extractedText = await extractWord(filePath);
                break;
            case '.txt':
                extractedText = await fs.readFile(filePath, 'utf8');
                break;
            default:
                throw new Error(`Unsupported file type: ${ext}`);
        }
        
        // Clean up file after processing
        await fs.unlink(filePath);
        
        return {
            filename: attachment.name,
            type: ext,
            content: extractedText.substring(0, 8000), // Limit to prevent token overflow
            size: attachment.size
        };
        
    } catch (error) {
        throw new Error(`File processing failed: ${error.message}`);
    }
}

// Load and save memory functions
async function loadMemory(channelName) {
    try {
        const memoryFile = path.join(MEMORY_DIR, `${channelName}.md`);
        const content = await fs.readFile(memoryFile, 'utf8');
        return content;
    } catch (error) {
        const initialMemory = `# ${channelName.toUpperCase()} Agent Memory\nCreated: ${new Date().toISOString()}\n\n`;
        return initialMemory;
    }
}

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
        systemPrompt: `You are StoreFront, the SKZ Peptides website development agent.

You can now process uploaded files (PDF, Excel, Word, text files) to help with:
- Analyzing supplier catalogs and pricing
- Processing business documents 
- Reading technical specifications
- Reviewing contracts and agreements

When a file is uploaded, you'll receive its content and can analyze it for website optimization insights.

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
        systemPrompt: `You are BrandLab, the SKZ Peptides marketing content creator for @skzpeptides.

You can now analyze uploaded files for content creation:
- Market research documents
- Competitor analysis reports
- Customer feedback files
- Product research papers

Use file content to create better marketing materials for @skzpeptides.

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
        systemPrompt: `You are Commander, the SKZ Peptides business intelligence specialist.

You can now process business documents:
- Financial reports and spreadsheets
- Inventory tracking sheets
- Supplier catalogs and pricing
- Performance analytics

Analyze uploaded files to provide strategic business insights and recommendations.

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
    
    if (!agent) return;
    
    let fileContent = '';
    let userMessage = message.content;
    
    // Process any attached files
    if (message.attachments.size > 0) {
        await message.channel.sendTyping();
        
        try {
            const processedFiles = [];
            
            for (const attachment of message.attachments.values()) {
                console.log(`📎 Processing file: ${attachment.name}`);
                const result = await processFile(attachment);
                processedFiles.push(result);
            }
            
            // Add file content to user message
            fileContent = processedFiles.map(file => 
                `\n=== FILE: ${file.filename} (${file.type}) ===\n${file.content}\n=== END FILE ===\n`
            ).join('\n');
            
            userMessage += `\n\nI've uploaded ${processedFiles.length} file(s). Please analyze the content and provide insights.`;
            
            await message.react('✅'); // Confirm file processing
            
        } catch (error) {
            console.error('File processing error:', error);
            await message.reply(`❌ Could not process file: ${error.message}`);
            return;
        }
    }
    
    console.log(`${agent.name} processing message in #${channelName}`);
    
    try {
        await message.channel.sendTyping();
        
        const memory = await loadMemory(channelName);
        
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2000,
            system: agent.systemPrompt + '\n\n=== CONVERSATION HISTORY ===\n' + memory,
            messages: [{
                role: 'user',
                content: userMessage + fileContent
            }]
        });
        
        const responseText = response.content[0].text;
        
        // Update memory
        const timestamp = new Date().toISOString();
        const conversationEntry = `\n## ${timestamp}\n**User:** ${userMessage}${fileContent ? ' [Files processed]' : ''}\n**${agent.name}:** ${responseText}\n`;
        const updatedMemory = memory + conversationEntry;
        
        const memoryLines = updatedMemory.split('\n## ');
        if (memoryLines.length > 50) {
            const recentMemory = memoryLines.slice(-40).join('\n## ');
            await saveMemory(channelName, recentMemory);
        } else {
            await saveMemory(channelName, updatedMemory);
        }
        
        await message.reply(responseText);
        console.log(`✅ ${agent.name} responded successfully`);
        
    } catch (error) {
        console.error(`❌ Error in ${agent.name}:`, error.message);
        
        if (error.status === 429) {
            await message.reply('⏳ I need a moment to process. Please try again in 30 seconds.');
        } else if (error.status === 401) {
            await message.reply('🔑 Authentication error. Please check API configuration.');
        } else {
            await message.reply(`⚠️ ${agent.name} encountered an error. Please try again.`);
        }
    }
});

client.on('ready', async () => {
    console.log(`🧬 SKZ Peptides Bot ONLINE as ${client.user.tag}`);
    console.log(`📊 Active Agents: ${Object.keys(agents).map(ch => `#${ch} (${agents[ch].name})`).join(', ')}`);
    console.log(`📎 File Support: PDF, Excel, Word, Text files`);
    
    await initMemory();
    
    client.user.setActivity('Managing SKZ Peptides | Now with file analysis!', { type: 'WATCHING' });
    
    console.log('🚀 Ready for business optimization with file processing!');
});

client.on('error', error => {
    console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

client.login(process.env.DISCORD_BOT_TOKEN);

module.exports = { agents, loadMemory, saveMemory, processFile };
```

## 🚀 Installation Instructions

### Step 1: Setup Directory
```bash
# Navigate to your operations folder
cd ~/Documents/Claude/CodeAgent/projects/skz-peptides/operations/

# Create the directory if it doesn't exist
mkdir -p ~/Documents/Claude/CodeAgent/projects/skz-peptides/operations/
cd ~/Documents/Claude/CodeAgent/projects/skz-peptides/operations/
```

### Step 2: Create Files
1. Create `package.json` with the content above
2. Create `.env` with your actual tokens
3. Create `deploy-with-files.js` with the complete bot code

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Configure Tokens
Edit `.env` and replace:
- `your_discord_bot_token_here` with your actual Discord bot token
- `your_anthropic_api_key_here` with your actual Anthropic API key

### Step 5: Run the Bot
```bash
node deploy-with-files.js
```

## ✅ Expected Output
```
🧬 SKZ Peptides Bot ONLINE as SKZ Peptides Bot#1234
📊 Active Agents: #website (StoreFront), #content (BrandLab), #dashboard (Commander)
📎 File Support: PDF, Excel, Word, Text files
📁 Directories ready: ./discord-memory ./uploads
🚀 Ready for business optimization with file processing!
```

## 🎯 Testing Your Bot

### Test #website Channel
Go to #website in Discord:
1. Type: "Hello StoreFront!"
2. Upload a PDF and say: "Analyze this document"
3. Ask: "What's our current pricing strategy?"

### Test #content Channel  
Go to #content in Discord:
1. Type: "Hello BrandLab!"
2. Ask: "Create a Threads post about peptide safety"
3. Upload Excel file and say: "Use this data for content"

### Test #dashboard Channel
Go to #dashboard in Discord:
1. Type: "dashboard"
2. Ask: "What are today's priorities?"
3. Upload spreadsheet: "Analyze this business data"

## 📎 Supported File Types
- **PDF** (.pdf) - Documents, catalogs, reports
- **Excel** (.xlsx, .xls) - Spreadsheets, data analysis  
- **CSV** (.csv) - Data files, pricing lists
- **Word** (.docx) - Business documents, contracts
- **Text** (.txt) - Simple text files

## 🛡️ Security Notes
- Keep your `.env` file private
- Never commit tokens to git
- Bot only responds in configured channels (#website, #content, #dashboard)
- Files are automatically deleted after processing

## 🔧 Troubleshooting

### Bot Not Responding
1. Check console for errors
2. Verify tokens in `.env` are correct
3. Ensure bot has proper Discord permissions
4. Check channel names match exactly

### File Processing Issues
1. Verify file types are supported
2. Check file size (Discord limit: 25MB)
3. Look for error messages in console
4. Ensure all npm packages installed correctly

### Memory Issues
1. Check `discord-memory/` folder exists
2. Verify write permissions
3. Look for memory save confirmations in console

## 📈 Advanced Features

### Memory Persistence
- All conversations saved to markdown files
- Automatic memory cleanup (keeps last 40 interactions)
- Cross-session memory retention

### File Analysis
- Automatic file download and processing
- Text extraction from various formats
- Content integration with AI responses
- Temporary file cleanup

### Multi-Agent System
- Specialized agents per Discord channel
- Persistent memory per agent
- Coordinated business intelligence

---

**Your SKZ Peptides AI Business Empire is ready for deployment!** 🚀

This implementation provides:
✅ 3 specialized AI agents (StoreFront, BrandLab, Commander)
✅ File processing capabilities (PDF, Excel, Word, Text)
✅ Persistent memory system
✅ Revenue-focused optimization
✅ Malaysian market positioning
✅ Business intelligence dashboard

Ready to transform your peptide business with AI! 🧬💰
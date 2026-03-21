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

// Load and save memory functions (same as before)
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
- SS-31 10mg: RM125, NAD+ 500mg: RM119, GLOW 70mg: RM199, MOTS-c 40mg: RM219, BAC Water 10ml: RM35

Focus on revenue optimization, competitor analysis, and technical implementation.`
    },

    'content': {
        name: 'BrandLab',
        systemPrompt: `You are BrandLab, the SKZ Peptides marketing content creator.

You can now analyze uploaded files for content creation:
- Market research documents
- Competitor analysis reports
- Customer feedback files
- Product research papers

Use file content to create better marketing materials for @skzpeptides.

🎯 MISSION: Create compelling content for Malaysian biohacking market
Focus on educational content, competitor positioning, and authentic Malaysian voice.`
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

🎯 MISSION: Provide comprehensive business overview and file-based analysis.`
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
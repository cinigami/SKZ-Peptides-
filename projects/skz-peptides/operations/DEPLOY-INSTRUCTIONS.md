# SKZ Peptides Discord Bot - DEPLOY NOW

## Step 1: Create Discord Bot (5 minutes)

### Discord Developer Portal Setup
1. Go to: https://discord.com/developers/applications
2. Click "New Application" → Name: "SKZ Peptides Bot"
3. Go to "Bot" section → Click "Add Bot"
4. **Copy the Bot Token** (keep it secret!)
5. Under "Privileged Gateway Intents" enable:
   - ✅ Message Content Intent
   - ✅ Server Members Intent
6. Click "Save Changes"

### Add Bot to Your Server
1. Go to "OAuth2" → "URL Generator"
2. Select scopes: ✅ bot
3. Select permissions: 
   - ✅ Send Messages
   - ✅ Read Message History
   - ✅ Use Slash Commands
4. Copy generated URL and open in browser
5. Select "SKZ Peptides HQ" server
6. Authorize bot

## Step 2: Deploy Bot Code (10 minutes)

### Local Development Setup
```bash
# Navigate to operations folder
cd ./projects/skz-peptides/operations/

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your tokens
nano .env
```

### Add Your Tokens to .env
```env
DISCORD_BOT_TOKEN=your_actual_discord_bot_token
ANTHROPIC_API_KEY=your_actual_anthropic_api_key
```

### Run the Bot
```bash
# Start bot
npm start

# Or for development (auto-restart on changes)
npm run dev
```

### Expected Output
```
🧬 SKZ Peptides Bot is online as SKZ Peptides Bot#1234
📊 Monitoring channels: #website, #content, #dashboard
```

## Step 3: Test Your Agents (5 minutes)

### Test #website Channel
Go to #website in Discord and type:
```
What's the current status of our pricing strategy implementation?
```

**Expected Response from StoreFront:**
- Updates on pricing strategy
- Technical suggestions for website
- Specific action items

### Test #content Channel  
Go to #content in Discord and type:
```
Create a Threads post explaining why COAs matter for peptide research
```

**Expected Response from BrandLab:**
- Educational content draft
- Malaysian market context
- Research disclaimers included

### Test #dashboard Channel
Go to #dashboard and type:
```
dashboard
```

**Expected Response from Commander:**
- Complete business overview
- Current metrics and status
- Priority alerts

## Step 4: Verify Bot Permissions

### Check Bot is in Server
1. Look for "SKZ Peptides Bot" in member list
2. Bot should show as "Online" 
3. Bot should have role permissions

### Test Message Reception
- Bot responds within 5-10 seconds
- Maintains character as specialized agent
- Updates memory between conversations

## Troubleshooting

### Bot Not Responding
1. **Check Console**: Look for error messages
2. **Verify Tokens**: Ensure .env has correct tokens
3. **Check Permissions**: Bot needs "Send Messages" permission
4. **Channel Names**: Bot only responds in #website, #content, #dashboard

### API Errors
1. **Anthropic Key**: Verify API key is valid
2. **Rate Limits**: Wait 1 minute if hitting limits
3. **Network**: Check internet connection

### Bot Offline
1. **Token Expired**: Regenerate bot token if needed
2. **Server Issues**: Check Discord status
3. **Process Crashed**: Restart with `npm start`

## Production Deployment (Optional)

### Deploy to Railway/Heroku
1. Push code to GitHub repository
2. Connect Railway/Heroku to repo
3. Set environment variables in platform
4. Deploy automatically

### Keep Bot Running 24/7
```bash
# Using PM2 (recommended)
npm install -g pm2
pm2 start deploy-now.js --name "skz-bot"
pm2 startup
pm2 save

# Using screen (simple)
screen -S skz-bot
npm start
# Press Ctrl+A, then D to detach
```

## Security Notes

### Environment Protection
- ✅ Never commit .env file to git
- ✅ Keep tokens private
- ✅ Regenerate tokens if compromised
- ✅ Use different tokens for development/production

### Server Security
- ✅ Keep Discord server private (invite only)
- ✅ Regular bot permission audits
- ✅ Monitor bot activity logs

## Success Checklist

- [ ] Discord bot created and added to server
- [ ] Bot responds in #website channel as StoreFront
- [ ] Bot responds in #content channel as BrandLab  
- [ ] Bot provides dashboard in #dashboard channel
- [ ] All agents maintain memory between conversations
- [ ] Bot shows online status in Discord
- [ ] No error messages in console

## Next Phase: Add More Agents

Once basic setup works, add these agents:
1. **#inventory** → StockPulse (inventory management)
2. **#sales** → SalesBot (customer tracking)
3. **#pricing** → MarginCalc (pricing optimization)
4. **#suppliers** → SupplyChain (Anna order management)

Your SKZ Peptides AI business empire starts NOW! 🚀
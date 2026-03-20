# SKZ Peptides - Remote Access Options

## Quick Solutions to Access from Kampung:

### Option 1: Enable Remote Access to Your Mac (Recommended)

1. **Enable Remote Login on Mac:**
   - Go to System Preferences → Sharing
   - Enable "Remote Login" 
   - Note down your Mac's IP address

2. **Use SSH Tunnel:**
   ```bash
   # From your phone/another device, SSH to your Mac and create tunnel
   ssh -L 8080:localhost:3000 yourusername@YOUR_MAC_IP
   ```

3. **Access via:** `http://localhost:8080`

### Option 2: Tailscale (Easy VPN)

1. **Install Tailscale on Mac:**
   ```bash
   brew install --cask tailscale
   ```

2. **Install Tailscale on your phone**
   - Download Tailscale app
   - Login with same account

3. **Access via Tailscale IP:** `http://TAILSCALE-IP:3000`

### Option 3: Quick Deploy to Netlify (Manual)

1. **Upload the dist folder to Netlify Drop:**
   - Go to https://app.netlify.com/drop
   - Drag and drop the `dist` folder
   - Get instant public URL

### Option 4: GitHub Pages (If you have GitHub)

1. **Push code to GitHub**
2. **Enable GitHub Pages**
3. **Set source to `gh-pages` branch**

## Current Status:
- Website running locally on: http://192.168.1.45:3000
- Built files ready in: ./dist/
- Mobile layout fully implemented
- Dark mode working correctly
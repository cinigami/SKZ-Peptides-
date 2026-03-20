const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Simple HTML to PDF converter using pandoc
const convertToPDF = () => {
  const protocolsDir = 'protocols';
  const outputDir = 'frontend/public/protocols/pdf';
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Professional HTML template
  const htmlTemplate = (content, title) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${title} - SKZ Peptides</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: white;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: bold;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 1.2em;
            opacity: 0.9;
        }
        h1 {
            color: #667eea;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
            margin: 30px 0 20px 0;
            font-size: 2em;
        }
        h2 {
            color: #667eea;
            margin-top: 35px;
            margin-bottom: 15px;
            font-size: 1.4em;
            border-left: 4px solid #667eea;
            padding-left: 15px;
            background: rgba(102, 126, 234, 0.05);
            padding: 10px 15px;
            border-radius: 0 8px 8px 0;
        }
        h3 {
            color: #4facfe;
            margin-top: 25px;
            margin-bottom: 12px;
            font-size: 1.2em;
            border-bottom: 2px solid #e3f2fd;
            padding-bottom: 5px;
        }
        h4 {
            color: #666;
            margin-top: 20px;
            margin-bottom: 8px;
            font-size: 1.1em;
            font-weight: 600;
        }
        .protocol-info {
            background: #f8f9ff;
            border: 1px solid #e3f2fd;
            border-left: 4px solid #2196f3;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .warning {
            background: #fff8e1;
            border: 1px solid #ffcc02;
            border-left: 4px solid #ff9800;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        ul, ol {
            margin: 15px 0;
            padding-left: 25px;
        }
        li {
            margin: 8px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        th {
            background: #667eea;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }
        td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
        }
        tr:nth-child(even) {
            background: #f9f9f9;
        }
        .footer {
            text-align: center;
            margin-top: 50px;
            padding: 30px;
            background: #f8f9ff;
            border-radius: 15px;
            border: 1px solid #e3f2fd;
        }
        .footer h3 {
            color: #667eea;
            margin-bottom: 15px;
        }
        .footer p {
            margin: 5px 0;
            color: #666;
        }
        code {
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
        }
        strong {
            color: #333;
            font-weight: 600;
        }
        em {
            color: #667eea;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧬 SKZ PEPTIDES</h1>
        <p>Premium Research Materials & Protocols</p>
    </div>
    
    <div class="content">
        ${content}
    </div>
    
    <div class="footer">
        <h3>SKZ Peptides - Professional Research Support</h3>
        <p><strong>📧 Email:</strong> support@skzpeptides.com</p>
        <p><strong>📱 Telegram:</strong> @nadojiken</p>
        <p><strong>🌐 Website:</strong> skzpeptides.com</p>
        <p style="margin-top: 20px; font-size: 0.9em; color: #999;">
            Generated: ${new Date().toLocaleDateString()} | Protocol Version 1.0
        </p>
    </div>
</body>
</html>`;

  // Get markdown files
  const protocolFiles = fs.readdirSync(protocolsDir)
    .filter(file => file.endsWith('.md'));

  console.log('🔄 Converting protocols to PDF...\n');

  protocolFiles.forEach(file => {
    const inputPath = path.join(protocolsDir, file);
    const outputName = file.replace('.md', '.pdf');
    const htmlName = file.replace('.md', '.html');
    const outputPath = path.join(outputDir, outputName);
    const htmlPath = path.join(outputDir, htmlName);

    console.log(`📄 Converting ${file} to ${outputName}...`);

    try {
      // Read markdown
      let content = fs.readFileSync(inputPath, 'utf-8');

      // Convert markdown to HTML using pandoc
      const tempMdPath = `temp_${file}`;
      fs.writeFileSync(tempMdPath, content);

      // Convert MD to HTML first
      const htmlContent = execSync(`pandoc "${tempMdPath}" -t html`, { encoding: 'utf-8' });

      // Extract title
      const title = file.replace('.md', '').split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');

      // Create full HTML with styling
      const fullHtml = htmlTemplate(htmlContent, title);
      fs.writeFileSync(htmlPath, fullHtml);

      // Convert HTML to PDF using pandoc
      execSync(`pandoc "${htmlPath}" --pdf-engine=weasyprint -o "${outputPath}" 2>/dev/null || \
                pandoc "${htmlPath}" --pdf-engine=prince -o "${outputPath}" 2>/dev/null || \
                pandoc "${htmlPath}" -t html5 --standalone -o "${outputPath.replace('.pdf', '_fallback.html')}"`, 
                { stdio: 'inherit' });

      // Cleanup
      fs.unlinkSync(tempMdPath);

      console.log(`✅ Successfully converted ${file}`);
    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
    }
  });

  console.log('\n🎉 Protocol conversion complete!');
  console.log(`📁 Files saved to: ${outputDir}`);
};

convertToPDF();
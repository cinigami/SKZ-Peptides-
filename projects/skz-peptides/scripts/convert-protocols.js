const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Protocol conversion script
const protocolsDir = 'protocols';
const outputDir = 'frontend/public/protocols/pdf';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// CSS for professional PDF styling
const pdfCSS = `
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  color: #667eea;
  border-bottom: 3px solid #667eea;
  padding-bottom: 10px;
  margin-bottom: 30px;
  font-size: 2.5em;
}

h2 {
  color: #667eea;
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 1.5em;
  border-left: 4px solid #667eea;
  padding-left: 15px;
}

h3 {
  color: #4facfe;
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 1.2em;
}

h4 {
  color: #666;
  margin-top: 20px;
  margin-bottom: 8px;
  font-size: 1.1em;
}

.header-logo {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.protocol-info {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.warning-box {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-left: 4px solid #f39c12;
  border-radius: 5px;
  padding: 15px;
  margin: 20px 0;
}

.info-box {
  background-color: #e7f3ff;
  border: 1px solid #b8daff;
  border-left: 4px solid #007bff;
  border-radius: 5px;
  padding: 15px;
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #667eea;
  color: white;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

ul, ol {
  margin: 15px 0;
  padding-left: 30px;
}

li {
  margin: 5px 0;
}

code {
  background-color: #f4f4f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 2px solid #667eea;
  color: #666;
  font-size: 0.9em;
}

.page-break {
  page-break-before: always;
}

@media print {
  body { margin: 0; }
  .header-logo { 
    background: #667eea !important;
    -webkit-print-color-adjust: exact;
  }
}
`;

// Save CSS file
fs.writeFileSync('protocol-style.css', pdfCSS);

// Get all markdown files
const protocolFiles = fs.readdirSync(protocolsDir)
  .filter(file => file.endsWith('.md'));

console.log('🔄 Converting protocols to PDF...\n');

protocolFiles.forEach(file => {
  const inputPath = path.join(protocolsDir, file);
  const outputName = file.replace('.md', '.pdf');
  const outputPath = path.join(outputDir, outputName);

  console.log(`📄 Converting ${file} to ${outputName}...`);

  try {
    // Add SKZ Peptides branding to markdown
    let content = fs.readFileSync(inputPath, 'utf-8');
    
    // Add professional header
    const brandedContent = `
<div class="header-logo">
  <h1>🧬 SKZ PEPTIDES</h1>
  <p>Premium Research Materials</p>
</div>

${content}

<div class="footer">
  <p><strong>SKZ Peptides - Premium Research Materials</strong></p>
  <p>📧 support@skzpeptides.com | 📱 Telegram: @nadojiken</p>
  <p>🌐 skzpeptides.com | Professional Peptide Research Supplies</p>
</div>
`;

    // Save temporary branded markdown
    const tempMdPath = `temp_${file}`;
    fs.writeFileSync(tempMdPath, brandedContent);

    // Convert to PDF using pandoc
    const pandocCommand = `pandoc "${tempMdPath}" \
      --pdf-engine=wkhtmltopdf \
      --css=protocol-style.css \
      --standalone \
      --metadata title="SKZ Peptides Research Protocol" \
      --metadata author="SKZ Peptides" \
      --metadata date="${new Date().toLocaleDateString()}" \
      --output="${outputPath}"`;

    execSync(pandocCommand, { stdio: 'inherit' });

    // Cleanup temp file
    fs.unlinkSync(tempMdPath);

    console.log(`✅ Successfully converted ${file}`);
  } catch (error) {
    console.error(`❌ Error converting ${file}:`, error.message);
  }
});

// Cleanup CSS file
fs.unlinkSync('protocol-style.css');

console.log('\n🎉 Protocol conversion complete!');
console.log(`📁 PDFs saved to: ${outputDir}`);
console.log('📄 Available protocols:');
protocolFiles.forEach(file => {
  const pdfName = file.replace('.md', '.pdf');
  console.log(`   • ${pdfName}`);
});
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🤗 Hugging Face Token Setup');
console.log('============================');
console.log('');
console.log('To use the AI chatbot with Hugging Face API, you need a Hugging Face token.');
console.log('');
console.log('1. Go to https://huggingface.co/settings/tokens');
console.log('2. Create a new token with "Read" permissions');
console.log('3. Copy the token and paste it below');
console.log('');

rl.question('Enter your Hugging Face token (or press Enter to skip): ', (token) => {
  if (token.trim()) {
    // Read the current .env file
    const envPath = path.join(__dirname, '.env');
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    } else {
      // Create from env.example if .env doesn't exist
      const envExamplePath = path.join(__dirname, 'env.example');
      if (fs.existsSync(envExamplePath)) {
        envContent = fs.readFileSync(envExamplePath, 'utf8');
      }
    }
    
    // Update or add the HF_TOKEN
    if (envContent.includes('HF_TOKEN=')) {
      envContent = envContent.replace(/HF_TOKEN=.*/, `HF_TOKEN=${token.trim()}`);
    } else {
      envContent += `\n# Hugging Face Configuration\nHF_TOKEN=${token.trim()}\n`;
    }
    
    // Write the updated .env file
    fs.writeFileSync(envPath, envContent);
    
    console.log('');
    console.log('✅ Hugging Face token configured successfully!');
    console.log('🔄 Please restart your backend server to use the AI features.');
  } else {
    console.log('');
    console.log('⚠️  Skipping Hugging Face token setup.');
    console.log('💡 The chatbot will use fallback responses without AI integration.');
    console.log('🔄 You can run this script again later to add your token.');
  }
  
  rl.close();
});

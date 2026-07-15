const fs = require('fs');

const files = [
  'src/routes/auth.tsx',
  'src/routes/onboarding.tsx',
  'src/routes/superadmin.tsx',
  'src/routes/index.tsx',
  'src/components/layout/SplashScreen.tsx',
  'src/components/layout/TopNav.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/wellwork-logo-mark\.jpg/g, 'wellwork-logo-mark.png');
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}

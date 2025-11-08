import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the design tokens JSON file
const tokensPath = path.join(__dirname, '..', 'designTokens.json');
const outputPath = path.join(__dirname, '..', 'src', 'styles.generated.css');

interface ColorToken {
  type: string;
  value: string;
  description?: string;
}

interface TokenGroup {
  [key: string]: ColorToken | TokenGroup | any;
}

function generateCSSVariables(tokens: TokenGroup, prefix = ''): string[] {
  const variables: string[] = [];

  for (const [key, value] of Object.entries(tokens)) {
    const cssKey = prefix ? `${prefix}-${key}` : key;
    
    if (value && typeof value === 'object') {
      if (value.type === 'color' && value.value) {
        variables.push(`  --color-${cssKey}: ${value.value};`);
      } else if (value.type === 'dimension' && value.value !== undefined) {
        variables.push(`  --${cssKey}: ${value.value}px;`);
      } else if (value.type === 'number' && value.value !== undefined) {
        variables.push(`  --${cssKey}: ${value.value};`);
      } else if (!value.type && !value.value && typeof value === 'object') {
        // It's a nested group
        variables.push(...generateCSSVariables(value, cssKey));
      }
    }
  }

  return variables;
}

try {
  const tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
  
  let cssContent = '/* Auto-generated from designTokens.json */\n';
  cssContent += '@import "tailwindcss";\n\n';
  cssContent += '@theme {\n';
  
  const variables = generateCSSVariables(tokensData);
  cssContent += variables.join('\n');
  
  cssContent += '\n}\n';
  
  fs.writeFileSync(outputPath, cssContent, 'utf-8');
  console.log('✓ Generated styles.generated.css from designTokens.json');
} catch (error) {
  console.error('Error generating CSS from design tokens:', error);
  process.exit(1);
}


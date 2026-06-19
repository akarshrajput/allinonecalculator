import fs from 'fs';
import path from 'path';
import { loadEnvConfig } from '@next/env';

// Load environment variables from .env.local
loadEnvConfig(path.join(__dirname, '..'));

import { CALCULATORS } from '../src/lib/calculatorData';
import connectToDatabase from '../src/lib/mongodb';
import { BlogPost } from '../src/models/BlogPost';

const outputPath = path.join(__dirname, '../public/llms.txt');

// State sub-calculators for Mortgage
const STATES = [
  { slug: 'idaho', name: 'Idaho', avgTax: '3500', avgPrice: '450000' },
  { slug: 'montana', name: 'Montana', avgTax: '3100', avgPrice: '430000' },
  { slug: 'nebraska', name: 'Nebraska', avgTax: '4200', avgPrice: '280000' },
  { slug: 'alaska', name: 'Alaska', avgTax: '3800', avgPrice: '350000' }
];

async function generate() {
  try {
    // Fetch blog posts if database connection works
    let blogPosts: any[] = [];
    try {
      await connectToDatabase();
      blogPosts = await BlogPost.find({}).lean();
    } catch (dbErr) {
      console.warn('Could not connect to database to fetch blog posts, skipping blogs:', dbErr);
    }

    // Group calculators by category
    const categoriesMap: Record<string, typeof CALCULATORS> = {};
    CALCULATORS.forEach(calc => {
      if (!categoriesMap[calc.category]) {
        categoriesMap[calc.category] = [];
      }
      categoriesMap[calc.category].push(calc);
    });

    // Build the llms.txt markdown content
    let markdown = `# All In One Calculator

Welcome to All In One Calculator (https://www.allinonecalculator.fun), a comprehensive repository of fast, accurate, and free online calculators. The calculators run client-side in the user's browser, requiring no registration, fees, or account creation.

This document serves as an LLM-friendly directory of all available calculation tools, grouped by category, including their metadata, primary keywords, and synonym search keywords.

## Categories & Calculators

`;

    const categoryNames: Record<string, string> = {
      finance: 'Finance & Business Calculators',
      health: 'Health & Fitness Calculators',
      math: 'Math & Time Calculators',
      conversion: 'Unit Conversion & Utility Calculators',
      home: 'Home & Everyday Calculators'
    };

    Object.keys(categoriesMap).forEach(cat => {
      const title = categoryNames[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1));
      markdown += `### ${title}\n\n`;

      categoriesMap[cat].forEach(calc => {
        markdown += `#### ${calc.title}\n`;
        markdown += `- **URL**: https://www.allinonecalculator.fun/${calc.slug}\n`;
        markdown += `- **Description**: ${calc.metaDescription}\n`;
        markdown += `- **Primary Keyword**: ${calc.primaryKeyword}\n`;
        if (calc.keywords && calc.keywords.length > 0) {
          markdown += `- **Keywords / Search Synonyms**: ${calc.keywords.join(', ')}\n`;
        }
        
        // Append state sub-calculators for Mortgage Calculator
        if (calc.slug === 'mortgage-calculator') {
          markdown += `- **State-Specific Sub-Calculators**:\n`;
          STATES.forEach(state => {
            markdown += `  - [${state.name} Mortgage Calculator](https://www.allinonecalculator.fun/mortgage-calculator/${state.slug}): Estimate your monthly mortgage payments in ${state.name} with local property taxes.\n`;
          });
        }
        
        markdown += `\n`;
      });
    });

    // Append Blog Posts Section
    if (blogPosts.length > 0) {
      markdown += `## Blog Articles & Guides\n\n`;
      blogPosts.forEach(post => {
        markdown += `### ${post.title}\n`;
        markdown += `- **URL**: https://www.allinonecalculator.fun/blog/${post.slug}\n`;
        markdown += `- **Description**: ${post.metaDescription}\n`;
        if (post.relatedCalculators && post.relatedCalculators.length > 0) {
          markdown += `- **Related Tools**: ${post.relatedCalculators.join(', ')}\n`;
        }
        markdown += `\n`;
      });
    }

    fs.writeFileSync(outputPath, markdown, 'utf8');
    console.log('Successfully generated public/llms.txt with all keywords from all calculators.');

  } catch (error) {
    console.error('Error generating llms.txt:', error);
    process.exit(1);
  }
}

generate();

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { BlogPost } from '@/models/BlogPost';

const articles = [
  {
    slug: 'how-to-calculate-exact-take-home-pay-2024',
    title: 'How to Calculate Your Exact Take-Home Pay in 2024',
    metaTitle: 'How to Calculate Your Exact Take-Home Pay in 2024 | All In One Calculator',
    metaDescription: 'A comprehensive guide on understanding Federal brackets, FICA taxes, and pre-tax deductions to calculate your exact net salary.',
    content: `
      <p>Understanding exactly how much money will land in your bank account every paycheck is crucial for effective budgeting and financial planning. However, with the complex web of federal brackets, state taxes, FICA contributions, and employer deductions, figuring out your net salary can feel like advanced calculus.</p>
      
      <h2>1. Gross vs. Net Pay</h2>
      <p>Your <strong>Gross Pay</strong> is the total amount you earn before any taxes or deductions are removed. If you are offered a $75,000 salary, that is your gross pay. Your <strong>Net Pay</strong> (or "take-home pay") is what you actually receive on payday.</p>

      <h2>2. Federal Income Tax Brackets</h2>
      <p>The United States uses a progressive tax system. This means your entire income isn't taxed at one single rate. Instead, it is divided into chunks (brackets), and each chunk is taxed at a progressively higher rate. For 2024, the brackets range from 10% to 37%.</p>
      
      <h2>3. FICA Taxes (Social Security & Medicare)</h2>
      <p>Regardless of what state you live in, the federal government requires FICA taxes. You contribute 6.2% of your gross earnings to Social Security (up to a specific wage base limit, which is $168,600 in 2024) and 1.45% to Medicare.</p>

      <h2>4. State and Local Taxes</h2>
      <p>Depending on where you live, state income tax can drastically alter your take-home pay. States like Texas, Florida, and Nevada have 0% state income tax, while California and New York have some of the highest rates in the country.</p>
      
      <h2>5. Pre-Tax Deductions</h2>
      <p>Contributions to traditional 401(k) plans, Health Savings Accounts (HSAs), and certain health insurance premiums are deducted from your gross pay <em>before</em> taxes are calculated. This lowers your taxable income, saving you money on taxes!</p>

      <p>Rather than doing this math by hand, the fastest way to see your exact paycheck is to use our <a href="/salary-calculator">Free Salary Calculator</a>. Simply enter your gross salary, state, and any deductions, and it will give you a precise breakdown of your weekly, bi-weekly, and monthly net pay.</p>
    `,
    relatedCalculators: ['salary-calculator', 'percentage-calculator'],
    publishedAt: new Date(),
    updatedAt: new Date()
  },
  {
    slug: 'understanding-the-50-30-20-budgeting-rule',
    title: 'Understanding the 50/30/20 Budgeting Rule',
    metaTitle: 'Understanding the 50/30/20 Budgeting Rule for Beginners | All In One Calculator',
    metaDescription: 'Learn how to apply the popular 50/30/20 budgeting rule to your net income to build wealth, pay off debt, and enjoy life.',
    content: `
      <p>Budgeting doesn't have to mean tracking every single penny on a complex spreadsheet. One of the most popular and straightforward methods for managing personal finances is the <strong>50/30/20 Rule</strong>, popularized by Senator Elizabeth Warren in her book <em>All Your Worth</em>.</p>

      <h2>How the 50/30/20 Rule Works</h2>
      <p>The rule provides a simple framework for dividing up your <strong>after-tax (net) income</strong> into three distinct categories:</p>

      <h3>1. 50% for Needs</h3>
      <p>Half of your take-home pay should cover your absolute necessities. These are the bills you must pay and the things necessary for survival. Needs typically include:</p>
      <ul>
        <li>Rent or Mortgage payments</li>
        <li>Groceries (basic food, not dining out)</li>
        <li>Utilities (water, electricity, gas)</li>
        <li>Minimum loan payments (car loans, student loans)</li>
        <li>Health care and insurance premiums</li>
      </ul>

      <h3>2. 30% for Wants</h3>
      <p>This category is for the non-essentials—the things that enhance your lifestyle but aren't strictly necessary for survival. Wants might include:</p>
      <ul>
        <li>Dining out and ordering takeout</li>
        <li>Entertainment (movies, concerts, subscriptions like Netflix)</li>
        <li>Vacations and travel</li>
        <li>Hobbies and gym memberships</li>
      </ul>

      <h3>3. 20% for Savings and Debt Payoff</h3>
      <p>The final 20% is the engine of your financial future. This money should be directed toward building wealth and aggressively eliminating high-interest debt. This includes:</p>
      <ul>
        <li>Emergency fund contributions</li>
        <li>Retirement investments (IRAs, 401(k) matches)</li>
        <li>Extra payments on credit cards or loans</li>
      </ul>

      <h2>Tools to Help You Succeed</h2>
      <p>To implement this effectively, you first need to know your exact after-tax income using a <a href="/salary-calculator">Salary Calculator</a>. Once you have your baseline, you can use our <a href="/debt-payoff-calculator">Debt Payoff Calculator</a> to strategize the 20% savings/debt portion, or the <a href="/retirement-calculator">Retirement Calculator</a> to see how that 20% will compound over decades.</p>
    `,
    relatedCalculators: ['salary-calculator', 'debt-payoff-calculator', 'retirement-calculator', 'compound-interest-calculator'],
    publishedAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000)
  },
  {
    slug: 'bmi-vs-body-fat-percentage-which-is-better',
    title: 'BMI vs Body Fat Percentage: Which is a Better Metric?',
    metaTitle: 'BMI vs Body Fat Percentage: Which is Better? | All In One Calculator',
    metaDescription: 'Is BMI outdated? Discover the differences between Body Mass Index and Body Fat Percentage, and find out which health metric you should actually be tracking.',
    content: `
      <p>For decades, doctors and health professionals have relied on <strong>BMI (Body Mass Index)</strong> to quickly assess whether a patient is underweight, at a healthy weight, overweight, or obese. But in recent years, fitness experts have increasingly pointed to <strong>Body Fat Percentage</strong> as a vastly superior metric. So, what's the difference?</p>

      <h2>What is BMI?</h2>
      <p>BMI is a simple mathematical formula developed in the 1830s. It calculates a number based purely on your height and weight. Because it only requires a scale and a measuring tape, it is incredibly easy to calculate.</p>
      <p><strong>The Flaw:</strong> BMI cannot distinguish between fat and muscle. Muscle is much denser than fat. As a result, a highly muscular athlete with very little body fat could weigh enough to be classified as "Obese" on a BMI chart. Conversely, someone with very low muscle mass but a high amount of visceral fat might score a "Healthy" BMI.</p>
      <p>You can check your current BMI using our <a href="/bmi-calculator">Free BMI Calculator</a>.</p>

      <h2>What is Body Fat Percentage?</h2>
      <p>Body Fat Percentage is exactly what it sounds like: the percentage of your total body weight that consists of fat tissue. Everything else—muscle, bones, organs, water—is considered "Lean Body Mass."</p>
      <p><strong>The Benefit:</strong> This metric gives a much more accurate picture of metabolic health. A healthy body fat percentage generally ranges from 10-20% for men and 20-30% for women. Knowing this number helps you determine whether your weight loss efforts are actually burning fat or just shedding water and muscle.</p>

      <h2>How Do I Measure Them?</h2>
      <p>While getting a DEXA scan is the most accurate way to measure body fat, you can get a very good estimate at home using a tape measure and the U.S. Navy Method. You can calculate this instantly using our <a href="/body-fat-calculator">Body Fat Calculator</a>.</p>
      
      <h2>The Verdict</h2>
      <p>BMI is a decent, quick population-level screening tool, but it fails on an individual level for many people. If you are serious about your health and fitness journey, tracking your Body Fat Percentage—and adjusting your macros with a <a href="/tdee-calculator">TDEE Calculator</a>—will yield far better, more accurate results.</p>
    `,
    relatedCalculators: ['bmi-calculator', 'body-fat-calculator', 'tdee-calculator', 'ideal-weight-calculator'],
    publishedAt: new Date(Date.now() - 172800000), // 2 days ago
    updatedAt: new Date(Date.now() - 172800000)
  }
];

export async function GET() {
  try {
    await connectToDatabase();

    // Clear existing posts to prevent duplicates during development
    await BlogPost.deleteMany({});

    // Insert new posts
    const inserted = await BlogPost.insertMany(articles);

    return NextResponse.json({
      message: 'Successfully seeded database with blog posts',
      count: inserted.length,
      posts: inserted.map(p => p.slug)
    }, { status: 200 });

  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

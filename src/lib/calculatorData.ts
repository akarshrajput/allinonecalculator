export interface CalculatorData {
  slug: string;
  title: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  keywords: string[];
  relatedCalculators: string[];
  hasStateSubs?: boolean;
  faqQuestions: string[];
  ogTitle?: string;
  ogDescription?: string;
}

export const CALCULATORS: CalculatorData[] = [
  {
    slug: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    category: 'finance',
    metaTitle: 'Mortgage Calculator — Estimate Monthly Payment | All In One Calculator',
    metaDescription: 'Use our free mortgage calculator to estimate your monthly payment, mortgage insurance, and amortization. Compare options like a biweekly mortgage, recast scenarios, or mobile home financing.',
    h1: 'Mortgage Calculator',
    primaryKeyword: 'mortgage calculator',
    keywords: [
      'reverse mortgage calculator', 'dave ramsey mortgage calculator', 'mortgage calculator games',
      'mortgage calculator nc', 'mortgage recast calculator', 'mortgage calculator colorado',
      'mortgage calculator ga', 'mortgage calculator ma', 'recast mortgage calculator',
      'mobile home mortgage calculator', 'mortgage calculator oregon', 'dave ramsey mortgage payoff calculator',
      'mortgage calculator ramsey', 'mortgage calculator sc', 'mortgage calculator wi',
      'mortgage insurance calculator', 'calculate reverse mortgage', 'manufactured home mortgage calculator',
      'mortgage calculator ct', 'mortgage calculator georgia', 'mortgage calculator idaho',
      'mortgage calculator oklahoma', 'mortgage calculator wisconsin', 'biweekly mortgage calculator',
      'mortgage calculator alabama', 'mortgage calculator arkansas', 'mortgage calculator dave ramsey',
      'mortgage calculator washington state', 'reverse mortgage calculator without personal information'
    ],
    relatedCalculators: ['loan-calculator', 'compound-interest-calculator', 'debt-payoff-calculator', 'retirement-calculator'],
    hasStateSubs: true,
    faqQuestions: [
      'How does the Dave Ramsey mortgage calculator strategy work?',
      'Can I use this as a mobile home or manufactured home mortgage calculator?',
      'How does a biweekly mortgage calculator save money?',
      'What is a mortgage recast calculator used for?',
      'Does this include a mortgage insurance calculator?'
    ],
    ogTitle: 'Free Mortgage Calculator — Estimate Your Monthly Payment',
    ogDescription: 'Calculate your monthly mortgage payment including principal, interest, taxes, and insurance. Free tool with full amortization schedule.'
  },
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    category: 'math',
    metaTitle: 'Percentage Calculator — Find Percentages Instantly | All In One Calculator',
    metaDescription: 'Free online percentage calculator. Calculate percentages, percent changes, and fractions with step-by-step explanations.',
    h1: 'Percentage Calculator',
    primaryKeyword: 'percentage calculator',
    keywords: ['percentage calculator', 'percent calculator', 'percentage change calculator', 'how to calculate percentage'],
    relatedCalculators: ['fraction-calculator', 'scientific-calculator', 'unit-converter'],
    hasStateSubs: false,
    faqQuestions: [
      'How do I calculate a percentage of a number?',
      'What is the formula for percentage change?',
      'How do I convert a fraction to a percentage?'
    ],
    ogTitle: 'Percentage Calculator — Fast & Free Online Tool',
    ogDescription: 'Calculate percentages instantly with our free online percentage calculator. Shows step-by-step math for easy understanding.'
  },
  {
    slug: 'bmi-calculator',
    title: 'BMI Calculator',
    category: 'health',
    metaTitle: 'BMI Calculator — Check Your Body Mass Index | All In One Calculator',
    metaDescription: 'Free BMI calculator for men, women, and children. Calculate your Body Mass Index and see your healthy weight range.',
    h1: 'BMI Calculator',
    primaryKeyword: 'bmi calculator',
    keywords: ['bmi calculator', 'body mass index calculator', 'bmi calculator for women', 'bmi chart'],
    relatedCalculators: ['calorie-calculator', 'tdee-calculator', 'ideal-weight-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'What is a healthy BMI?',
      'How is BMI calculated?',
      'Is BMI accurate for athletes?'
    ],
    ogTitle: 'BMI Calculator — Free Body Mass Index Check',
    ogDescription: 'Calculate your BMI instantly. Find out if you are at a healthy weight and see your personalized weight range.'
  },
  {
    slug: 'age-calculator',
    title: 'Age Calculator',
    category: 'math',
    metaTitle: 'Age Calculator — How Old Am I? | All In One Calculator',
    metaDescription: 'Use our age calculator to find out exactly how old you are in years, months, and days. Countdown to your next birthday.',
    h1: 'Age Calculator',
    primaryKeyword: 'age calculator',
    keywords: ['age calculator', 'how old am I calculator', 'birthday calculator'],
    relatedCalculators: ['percentage-calculator', 'date-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How does the age calculator work?',
      'How do I calculate age in days?'
    ]
  },
  {
    slug: 'reverse-mortgage-calculator',
    title: 'Reverse Mortgage Calculator',
    category: 'finance',
    metaTitle: 'Reverse Mortgage Calculator — See If You Qualify | All In One Calculator',
    metaDescription: 'Use our free reverse mortgage calculator without personal information to calculate reverse mortgage payouts, jumbo loan limits, and FHA requirements.',
    h1: 'Reverse Mortgage Calculator',
    primaryKeyword: 'reverse mortgage calculator',
    keywords: [
      'reverse mortgage calculator', 'calculate reverse mortgage', 'reverse mortgage calculator without personal information',
      'reverse mortgage loan calculation', 'free reverse mortgage calculator', 'reverse mortgage calculator no personal information',
      'reverse mortgage calculators', 'calculating reverse mortgage', 'jumbo reverse mortgage calculator',
      'reverse mortgage calculator no personal info', 'reverse mortgage payment calculator', 'reverse mortgages calculator',
      'mortgage reverse calculator', 'reverse mortgage loan calculator', 'reverse mortgage purchase calculator',
      'reverse mortgage purchase down payment calculator', 'calculator for reverse mortgage', 'calculate a reverse mortgage',
      'calculator reverse mortgage', 'fha reverse mortgage calculator', 'mortgage calculator reverse',
      'reverse mortgage amortization calculator'
    ],
    relatedCalculators: ['mortgage-calculator', 'retirement-calculator', 'loan-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How does a reverse mortgage calculator without personal information work?',
      'Can I use this as an FHA reverse mortgage calculator?',
      'Is there a reverse mortgage purchase down payment calculator?',
      'How do I calculate a reverse mortgage amortization schedule?',
      'What is a jumbo reverse mortgage calculator?'
    ],
    ogTitle: 'Free Reverse Mortgage Calculator',
    ogDescription: 'Estimate your reverse mortgage payout options instantly without entering personal contact information.'
  },
  {
    slug: 'loan-calculator',
    title: 'Loan Calculator',
    category: 'finance',
    metaTitle: 'Loan Calculator — Estimate Monthly Payments & Interest | All In One Calculator',
    metaDescription: 'Free online loan calculator. Estimate monthly payments and interest for farm loans, bridge loans, equipment financing, or credit union loans.',
    h1: 'Loan Calculator',
    primaryKeyword: 'loan calculator',
    keywords: [
      'mobile home loan calculator', 'farm loan calculator', 'myusfinance personal loan calculator', 'bridge loan calculator',
      'equipment loan calculator', 'fico loan savings calculator', 'hard money loan calculator', 'myusfinance loan calculator',
      'tsp loan calculator', 'car loan calculator refinance', 'maryland mortgage loan calculator', 'parent plus loan calculator',
      'reverse mortgage loan calculation', 'manufactured home loan calculator', 'arm loan calculator', 'car loan calculator suncoast',
      'credit union loan calculator', 'loan recast calculator', 'sba loan payment calculator'
    ],
    relatedCalculators: ['mortgage-calculator', 'debt-payoff-calculator', 'compound-interest-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How do I calculate an SBA loan payment or farm loan?',
      'Can I use this for a bridge loan or hard money loan calculator?',
      'How do I estimate a parent plus loan or TSP loan payment?',
      'Does this work as an equipment loan calculator?'
    ],
    ogTitle: 'Free Loan Calculator — Estimate Your Payments',
    ogDescription: 'Estimate your monthly loan payments and see the total interest cost over the life of your loan.'
  },
  {
    slug: 'retirement-calculator',
    title: 'Retirement Calculator',
    category: 'finance',
    metaTitle: 'Retirement Calculator — Plan Your Financial Future | All In One Calculator',
    metaDescription: 'Use our free retirement calculator to find out how long your retirement savings will last. Calculate withdrawals, distributions, and required income.',
    h1: 'Retirement Calculator',
    primaryKeyword: 'retirement calculator',
    keywords: [
      'dave ramsey retirement calculator', 'retirement withdrawal calculator', 'trs retirement calculator',
      'how long will my retirement savings last calculator', 'how long will retirement savings last calculator',
      'retirement calculator dave ramsey', 'retirement calculator fers employees', 'myusfinance retirement calculator',
      'retirement distribution calculator', 'calstrs retirement calculator', 'how long will my money last in retirement calculator',
      'reserve retirement calculator', 'retirement drawdown calculator', 'taxes on retirement income calculator',
      'teacher retirement calculator', 'dave ramsey calculator retirement', 'edward jones retirement calculator',
      'fers calculator retirement', 'tsp retirement calculator', 'federal retirement calculator fers', 'psers retirement calculator'
    ],
    relatedCalculators: ['compound-interest-calculator', 'salary-calculator', 'mortgage-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How long will my retirement savings last calculator?',
      'Can I use this as a TRS retirement calculator or FERS calculator?',
      'How do you calculate taxes on retirement income?',
      'How does a retirement distribution calculator work?'
    ],
    ogTitle: 'Free Retirement Planner & Calculator',
    ogDescription: 'Project your retirement savings and estimated monthly income with our easy-to-use retirement calculator.'
  },
  {
    slug: 'debt-payoff-calculator',
    title: 'Debt Payoff Calculator',
    category: 'finance',
    metaTitle: 'Debt Payoff Calculator — Snowball vs Avalanche | All In One Calculator',
    metaDescription: 'Free debt payoff calculator. Easily calculate your debt snowball payoff plan without an excel or google sheets spreadsheet. Track your credit card debt payoff strategy.',
    h1: 'Debt Payoff Calculator',
    primaryKeyword: 'debt payoff calculator',
    keywords: [
      'credit card debt calculator payoff', 'debt payoff calculator excel', 'dave ramsey debt payoff calculator',
      'debt payoff calculator google sheets', 'debt payoff snowball calculator spreadsheet', 'ramit debt payoff calculator',
      'ramit sethi debt payoff calculator', 'ramsey debt payoff calculator', 'debt payoff calculator ramit',
      'debt snowball payoff calculator', 'debt payoff calculator dave ramsey', 'debt payoff calculator spreadsheet',
      'debt payoff snowball calculator'
    ],
    relatedCalculators: ['loan-calculator', 'mortgage-calculator', 'compound-interest-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How does the Dave Ramsey debt payoff calculator method work?',
      'Is there a debt payoff snowball calculator spreadsheet I can download?',
      'How does the Ramit Sethi debt payoff calculator approach differ?',
      'How do I calculate a credit card debt calculator payoff date?'
    ],
    ogTitle: 'Free Debt Payoff Calculator',
    ogDescription: 'Find out exactly when you will be debt-free using the snowball or avalanche method.'
  },
  {
    slug: 'mortgage-recast-calculator',
    title: 'Mortgage Recast Calculator',
    category: 'finance',
    metaTitle: 'Mortgage Recast Calculator — See Your New Monthly Payment | All In One Calculator',
    metaDescription: 'Free mortgage recast calculator with amortization. Recasting a mortgage lowers your monthly payment without refinancing. See your exact savings instantly.',
    h1: 'Mortgage Recast Calculator',
    primaryKeyword: 'mortgage recast calculator',
    keywords: [
      'mortgage recast calculator', 'recast mortgage calculator', 'recasting mortgage calculator',
      'mortgage recasting calculator', 'recast calculator mortgage', 'mortgage loan recast calculator',
      'recast mortgage payment calculator', 'mortgage recast calculator with amortization', 'mortgage calculator recast',
      'free mortgage recast calculator', 'mortgage recast calculator bankrate', 'mortgage recast calculator excel',
      'mortgage recast calculator free', 'recasting a mortgage calculator', 'mortgage recast payment calculator',
      'best mortgage recast calculator'
    ],
    relatedCalculators: ['mortgage-calculator', 'loan-calculator', 'debt-payoff-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How does a mortgage recast calculator with amortization work?',
      'Is it better to use a recast mortgage calculator or refinance?',
      'Can I download a mortgage recast calculator excel sheet?'
    ],
    ogTitle: 'Free Mortgage Recast Calculator',
    ogDescription: 'See how much your monthly payment will drop and how much interest you will save by recasting your mortgage.'
  },
  {
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    category: 'finance',
    metaTitle: 'Compound Interest Calculator — See Your Money Grow | All In One Calculator',
    metaDescription: 'Free compound interest calculator. Calculate how much your investments, CDs, and dividends will grow over time with withdrawals or increasing contributions.',
    h1: 'Compound Interest Calculator',
    primaryKeyword: 'compound interest calculator',
    keywords: [
      'cd compound interest calculator', 'compound interest calculator with withdrawals', 'excel calculate compound interest',
      'dividend compound interest calculator', 'certificate of deposit compound interest calculator', 'compound interest calculator excel',
      'dave ramsey compound interest calculator', 'money guy compound interest calculator', 'ramsey compound interest calculator',
      'compound interest calculator with increasing contributions', 'how to calculate compound interest in excel'
    ],
    relatedCalculators: ['retirement-calculator', 'loan-calculator', 'salary-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How to calculate compound interest in excel?',
      'How does a CD compound interest calculator work?',
      'Is there a compound interest calculator with increasing contributions?'
    ],
    ogTitle: 'Free Compound Interest Calculator',
    ogDescription: 'Watch your money grow! Calculate future investment values with our compound interest calculator.'
  },
  {
    slug: 'salary-calculator',
    title: 'Salary / Take Home Pay Calculator',
    category: 'finance',
    metaTitle: 'Salary Calculator — Take Home Pay & Tax Estimator | All In One Calculator',
    metaDescription: 'Free paycheck calculator. Estimate your net take-home pay after taxes across states like Texas, New York, Illinois, Georgia, and Michigan. Easily calculate a salary raise.',
    h1: 'Salary Calculator',
    primaryKeyword: 'salary calculator',
    keywords: [
      'new york salary calculator', 'salary calculator texas', 'salary increase calculator', 'nj salary calculator',
      'salary calculator illinois', 'calculating salaries payable', 'illinois salary calculator', 'salary raise calculator',
      'texas salary calculator', 'maryland salary calculator', 'nc salary calculator', 'aia salary calculator',
      'salary calculator michigan', 'salary calculator north carolina', 'salary calculator ohio', 'georgia salary calculator',
      'new jersey salary calculator', 'north carolina salary calculator', 'salary calculator georgia', 'washington salary calculator',
      'salary calculator colorado', 'salary calculator pa', 'virginia salary calculator', 'michigan salary calculator',
      'salary calculator va', 'salary calculator washington'
    ],
    relatedCalculators: ['retirement-calculator', 'compound-interest-calculator', 'loan-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How do I calculate a salary increase or raise?',
      'Can I use this as a Texas, New York, or Illinois salary calculator?',
      'How does an AIA salary calculator differ from standard take-home pay?',
      'How are salaries payable calculated for accounting?'
    ],
    ogTitle: 'Free Salary & Paycheck Calculator',
    ogDescription: 'Calculate your exact net take-home pay after taxes and deductions.'
  },
  {
    slug: 'calorie-calculator',
    title: 'Calorie Calculator',
    category: 'health',
    metaTitle: 'Calorie Calculator — Find Your Daily Caloric Needs | All In One Calculator',
    metaDescription: 'Free daily calorie calculator. Estimate how many calories you need to eat to maintain, lose, or gain weight based on your BMR and activity level.',
    h1: 'Calorie Calculator',
    primaryKeyword: 'calorie calculator',
    keywords: ['calorie calculator', 'daily calorie calculator', 'maintenance calories', 'calories for weight loss', 'bmr calorie calculator'],
    relatedCalculators: ['bmi-calculator', 'tdee-calculator', 'ideal-weight-calculator', 'body-fat-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How many calories should I eat to lose weight?',
      'What is BMR (Basal Metabolic Rate)?',
      'How accurate are calorie calculators?'
    ],
    ogTitle: 'Free Daily Calorie Calculator',
    ogDescription: 'Find out exactly how many calories you should eat per day to reach your weight goals.'
  },
  {
    slug: 'tdee-calculator',
    title: 'TDEE Calculator',
    category: 'health',
    metaTitle: 'TDEE Calculator — Total Daily Energy Expenditure & Macros | All In One Calculator',
    metaDescription: 'Calculate your TDEE (Total Daily Energy Expenditure) and get personalized macronutrient splits for bulking, cutting, or maintaining weight.',
    h1: 'TDEE Calculator',
    primaryKeyword: 'tdee calculator',
    keywords: ['tdee calculator', 'total daily energy expenditure', 'macro calculator', 'cutting macros'],
    relatedCalculators: ['calorie-calculator', 'bmi-calculator', 'ideal-weight-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'What is TDEE?',
      'How do I calculate my macros?',
      'Is TDEE the same as BMR?'
    ],
    ogTitle: 'Free TDEE & Macro Calculator',
    ogDescription: 'Calculate your Total Daily Energy Expenditure and get custom macronutrient splits.'
  },
  {
    slug: 'ideal-weight-calculator',
    title: 'Ideal Weight Calculator',
    category: 'health',
    metaTitle: 'Ideal Weight Calculator — Find Your Healthy Weight Range | All In One Calculator',
    metaDescription: 'Free ideal weight calculator based on height, gender, and age. Uses multiple formulas including Robinson, Miller, Devine, and Hamwi.',
    h1: 'Ideal Weight Calculator',
    primaryKeyword: 'ideal weight calculator',
    keywords: ['ideal weight calculator', 'healthy weight range', 'what should I weigh', 'ideal body weight'],
    relatedCalculators: ['bmi-calculator', 'calorie-calculator', 'tdee-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'What is an ideal weight?',
      'How is ideal weight calculated?',
      'Is ideal weight the same as healthy weight?'
    ],
    ogTitle: 'Free Ideal Weight Calculator',
    ogDescription: 'Find your healthy weight range instantly based on medical formulas.'
  },
  {
    slug: 'body-fat-calculator',
    title: 'Body Fat Calculator',
    category: 'health',
    metaTitle: 'Body Fat Calculator — Navy Method | All In One Calculator',
    metaDescription: 'Calculate your body fat percentage using the U.S. Navy method. Find out your lean mass and fat mass based on simple body measurements.',
    h1: 'Body Fat Calculator',
    primaryKeyword: 'body fat calculator',
    keywords: ['body fat calculator', 'navy body fat calculator', 'body fat percentage calculator', 'lean body mass calculator'],
    relatedCalculators: ['bmi-calculator', 'ideal-weight-calculator', 'tdee-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How do I calculate body fat?',
      'What is the U.S. Navy body fat formula?',
      'What is a healthy body fat percentage?'
    ],
    ogTitle: 'Free Body Fat Calculator',
    ogDescription: 'Calculate your exact body fat percentage using simple tape measurements.'
  },
  {
    slug: 'pregnancy-calculator',
    title: 'Pregnancy Calculator',
    category: 'health',
    metaTitle: 'Pregnancy Due Date Calculator — Find Your EDD | All In One Calculator',
    metaDescription: 'Free pregnancy due date calculator. Calculate your estimated due date, conception date, and current gestational age based on LMP, ultrasound, or IVF.',
    h1: 'Pregnancy Calculator',
    primaryKeyword: 'pregnancy calculator',
    keywords: ['pregnancy calculator', 'due date calculator', 'conception calculator', 'ivf due date calculator', 'gestational age calculator'],
    relatedCalculators: ['bmi-calculator', 'ideal-weight-calculator', 'age-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How is a due date calculated?',
      'How accurate is a due date calculator?',
      'How do I calculate IVF due date?'
    ],
    ogTitle: 'Free Pregnancy Due Date Calculator',
    ogDescription: 'Find your exact estimated due date, trimester, and conception date instantly.'
  },
  {
    slug: 'fraction-calculator',
    title: 'Fraction Calculator',
    category: 'math',
    metaTitle: 'Fraction Calculator — Add, Subtract, Multiply & Divide | All In One Calculator',
    metaDescription: 'Free online fraction calculator. Easily add, subtract, multiply, and divide fractions. Get simplified results, mixed numbers, and decimal equivalents.',
    h1: 'Fraction Calculator',
    primaryKeyword: 'fraction calculator',
    keywords: ['fraction calculator', 'adding fractions calculator', 'multiplying fractions calculator', 'mixed fraction calculator'],
    relatedCalculators: ['percentage-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How do you add fractions?',
      'How do you multiply fractions?',
      'How do you simplify a fraction?'
    ],
    ogTitle: 'Free Fraction Calculator',
    ogDescription: 'Solve any fraction problem instantly. Adds, subtracts, multiplies, and divides with full simplification.'
  },
  {
    slug: 'scientific-calculator',
    title: 'Scientific Calculator',
    category: 'math',
    metaTitle: 'Scientific Calculator — Free Online Math Tool | All In One Calculator',
    metaDescription: 'Free online scientific calculator with advanced math functions including sine, cosine, tangent, logarithms, roots, and more.',
    h1: 'Scientific Calculator',
    primaryKeyword: 'scientific calculator',
    keywords: ['scientific calculator', 'online calculator', 'math calculator', 'trigonometry calculator'],
    relatedCalculators: ['fraction-calculator', 'percentage-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'What is a scientific calculator used for?',
      'How do I calculate sine, cosine, and tangent?',
      'What is the difference between a standard and scientific calculator?'
    ],
    ogTitle: 'Free Online Scientific Calculator',
    ogDescription: 'Solve complex math equations directly in your browser.'
  },
  {
    slug: 'root-calculator',
    title: 'Square Root & Nth Root Calculator',
    category: 'math',
    metaTitle: 'Root Calculator — Square Root, Cube Root, Nth Root | All In One Calculator',
    metaDescription: 'Free root calculator. Quickly calculate the square root, cube root, or any nth root of a number online.',
    h1: 'Root Calculator',
    primaryKeyword: 'root calculator',
    keywords: ['root calculator', 'square root calculator', 'cube root calculator', 'nth root calculator'],
    relatedCalculators: ['scientific-calculator', 'fraction-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'What is a square root?',
      'How do you calculate a cube root?',
      'Can you find the root of a negative number?'
    ],
    ogTitle: 'Free Root Calculator',
    ogDescription: 'Calculate the square root, cube root, or any nth root instantly.'
  },
  {
    slug: 'factorial-calculator',
    title: 'Factorial Calculator',
    category: 'math',
    metaTitle: 'Factorial Calculator — Find n! Instantly | All In One Calculator',
    metaDescription: 'Free factorial calculator. Calculate the factorial of any non-negative integer quickly and easily.',
    h1: 'Factorial Calculator',
    primaryKeyword: 'factorial calculator',
    keywords: ['factorial calculator', 'n factorial calculator', 'math calculator'],
    relatedCalculators: ['scientific-calculator', 'percentage-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'What is a factorial?',
      'How do you calculate a factorial?',
      'What is the factorial of zero?'
    ],
    ogTitle: 'Free Factorial Calculator',
    ogDescription: 'Calculate any factorial (n!) instantly.'
  },
  {
    slug: 'length-converter',
    title: 'Length Converter',
    category: 'conversion',
    metaTitle: 'Length Converter — Convert Miles, Kilometers, Feet, Meters | All In One Calculator',
    metaDescription: 'Free online length converter. Instantly convert between miles, kilometers, meters, centimeters, inches, feet, and yards.',
    h1: 'Length Converter',
    primaryKeyword: 'length converter',
    keywords: ['length converter', 'miles to kilometers', 'inches to centimeters', 'feet to meters'],
    relatedCalculators: ['weight-converter', 'temperature-converter'],
    hasStateSubs: false,
    faqQuestions: [
      'How many miles are in a kilometer?',
      'How do I convert inches to centimeters?',
      'What is the metric system for length?'
    ],
    ogTitle: 'Free Length Unit Converter',
    ogDescription: 'Convert between any metric and imperial length units instantly.'
  },
  {
    slug: 'weight-converter',
    title: 'Weight Converter',
    category: 'conversion',
    metaTitle: 'Weight Converter — Lbs to Kg, Ounces to Grams | All In One Calculator',
    metaDescription: 'Free online weight and mass converter. Instantly convert between pounds, kilograms, ounces, grams, stones, and more.',
    h1: 'Weight Converter',
    primaryKeyword: 'weight converter',
    keywords: ['weight converter', 'lbs to kg', 'pounds to kilograms', 'ounces to grams'],
    relatedCalculators: ['length-converter', 'temperature-converter'],
    hasStateSubs: false,
    faqQuestions: [
      'How many pounds are in a kilogram?',
      'How do I convert ounces to grams?',
      'What is a stone in weight?'
    ],
    ogTitle: 'Free Weight Unit Converter',
    ogDescription: 'Convert between any metric and imperial weight units instantly.'
  },
  {
    slug: 'temperature-converter',
    title: 'Temperature Converter',
    category: 'conversion',
    metaTitle: 'Temperature Converter — Celsius to Fahrenheit | All In One Calculator',
    metaDescription: 'Free online temperature converter. Convert easily between Celsius, Fahrenheit, and Kelvin.',
    h1: 'Temperature Converter',
    primaryKeyword: 'temperature converter',
    keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'kelvin converter'],
    relatedCalculators: ['length-converter', 'weight-converter'],
    hasStateSubs: false,
    faqQuestions: [
      'How do you convert Celsius to Fahrenheit?',
      'What is absolute zero?',
      'What is the formula for Fahrenheit to Celsius?'
    ],
    ogTitle: 'Free Temperature Unit Converter',
    ogDescription: 'Convert between Celsius, Fahrenheit, and Kelvin instantly.'
  },
  {
    slug: 'area-converter',
    title: 'Area Converter',
    category: 'conversion',
    metaTitle: 'Area Converter — Convert Acres, Sq Ft, Sq Meters | All In One Calculator',
    metaDescription: 'Free online area converter. Instantly convert between acres, hectares, square meters, square feet, square miles, and more.',
    h1: 'Area Converter',
    primaryKeyword: 'area converter',
    keywords: ['area converter', 'acres to square feet', 'hectares to acres', 'square meters converter'],
    relatedCalculators: ['length-converter', 'volume-converter'],
    hasStateSubs: false,
    faqQuestions: [
      'How many square feet are in an acre?',
      'How many acres are in a hectare?',
      'How do you calculate square footage?'
    ],
    ogTitle: 'Free Area Unit Converter',
    ogDescription: 'Convert between any metric and imperial area units instantly.'
  },
  {
    slug: 'volume-converter',
    title: 'Volume Converter',
    category: 'conversion',
    metaTitle: 'Volume Converter — Liters, Gallons, Cups, Ounces | All In One Calculator',
    metaDescription: 'Free online volume converter. Instantly convert between liters, gallons, milliliters, cups, quarts, and fluid ounces.',
    h1: 'Volume Converter',
    primaryKeyword: 'volume converter',
    keywords: ['volume converter', 'liters to gallons', 'milliliters to cups', 'fluid ounces converter'],
    relatedCalculators: ['area-converter', 'length-converter'],
    hasStateSubs: false,
    faqQuestions: [
      'How many liters are in a gallon?',
      'How many cups are in a liter?',
      'What is the difference between US and UK gallons?'
    ],
    ogTitle: 'Free Volume Unit Converter',
    ogDescription: 'Convert between any metric and imperial volume units instantly.'
  },
  {
    slug: 'flooring-calculator',
    title: 'Flooring Calculator',
    category: 'home',
    metaTitle: 'Flooring Calculator — Estimate Materials & Cost | All In One Calculator',
    metaDescription: 'Free flooring calculator. Calculate the square footage of your room, add waste percentage, and estimate the total cost for hardwood, laminate, or tile.',
    h1: 'Flooring Calculator',
    primaryKeyword: 'flooring calculator',
    keywords: ['flooring calculator', 'square footage calculator', 'tile calculator', 'laminate flooring calculator'],
    relatedCalculators: ['area-converter', 'percentage-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How much extra flooring should I buy for waste?',
      'How do I calculate square footage of a room?',
      'How much does hardwood flooring cost per square foot?'
    ],
    ogTitle: 'Free Flooring Cost Calculator',
    ogDescription: 'Calculate the exact square footage and material cost for your flooring project.'
  },
  {
    slug: 'painting-calculator',
    title: 'Painting Calculator',
    category: 'home',
    metaTitle: 'Paint Calculator — How Much Paint Do I Need? | All In One Calculator',
    metaDescription: 'Free paint calculator. Estimate exactly how many gallons of paint you need for your room based on dimensions, doors, and windows.',
    h1: 'Painting Calculator',
    primaryKeyword: 'paint calculator',
    keywords: ['paint calculator', 'painting calculator', 'how much paint do I need', 'gallons of paint per room'],
    relatedCalculators: ['flooring-calculator', 'area-converter'],
    hasStateSubs: false,
    faqQuestions: [
      'How many square feet does a gallon of paint cover?',
      'Should I subtract doors and windows when calculating paint?',
      'Do I need two coats of paint?'
    ],
    ogTitle: 'Free Room Painting Calculator',
    ogDescription: 'Calculate exactly how many gallons or liters of paint you need.'
  },
  {
    slug: 'electricity-bill-calculator',
    title: 'Electricity Bill Calculator',
    category: 'home',
    metaTitle: 'Electricity Bill Calculator — Appliance Cost Calculator | All In One Calculator',
    metaDescription: 'Free electricity bill calculator. Estimate the daily, monthly, and yearly cost of running any home appliance based on its wattage and your electricity rates.',
    h1: 'Electricity Bill Calculator',
    primaryKeyword: 'electricity bill calculator',
    keywords: ['electricity bill calculator', 'appliance cost calculator', 'kWh calculator', 'energy cost calculator'],
    relatedCalculators: ['percentage-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How do I calculate electricity cost?',
      'What is a kWh?',
      'How much does a space heater cost to run?'
    ],
    ogTitle: 'Free Electricity Cost Calculator',
    ogDescription: 'Calculate the exact daily, monthly, and yearly cost of running any appliance.'
  },
  {
    slug: 'auto-loan-refinance-calculator',
    title: 'Auto Loan Refinance Calculator',
    category: 'finance',
    metaTitle: 'Auto Loan Refinance Calculator — See Your Savings | All In One Calculator',
    metaDescription: 'Use the best refinance auto loans calculator to see your savings. Compare credit union rates, factor in down payments, and lower your monthly car payment.',
    h1: 'Auto Loan Refinance Calculator',
    primaryKeyword: 'auto loan refinance calculator',
    keywords: [
      'refinance auto loan calculator', 'auto refinance loan calculator', 'refinance calculator auto loan',
      'loan refinance calculator auto', 'auto loan refinance payment calculator', 'auto loan refinance savings calculator',
      'auto car loan refinance calculator', 'auto loan refinance calculator comparison', 'auto loan refinance calculator credit union',
      'auto loan refinance calculators', 'auto loan refinance rates calculator', 'auto loan refinance calculator with credit score',
      'best refinance auto loans calculator', 'calculator auto loan refinance', 'refinance loan calculator auto',
      'refinance my auto loan calculator', 'auto loan refinance calculator with down payment', 'auto loan refinance rate calculator',
      'auto loans refinance calculator', 'loan calculator auto refinance', 'auto calculator loan refinance',
      'credit union refinance auto loan calculator'
    ],
    relatedCalculators: ['loan-calculator', 'compound-interest-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How do I use an auto loan refinance savings calculator?',
      'Can I find the best refinance auto loans calculator for my credit score?',
      'Is there an auto loan refinance calculator with down payment options?'
    ],
    ogTitle: 'Free Auto Loan Refinance Calculator',
    ogDescription: 'Calculate exactly how much you can save by refinancing your car.'
  },
  {
    slug: 'cap-rate-calculator',
    title: 'Cap Rate Calculator',
    category: 'finance',
    metaTitle: 'Real Estate Cap Rate Calculator — Find NOI & ROI | All In One Calculator',
    metaDescription: 'Free capitalization rate calculator for real estate investors. Discover how is cap rate calculated, learn the formula, and find your property\'s exact NOI instantly.',
    h1: 'Real Estate Cap Rate Calculator',
    primaryKeyword: 'cap rate calculator',
    keywords: [
      'cap rate calculator', 'calculate cap rate', 'how do you calculate cap rate', 'how is cap rate calculated',
      'cap rate calculation', 'chatham rate cap calculator', 'calculating cap rate', 'calculate cap rate calculator',
      'cap rate calculator real estate', 'how to calculate cap rates', 'rate cap calculator',
      'chatham interest rate cap calculator', 'how to calculate a cap rate, real estate ROI calculator'
    ],
    relatedCalculators: ['mortgage-calculator', 'percentage-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How to calculate a cap rate?',
      'How do you calculate cap rate for real estate?',
      'How is cap rate calculated with NOI?'
    ],
    ogTitle: 'Free Real Estate Cap Rate Calculator',
    ogDescription: 'Evaluate rental property profitability by calculating NOI and Cap Rate instantly.'
  },
  {
    slug: 'freelance-hourly-rate-calculator',
    title: 'Freelance Hourly Rate Calculator',
    category: 'finance',
    metaTitle: 'Freelance Hourly Rate Calculator — How Much Should I Charge? | All In One Calculator',
    metaDescription: 'Calculate exactly how much you should charge per hour as a freelancer or 1099 contractor to hit your target take-home salary after taxes and expenses. Learn how to calculate an hourly rate easily.',
    h1: 'Freelance Hourly Rate Calculator',
    primaryKeyword: 'freelance hourly rate calculator',
    keywords: [
      'freelance hourly rate calculator', 'how much should I charge per hour', '1099 tax calculator', 'consulting rate calculator',
      'how do you calculate hourly rate', 'how do you calculate your hourly rate', 'air change rate per hour calculator',
      'how to calculate overtime rate per hour', 'how to calculate an hourly rate', 'how to calculate hourly rate after illinois taxes',
      'how to calculate hourly rate from monthly salary'
    ],
    relatedCalculators: ['salary-calculator', 'percentage-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How do you calculate your hourly rate as a freelancer?',
      'How to calculate hourly rate from monthly salary?',
      'How to calculate overtime rate per hour?'
    ],
    ogTitle: 'Free Freelance Hourly Rate Calculator',
    ogDescription: 'Find your true minimum hourly rate to hit your salary goals.'
  },
  {
    slug: 'ecommerce-fee-calculator',
    title: 'Etsy & Shopify Fee Calculator',
    category: 'finance',
    metaTitle: 'Etsy & Shopify Fee Calculator — Find Your Real Profit Margin | All In One Calculator',
    metaDescription: 'Free ecommerce fee calculator. Calculate seller fees for Etsy, eBay, or FBA. Includes integrations to calculate Stripe, Square, Venmo and Cash App fees.',
    h1: 'Etsy & Shopify Fee Calculator',
    primaryKeyword: 'etsy fee calculator',
    keywords: [
      'etsy fee calculator', 'shopify fee calculator', 'ecommerce profit calculator', 'etsy transaction fee calculator',
      'copart fee calculator', 'copart fees calculator', 'michigan registration fee calculator', 'stripe fee calculator',
      'cash app fee calculator', 'ebay fee calculator 2025', 'fba fee calculator', 'florida vehicle registration fee calculator',
      'square fee calculator', 'va funding fee calculator', 'venmo fee calculator'
    ],
    relatedCalculators: ['percentage-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How to use an Etsy fee calculator?',
      'Does this work as an eBay fee calculator 2025 or FBA fee calculator?',
      'How to calculate Stripe or Square processing fees?'
    ],
    ogTitle: 'Free Ecommerce Fee & Profit Calculator',
    ogDescription: 'Calculate exact Etsy and Shopify fees to find your true profit margin.'
  },
  {
    slug: 'payment-fee-calculator',
    title: 'Stripe & PayPal Fee Calculator',
    category: 'finance',
    metaTitle: 'Stripe & PayPal Fee Calculator — Find Exact Processing Fees | All In One Calculator',
    metaDescription: 'Free payment gateway fee calculator. Instantly calculate Stripe fees, PayPal rates, and Square costs. Find out exactly how much to invoice your clients.',
    h1: 'Stripe & PayPal Fee Calculator',
    primaryKeyword: 'stripe fee calculator',
    keywords: [
      'stripe fee calculator', 'paypal fee calculator', 'square fee calculator', 'payment processing fee calculator',
      'stripe fees calculator', 'calculate stripe fees'
    ],
    relatedCalculators: ['ecommerce-fee-calculator', 'percentage-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How to calculate Stripe fees per transaction?',
      'How much does PayPal charge per transaction?',
      'How do I calculate how much to invoice a client?'
    ],
    ogTitle: 'Free Payment Gateway Fee Calculator',
    ogDescription: 'Calculate exact Stripe and PayPal fees instantly.'
  },
  {
    slug: 'social-media-revenue-calculator',
    title: 'YouTube & TikTok Revenue Calculator',
    category: 'finance',
    metaTitle: 'YouTube & TikTok Revenue Calculator — Estimate AdSense | All In One Calculator',
    metaDescription: 'Calculate your exact YouTube and TikTok earnings. Find out how much a YouTuber makes, calculate YouTube channel revenue, or use our TikLeap alternative to see how much TikTok pays.',
    h1: 'YouTube & TikTok Revenue Calculator',
    primaryKeyword: 'youtube revenue calculator',
    keywords: [
      'youtube revenue calculator', 'tiktok money calculator', 'how much does youtube pay per 1000 views', 'adsense earnings calculator',
      'how much does', 'how much does a youtuber make', 'youtube video money calculator', 'youtube views to money calculator',
      'how much money do you get per view on youtube', '1 million views on youtube money', 'how much money do you make per view on youtube',
      'youtube channel revenue calculator', 'youtube video revenue calculator', 'youtube shorts revenue calculator', 'calculate youtube channel revenue',
      'tiktok revenue calculator', 'tikleap', 'tiktok follower count', 'how much does tiktok pay', 'how much do tiktokers make',
      'tickleap', 'tikleap com'
    ],
    relatedCalculators: ['freelance-hourly-rate-calculator', 'percentage-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How much does a YouTuber make from 1 million views on YouTube money?',
      'How much money do you get per view on YouTube?',
      'How much do TikTokers make and how much does TikTok pay?'
    ],
    ogTitle: 'Free Social Media Revenue Calculator',
    ogDescription: 'Estimate your monthly YouTube and TikTok earnings instantly.'
  },
  {
    slug: 'ev-charging-cost-calculator',
    title: 'EV Charging Cost Calculator',
    category: 'conversion',
    metaTitle: 'EV Charging Cost Calculator — Tesla & Electric Vehicle Costs | All In One Calculator',
    metaDescription: 'Free EV charging cost calculator. Compare the exact cost of charging your electric vehicle at home vs public chargers, and see your savings compared to gas.',
    h1: 'EV Charging Cost Calculator',
    primaryKeyword: 'ev charging cost calculator',
    keywords: ['ev charging cost calculator', 'how much does it cost to charge a tesla', 'home charging vs supercharging cost'],
    relatedCalculators: ['electricity-bill-calculator', 'percentage-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How much does it cost to charge an EV at home?',
      'Is charging an EV cheaper than buying gas?',
      'How do you calculate EV charging costs?'
    ],
    ogTitle: 'Free EV Charging Cost Calculator',
    ogDescription: 'Calculate exactly how much it costs to charge your electric vehicle.'
  },
  {
    slug: 'time-duration-calculator',
    title: 'Time Duration Calculator',
    category: 'math',
    metaTitle: 'Time Duration Calculator — Hours Between Two Times | All In One Calculator',
    metaDescription: 'Free time duration calculator. Easily calculate the exact hours and minutes between two times. Perfect for payroll, timesheets, and shift tracking.',
    h1: 'Time Duration Calculator',
    primaryKeyword: 'time duration calculator',
    keywords: ['time duration calculator', 'hours between two times', 'shift calculator', 'payroll hours calculator', 'timesheet calculator'],
    relatedCalculators: ['freelance-hourly-rate-calculator', 'salary-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How do I calculate hours worked?',
      'What are decimal hours for payroll?',
      'How do I subtract 30 minutes for a lunch break?'
    ],
    ogTitle: 'Free Time Duration & Payroll Calculator',
    ogDescription: 'Calculate the exact hours between two times for your timesheet.'
  },
  {
    slug: 'date-difference-calculator',
    title: 'Date Difference Calculator',
    category: 'math',
    metaTitle: 'Date Difference Calculator — Days Between Two Dates | All In One Calculator',
    metaDescription: 'Free date difference calculator. Find out exactly how many days, weeks, months, or business days there are between two specific dates.',
    h1: 'Date Difference Calculator',
    primaryKeyword: 'date difference calculator',
    keywords: ['date difference calculator', 'days between two dates', 'how many days until', 'business days calculator', 'weeks between dates'],
    relatedCalculators: ['time-duration-calculator', 'age-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How do I calculate the days between two dates?',
      'How do you calculate business days?',
      'How many weeks are in 100 days?'
    ],
    ogTitle: 'Free Date Difference Calculator',
    ogDescription: 'Calculate the exact number of days between two dates.'
  },
  {
    slug: 'pet-age-calculator',
    title: 'Dog & Cat Age Calculator',
    category: 'health',
    metaTitle: 'Dog & Cat Age to Human Years Calculator | All In One Calculator',
    metaDescription: 'Free pet age calculator. Convert your dog or cat\'s age into human years instantly. Uses veterinarian-approved formulas based on dog size and breed.',
    h1: 'Dog & Cat Age Calculator',
    primaryKeyword: 'dog age calculator',
    keywords: ['dog age calculator', 'cat age calculator', 'dog years to human years', 'cat years to human years', 'pet age converter'],
    relatedCalculators: ['age-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How do I calculate my dog\'s age in human years?',
      'Is 1 dog year equal to 7 human years?',
      'How fast do cats age compared to humans?'
    ],
    ogTitle: 'Free Dog & Cat Age to Human Years Calculator',
    ogDescription: 'Convert your pet\'s age into human years using accurate veterinary formulas.'
  },
  {
    slug: 'bac-calculator',
    title: 'Blood Alcohol Content (BAC) Calculator',
    category: 'health',
    metaTitle: 'BAC Calculator — Estimate Your Blood Alcohol Level | All In One Calculator',
    metaDescription: 'Free BAC calculator. Estimate your blood alcohol content and find out how long it will take to become sober based on your weight and drinks consumed.',
    h1: 'Blood Alcohol Content (BAC) Calculator',
    primaryKeyword: 'bac calculator',
    keywords: ['bac calculator', 'blood alcohol calculator', 'how long to get sober calculator', 'legal driving limit calculator'],
    relatedCalculators: ['bmi-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How is BAC calculated?',
      'How long does it take to sober up?',
      'What is the legal driving limit?'
    ],
    ogTitle: 'Free Blood Alcohol Content (BAC) Calculator',
    ogDescription: 'Estimate your BAC and see how long it takes to metabolize alcohol.'
  },
  {
    slug: 'keto-macros-calculator',
    title: 'Keto Macros Calculator',
    category: 'health',
    metaTitle: 'Keto Macros Calculator — Find Your Exact Diet Macros | All In One Calculator',
    metaDescription: 'Free keto macros calculator. Calculate your exact daily requirements for fat, protein, and net carbs to enter ketosis and lose weight fast.',
    h1: 'Keto Macros Calculator',
    primaryKeyword: 'keto macros calculator',
    keywords: ['keto macros calculator', 'ketogenic diet calculator', 'low carb macro calculator', 'how much fat on keto'],
    relatedCalculators: ['tdee-calculator', 'calorie-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'What are the macros for a keto diet?',
      'How many net carbs can I eat on keto?',
      'Do I need to track calories on keto?'
    ],
    ogTitle: 'Free Keto Macros Calculator',
    ogDescription: 'Calculate your exact Fat, Protein, and Carb limits for ketosis.'
  },
  {
    slug: 'ovulation-calculator',
    title: 'Ovulation & Fertility Calculator',
    category: 'health',
    metaTitle: 'Ovulation Calculator — Find Your Most Fertile Days | All In One Calculator',
    metaDescription: 'Free ovulation calculator. Discover your exact fertile window, ovulation date, and next period start date to maximize your chances of getting pregnant.',
    h1: 'Ovulation & Fertility Calculator',
    primaryKeyword: 'ovulation calculator',
    keywords: ['ovulation calculator', 'fertility window calculator', 'when am I most fertile', 'period tracker calculator'],
    relatedCalculators: ['pregnancy-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'When is the best time to get pregnant?',
      'How does the ovulation calculator work?',
      'What is the luteal phase?'
    ],
    ogTitle: 'Free Ovulation & Fertile Window Calculator',
    ogDescription: 'Find your most fertile days of the month instantly.'
  },
  {
    slug: 'pace-calculator',
    title: 'Running Pace Calculator',
    category: 'health',
    metaTitle: 'Running Pace Calculator — Calculate Your Exact Run Pace | All In One Calculator',
    metaDescription: 'Free running pace calculator. Enter your distance and goal time to instantly calculate the exact minutes per mile or kilometer required.',
    h1: 'Running Pace Calculator',
    primaryKeyword: 'running pace calculator',
    keywords: ['running pace calculator', 'calculate pace from time and distance', 'marathon pace calculator', 'min per mile calculator'],
    relatedCalculators: ['calorie-calculator'],
    hasStateSubs: false,
    faqQuestions: [
      'How do I calculate my running pace?',
      'What pace is a 4 hour marathon?',
      'How fast do I need to run a 5k in 25 minutes?'
    ],
    ogTitle: 'Free Running Pace Calculator',
    ogDescription: 'Calculate the exact pace needed to hit your race goal.'
  }
];

export function getCalculatorData(slug: string): CalculatorData | undefined {
  return CALCULATORS.find(c => c.slug === slug);
}

export function getAllCalculators(): CalculatorData[] {
  return CALCULATORS;
}

export function getGlobalKeywords(): string[] {
  return Array.from(
    new Set([
      'all in one calculator',
      'free online calculators',
      'online calculators',
      ...CALCULATORS.map(c => c.primaryKeyword),
      ...CALCULATORS.flatMap(c => c.keywords)
    ])
  );
}

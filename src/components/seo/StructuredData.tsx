import Script from 'next/script';

interface StructuredDataProps {
  data: any;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id={`structured-data-${Math.random()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  );
}

// Helpers to generate schema
export function generateWebApplicationSchema(calc: any) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": calc.title,
    "url": `https://www.allinonecalculator.fun/${calc.slug}`,
    "applicationCategory": "FinanceApplication", // Can be dynamic
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": calc.metaDescription,
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string; position: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": item.item
    }))
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

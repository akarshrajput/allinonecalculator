import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'All In One Calculator — Free Online Calculators',
    short_name: 'All In One Calculator',
    description: 'Free online calculators for mortgage, BMI, loan, percentage, calories and more. Fast, accurate, no sign-up needed.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}

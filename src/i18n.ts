import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'id', // Changed default to Indonesian
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          browse: 'Browse',
          pricing: 'Pricing',
          login: 'Login',
          signup: 'Sign Up',
          'auth.login.title': 'Login',
          'auth.login.description': 'Welcome back! Sign in to your account.',
          'auth.signup.title': 'Sign Up',
          'auth.signup.description': 'Create a new account to get started.',
          'header.dashboard': 'Dashboard',
          'header.logout': 'Logout',
          'hero.title': 'Unlock Creativity with Next-Level AI Prompts',
          'hero.description': 'Discover, save, and claim high-quality AI prompts for Midjourney, ChatGPT, and more. Elevate your creations with our curated marketplace.',
          'hero.getStarted': 'Get Started',
          'hero.browsePrompts': 'Browse Prompts',
          'howItWorks.title': 'How It Works',
          'howItWorks.description': 'A simple credit-based system to get access to premium prompts in three easy steps.',
          'howItWorks.discover.title': 'Discover',
          'howItWorks.discover.description': 'Browse our extensive library of prompts for various AI platforms.',
          'howItWorks.claim.title': 'Claim',
          'howItWorks.claim.description': 'Use your credits to claim prompts and unlock the full text.',
          'howItWorks.create.title': 'Create',
          'howItWorks.create.description': 'Generate amazing content with your newly acquired high-quality prompts.',
          'featured.title': 'Featured Prompts',
          'featured.description': 'A sneak peek at some of our top-rated prompts.',
          'featured.viewAll': 'View All Prompts',
          'testimonials.title': 'Loved by Creatives',
          'testimonials.description': 'See what our users are saying about XtraPrompt.',
          'testimonials.first': '"XtraPrompt has revolutionized my workflow. The quality of prompts is unmatched and has saved me hours of brainstorming!"',
          'testimonials.first.author': '- Creative Director',
          'testimonials.second': '"Finally, a place to find curated prompts that actually work. The credit system is fair and easy to use. Highly recommended!"',
          'testimonials.second.author': '- Freelance Artist',
        },
      },
      id: {
        translation: {
          browse: 'Jelajahi',
          pricing: 'Harga',
          login: 'Masuk',
          signup: 'Daftar',
          'auth.login.title': 'Masuk',
          'auth.login.description': 'Selamat datang kembali! Masuk ke akun Anda.',
          'auth.signup.title': 'Daftar',
          'auth.signup.description': 'Buat akun baru untuk memulai.',
          'header.dashboard': 'Dasbor',
          'header.logout': 'Keluar',
          'hero.title': 'Buka Kreativitas dengan Prompt AI Terdepan',
          'hero.description': 'Temukan, simpan, dan klaim prompt AI berkualitas tinggi untuk Midjourney, ChatGPT, dan lainnya. Tingkatkan kreasi Anda dengan pasar kurasi kami.',
          'hero.getStarted': 'Mulai Sekarang',
          'hero.browsePrompts': 'Jelajahi Prompt',
          'howItWorks.title': 'Cara Kerjanya',
          'howItWorks.description': 'Sistem berbasis kredit yang sederhana untuk mendapatkan akses ke prompt premium dalam tiga langkah mudah.',
          'howItWorks.discover.title': 'Temukan',
          'howItWorks.discover.description': 'Jelajahi perpustakaan prompt ekstensif kami untuk berbagai platform AI.',
          'howItWorks.claim.title': 'Klaim',
          'howItWorks.claim.description': 'Gunakan kredit Anda untuk mengklaim prompt dan membuka teks lengkap.',
          'howItWorks.create.title': 'Buat',
          'howItWorks.create.description': 'Hasilkan konten menakjubkan dengan prompt berkualitas tinggi yang baru Anda dapatkan.',
          'featured.title': 'Prompt Unggulan',
          'featured.description': 'Sekilas tentang beberapa prompt dengan rating tertinggi kami.',
          'featured.viewAll': 'Lihat Semua Prompt',
          'testimonials.title': 'Dicintai oleh Para Kreator',
          'testimonials.description': 'Lihat apa yang pengguna kami katakan tentang XtraPrompt.',
          'testimonials.first': '"XtraPrompt telah merevolusi alur kerja saya. Kualitas prompt tidak tertandingi dan telah menghemat jam brainstorming saya!"',
          'testimonials.first.author': '- Direktur Kreatif',
          'testimonials.second': '"Akhirnya, tempat untuk menemukan prompt yang benar-benar berfungsi. Sistem kredit adil dan mudah digunakan. Sangat direkomendasikan!"',
          'testimonials.second.author': '- Seniman Freelance',
        },
      },
    },
  });

export default i18n;

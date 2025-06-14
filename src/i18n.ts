
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
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
        },
      },
    },
  });

export default i18n;

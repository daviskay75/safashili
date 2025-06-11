// Jest configuration for psychology practice website tests
// This file is referenced in package.json jest configuration

import '@testing-library/jest-dom'

// Mock environment variables for tests
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
process.env.CONTACT_EMAIL = 'testcontact@safashili.com'
process.env.PHONE_NUMBER = '06 51 68 74 30'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {},
    pathname: '/',
    route: '/',
    asPath: '/',
  }),
}))

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    h2: 'h2',
    p: 'p',
    span: 'span',
    button: 'button',
    form: 'form',
    input: 'input',
    textarea: 'textarea',
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({ start: jest.fn(), stop: jest.fn() }),
  useInView: () => true,
}))

// Mock intersection observer
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock Web Vitals
jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}))

// Mock Google Analytics
global.gtag = jest.fn()

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  send: jest.fn(() => Promise.resolve({ status: 200, text: 'OK' })),
  init: jest.fn(),
}))

// Mock Prisma client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    contact: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn(),
    },
    appointment: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  })),
}))

// Suppress console warnings in tests
const originalWarn = console.warn
console.warn = (...args) => {
  if (args[0]?.includes?.('componentWillReceiveProps') || 
      args[0]?.includes?.('deprecated')) {
    return
  }
  originalWarn(...args)
}

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
})
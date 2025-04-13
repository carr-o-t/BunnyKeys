import '@testing-library/jest-dom';
import 'jest-environment-jsdom';

// Configure global test timeout
jest.setTimeout(10000);

// Mock ResizeObserver which is not available in JSDOM
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
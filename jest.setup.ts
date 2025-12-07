import '@testing-library/jest-dom';

// Mock window.alert
global.alert = jest.fn();

// Mock window.confirm
global.confirm = jest.fn(() => true);

// Mock window.open
global.open = jest.fn();

// Mock SweetAlert2
jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: {
    fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
    close: jest.fn(),
    showLoading: jest.fn(),
  },
}));

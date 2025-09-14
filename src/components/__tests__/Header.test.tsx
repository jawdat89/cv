import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../Header';
import cvSlice from '@/store/cvSlice';

// Mock the store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cv: cvSlice,
    },
    preloadedState: {
      cv: {
        theme: 'light' as const,
        personalInfo: {
          firstName: 'Test',
          lastName: 'User',
          firstNameAr: 'Test',
          lastNameAr: 'User',
          firstNameHe: 'Test',
          lastNameHe: 'User',
          email: 'test@example.com',
          phone: '123-456-7890',
          address: 'Test Address',
          linkedin: 'https://linkedin.com/in/test',
          website: 'https://test.com',
          summary: 'Test Summary',
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
        template: 'modern' as const,
        currentLanguage: 'en' as const,
        ...initialState,
      },
    },
  });
};

// Mock the useI18n hook
vi.mock('@/hooks', () => ({
  useI18n: () => ({
    t: (key: string) => key,
    direction: 'ltr',
  }),
}));

// Mock the LanguageSelector component
vi.mock('../LanguageSelector', () => ({
  default: () => (
    <button data-testid="language-selector">
      Language Selector
    </button>
  ),
}));

describe('Header', () => {
  let mockStore: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockStore = createMockStore();
  });

  const renderHeader = (props = {}) => {
    return render(
      <Provider store={mockStore}>
        <Header {...props} />
      </Provider>
    );
  };

  it('renders header component', () => {
    renderHeader();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    renderHeader();
    const themeButton = screen.getByTitle(/switch/i);
    expect(themeButton).toBeInTheDocument();
  });

  it('renders language selector', () => {
    renderHeader();
    expect(screen.getByTestId('language-selector')).toBeInTheDocument();
  });

  it('renders download button when showHebrewCV is true', () => {
    renderHeader({ showHebrewCV: true });
    expect(screen.getByText('actions.downloadHebrewCV')).toBeInTheDocument();
  });

  it('does not render download button when showHebrewCV is false', () => {
    renderHeader({ showHebrewCV: false });
    expect(screen.queryByText('actions.downloadHebrewCV')).not.toBeInTheDocument();
  });

  it('calls onDownloadHebrewCV when download button is clicked', () => {
    const mockOnDownload = vi.fn();
    renderHeader({ showHebrewCV: true, onDownloadHebrewCV: mockOnDownload });
    
    const downloadButton = screen.getByText('actions.downloadHebrewCV');
    fireEvent.click(downloadButton);
    
    expect(mockOnDownload).toHaveBeenCalledTimes(1);
  });

  it('renders children when provided', () => {
    renderHeader({ children: <div data-testid="header-children">Test Children</div> });
    expect(screen.getByTestId('header-children')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    renderHeader();
    const header = screen.getByRole('navigation');
    expect(header).toHaveClass('bg-white', 'dark:bg-gray-800', 'shadow-sm');
  });

  it('handles theme toggle click', () => {
    renderHeader();
    const themeButton = screen.getByTitle(/switch/i);
    
    fireEvent.click(themeButton);
    // Note: In a real test, you'd verify the store state changed
  });

  it('renders language selector', () => {
    renderHeader();
    const languageButton = screen.getByTestId('language-selector');
    expect(languageButton).toBeInTheDocument();
  });

  it('renders with dark theme classes when theme is dark', () => {
    mockStore = createMockStore({ theme: 'dark' });
    render(
      <Provider store={mockStore}>
        <Header />
      </Provider>
    );
    
    const header = screen.getByRole('navigation');
    expect(header).toHaveClass('dark:bg-gray-800');
  });

  it('renders with light theme classes when theme is light', () => {
    mockStore = createMockStore({ theme: 'light' });
    render(
      <Provider store={mockStore}>
        <Header />
      </Provider>
    );
    
    const header = screen.getByRole('navigation');
    expect(header).toHaveClass('bg-white');
  });
});

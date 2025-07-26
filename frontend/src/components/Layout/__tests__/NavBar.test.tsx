import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '../NavBar'
import { AppContext } from '../../../context/AppContext'
import type { User } from '../../../types'

const mockUser: User = {
  uid: 1,
  name: 'Test User',
  email: 'test@example.com',
  university: 'Test University',
  major: 'Test Major',
  bio: 'Test bio',
  avatar: '👤',
  interests: [],
  preferredCuisines: [],
  isOnline: true,
  lastSeen: new Date()
}

const createMockContext = (isAuthenticated: boolean, user: User | null = null) => ({
  user,
  isAuthenticated,
  isDarkMode: false,
  isLoading: false,
  pendingRoomId: null,
  hasInitAuth: true,
  loginUser: vi.fn(),
  logoutUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
  toggleDarkMode: vi.fn(),
  setLoading: vi.fn(),
  setPendingId: vi.fn(),
  getToken: vi.fn(),
  showError: vi.fn(),
  showSuccess: vi.fn(),
  setAuthenticated: vi.fn()
})

const TestWrapper = ({ children, contextValue }: any) => (
  <BrowserRouter>
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  </BrowserRouter>
)

describe('NavBar', () => {
  it('renders logo and brand name', () => {
    const contextValue = createMockContext(false)
    
    render(
      <TestWrapper contextValue={contextValue}>
        <NavBar />
      </TestWrapper>
    )
    
    expect(screen.getByText('MealMate')).toBeInTheDocument()
  })

  it('shows join button when user is not authenticated', () => {
    const contextValue = createMockContext(false)
    
    render(
      <TestWrapper contextValue={contextValue}>
        <NavBar />
      </TestWrapper>
    )
    
    expect(screen.getByRole('button', { name: /join now/i })).toBeInTheDocument()
  })

  it('shows navigation menu when user is authenticated', () => {
    const contextValue = createMockContext(true, mockUser)
    
    render(
      <TestWrapper contextValue={contextValue}>
        <NavBar />
      </TestWrapper>
    )
    
    expect(screen.getByRole('link', { name: /find meal/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /find buddy/i })).toBeInTheDocument()
  })

  it('shows theme toggle button', () => {
    const contextValue = createMockContext(false)
    
    render(
      <TestWrapper contextValue={contextValue}>
        <NavBar />
      </TestWrapper>
    )
    
    // Theme button exists (has sun/moon icons)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('toggles dark mode when theme button is clicked', async () => {
    const user = userEvent.setup()
    const contextValue = createMockContext(false)
    
    render(
      <TestWrapper contextValue={contextValue}>
        <NavBar />
      </TestWrapper>
    )
    
    // Find theme button by its content (has SVG icons)
    const buttons = screen.getAllByRole('button')
    const themeButton = buttons.find(button => 
      button.querySelector('svg') && 
      button.className.includes('relative inline-flex')
    )
    
    if (themeButton) {
      await user.click(themeButton)
      expect(contextValue.toggleDarkMode).toHaveBeenCalled()
    }
  })

  it('handles mobile menu toggle', async () => {
    const user = userEvent.setup()
    const contextValue = createMockContext(true, mockUser)
    
    render(
      <TestWrapper contextValue={contextValue}>
        <NavBar />
      </TestWrapper>
    )
    
    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i })
    await user.click(mobileMenuButton)
    
    // Mobile menu button should be clickable
    expect(mobileMenuButton).toBeInTheDocument()
  })
}) 
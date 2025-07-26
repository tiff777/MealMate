import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import { AppContext } from '../../../context/AppContext'

// Create very simple mock context to avoid useEffect issues
const createSimpleMockContext = (overrides = {}) => ({
  user: null,
  isAuthenticated: false,
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
  setAuthenticated: vi.fn(),
  ...overrides
})

const TestWrapper = ({ children, contextValue }: any) => (
  <MemoryRouter>
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  </MemoryRouter>
)

describe('ProtectedRoute - Simple', () => {
  it('renders children when authenticated', () => {
    const contextValue = createSimpleMockContext({
      isAuthenticated: true,
      user: { uid: 1, name: 'Test User' }
    })
    
    render(
      <TestWrapper contextValue={contextValue}>
        <ProtectedRoute requireAuth>
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>
    )
    
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('shows loading when not initialized', () => {
    const contextValue = createSimpleMockContext({
      hasInitAuth: false
    })
    
    render(
      <TestWrapper contextValue={contextValue}>
        <ProtectedRoute requireAuth>
          <div>Protected Content</div>
        </ProtectedRoute>
      </TestWrapper>
    )
    
    expect(screen.getByText('Authenticating...')).toBeInTheDocument()
  })

  it('renders public content without auth requirement', () => {
    const contextValue = createSimpleMockContext()
    
    render(
      <TestWrapper contextValue={contextValue}>
        <ProtectedRoute>
          <div>Public Content</div>
        </ProtectedRoute>
      </TestWrapper>
    )
    
    expect(screen.getByText('Public Content')).toBeInTheDocument()
  })
}) 
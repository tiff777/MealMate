import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import LoginForm from '../LoginForm'

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('LoginForm', () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form elements', () => {
    render(
      <TestWrapper>
        <LoginForm onSubmit={mockOnSubmit} />
      </TestWrapper>
    )
    
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument()
  })

  it('handles form submission with valid data', async () => {
    const user = userEvent.setup()
    render(
      <TestWrapper>
        <LoginForm onSubmit={mockOnSubmit} />
      </TestWrapper>
    )
    
    await user.type(screen.getByPlaceholderText(/enter your email/i), 'test@example.com')
    await user.type(screen.getByPlaceholderText(/enter your password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com', 'password123', false)
    })
  })

  it('handles remember me checkbox', async () => {
    const user = userEvent.setup()
    render(
      <TestWrapper>
        <LoginForm onSubmit={mockOnSubmit} />
      </TestWrapper>
    )
    
    await user.type(screen.getByPlaceholderText(/enter your email/i), 'test@example.com')
    await user.type(screen.getByPlaceholderText(/enter your password/i), 'password123')
    await user.click(screen.getByLabelText(/remember me/i))
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com', 'password123', true)
    })
  })

  it('prevents submission with empty fields', async () => {
    const user = userEvent.setup()
    render(
      <TestWrapper>
        <LoginForm onSubmit={mockOnSubmit} />
      </TestWrapper>
    )
    
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    
    // Should not call onSubmit with empty fields
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('shows validation for invalid email', async () => {
    const user = userEvent.setup()
    render(
      <TestWrapper>
        <LoginForm onSubmit={mockOnSubmit} />
      </TestWrapper>
    )
    
    await user.type(screen.getByPlaceholderText(/enter your email/i), 'invalid-email')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('renders register link', () => {
    render(
      <TestWrapper>
        <LoginForm onSubmit={mockOnSubmit} />
      </TestWrapper>
    )
    
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up here/i })).toBeInTheDocument()
  })
}) 
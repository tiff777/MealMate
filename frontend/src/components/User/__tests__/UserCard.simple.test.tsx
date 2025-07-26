import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import UserCard from '../UserCard'
import type { User } from '../../../types'

// Mock the navigation
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Simple mocks
vi.mock('../UserAvatar', () => ({
  default: () => <div data-testid="user-avatar">Avatar</div>
}))

vi.mock('../../Button/ButtonFactory', () => ({
  default: ({ type, message, onClick }: any) => (
    <button data-testid={`button-${type}`} onClick={onClick}>
      {message}
    </button>
  )
}))

vi.mock('../../UI/TagListDisplay', () => ({
  default: ({ tags }: any) => (
    <div data-testid="tag-list">
      {tags.map((tag: string, index: number) => (
        <span key={index} data-testid="tag">{tag}</span>
      ))}
    </div>
  )
}))

const mockUser: User = {
  uid: 1,
  name: 'John Doe',
  email: 'john@example.com',
  university: 'University of Auckland',
  major: 'Computer Science',
  bio: 'Love coding and meeting new people!',
  avatar: '👨‍💻',
  interests: ['Programming', 'Gaming', 'Music'],
  preferredCuisines: ['Italian', 'Japanese'],
  isOnline: true,
  lastSeen: new Date()
}

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('UserCard - Simple Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders basic user information', () => {
    render(
      <TestWrapper>
        <UserCard user={mockUser} handleMessage={vi.fn()} />
      </TestWrapper>
    )

    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument()
    expect(screen.getByText('Computer Science')).toBeInTheDocument()
    expect(screen.getByText('University of Auckland')).toBeInTheDocument()
  })

  it('renders user bio', () => {
    render(
      <TestWrapper>
        <UserCard user={mockUser} handleMessage={vi.fn()} />
      </TestWrapper>
    )

    expect(screen.getByText('Love coding and meeting new people!')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(
      <TestWrapper>
        <UserCard user={mockUser} handleMessage={vi.fn()} />
      </TestWrapper>
    )

    expect(screen.getByTestId('button-view')).toBeInTheDocument()
    expect(screen.getByTestId('button-message')).toBeInTheDocument()
  })

  it('handles view profile button click', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <UserCard user={mockUser} handleMessage={vi.fn()} />
      </TestWrapper>
    )

    const viewButton = screen.getByTestId('button-view')
    await user.click(viewButton)

    expect(mockNavigate).toHaveBeenCalledWith('/profile/1')
  })

  it('handles message button click', async () => {
    const user = userEvent.setup()
    const handleMessage = vi.fn()

    render(
      <TestWrapper>
        <UserCard user={mockUser} handleMessage={handleMessage} />
      </TestWrapper>
    )

    const messageButton = screen.getByTestId('button-message')
    await user.click(messageButton)

    expect(handleMessage).toHaveBeenCalledWith(1, 'John Doe')
  })

  it('renders interests when provided', () => {
    render(
      <TestWrapper>
        <UserCard user={mockUser} handleMessage={vi.fn()} />
      </TestWrapper>
    )

    expect(screen.getByTestId('tag-list')).toBeInTheDocument()
    expect(screen.getAllByTestId('tag')).toHaveLength(3)
  })

  it('handles user without interests', () => {
    const userWithoutInterests = { ...mockUser, interests: [] }

    render(
      <TestWrapper>
        <UserCard user={userWithoutInterests} handleMessage={vi.fn()} />
      </TestWrapper>
    )

    expect(screen.queryByTestId('tag-list')).not.toBeInTheDocument()
  })

  it('displays default message for empty cuisines', () => {
    const userWithoutCuisines = { ...mockUser, preferredCuisines: [] }

    render(
      <TestWrapper>
        <UserCard user={userWithoutCuisines} handleMessage={vi.fn()} />
      </TestWrapper>
    )

    expect(screen.getByText('Open to anything! 🌟')).toBeInTheDocument()
  })

  it('displays cuisines when provided', () => {
    render(
      <TestWrapper>
        <UserCard user={mockUser} handleMessage={vi.fn()} />
      </TestWrapper>
    )

    expect(screen.getByText('Italian, Japanese')).toBeInTheDocument()
  })

  it('handles empty bio with default message', () => {
    const userWithoutBio = { ...mockUser, bio: '' }

    render(
      <TestWrapper>
        <UserCard user={userWithoutBio} handleMessage={vi.fn()} />
      </TestWrapper>
    )

    expect(screen.getByText(/Hey there! I'm looking forward to meeting new people/)).toBeInTheDocument()
  })
}) 
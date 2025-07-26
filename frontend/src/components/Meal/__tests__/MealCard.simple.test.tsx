import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MealCard from '../MealCard'
import type { Meal } from '../../../types'

// Mock the date utility
vi.mock('../../../util/dateUtils', () => ({
  default: (date: Date) => '2024-01-15 18:00'
}))

// Simple mocks
vi.mock('../MealParticipantAvatar', () => ({
  default: ({ userId }: any) => (
    <div data-testid="participant-avatar" data-user-id={userId}>
      Avatar {userId}
    </div>
  )
}))

vi.mock('../MealStatus', () => ({
  default: ({ status }: any) => (
    <div data-testid="meal-status" data-status={status}>
      Status: {status}
    </div>
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

// Mock ResizeObserver
const mockResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}))
vi.stubGlobal('ResizeObserver', mockResizeObserver)

const mockMeal: Meal = {
  mid: 1,
  title: 'Italian Dinner Night',
  description: 'Join us for authentic Italian cuisine at the best restaurant in town!',
  maxParticipant: 6,
  currentParticipant: 3,
  restaurantName: 'Bella Vista Restaurant',
  restaurantAddress: '123 Queen Street, Auckland CBD',
  mealDate: new Date('2024-01-15T18:00:00Z'),
  tags: ['Italian', 'Dinner', 'Social'],
  realTimeStatus: 0,
  createdAt: new Date('2024-01-10T10:00:00Z'),
  hostId: 1,
  chatRoomId: 101,
  participants: [
    { userId: 1, avatar: '👨‍🍳' },
    { userId: 2, avatar: '👩‍💼' },
    { userId: 3, avatar: '👨‍💻' }
  ]
}

const mockButtons = [
  <button key="join" data-testid="join-button">Join</button>,
  <button key="message" data-testid="message-button">Message</button>
]

describe('MealCard - Simple Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders meal basic information', () => {
    render(<MealCard meal={mockMeal} buttons={mockButtons} />)

    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(screen.getByText('Italian Dinner Night')).toBeInTheDocument()
    expect(screen.getByText('Join us for authentic Italian cuisine at the best restaurant in town!')).toBeInTheDocument()
    expect(screen.getByText('Bella Vista Restaurant')).toBeInTheDocument()
  })

  it('displays formatted date', () => {
    render(<MealCard meal={mockMeal} buttons={mockButtons} />)

    expect(screen.getByText('2024-01-15 18:00')).toBeInTheDocument()
  })

  it('displays participant count', () => {
    render(<MealCard meal={mockMeal} buttons={mockButtons} />)

    expect(screen.getByText('3/6')).toBeInTheDocument()
  })

  it('renders meal status', () => {
    render(<MealCard meal={mockMeal} buttons={mockButtons} />)

    const statusElement = screen.getByTestId('meal-status')
    expect(statusElement).toBeInTheDocument()
    expect(statusElement).toHaveAttribute('data-status', '0')
  })

  it('renders participant avatars', () => {
    render(<MealCard meal={mockMeal} buttons={mockButtons} />)

    const avatars = screen.getAllByTestId('participant-avatar')
    expect(avatars).toHaveLength(3)
  })

  it('renders action buttons', () => {
    render(<MealCard meal={mockMeal} buttons={mockButtons} />)

    expect(screen.getByTestId('join-button')).toBeInTheDocument()
    expect(screen.getByTestId('message-button')).toBeInTheDocument()
  })

  it('renders tags when provided', () => {
    render(<MealCard meal={mockMeal} buttons={mockButtons} />)

    expect(screen.getByTestId('tag-list')).toBeInTheDocument()
    expect(screen.getAllByTestId('tag')).toHaveLength(3)
    expect(screen.getByText('Italian')).toBeInTheDocument()
    expect(screen.getByText('Dinner')).toBeInTheDocument()
    expect(screen.getByText('Social')).toBeInTheDocument()
  })

  it('does not render tags section when no tags', () => {
    const mealWithoutTags = { ...mockMeal, tags: [] }
    render(<MealCard meal={mealWithoutTags} buttons={mockButtons} />)

    expect(screen.queryByTestId('tag-list')).not.toBeInTheDocument()
  })

  it('handles empty buttons array', () => {
    render(<MealCard meal={mockMeal} buttons={[]} />)

    expect(screen.queryByTestId('join-button')).not.toBeInTheDocument()
    expect(screen.queryByTestId('message-button')).not.toBeInTheDocument()
  })

  it('shows overflow indicator for many participants', () => {
    const mealWithManyParticipants = {
      ...mockMeal,
      currentParticipant: 5,
      participants: [
        { userId: 1, avatar: '👨‍🍳' },
        { userId: 2, avatar: '👩‍💼' },
        { userId: 3, avatar: '👨‍💻' },
        { userId: 4, avatar: '👩‍🎓' },
        { userId: 5, avatar: '👨‍⚕️' }
      ]
    }

    render(<MealCard meal={mealWithManyParticipants} buttons={mockButtons} />)

    const avatars = screen.getAllByTestId('participant-avatar')
    expect(avatars).toHaveLength(3) // Only first 3 shown
    expect(screen.getByText('+2')).toBeInTheDocument()
  })

  it('handles zero participants', () => {
    const emptyMeal = {
      ...mockMeal,
      currentParticipant: 0,
      participants: []
    }

    render(<MealCard meal={emptyMeal} buttons={mockButtons} />)

    expect(screen.getByText('0/6')).toBeInTheDocument()
    expect(screen.queryByTestId('participant-avatar')).not.toBeInTheDocument()
  })

  it('handles long restaurant address', () => {
    const mealWithLongAddress = {
      ...mockMeal,
      restaurantAddress: 'This is a very long restaurant address that should be truncated'
    }

    render(<MealCard meal={mealWithLongAddress} buttons={mockButtons} />)

    expect(screen.getByText('This is a very long restaurant address that should be truncated')).toBeInTheDocument()
  })

  it('sets up ResizeObserver for responsive layout', () => {
    render(<MealCard meal={mockMeal} buttons={mockButtons} />)

    expect(mockResizeObserver).toHaveBeenCalled()
  })
}) 
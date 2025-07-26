import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFilteredMeals } from '../useFilteredMeals'
import type { MealWithParticipants } from '../../types'

const mockMeals: MealWithParticipants[] = [
  {
    mid: 1,
    title: 'Italian Dinner',
    description: 'Authentic Italian cuisine',
    restaurantName: 'Bella Vista',
    restaurantAddress: '123 Queen St',
    tags: ['Italian', 'Dinner'],
    mealDate: new Date('2024-02-15T18:00:00Z'),
    maxParticipant: 4,
    currentParticipant: 2,
    realTimeStatus: 0,
    createdAt: new Date(),
    hostId: 1,
    chatRoomId: 101,
    participants: []
  },
  {
    mid: 2,
    title: 'Japanese Lunch',
    description: 'Fresh sushi and ramen',
    restaurantName: 'Tokyo Kitchen',
    restaurantAddress: '456 High St',
    tags: ['Japanese', 'Lunch'],
    mealDate: new Date('2024-02-16T12:00:00Z'),
    maxParticipant: 6,
    currentParticipant: 1,
    realTimeStatus: 0,
    createdAt: new Date(),
    hostId: 2,
    chatRoomId: 102,
    participants: []
  }
]

describe('useFilteredMeals', () => {
  it('returns all meals when no filters applied', () => {
    const { result } = renderHook(() => 
      useFilteredMeals(mockMeals, { availability: '', tag: '', searchText: '' })
    )
    expect(result.current).toHaveLength(2)
  })

  it('filters meals by search term', () => {
    const { result } = renderHook(() => 
      useFilteredMeals(mockMeals, { availability: '', tag: '', searchText: 'Italian' })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Italian Dinner')
  })

  it('filters meals by tags', () => {
    const { result } = renderHook(() => 
      useFilteredMeals(mockMeals, { availability: '', tag: 'Japanese', searchText: '' })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Japanese Lunch')
  })

  it('filters by availability - available only', () => {
    const fullMeal = { ...mockMeals[0], currentParticipant: 4, maxParticipant: 4 }
    const mealsWithFull = [fullMeal, ...mockMeals.slice(1)]
    
    const { result } = renderHook(() => 
      useFilteredMeals(mealsWithFull, { availability: 'available', tag: '', searchText: '' })
    )
    expect(result.current).toHaveLength(1) // Only non-full meals
  })

  it('combines search and tag filters', () => {
    const { result } = renderHook(() => 
      useFilteredMeals(mockMeals, { availability: '', tag: 'Japanese', searchText: 'Japanese' })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Japanese Lunch')
  })

  it('returns empty array when no matches', () => {
    const { result } = renderHook(() => 
      useFilteredMeals(mockMeals, { availability: '', tag: '', searchText: 'Mexican' })
    )
    expect(result.current).toHaveLength(0)
  })

  it('handles empty meals array', () => {
    const { result } = renderHook(() => 
      useFilteredMeals([], { availability: '', tag: '', searchText: 'test' })
    )
    expect(result.current).toHaveLength(0)
  })
}) 
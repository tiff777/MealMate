import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFilteredUsers } from '../useFilteredUsers'
import type { User } from '../../types'

const mockUsers: User[] = [
  {
    uid: 1,
    name: 'John Doe',
    email: 'john@test.com',
    university: 'University of Auckland',
    major: 'Computer Science',
    bio: 'Love coding and food',
    avatar: '👨‍💻',
    interests: ['Programming', 'Cooking'],
    preferredCuisines: ['Italian', 'Japanese'],
    isOnline: true,
    lastSeen: new Date()
  },
  {
    uid: 2,
    name: 'Jane Smith',
    email: 'jane@test.com',
    university: 'AUT',
    major: 'Design',
    bio: 'Creative designer who loves good food',
    avatar: '👩‍🎨',
    interests: ['Design', 'Art'],
    preferredCuisines: ['French', 'Thai'],
    isOnline: false,
    lastSeen: new Date()
  }
]

describe('useFilteredUsers', () => {
  it('returns all users when no filters applied', () => {
    const { result } = renderHook(() => 
      useFilteredUsers(mockUsers, { interest: '', cuisine: '', searchText: '' })
    )
    expect(result.current).toHaveLength(2)
  })

  it('filters users by search term (name)', () => {
    const { result } = renderHook(() => 
      useFilteredUsers(mockUsers, { interest: '', cuisine: '', searchText: 'John' })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].name).toBe('John Doe')
  })

  it('filters users by major in search', () => {
    const { result } = renderHook(() => 
      useFilteredUsers(mockUsers, { interest: '', cuisine: '', searchText: 'Computer' })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].major).toBe('Computer Science')
  })

  it('filters users by interests', () => {
    const { result } = renderHook(() => 
      useFilteredUsers(mockUsers, { interest: 'Programming', cuisine: '', searchText: '' })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].interests).toContain('Programming')
  })

  it('filters users by cuisine preference', () => {
    const { result } = renderHook(() => 
      useFilteredUsers(mockUsers, { interest: '', cuisine: 'Italian', searchText: '' })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].preferredCuisines).toContain('Italian')
  })

  it('combines search and interest filters', () => {
    const { result } = renderHook(() => 
      useFilteredUsers(mockUsers, { interest: 'Programming', cuisine: '', searchText: 'John' })
    )
    expect(result.current).toHaveLength(1)
    expect(result.current[0].name).toBe('John Doe')
  })

  it('returns empty array when no matches', () => {
    const { result } = renderHook(() => 
      useFilteredUsers(mockUsers, { interest: '', cuisine: '', searchText: 'NonExistent' })
    )
    expect(result.current).toHaveLength(0)
  })

  it('handles empty users array', () => {
    const { result } = renderHook(() => 
      useFilteredUsers([], { interest: '', cuisine: '', searchText: 'test' })
    )
    expect(result.current).toHaveLength(0)
  })
}) 
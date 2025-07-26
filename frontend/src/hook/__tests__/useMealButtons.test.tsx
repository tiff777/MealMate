import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useMealButtons } from '../useMealButtons'

describe('useMealButtons', () => {
  const mockCallbacks = {
    onDelete: vi.fn(),
    onLeave: vi.fn(),
    onJoin: vi.fn(),
    onMessage: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns delete button for host', () => {
    const { result } = renderHook(() => useMealButtons(mockCallbacks))
    
    const meal = {
      mid: 1,
      isHost: true,
      isJoined: false,
      currentParticipant: 2,
      maxParticipant: 4,
      realTimeStatus: 0,
      chartRoomId: 101
    }
    
    const buttons = result.current(meal)
    expect(buttons).toHaveLength(1)
    expect(buttons[0].key).toBe('delete')
  })

  it('returns leave and message buttons for joined meal', () => {
    const { result } = renderHook(() => useMealButtons(mockCallbacks))
    
    const meal = {
      mid: 1,
      isHost: false,
      isJoined: true,
      currentParticipant: 2,
      maxParticipant: 4,
      realTimeStatus: 0,
      chartRoomId: 101
    }
    
    const buttons = result.current(meal)
    expect(buttons).toHaveLength(2)
    expect(buttons[0].key).toBe('leave')
    expect(buttons[1].key).toBe('message')
  })

  it('returns join button for non-joined meal', () => {
    const { result } = renderHook(() => useMealButtons(mockCallbacks))
    
    const meal = {
      mid: 1,
      isHost: false,
      isJoined: false,
      currentParticipant: 2,
      maxParticipant: 4,
      realTimeStatus: 0,
      chartRoomId: 101
    }
    
    const buttons = result.current(meal)
    expect(buttons).toHaveLength(1)
    expect(buttons[0].key).toBe('join')
  })

  it('disables join button for full meal', () => {
    const { result } = renderHook(() => useMealButtons(mockCallbacks))
    
    const meal = {
      mid: 1,
      isHost: false,
      isJoined: false,
      currentParticipant: 4,
      maxParticipant: 4,
      realTimeStatus: 0,
      chartRoomId: 101
    }
    
    const buttons = result.current(meal)
    expect(buttons[0].props.disabled).toBe(true)
  })

  it('disables join button for completed meal', () => {
    const { result } = renderHook(() => useMealButtons(mockCallbacks))
    
    const meal = {
      mid: 1,
      isHost: false,
      isJoined: false,
      currentParticipant: 2,
      maxParticipant: 4,
      realTimeStatus: 2,
      chartRoomId: 101
    }
    
    const buttons = result.current(meal)
    expect(buttons[0].props.disabled).toBe(true)
  })
}) 
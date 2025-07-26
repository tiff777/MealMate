import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import NormalButton from '../NormalButton'

describe('NormalButton - Simple', () => {
  it('renders button with message', () => {
    render(<NormalButton message="Click me" />)
    
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<NormalButton message="Click me" onClick={handleClick} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables button when disabled prop is true', () => {
    render(<NormalButton message="Click me" disabled />)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('renders without message', () => {
    render(<NormalButton />)
    
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn()
    render(<NormalButton message="Click me" onClick={handleClick} disabled />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
}) 
import { describe, it, expect } from 'vitest'
import formatDate from '../dateUtils'

describe('dateUtils', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15T18:30:00Z')
    const result = formatDate(date)
    // US format: MM/DD/YYYY, HH:mm
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}/)
  })

  it('handles different date formats', () => {
    const date1 = new Date('2024-12-25T09:00:00Z')
    const date2 = new Date('2024-06-01T12:00:00Z')
    
    const result1 = formatDate(date1)
    const result2 = formatDate(date2)
    
    expect(result1).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}/)
    expect(result2).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}/)
  })

  it('handles edge case dates', () => {
    const midYear = new Date('2024-06-15T12:00:00Z')
    const anotherDate = new Date('2024-09-30T15:30:00Z')
    
    const result1 = formatDate(midYear)
    const result2 = formatDate(anotherDate)
    
    expect(result1).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}/)
    expect(result2).toMatch(/\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}/)
  })

  it('returns consistent format', () => {
    const date = new Date('2024-03-15T14:25:00Z')
    const result = formatDate(date)
    
    // Should match MM/DD/YYYY, HH:mm format (US locale)
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}$/)
  })
}) 
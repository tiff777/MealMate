import { describe, it, expect } from 'vitest'
import { validateMealForm } from '../mealValidation'
import type { RawMealFormInput } from '../../types'

const validMealData: RawMealFormInput = {
  title: 'Italian Dinner',
  description: 'Join us for authentic Italian cuisine',
  maxParticipant: 4,
  restaurantName: 'Bella Vista',
  restaurantAddress: '123 Queen Street, Auckland',
  mealDate: '2024-12-25T18:00'
}

describe('mealValidation', () => {
  it('validates complete valid meal form', async () => {
    const result = await validateMealForm(validMealData)
    expect(result.isFormValid).toBe(true)
    expect(result.title.isValid).toBe(true)
    expect(result.description.isValid).toBe(true)
    expect(result.maxParticipant.isValid).toBe(true)
  })

  it('rejects empty title', async () => {
    const invalidData = { ...validMealData, title: '' }
    const result = await validateMealForm(invalidData)
    expect(result.isFormValid).toBe(false)
    expect(result.title.isValid).toBe(false)
  })

  it('rejects invalid participant count', async () => {
    const invalidData = { ...validMealData, maxParticipant: 0 }
    const result = await validateMealForm(invalidData)
    expect(result.isFormValid).toBe(false)
    expect(result.maxParticipant.isValid).toBe(false)
  })

  it('validates restaurant information', async () => {
    const result = await validateMealForm(validMealData)
    expect(result.restaurantName.isValid).toBe(true)
    expect(result.restaurantAddress.isValid).toBe(true)
  })

  it('rejects empty restaurant name', async () => {
    const invalidData = { ...validMealData, restaurantName: '' }
    const result = await validateMealForm(invalidData)
    expect(result.isFormValid).toBe(false)
    expect(result.restaurantName.isValid).toBe(false)
  })

  it('validates meal date format', async () => {
    const result = await validateMealForm(validMealData)
    expect(result.mealDate.isValid).toBe(true)
  })

  it('handles empty form data', async () => {
    const emptyData: RawMealFormInput = {
      title: '',
      description: '',
      maxParticipant: 0,
      restaurantName: '',
      restaurantAddress: '',
      mealDate: ''
    }
    const result = await validateMealForm(emptyData)
    expect(result.isFormValid).toBe(false)
  })
}) 
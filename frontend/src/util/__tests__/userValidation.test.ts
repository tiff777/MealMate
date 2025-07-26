import { describe, it, expect, vi } from 'vitest'
import { validateField, validateUserForm } from '../userValidation'
import type { UserFormData } from '../userValidation'

// Mock API calls
vi.mock('../api', () => ({
  apiClient: {
    get: vi.fn()
  }
}))

const validFormData: UserFormData = {
  name: 'John Doe',
  email: 'john@test.com',
  university: 'University of Auckland',
  major: 'Computer Science',
  bio: 'Test bio',
  avatar: '👤',
  interests: ['Programming'],
  preferredCuisines: ['Italian']
}

describe('userValidation', () => {
  describe('validateField', () => {
    it('validates name field correctly', async () => {
      const result = await validateField('name', 'John Doe')
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('rejects empty name', async () => {
      const result = await validateField('name', '')
      expect(result.isValid).toBe(false)
      expect(result.errors[0]).toContain('required')
    })

    it('validates email format', async () => {
      const validResult = await validateField('email', 'test@example.com')
      expect(validResult.isValid).toBe(true)

      const invalidResult = await validateField('email', 'invalid-email')
      expect(invalidResult.isValid).toBe(false)
    })

    it('validates university field', async () => {
      const result = await validateField('university', 'Test University')
      expect(result.isValid).toBe(true)
    })

    it('validates major field', async () => {
      const result = await validateField('major', 'Computer Science')
      expect(result.isValid).toBe(true)
    })
  })

  describe('validateUserForm', () => {
    it('validates complete valid form', async () => {
      const result = await validateUserForm(validFormData)
      expect(result.isFormValid).toBe(true)
      expect(result.name.isValid).toBe(true)
      expect(result.email.isValid).toBe(true)
    })

    it('rejects form with invalid fields', async () => {
      const invalidData = { ...validFormData, email: 'invalid-email' }
      const result = await validateUserForm(invalidData)
      expect(result.isFormValid).toBe(false)
      expect(result.email.isValid).toBe(false)
    })

    it('handles empty form data', async () => {
      const emptyData: UserFormData = {
        name: '',
        email: '',
        university: '',
        major: '',
        bio: '',
        avatar: '',
        interests: [],
        preferredCuisines: []
      }
      const result = await validateUserForm(emptyData)
      expect(result.isFormValid).toBe(false)
    })
  })
}) 
import { describe, it, expect } from 'vitest'
import {
  validatePassword,
  validatePasswordMatch,
  validatePasswordForm,
  getPasswordStrengthColor,
  getPasswordStrengthText
} from '../passwordValidation'

describe('passwordValidation', () => {
  describe('validatePassword', () => {
    it('returns error for passwords shorter than 6 characters', () => {
      const result = validatePassword('short')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must be at least 6 characters long')
    })

    it('returns error for passwords without uppercase letters', () => {
      const result = validatePassword('lowercase123!')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must contain at least one uppercase letter')
    })

    it('returns error for passwords without lowercase letters', () => {
      const result = validatePassword('UPPERCASE123!')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must contain at least one lowercase letter')
    })

    it('returns error for passwords without numbers', () => {
      const result = validatePassword('NoNumbers!')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must contain at least one number')
    })

    it('returns error for passwords without special characters', () => {
      const result = validatePassword('NoSpecial123')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Password must contain at least one special character')
    })

    it('returns valid for strong passwords', () => {
      const result = validatePassword('StrongPass123!')
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('handles empty password', () => {
      const result = validatePassword('')
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it('calculates strength correctly', () => {
      const weakResult = validatePassword('weak')
      expect(weakResult.strength).toBe('weak')
      
      const mediumResult = validatePassword('Medium123')
      expect(mediumResult.strength).toBe('medium')
      
      const strongResult = validatePassword('StrongPass123!')
      expect(strongResult.strength).toBe('strong')
    })
  })

  describe('validatePasswordMatch', () => {
    it('returns error when passwords do not match', () => {
      const result = validatePasswordMatch('password1', 'password2')
      expect(result.matches).toBe(false)
      expect(result.error).toBe('Passwords do not match')
    })

    it('returns valid when passwords match', () => {
      const result = validatePasswordMatch('samePassword', 'samePassword')
      expect(result.matches).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('handles empty confirmation password', () => {
      const result = validatePasswordMatch('password', '')
      expect(result.matches).toBe(false)
      expect(result.error).toBe('Please confirm your password')
    })
  })

  describe('validatePasswordForm', () => {
    it('validates both password strength and match', () => {
      const result = validatePasswordForm('weak', 'different')
      expect(result.isPasswordValid).toBe(false)
      expect(result.password.isValid).toBe(false)
      expect(result.match.matches).toBe(false)
    })

    it('returns valid for strong matching passwords', () => {
      const password = 'StrongPass123!'
      const result = validatePasswordForm(password, password)
      expect(result.isPasswordValid).toBe(true)
      expect(result.password.isValid).toBe(true)
      expect(result.match.matches).toBe(true)
    })

    it('fails if password is strong but confirmPassword does not match', () => {
      const result = validatePasswordForm('StrongPass123!', 'DifferentPass123!')
      expect(result.isPasswordValid).toBe(false)
      expect(result.password.isValid).toBe(true)
      expect(result.match.matches).toBe(false)
    })
  })

  describe('getPasswordStrengthColor', () => {
    it('returns red for weak passwords', () => {
      expect(getPasswordStrengthColor('weak')).toBe('text-red-500')
    })

    it('returns yellow for medium passwords', () => {
      expect(getPasswordStrengthColor('medium')).toBe('text-yellow-500')
    })

    it('returns green for strong passwords', () => {
      expect(getPasswordStrengthColor('strong')).toBe('text-green-500')
    })

    it('returns gray for unknown strength', () => {
      expect(getPasswordStrengthColor('unknown' as any)).toBe('text-gray-400')
    })
  })

  describe('getPasswordStrengthText', () => {
    it('returns correct text for each strength level', () => {
      expect(getPasswordStrengthText('weak')).toBe('Weak')
      expect(getPasswordStrengthText('medium')).toBe('Medium')
      expect(getPasswordStrengthText('strong')).toBe('Strong')
    })

    it('returns empty string for unknown strength', () => {
      expect(getPasswordStrengthText('unknown' as any)).toBe('')
    })
  })
}) 
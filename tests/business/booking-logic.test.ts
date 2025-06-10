/**
 * Business Logic Tests - Booking System
 * Tests for appointment scheduling logic and business rules
 */

import { SlotGenerator, DateUtils, BookingValidator, BUSINESS_HOURS } from '@/lib/booking'

describe('Booking Business Logic', () => {
  describe('DateUtils', () => {
    test('should format dates correctly', () => {
      const date = new Date('2024-06-10T14:30:00')
      expect(DateUtils.formatDate(date)).toBe('2024-06-10')
      expect(DateUtils.formatTime(date)).toBe('14:30')
    })

    test('should parse time correctly', () => {
      const { hours, minutes } = DateUtils.parseTime('14:30')
      expect(hours).toBe(14)
      expect(minutes).toBe(30)
    })

    test('should convert time to minutes', () => {
      expect(DateUtils.timeToMinutes('09:00')).toBe(540)
      expect(DateUtils.timeToMinutes('14:30')).toBe(870)
      expect(DateUtils.timeToMinutes('18:00')).toBe(1080)
    })

    test('should add minutes to time', () => {
      expect(DateUtils.addMinutes('09:00', 30)).toBe('09:30')
      expect(DateUtils.addMinutes('14:30', 90)).toBe('16:00')
    })

    test('should identify weekdays correctly', () => {
      const monday = new Date('2024-06-10') // Monday
      const saturday = new Date('2024-06-15') // Saturday
      const sunday = new Date('2024-06-16') // Sunday
      
      expect(DateUtils.getWeekdayName(monday)).toBe('monday')
      expect(DateUtils.getWeekdayName(saturday)).toBe('saturday')
      expect(DateUtils.getWeekdayName(sunday)).toBe('sunday')
    })

    test('should identify holidays', () => {
      expect(DateUtils.isHoliday('2025-01-01')).toBe(true) // New Year
      expect(DateUtils.isHoliday('2025-12-25')).toBe(true) // Christmas
      expect(DateUtils.isHoliday('2024-06-10')).toBe(false) // Regular day
    })
  })

  describe('SlotGenerator', () => {
    test('should generate slots for working days', () => {
      const monday = new Date('2024-06-10') // Monday
      const slots = SlotGenerator.generateDaySlots(monday, 60)
      
      expect(slots.length).toBeGreaterThan(0)
      
      // Should have morning slots
      const morningSlot = slots.find(slot => slot.time === '09:00')
      expect(morningSlot).toBeDefined()
      expect(morningSlot?.available).toBe(true)
      
      // Should have afternoon slots
      const afternoonSlot = slots.find(slot => slot.time === '15:00')
      expect(afternoonSlot).toBeDefined()
      expect(afternoonSlot?.available).toBe(true)
    })

    test('should not generate slots during lunch break', () => {
      const monday = new Date('2024-06-10')
      const slots = SlotGenerator.generateDaySlots(monday, 60)
      
      // Lunch break slots should be unavailable
      const lunchSlots = slots.filter(slot => 
        slot.time >= '12:00' && slot.time < '14:00'
      )
      
      lunchSlots.forEach(slot => {
        expect(slot.available).toBe(false)
        expect(slot.reason).toContain('déjeuner')
      })
    })

    test('should return empty array for weekends', () => {
      const saturday = new Date('2024-06-15') // Saturday
      const sunday = new Date('2024-06-16') // Sunday
      
      const saturdaySlots = SlotGenerator.generateDaySlots(saturday, 60)
      const sundaySlots = SlotGenerator.generateDaySlots(sunday, 60)
      
      expect(saturdaySlots).toHaveLength(0)
      expect(sundaySlots).toHaveLength(0)
    })

    test('should respect consultation duration', () => {
      const monday = new Date('2024-06-10')
      const slots60 = SlotGenerator.generateDaySlots(monday, 60)
      const slots90 = SlotGenerator.generateDaySlots(monday, 90)
      
      // 90-minute slots should be fewer than 60-minute slots
      const available60 = slots60.filter(s => s.available).length
      const available90 = slots90.filter(s => s.available).length
      
      expect(available90).toBeLessThanOrEqual(available60)
    })

    test('should generate weekly schedule correctly', () => {
      const startDate = new Date('2024-06-10') // Monday
      const endDate = new Date('2024-06-16') // Sunday
      
      const schedule = SlotGenerator.getAvailableSlots(startDate, endDate, 60)
      
      expect(schedule).toHaveLength(7) // 7 days
      
      // Working days should have slots
      const monday = schedule.find(day => day.date === '2024-06-10')
      expect(monday?.isWorkingDay).toBe(true)
      expect(monday?.slots.length).toBeGreaterThan(0)
      
      // Weekend should be marked as non-working
      const saturday = schedule.find(day => day.date === '2024-06-15')
      expect(saturday?.isWorkingDay).toBe(false)
      expect(saturday?.reason).toBe('Fermé')
    })
  })

  describe('BookingValidator', () => {
    const validBookingData = {
      firstName: 'Marie',
      lastName: 'Dubois',
      email: 'marie@test.fr',
      phone: '0651687430',
      consultationType: 'cabinet' as const,
      preferredDate: '2024-06-10', // Monday
      preferredTime: '10:00',
      duration: '60' as const,
      isFirstConsultation: true,
      reasonForConsultation: 'Je souhaiterais une consultation pour anxiété',
      rgpdConsent: true
    }

    test('should accept valid booking request', () => {
      const result = BookingValidator.validateBookingRequest(validBookingData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    test('should reject past dates', () => {
      const pastData = {
        ...validBookingData,
        preferredDate: '2020-01-01' // Past date
      }
      
      const result = BookingValidator.validateBookingRequest(pastData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain(expect.stringMatching(/passé/))
    })

    test('should reject dates too far in advance', () => {
      const futureDate = new Date()
      futureDate.setMonth(futureDate.getMonth() + 6) // 6 months ahead
      
      const futureData = {
        ...validBookingData,
        preferredDate: DateUtils.formatDate(futureDate)
      }
      
      const result = BookingValidator.validateBookingRequest(futureData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain(expect.stringMatching(/3 mois/))
    })

    test('should reject weekend appointments', () => {
      const weekendData = {
        ...validBookingData,
        preferredDate: '2024-06-15' // Saturday
      }
      
      const result = BookingValidator.validateBookingRequest(weekendData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain(expect.stringMatching(/semaine/))
    })

    test('should reject holidays', () => {
      const holidayData = {
        ...validBookingData,
        preferredDate: '2025-01-01' // New Year's Day
      }
      
      const result = BookingValidator.validateBookingRequest(holidayData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain(expect.stringMatching(/fériés/))
    })

    test('should validate consultation type and duration compatibility', () => {
      const domicileData = {
        ...validBookingData,
        consultationType: 'domicile' as const,
        duration: '60' as const // Domicile should require 90min
      }
      
      const result = BookingValidator.validateBookingRequest(domicileData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain(expect.stringMatching(/durée.*consultation/))
    })
  })

  describe('Business Hours', () => {
    test('should have valid business hours configuration', () => {
      expect(BUSINESS_HOURS.monday).toBeDefined()
      expect(BUSINESS_HOURS.tuesday).toBeDefined()
      expect(BUSINESS_HOURS.wednesday).toBeDefined()
      expect(BUSINESS_HOURS.thursday).toBeDefined()
      expect(BUSINESS_HOURS.friday).toBeDefined()
      expect(BUSINESS_HOURS.saturday).toBeNull()
      expect(BUSINESS_HOURS.sunday).toBeNull()
    })

    test('should have consistent break times', () => {
      const workingDays = ['monday', 'tuesday', 'wednesday', 'thursday'] as const
      
      workingDays.forEach(day => {
        const hours = BUSINESS_HOURS[day]
        expect(hours).toBeDefined()
        expect(hours!.break).toBeDefined()
        expect(hours!.break.start).toBe('12:00')
        expect(hours!.break.end).toMatch(/1[3-4]:00/) // 13:00 or 14:00
      })
    })

    test('should have logical opening and closing times', () => {
      Object.entries(BUSINESS_HOURS).forEach(([day, hours]) => {
        if (hours) {
          const openTime = DateUtils.timeToMinutes(hours.open)
          const closeTime = DateUtils.timeToMinutes(hours.close)
          const breakStart = DateUtils.timeToMinutes(hours.break.start)
          const breakEnd = DateUtils.timeToMinutes(hours.break.end)
          
          expect(openTime).toBeLessThan(closeTime)
          expect(breakStart).toBeGreaterThan(openTime)
          expect(breakEnd).toBeLessThan(closeTime)
          expect(breakStart).toBeLessThan(breakEnd)
        }
      })
    })
  })
})
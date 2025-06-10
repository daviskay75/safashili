/**
 * API Tests - Contact Form
 * Tests for /api/contact endpoint
 */

import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

describe('/api/contact', () => {
  const validContactData = {
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@test.fr',
    phone: '0651687430',
    message: 'Je souhaiterais prendre rendez-vous pour une consultation.',
    consultationType: 'cabinet',
    urgency: 'medium',
    rgpdConsent: true
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should accept valid contact form submission', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(validContactData),
      headers: { 'Content-Type': 'application/json' }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toContain('envoyé avec succès')
  })

  test('should reject invalid email format', async () => {
    const invalidData = { ...validContactData, email: 'invalid-email' }
    
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: { 'Content-Type': 'application/json' }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Données invalides')
    expect(data.details).toContain('email')
  })

  test('should reject missing GDPR consent', async () => {
    const invalidData = { ...validContactData, rgpdConsent: false }
    
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: { 'Content-Type': 'application/json' }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.details).toContain('conditions de traitement')
  })

  test('should reject too short message', async () => {
    const invalidData = { ...validContactData, message: 'Test' }
    
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: { 'Content-Type': 'application/json' }
    })

    const response = await POST(request)
    
    expect(response.status).toBe(400)
  })

  test('should validate French phone number format', async () => {
    const invalidData = { ...validContactData, phone: '123456789' }
    
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: { 'Content-Type': 'application/json' }
    })

    const response = await POST(request)
    
    expect(response.status).toBe(400)
  })

  test('should handle GET method with 405', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'GET'
    })

    const response = await POST(request)
    
    expect(response.status).toBe(405)
  })
})
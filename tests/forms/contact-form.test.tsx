/**
 * Form Tests - Contact Form Component
 * Tests for ContactForm component behavior and validation
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/forms'

// Mock fetch for form submission
global.fetch = jest.fn()

describe('ContactForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, message: 'Message envoyé' })
    })
  })

  test('renders all required form fields', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/téléphone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/type de consultation/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/rgpd/i)).toBeInTheDocument()
  })

  test('validates required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /envoyer/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/prénom.*requis/i)).toBeInTheDocument()
      expect(screen.getByText(/nom.*requis/i)).toBeInTheDocument()
      expect(screen.getByText(/email.*invalide/i)).toBeInTheDocument()
    })
  })

  test('validates email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')
    await user.tab() // Trigger blur event
    
    await waitFor(() => {
      expect(screen.getByText(/email.*invalide/i)).toBeInTheDocument()
    })
  })

  test('validates French phone number', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const phoneInput = screen.getByLabelText(/téléphone/i)
    await user.type(phoneInput, '123456789')
    await user.tab()
    
    await waitFor(() => {
      expect(screen.getByText(/téléphone.*invalide/i)).toBeInTheDocument()
    })
  })

  test('requires GDPR consent', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Fill form without GDPR consent
    await user.type(screen.getByLabelText(/prénom/i), 'Marie')
    await user.type(screen.getByLabelText(/nom/i), 'Dubois')
    await user.type(screen.getByLabelText(/email/i), 'marie@test.fr')
    await user.type(screen.getByLabelText(/téléphone/i), '0651687430')
    await user.type(screen.getByLabelText(/message/i), 'Message de test pour validation')
    
    const submitButton = screen.getByRole('button', { name: /envoyer/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/conditions.*données/i)).toBeInTheDocument()
    })
  })

  test('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Fill all required fields
    await user.type(screen.getByLabelText(/prénom/i), 'Marie')
    await user.type(screen.getByLabelText(/nom/i), 'Dubois')
    await user.type(screen.getByLabelText(/email/i), 'marie@test.fr')
    await user.type(screen.getByLabelText(/téléphone/i), '0651687430')
    await user.type(screen.getByLabelText(/message/i), 'Je souhaiterais prendre rendez-vous')
    await user.click(screen.getByLabelText(/rgpd/i))
    
    const submitButton = screen.getByRole('button', { name: /envoyer/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('marie@test.fr')
      }))
    })
  })

  test('shows success message after submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Fill and submit form
    await user.type(screen.getByLabelText(/prénom/i), 'Marie')
    await user.type(screen.getByLabelText(/nom/i), 'Dubois')
    await user.type(screen.getByLabelText(/email/i), 'marie@test.fr')
    await user.type(screen.getByLabelText(/téléphone/i), '0651687430')
    await user.type(screen.getByLabelText(/message/i), 'Message de test')
    await user.click(screen.getByLabelText(/rgpd/i))
    await user.click(screen.getByRole('button', { name: /envoyer/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/message envoyé/i)).toBeInTheDocument()
    })
  })

  test('handles submission errors', async () => {
    const user = userEvent.setup()
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
    
    render(<ContactForm />)
    
    // Fill and submit form
    await user.type(screen.getByLabelText(/prénom/i), 'Marie')
    await user.type(screen.getByLabelText(/nom/i), 'Dubois')
    await user.type(screen.getByLabelText(/email/i), 'marie@test.fr')
    await user.type(screen.getByLabelText(/téléphone/i), '0651687430')
    await user.type(screen.getByLabelText(/message/i), 'Message de test')
    await user.click(screen.getByLabelText(/rgpd/i))
    await user.click(screen.getByRole('button', { name: /envoyer/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/erreur.*envoi/i)).toBeInTheDocument()
    })
  })
})
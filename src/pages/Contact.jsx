import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="container contact">

      <div className="contact-head">
        <span className="section-label">Get in Touch</span>
        <h1>We'd Love to Hear From You</h1>
        <p>
          Questions about an order, a piece, or a custom request?
          Our team is always here to help.
        </p>
      </div>

      <div className="contact-layout">

        {/* Info Cards */}
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">✉</div>
            <h4>Email Us</h4>
            <p>hello@aurelle.pk</p>
          </div>
          <div className="info-card">
            <div className="info-icon">☎</div>
            <h4>Call Us</h4>
            <p>+92 300 1234567</p>
          </div>
          <div className="info-card">
            <div className="info-icon">⌂</div>
            <h4>Visit Us</h4>
            <p>Gulberg III, Lahore, Pakistan</p>
          </div>
          <div className="info-card">
            <div className="info-icon">☾</div>
            <h4>Working Hours</h4>
            <p>Mon – Sat, 10am – 8pm</p>
          </div>
        </div>

        {/* Form */}
        <div className="contact-form-wrap">
          {sent ? (
            <div className="contact-sent">
              <div className="sent-icon">✦</div>
              <h3>Message Sent!</h3>
              <p>
                Thank you, {form.name.split(' ')[0]}! We'll get back to you
                within 24 hours.
              </p>
              <button
                className="btn-outline"
                onClick={() => {
                  setSent(false)
                  setForm({ name: '', email: '', subject: '', message: '' })
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Ayesha Khan" required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="ayesha@example.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject *</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Order inquiry" required />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows="5" placeholder="Write your message..." required />
              </div>
              <button type="submit" className="btn-gold send-btn">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact
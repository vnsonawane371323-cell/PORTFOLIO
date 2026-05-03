import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import './Contact.css'

const socials = [
  { icon: 'in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/vedant-sonawane-57012a337?utm_source=share_via&utm_content=profile&utm_medium=member_android', sub: 'linkedin.com/in/vedant-sonawane' },
  { icon: '⌥', label: 'GitHub', href: 'https://github.com/vnsonawane371323-cell', sub: 'https://github.com/vnsonawane371323-cell' },
  { icon: '@', label: 'Email', href: 'mailto:vedantsonawane2244@gmail.com', sub: 'vedantsonawane2244@gmail.com' },
  { icon: '↗', label: 'Portfolio', href: 'https://vedant-sonawane-portfolio.in', sub: 'vedant-sonawane-portfolio.in' },
]

export default function Contact() {
  const SERVICE_ID = 'service_9ztu2iz'
  const TEMPLATE_ID = 'template_vx3oi33'
  const PUBLIC_KEY = 'gDOmo4XGK6q7LZyeR'

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      PUBLIC_KEY
    )
    .then(() => {
      setLoading(false)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    })
    .catch((err) => {
      setLoading(false)
      console.error(err)
      alert("Something went wrong. Please try again.")
    })
  }

  return (
    <section id="contact" className="section-pad contact-section">
      <div className="contact-inner">
        <div className="contact-bg-text" aria-hidden>LET'S TALK</div>

        <div className="contact-grid">
          {/* LEFT */}
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-tag">Get In Touch</div>
            <h2 className="contact-title">
              Let's Build<br />
              <span className="grad-text">Something Together</span>
            </h2>
            <p className="contact-sub">
              Open to internships, freelance projects, and collaborations. Drop a message — I usually respond within 24 hours.
            </p>

            <div className="contact-links">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="c-link" target="_blank" rel="noreferrer">
                  <div className="c-link-icon">{s.icon}</div>
                  <div>
                    <div className="c-link-label">{s.label}</div>
                    <div className="c-link-sub">{s.sub}</div>
                  </div>
                  <span className="c-link-arrow">→</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="contact-form-card">
              {sent ? (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="c-form">
                  <div className="fg">
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="fg">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  <div className="fg">
                    <label>Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      placeholder="Tell me about your project or opportunity..."
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { useState, type FormEvent } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
} from 'lucide-react';
import { Section, Eyebrow, Reveal } from '../ui/Section';
import { profile } from '../../data/profile';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Contact from ${formData.name}`,
          message: formData.message,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await response.json() as { success?: boolean | string; message?: string }
        : { message: 'The contact backend is unavailable. Please deploy to Vercel and configure the environment variables.' };

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err: unknown) {
      console.error('Contact Form Error:', err);
      setStatus('error');
      setErrorMsg("Couldn't send right now. Try the direct email link below.");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all duration-150";
  const inputStyle = {
    background: 'var(--surface)',
    borderColor: 'var(--border)',
    color: 'var(--ink)',
  };

  return (
    <Section id="contact">
      <Eyebrow>Contact</Eyebrow>
      <Reveal>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl mb-3 tracking-tight" style={{ color: 'var(--ink)' }}>
          Let's work{' '}
          <span style={{ color: 'var(--accent)' }}>together.</span>
        </h2>
        <p className="max-w-xl mb-12 text-base leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
          Have a project or role in mind? Send me a message and I'll get back to you soon.
        </p>
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl">
        {/* LEFT: Contact info */}
        <Reveal delay={0.1} className="lg:col-span-5 space-y-5">
          <div className="rounded-xl border p-6 space-y-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h3 className="font-display font-bold text-base" style={{ color: 'var(--ink)' }}>
              Get in touch
            </h3>

            <div className="space-y-3">
              {[
                { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                { icon: Phone, label: 'Phone / WhatsApp', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
                { icon: MapPin, label: 'Location', value: `${profile.location} (IST)`, href: undefined },
              ].map(({ icon: Icon, label, value, href }) => {
                const Wrapper = href ? 'a' : 'div';
                return (
                  <Wrapper
                    key={label}
                    {...(href ? { href } : {})}
                    className="flex items-center gap-3.5 p-3 rounded-lg border transition-all duration-150"
                    style={{ borderColor: 'var(--border)', color: 'var(--ink-muted)' }}
                    onMouseEnter={href ? (e => {
                      const t = e.currentTarget as HTMLElement;
                      t.style.borderColor = 'var(--accent)';
                      t.style.color = 'var(--accent)';
                    }) : undefined}
                    onMouseLeave={href ? (e => {
                      const t = e.currentTarget as HTMLElement;
                      t.style.borderColor = 'var(--border)';
                      t.style.color = 'var(--ink-muted)';
                    }) : undefined}
                  >
                    <div className="icon-wrap h-9 w-9 shrink-0" style={{ borderRadius: 8 }}>
                      <Icon size={16} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-subtle)' }}>
                        {label}
                      </p>
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--ink)' }}>{value}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--ink-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Also find me on
              </p>
              <div className="flex gap-2">
                {[
                  { href: profile.github, label: 'GitHub', icon: Github },
                  { href: profile.linkedin, label: 'LinkedIn', icon: Linkedin },
                ].map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium transition-all duration-150"
                    style={{ borderColor: 'var(--border)', color: 'var(--ink-muted)', background: 'var(--bg)' }}
                    onMouseEnter={e => {
                      const t = e.currentTarget as HTMLElement;
                      t.style.borderColor = 'var(--accent)';
                      t.style.color = 'var(--accent)';
                    }}
                    onMouseLeave={e => {
                      const t = e.currentTarget as HTMLElement;
                      t.style.borderColor = 'var(--border)';
                      t.style.color = 'var(--ink-muted)';
                    }}
                  >
                    <Icon size={15} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* RIGHT: Form */}
        <Reveal delay={0.2} className="lg:col-span-7">
          <div className="rounded-xl border p-6 sm:p-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            {status === 'success' ? (
              <div className="py-10 text-center space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full flex items-center justify-center" style={{ background: 'var(--accent-pale)' }}>
                  <CheckCircle2 size={36} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="font-display font-bold text-2xl" style={{ color: 'var(--ink)' }}>
                  Message sent!
                </h3>
                <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: 'var(--ink-muted)' }}>
                  Thanks for reaching out. I'll reply to{' '}
                  <span className="font-semibold" style={{ color: 'var(--accent)' }}>{profile.email}</span>{' '}
                  as soon as I can.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-2 px-5 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--border)', color: 'var(--ink-muted)' }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

                <div className="flex items-center justify-between pb-3 border-b mb-5" style={{ borderColor: 'var(--border)' }}>
                  <h3 className="font-display font-bold text-base" style={{ color: 'var(--ink)' }}>
                    Send a message
                  </h3>
                  <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--accent)' }}>
                    <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
                    Direct to Gmail
                  </span>
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div className="flex items-start gap-3 p-4 rounded-lg border" style={{ background: '#FEF2F2', borderColor: '#FECACA' }}>
                    <AlertCircle size={17} className="shrink-0 mt-0.5" style={{ color: '#DC2626' }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#991B1B' }}>Something went wrong</p>
                      <p className="text-xs mt-0.5" style={{ color: '#B91C1C' }}>{errorMsg}</p>
                      <a
                        href={`mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi ${profile.name},\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`)}`}
                        className="inline-flex items-center mt-2 text-xs font-semibold gap-1 underline"
                        style={{ color: '#DC2626', textUnderlineOffset: '3px' }}
                      >
                        <Mail size={13} /> Email me directly
                      </a>
                    </div>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-semibold" style={{ color: 'var(--ink-muted)' }}>
                      Name <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ink-subtle)' }} />
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`${inputClass} pl-9`}
                        style={inputStyle}
                        onFocus={e => {
                          (e.target as HTMLElement).style.borderColor = 'var(--accent)';
                          (e.target as HTMLElement).style.outline = `3px solid rgba(45,122,79,0.12)`;
                        }}
                        onBlur={e => {
                          (e.target as HTMLElement).style.borderColor = 'var(--border)';
                          (e.target as HTMLElement).style.outline = 'none';
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-semibold" style={{ color: 'var(--ink-muted)' }}>
                      Email <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ink-subtle)' }} />
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`${inputClass} pl-9`}
                        style={inputStyle}
                        onFocus={e => {
                          (e.target as HTMLElement).style.borderColor = 'var(--accent)';
                          (e.target as HTMLElement).style.outline = `3px solid rgba(45,122,79,0.12)`;
                        }}
                        onBlur={e => {
                          (e.target as HTMLElement).style.borderColor = 'var(--border)';
                          (e.target as HTMLElement).style.outline = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-xs font-semibold" style={{ color: 'var(--ink-muted)' }}>
                    Subject
                  </label>
                  <div className="relative">
                    <MessageSquare size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ink-subtle)' }} />
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className={`${inputClass} pl-9`}
                      style={inputStyle}
                      onFocus={e => {
                        (e.target as HTMLElement).style.borderColor = 'var(--accent)';
                        (e.target as HTMLElement).style.outline = `3px solid rgba(45,122,79,0.12)`;
                      }}
                      onBlur={e => {
                        (e.target as HTMLElement).style.borderColor = 'var(--border)';
                        (e.target as HTMLElement).style.outline = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-semibold" style={{ color: 'var(--ink-muted)' }}>
                    Message <span style={{ color: 'var(--accent)' }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={`Hi Kishkindhan, I'd like to talk about...`}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                    onFocus={e => {
                      (e.target as HTMLElement).style.borderColor = 'var(--accent)';
                      (e.target as HTMLElement).style.outline = `3px solid rgba(45,122,79,0.12)`;
                    }}
                    onBlur={e => {
                      (e.target as HTMLElement).style.borderColor = 'var(--border)';
                      (e.target as HTMLElement).style.outline = 'none';
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    background: 'var(--accent)',
                    color: '#fff',
                  }}
                  onMouseEnter={e => {
                    if (status !== 'submitting') (e.currentTarget as HTMLElement).style.background = 'var(--accent-mid)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                  }}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

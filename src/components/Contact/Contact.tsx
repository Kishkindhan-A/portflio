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
  Sparkles,
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

    // Basic Validation
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
        : { message: 'The contact backend is unavailable. Deploy this project to Vercel and configure its environment variables.' };

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err: unknown) {
      console.error('Contact Form Error:', err);
      setStatus('error');
      setErrorMsg('The message could not be transmitted right now. Please try again or use the direct email link below.');
    }
  };

  return (
    <Section id="contact">
      <div className="relative glass-panel-strong p-6 sm:p-12 lg:p-16 overflow-hidden rounded-[2.5rem] shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
        {/* Ambient aura orbs */}
        <div className="absolute -top-28 left-1/3 -translate-x-1/2 h-80 w-80 rounded-full bg-emerald-glow/8 blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-28 right-1/4 h-80 w-80 rounded-full bg-sky-accent/8 blur-[140px] pointer-events-none" />

        <div className="flex justify-center relative z-10">
          <Eyebrow>Get In Touch</Eyebrow>
        </div>

        <Reveal>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl mb-4 text-center relative z-10 tracking-tight text-slate-900">
            LET&apos;S BUILD <span className="bg-gradient-to-r from-slate-900 via-emerald-light to-sky-accent bg-clip-text text-transparent">SOMETHING.</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto mb-12 text-center relative z-10 text-sm sm:text-base leading-relaxed">
            Have a project, role, or collaboration in mind? Send a message and I&apos;ll get back to you promptly.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 items-start relative z-20 max-w-6xl mx-auto">
          {/* LEFT: Direct Info & Social Channels (5 cols) */}
          <Reveal delay={0.1} className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-6">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Sparkles size={18} className="text-emerald-light" /> Contact Info
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Feel free to reach out via the form or connect directly through any of my official handles.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl liquid-bubble text-slate-700 hover:text-emerald-light group"
                >
                  <div className="h-11 w-11 rounded-xl liquid-bubble flex items-center justify-center text-emerald-light shrink-0 group-hover:scale-110">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Email Address</p>
                    <p className="text-sm font-mono text-slate-900 font-semibold truncate group-hover:text-emerald-light">{profile.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl liquid-bubble text-slate-700 hover:text-emerald-light group"
                >
                  <div className="h-11 w-11 rounded-xl liquid-bubble flex items-center justify-center text-emerald-glow shrink-0 group-hover:scale-110">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Phone / WhatsApp</p>
                    <p className="text-sm font-mono text-slate-900 font-semibold group-hover:text-emerald-light">{profile.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl liquid-bubble text-slate-700">
                  <div className="h-11 w-11 rounded-xl liquid-bubble flex items-center justify-center text-sky-accent shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Location</p>
                    <p className="text-sm font-mono text-slate-900 font-semibold">{profile.location} (IST Timezone)</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-4 border-t border-slate-100">
                <p className="label-tag mb-3 text-[10px]">Profiles &amp; Code</p>
                <div className="flex items-center gap-3">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl liquid-bubble text-xs font-mono text-slate-800 hover:text-emerald-light font-bold"
                  >
                    <Github size={16} /> GitHub
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl liquid-bubble text-xs font-mono text-slate-800 hover:text-emerald-light font-bold"
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: Live Interactive Form (7 cols) */}
          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-9 rounded-3xl shadow-[0_12px_36px_rgba(15,23,42,0.05)]">
              {status === 'success' ? (
                /* SUCCESS STATE */
                <div className="py-12 px-4 text-center space-y-6 animate-fadeIn">
                  <div className="h-20 w-20 mx-auto rounded-full liquid-bubble flex items-center justify-center text-emerald-glow shadow-[0_4px_20px_rgba(16,185,129,0.25)]">
                    <CheckCircle2 size={44} />
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                    Message Delivered!
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                    Thank you for reaching out! Your message was transmitted directly to{' '}
                    <span className="text-emerald-light font-mono font-bold">{profile.email}</span>. I will reply to you as soon as possible.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="px-6 py-3 rounded-2xl liquid-pill text-xs font-mono font-bold text-emerald-light hover:bg-emerald-glow/10 transition-all cursor-pointer"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                </div>
              ) : (
                /* INPUT FORM */
                <form noValidate onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-px w-px opacity-0"
                  />
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      Send a Direct Message
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-light font-semibold flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-glow animate-ping" />
                      Direct to Gmail
                    </span>
                  </div>

                  {/* Error Notification */}
                  {status === 'error' && (
                    <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-slate-700 shadow-xs">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                          <AlertCircle size={17} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-display font-bold text-sm text-red-800">Transmission interrupted</p>
                          <p className="text-xs sm:text-sm leading-relaxed text-red-600">{errorMsg}</p>
                        </div>
                      </div>
                      <a
                        href={`mailto:${profile.email}?subject=${encodeURIComponent(
                          formData.subject || 'Portfolio Inquiry'
                        )}&body=${encodeURIComponent(
                          `Hi ${profile.name},\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
                        )}`}
                        className="inline-flex items-center mt-4 px-3.5 py-2 rounded-xl liquid-pill font-mono text-[11px] text-emerald-light hover:bg-emerald-glow/10 transition-colors font-bold"
                      >
                        <Mail size={14} className="mr-2" />
                        Use direct email instead
                      </a>
                    </div>
                  )}

                  {/* Name & Email Fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="block text-xs font-mono text-slate-700 font-semibold">
                        YOUR NAME <span className="text-emerald-light">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <User size={16} />
                        </div>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Smith"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-body focus:outline-none focus:border-emerald-glow focus:ring-2 focus:ring-emerald-glow/20 transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="block text-xs font-mono text-slate-700 font-semibold">
                        YOUR EMAIL <span className="text-emerald-light">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Mail size={16} />
                        </div>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. alex@company.com"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-body focus:outline-none focus:border-emerald-glow focus:ring-2 focus:ring-emerald-glow/20 transition-all shadow-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-700 font-semibold">
                      SUBJECT
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <MessageSquare size={16} />
                      </div>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Full Stack Project / Job Opportunity"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-body focus:outline-none focus:border-emerald-glow focus:ring-2 focus:ring-emerald-glow/20 transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-xs font-mono text-slate-700 font-semibold">
                      YOUR MESSAGE <span className="text-emerald-light">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Kishkindhan, I'd like to discuss..."
                      className="w-full p-4 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-body focus:outline-none focus:border-emerald-glow focus:ring-2 focus:ring-emerald-glow/20 transition-all resize-none leading-relaxed shadow-xs"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold tracking-wider font-mono text-white bg-slate-900 hover:bg-slate-800 shadow-[0_4px_14px_rgba(15,23,42,0.18)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>TRANSMITTING MESSAGE...</span>
                        </>
                      ) : (
                        <>
                          <span>TRANSMIT MESSAGE</span>
                          <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

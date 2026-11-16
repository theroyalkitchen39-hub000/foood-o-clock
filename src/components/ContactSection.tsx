import { useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [topic, setTopic] = useState('Table & Group Order');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactInfo.trim() || !message.trim()) {
      setError('Please fill in your name, phone or email, and message.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setContactInfo('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="bg-[#080808] py-20 sm:py-24 border-b border-white/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Flagship Location & Hours */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-[#FFC400]">
              Visit Or Reach Out
            </span>
            <h2 className="mt-3 font-display font-extrabold text-[clamp(2rem,3.6vw,3rem)] leading-[1.04] tracking-[-0.02em] text-white [text-wrap:balance]">
              ALWAYS READY WHEN CRAVINGS HIT.
            </h2>
            <p className="mt-4 text-[#BDBDBD] text-sm sm:text-base leading-relaxed">
              Dine in at our late-night counter, swing by for counter pickup, or
              book a hot catering spread for your crew.
            </p>

            <div className="mt-8 space-y-6 border-t border-white/10 pt-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#FFC400] shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-white">
                    Flagship Kitchen
                  </p>
                  <p className="text-sm text-[#BDBDBD] mt-1">
                    418 Mercer Boulevard, Downtown Food District
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#FFC400] shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-white">
                    Kitchen Hours
                  </p>
                  <p className="text-sm text-[#BDBDBD] mt-1 tabular-nums">
                    Mon – Sun: 11:00 AM — 02:00 AM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#FFC400] shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-white">
                    Direct Order Line
                  </p>
                  <p className="text-sm text-[#BDBDBD] mt-1 tabular-nums">
                    +1 (555) 239-0190
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#FFC400] shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-white">
                    Events & Catering
                  </p>
                  <p className="text-sm text-[#BDBDBD] mt-1">
                    hello@foodoclock.kitchen
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive Inquiry Form */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#151515] border border-white/10 p-6 sm:p-10"
          >
            {submitted ? (
              <div className="py-10 text-center sm:text-left">
                <CheckCircle2 className="w-10 h-10 text-[#FFC400] mb-4 mx-auto sm:mx-0" />
                <h3 className="font-display text-2xl font-extrabold text-white">
                  Message Received
                </h3>
                <p className="mt-2 text-sm text-[#BDBDBD] max-w-[44ch]">
                  Thanks, {name}. Our kitchen team will reply via{' '}
                  <span className="text-white">{contactInfo}</span> within 30
                  minutes during kitchen hours.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-6 border border-white/25 hover:border-[#FFC400] hover:text-[#FFC400] font-display text-xs font-bold uppercase tracking-[0.1em] px-5 py-3 transition-colors cursor-pointer"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h3 className="font-display text-xl font-extrabold text-white">
                    Drop Us A Line
                  </h3>
                  <p className="text-xs text-[#BDBDBD] mt-1">
                    Questions, group trays, or late-night catering inquiries.
                  </p>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="text-xs font-medium text-[#FFC400] bg-[#080808] border border-[#FFC400]/50 px-4 py-3"
                  >
                    {error}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-display text-xs font-semibold uppercase tracking-[0.1em] text-[#BDBDBD] mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full bg-[#080808] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#BDBDBD]/40 focus:outline-none focus:border-[#FFC400]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-info"
                      className="block font-display text-xs font-semibold uppercase tracking-[0.1em] text-[#BDBDBD] mb-2"
                    >
                      Phone or Email
                    </label>
                    <input
                      id="contact-info"
                      type="text"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="you@example.com or (555) 012-3456"
                      className="w-full bg-[#080808] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#BDBDBD]/40 focus:outline-none focus:border-[#FFC400]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block font-display text-xs font-semibold uppercase tracking-[0.1em] text-[#BDBDBD] mb-2"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-[#080808] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFC400]"
                  >
                    <option value="Table & Group Order">
                      Table & Group Order
                    </option>
                    <option value="Event Catering">Event Catering</option>
                    <option value="Feedback & Quality">
                      Feedback & Quality
                    </option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-display text-xs font-semibold uppercase tracking-[0.1em] text-[#BDBDBD] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you are craving or planning..."
                    className="w-full bg-[#080808] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#BDBDBD]/40 focus:outline-none focus:border-[#FFC400] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#FFC400] text-[#080808] hover:bg-[#FFD233] active:scale-[0.98] font-display text-xs font-extrabold tracking-[0.12em] uppercase px-7 py-4 transition-all cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

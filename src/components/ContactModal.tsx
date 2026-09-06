import { useState } from 'react';
import { X, Mail, Send, Check, Copy } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sourabhsheoran@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      onClose();
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6 anim-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#1e1e21] border border-white/15 rounded-sm p-6 sm:p-8 text-white shadow-2xl overflow-y-auto max-h-[92vh] anim-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 text-white/60 hover:text-white transition-colors focus:outline-none"
        >
          <X size={22} />
        </button>

        {/* Modal Header */}
        <div className="border-b border-white/10 pb-5">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/50 font-medium">
            CONTACT & COLLABORATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mt-1">
            Let's connect & build.
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed">
            Have a project in mind, an opportunity, or want to discuss full-stack & data engineering?
            Feel free to reach out.
          </p>
        </div>

        {/* Quick Contacts Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
          <div className="flex items-center justify-between p-3 rounded-sm bg-white/5 border border-white/10">
            <div className="flex items-center gap-2.5 text-xs text-white/80 truncate">
              <Mail size={16} className="text-white/60 shrink-0" />
              <span className="truncate">sourabhsheoran@gmail.com</span>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="ml-2 text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors shrink-0"
              title="Copy Email"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-sm bg-white/5 border border-white/10 text-xs text-white/80">
            <span>Location</span>
            <span className="text-white/60">India • Available Worldwide</span>
          </div>
        </div>

        {/* Form or Submission Feedback */}
        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center anim-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3">
              <Check size={24} />
            </div>
            <h3 className="text-lg font-medium">Message Sent Successfully</h3>
            <p className="text-xs text-white/60 mt-1 max-w-sm">
              Thank you for reaching out! I'll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:border-white/60 focus:bg-white/10 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:border-white/60 focus:bg-white/10 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                placeholder="Project inquiry, consulting, or hello"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-white/5 border border-white/15 rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:border-white/60 focus:bg-white/10 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="Write your message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/15 rounded-sm px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:border-white/60 focus:bg-white/10 focus:outline-none transition-all resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-white/40">
                Typically responds within 24 hours
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-white text-black font-medium text-xs sm:text-sm hover:bg-white/90 active:scale-[0.98] transition-all"
              >
                <span>Send Message</span>
                <Send size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

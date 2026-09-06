import { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, ShieldCheck, Calendar, Award } from 'lucide-react';
import type { CertificationItem } from '../data/certificationsData';

interface CertificateModalProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#14161a] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#191b20]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                  {certificate.title}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 size={10} />
                  <span>Verified</span>
                </span>
              </div>
              <p className="text-xs text-white/50">{certificate.organization}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body with Certificate Display */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Certificate Image or Rich Preview */}
          <div className="relative w-full rounded-xl overflow-hidden border border-white/15 bg-black/40 shadow-inner flex items-center justify-center">
            {certificate.image ? (
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full h-auto max-h-[58vh] object-contain rounded-lg"
              />
            ) : (
              <div className="w-full py-20 px-8 flex flex-col items-center justify-center text-center bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-white/80 mb-4">
                  <Award size={40} className="text-amber-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{certificate.title}</h4>
                <p className="text-sm text-white/60 max-w-md mb-6">{certificate.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs">
                  <ShieldCheck size={14} />
                  <span>Credential record confirmed with issuing body</span>
                </div>
              </div>
            )}
          </div>

          {/* Credential Metadata Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
            <div>
              <span className="text-white/40 block mb-1">ISSUED BY</span>
              <span className="text-white font-medium">{certificate.organization}</span>
            </div>
            <div>
              <span className="text-white/40 block mb-1">ISSUE DATE</span>
              <div className="flex items-center gap-1.5 text-white font-medium">
                <Calendar size={13} className="text-white/50" />
                <span>{certificate.issueDate}</span>
              </div>
            </div>
            <div>
              <span className="text-white/40 block mb-1">CREDENTIAL IDENTIFIER</span>
              <span className="font-mono text-white/90">
                {certificate.credentialId || certificate.regNo || 'VERIFIED ON PORTAL'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#16181d] flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href="https://www.linkedin.com/in/sourabh-sheoran-8173281a8/"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 text-xs font-medium text-white/80 hover:text-white hover:border-white/40 transition-colors"
          >
            <span>View LinkedIn Profile</span>
            <ExternalLink size={13} />
          </a>

          <a
            href={certificate.verifyUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-white/90 shadow-lg active:scale-95 transition-all"
          >
            <span>Show Official Credential</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

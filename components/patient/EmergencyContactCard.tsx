import type { EmergencyContact } from "@/types";

interface EmergencyContactCardProps {
  contact: EmergencyContact;
}

export default function EmergencyContactCard({ contact }: EmergencyContactCardProps) {
  const handleCall = () => {
    console.log("Calling:", contact.phone);
    // TODO: Implement call functionality
  };

  const handleWhatsApp = () => {
    console.log("Opening WhatsApp for:", contact.name);
    // TODO: Implement WhatsApp functionality
    window.open(`https://wa.me/${contact.phone?.replace(/\D/g, '')}`, '_blank');
  };

  return (
    <section 
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-5"
      aria-labelledby="emergency-contact-heading"
    >
      <h2 
        id="emergency-contact-heading"
        className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-sky-500 text-base" aria-hidden="true">
          family_restroom
        </span>
        Emergency Contact
      </h2>
      
      <div className="flex items-center gap-4 mb-5">
        <div 
          className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg"
          aria-hidden="true"
        >
          {contact.initials}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{contact.name}</p>
          <p className="text-sm text-slate-500">{contact.relationship}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleCall}
          className="flex flex-col items-center justify-center py-3 px-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors group focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-slate-500 group-hover:text-sky-500 mb-1 transition-colors" aria-hidden="true">
            call
          </span>
          <span className="text-xs font-medium text-slate-600">Call</span>
        </button>
        
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-3 px-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-lg transition-colors group focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-emerald-500 group-hover:text-emerald-600 mb-1 transition-colors" aria-hidden="true">
            chat
          </span>
          <span className="text-xs font-medium text-emerald-700">WhatsApp</span>
        </button>
      </div>
    </section>
  );
}

export default function ProblemSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#132326] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Current Care Falls Short</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Millions of women in rural areas face preventable complications due to systemic gaps in the healthcare delivery model.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="material-icons-round text-3xl">school</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Knowledge Gap</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Expectant mothers often lack awareness of critical danger signs, delaying the decision to seek help until it&apos;s too late.
            </p>
          </div>
          {/* Card 2 */}
          <div className="group bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="material-icons-round text-3xl">directions_walk</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Distance Gap</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Physical distance from clinics prevents frequent check-ups, leaving long periods of pregnancy completely unmonitored.
            </p>
          </div>
          {/* Card 3 */}
          <div className="group bg-background-light dark:bg-background-dark p-8 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="material-icons-round text-3xl">visibility_off</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Doctor Blindness</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Without real-time data between visits, doctors are reactive rather than proactive, often missing early warning signals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

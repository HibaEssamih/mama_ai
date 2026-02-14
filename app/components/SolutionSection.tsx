export default function SolutionSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-background-light dark:bg-background-dark relative overflow-hidden">
      {/* Abstract gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-10 sm:mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-primary font-semibold tracking-wider uppercase text-xs sm:text-sm mb-2 block">Our Solution</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">The MamaGuard Ecosystem</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto md:mx-0">
              A comprehensive platform connecting the dots in maternal healthcare through accessible technology.
            </p>
          </div>
          <div className="hidden md:block">
            <button className="text-primary font-medium flex items-center gap-2 hover:text-primary/80 transition-colors text-sm">
              Learn about our technology
              <span className="material-icons-round text-base">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-card-dark p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3 sm:mb-4">
              <span className="material-icons-round text-xl sm:text-2xl">record_voice_over</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">Voice Check-ins</h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Automated WhatsApp voice surveys in local dialects allow mothers to report symptoms easily without typing.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white dark:bg-card-dark p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 sm:mb-4">
              <span className="material-icons-round text-xl sm:text-2xl">analytics</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">Risk Detection</h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              AI algorithms analyze responses to triage patients instantly, flagging high-risk cases for immediate attention.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white dark:bg-card-dark p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 sm:mb-4">
              <span className="material-icons-round text-xl sm:text-2xl">dashboard</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">Doctor Dashboard</h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Clinicians see a prioritized list of patients, visualizing longitudinal health data to make informed decisions.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="bg-white dark:bg-card-dark p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-pink-50 dark:bg-pink-900/20 text-pink-500 dark:text-pink-400 flex items-center justify-center mb-3 sm:mb-4">
              <span className="material-icons-round text-xl sm:text-2xl">family_restroom</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">Family Engagement</h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Keeps partners and family members informed with automated updates and educational tips to support the mother.
            </p>
          </div>
        </div>
        
        {/* Mobile CTA button */}
        <div className="mt-8 text-center md:hidden">
          <button className="text-primary font-medium inline-flex items-center gap-2 hover:text-primary/80 transition-colors text-sm">
            Learn about our technology
            <span className="material-icons-round text-base">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}

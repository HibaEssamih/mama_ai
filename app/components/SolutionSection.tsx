export default function SolutionSection() {
  return (
    <section className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden">
      {/* Abstract gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Our Solution</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">The MamaGuard Ecosystem</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-lg">
              A comprehensive platform connecting the dots in maternal healthcare through accessible technology.
            </p>
          </div>
          <div>
            <button className="text-primary font-medium flex items-center gap-2 hover:text-primary/80 transition-colors">
              Learn about our technology
              <span className="material-icons-round">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
              <span className="material-icons-round">record_voice_over</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Voice Check-ins</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Automated WhatsApp voice surveys in local dialects allow mothers to report symptoms easily without typing.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <span className="material-icons-round">analytics</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Risk Detection</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              AI algorithms analyze responses to triage patients instantly, flagging high-risk cases for immediate attention.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <span className="material-icons-round">dashboard</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Doctor Dashboard</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Clinicians see a prioritized list of patients, visualizing longitudinal health data to make informed decisions.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-pink-50 dark:bg-pink-900/20 text-pink-500 dark:text-pink-400 flex items-center justify-center mb-4">
              <span className="material-icons-round">family_restroom</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Family Engagement</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Keeps partners and family members informed with automated updates and educational tips to support the mother.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">How MamaGuard Works</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connecting rural mothers to life-saving care through simple voice technology.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>
          {/* Progress Line Gradient overlay */}
          <div className="hidden md:block absolute top-12 left-[10%] w-3/4 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -z-10 opacity-50"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-card-dark border border-gray-700 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/5 group-hover:border-primary/50 transition-colors duration-300 relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-background-dark">1</span>
                <span className="material-icons-round text-4xl text-primary">mic</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Mother Reports</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm px-4">
                Voice message describing symptoms sent simply via WhatsApp.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-card-dark border border-gray-700 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/5 group-hover:border-primary/50 transition-colors duration-300 relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-card-dark text-primary border border-primary/30 rounded-full flex items-center justify-center font-bold text-sm border-4 border-background-dark">2</span>
                <span className="material-icons-round text-4xl text-primary">psychology</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">System Analyzes</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm px-4">
                AI instantly processes language and flags danger signs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-card-dark border border-gray-700 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/5 group-hover:border-primary/50 transition-colors duration-300 relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-card-dark text-primary border border-primary/30 rounded-full flex items-center justify-center font-bold text-sm border-4 border-background-dark">3</span>
                <span className="material-icons-round text-4xl text-primary">notifications_active</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Doctor Alerted</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm px-4">
                Clinicians view priority cases on a real-time dashboard.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-card-dark border border-gray-700 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/5 group-hover:border-primary/50 transition-colors duration-300 relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-card-dark text-primary border border-primary/30 rounded-full flex items-center justify-center font-bold text-sm border-4 border-background-dark">4</span>
                <span className="material-icons-round text-4xl text-primary">family_restroom</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Family Notified</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm px-4">
                Automated guidance sent to family and transport dispatched.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <span className="material-icons-round text-xl">favorite</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Mama<span className="text-primary">Guard</span>
              </span>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                Features
              </a>
              <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                Impact
              </a>
              <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                About
              </a>
              <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-white/10">
                <button className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
                  Login
                </button>
                <button className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg shadow-primary/25 transition-all transform hover:scale-105">
                  Request Demo
                </button>
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button className="text-slate-600 dark:text-slate-300 hover:text-white p-2">
                <span className="material-icons-round">menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                AI-Powered Maternal Care
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-slate-900 dark:text-white">
                Continuous maternal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-200">monitoring</span> for safer pregnancies.
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg">
                Bridging the gap between rural mothers and medical professionals. We use voice-first technology and WhatsApp to deliver real-time early warning signs to doctors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3.5 rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2">
                  Request a Demo
                  <span className="material-icons-round text-sm">arrow_forward</span>
                </button>
                <button className="border border-slate-300 dark:border-white/20 hover:border-primary text-slate-700 dark:text-white hover:text-primary dark:hover:text-primary font-medium px-8 py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 bg-transparent">
                  Platform Login
                </button>
              </div>
              <div className="mt-10 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex -space-x-2">
                  <Image
                    alt="Doctor profile"
                    className="w-8 h-8 rounded-full border-2 border-background-light dark:border-background-dark"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUwQUfdZeJDrmZtLQhKwNt9LpB18GBLqbTwjKIimAj90WK9_Ab2IOsXS5S2BrkhmR0WHKA-gUMMNQWMUXbCZcTWR1S1WYdo8uLTQce2uXN-5SZ437MO7Ftrqf5ccBKNEwlrTQMFbKqOR25ddeRisru5tdTmQYGRe87svWp2yovBZKBy2UVzVRpqHxXlkzuU19UH3l1Kxb_EqX1h43-njLRmlsNcKE7ykfWFgQqcHRbzcuSLqX6BdrTLndhjwl4rh8_nVKsIQBimdwg"
                    width={32}
                    height={32}
                  />
                  <Image
                    alt="Doctor profile"
                    className="w-8 h-8 rounded-full border-2 border-background-light dark:border-background-dark"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9i-bmyfENBE3I_d-yETctnS4nK1w6QgFUSesSnDkUDS_EQtawn-Nix_m9B1j8b6n06Kj3qMLPEYtUQBvohwKwdOLUwLuwDBPX9BPg4RDhjfyxhspAcbPfZ2hpYceUK3iZZ5hn4a3IyexEF_nBLGT0moIpHV7WKipO07UIXUGbXqpiNY4q-qm17UqrGT5o21HOv69Ih51LyeJ9oLita-gKfGPr4Iy9o1fuBX3Y8YDwhlNEjIHhbWEVVsfoJ0fjUjfFJd1GD8KxViiS"
                    width={32}
                    height={32}
                  />
                  <Image
                    alt="Doctor profile"
                    className="w-8 h-8 rounded-full border-2 border-background-light dark:border-background-dark"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXreAN9MNhfb8HiDo4jWi8VzY2bxqplZOuIAxUmrgzQloPrRytk_aBiQ5CEPrvbnyMMmjxBfIw_z_8Jcf7MyTSb6WKMS0SeRSrYEpoQkLpsxGYAzUsTjrQfO8nCFXsT1iOR9Xbn6dJ9iXFyLvs49s75OKXmFXWDWLZppGFgmENiBV6YbHQEz8Q8Mn5UBrm3I6dmgRzRsTLCjy6TuJyvR2iyi-7VvSVAYG3SU3TYsMIO2jO22dtjFTdq6YMFz3GJQ411ol5LYITsk7K"
                    width={32}
                    height={32}
                  />
                </div>
                <p>Trusted by <span className="text-slate-900 dark:text-white font-semibold">200+ Clinicians</span></p>
              </div>
            </div>

            {/* Hero Image / Visual */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              {/* Abstract Background Shape behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent rounded-full blur-3xl opacity-60"></div>
              
              {/* Composition Container */}
              <div className="relative w-full h-full">
                {/* Card 1: Mother's View (Phone) */}
                <div className="absolute top-10 left-0 lg:left-4 z-20 w-48 sm:w-64 bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden transform transition-transform hover:-translate-y-2 duration-500">
                  <div className="bg-primary/10 p-4 border-b border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                      <span className="material-icons-round text-sm">mic</span>
                    </div>
                    <div>
                      <div className="h-2 w-20 bg-primary/40 rounded mb-1"></div>
                      <div className="h-2 w-12 bg-primary/20 rounded"></div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden">
                        <Image
                          alt="Pregnant woman profile"
                          className="object-cover w-full h-full"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtVNsoEfuTW9J7RGUeBw1c_AOqnhxyH58X45vHaJDikZRTzYbxcevYyLXSHZyM4lm7mmpHoUhPSRjKsVbdJxbl2ro4WQhjjwjQTS_YwtzU9u4ov1NYd9Np4SQEN0p9F-KmVqTEjGYFu9WLHpycMV7AVyHpBPoVEAIW7b8Rw0Pi6-el-SCF8YuP_sG3b0_UsAgw_q3ObIViQEgS-9f5COtHBbDwM1ofEBfw5vDuGUFAuGrNa7asaRRlfTQE8I0gYs9j5MGGj8hrIz3g"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg rounded-tl-none p-2 text-xs text-slate-600 dark:text-slate-300 w-full">
                        I&apos;m feeling a sharp pain on my right side since morning.
                      </div>
                    </div>
                    <div className="flex items-end justify-end gap-2">
                      <div className="bg-primary text-white rounded-lg rounded-tr-none p-2 text-xs w-3/4">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="material-icons-round text-[10px]">graphic_eq</span>
                          <span>Analyzing voice...</span>
                        </div>
                        Alert sent to Dr. Amina.
                      </div>
                    </div>
                  </div>
                  <div className="h-32 bg-gray-50 dark:bg-[#132326] relative overflow-hidden">
                    <Image
                      alt="Woman holding phone"
                      className="w-full h-full object-cover opacity-80"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbXtEOHmkF-UDuvT93i6z5q1-_m6ykXkq62EpiNhs1mDiihQahPKBItDa0KxTyke57xERR7whSAyXS5iQ_pztSdiXc403AxO1BUFywujRfzSHUFDXtNiLF0gaT0hXNY9kSs5jl4XAdDPsNSBUY6n2hZpuB_iL9d9sLQ2FYT1X8kpP5J6GDUy6in270E6qsHvSU0gIxjWqvjuqEW4O8gPtfwD4-cO544dV48uzFlbJw0Sqlc0hYaDEtZFXNgwxaVx877uq0zcY2BiqW"
                      width={256}
                      height={128}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card-dark to-transparent"></div>
                  </div>
                </div>

                {/* Card 2: Doctor's Dashboard (Desktop/Tablet) */}
                <div className="absolute top-24 right-0 lg:right-4 z-10 w-64 sm:w-80 lg:w-96 bg-white dark:bg-card-dark rounded-xl shadow-2xl border border-gray-100 dark:border-white/5 p-4 transform translate-y-12 lg:translate-y-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Patient Risk Overview</h3>
                    <span className="bg-red-500/10 text-red-500 text-xs px-2 py-1 rounded font-medium border border-red-500/20">High Risk Alert</span>
                  </div>
                  {/* Dummy Chart */}
                  <div className="flex items-end justify-between h-24 gap-2 mb-4">
                    <div className="w-full bg-primary/10 rounded-sm h-[40%] relative group">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">Normal</div>
                    </div>
                    <div className="w-full bg-primary/20 rounded-sm h-[60%]"></div>
                    <div className="w-full bg-primary/10 rounded-sm h-[30%]"></div>
                    <div className="w-full bg-primary/30 rounded-sm h-[50%]"></div>
                    <div className="w-full bg-red-500/80 rounded-sm h-[90%] animate-pulse relative">
                      <div className="absolute -top-2 right-0 w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                  </div>
                  {/* Patient List Item */}
                  <div className="flex items-center gap-3 p-3 bg-background-light dark:bg-background-dark rounded-lg border border-gray-100 dark:border-white/5">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                      <span className="material-icons-round">priority_high</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-800 dark:text-white">Sarah K.</div>
                      <div className="text-xs text-slate-500">Gestational Hypertension</div>
                    </div>
                    <button className="text-primary text-xs font-semibold hover:underline">View</button>
                  </div>
                </div>

                {/* Decorative connecting line */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 400 400">
                  <path d="M100,150 C150,150 150,250 300,250" fill="none" stroke="#11b4d4" strokeDasharray="5,5" strokeWidth="2"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
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

      {/* Solution Section */}
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

      {/* Footer Simple */}
      <footer className="bg-white dark:bg-[#0c181a] border-t border-gray-200 dark:border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white">
              <span className="material-icons-round text-sm">favorite</span>
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">
              Mama<span className="text-primary">Guard</span>
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            © 2023 MamaGuard Health Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a className="text-slate-400 hover:text-primary transition-colors" href="#">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a className="text-slate-400 hover:text-primary transition-colors" href="#">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fillRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Image from "next/image";

export default function HeroSection() {
  return (
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
  );
}

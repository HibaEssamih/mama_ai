export default function CTASection() {
  return (
    <section className="py-24 relative bg-gradient-to-b from-background-dark to-card-dark">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
          Bring MamaGuard to Your Clinic
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Join the network of care providers transforming maternal health outcomes.
        </p>

        <div className="bg-card-dark backdrop-blur-sm border border-gray-700 p-2 rounded-xl sm:rounded-full shadow-2xl" style={{ backgroundColor: 'rgba(22, 42, 45, 0.5)' }}>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              className="flex-1 bg-background-dark border-0 text-white placeholder-gray-500 px-6 py-4 rounded-lg sm:rounded-l-full sm:rounded-r-none focus:ring-2 focus:ring-primary transition-all outline-none"
              style={{ backgroundColor: 'rgba(16, 31, 34, 0.8)' }}
              placeholder="Your Name"
              type="text"
            />
            <input
              className="flex-1 bg-background-dark border-0 text-white placeholder-gray-500 px-6 py-4 rounded-lg sm:rounded-none focus:ring-2 focus:ring-primary transition-all outline-none"
              style={{ backgroundColor: 'rgba(16, 31, 34, 0.8)' }}
              placeholder="Clinic / Organization"
              type="text"
            />
            <input
              className="flex-1 bg-background-dark border-0 text-white placeholder-gray-500 px-6 py-4 rounded-lg sm:rounded-none focus:ring-2 focus:ring-primary transition-all outline-none"
              style={{ backgroundColor: 'rgba(16, 31, 34, 0.8)' }}
              placeholder="Email Address"
              type="email"
            />
            <button
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-lg sm:rounded-r-full sm:rounded-l-none transition-all duration-200 whitespace-nowrap shadow-[0_0_20px_rgba(17,180,212,0.3)] hover:shadow-[0_0_30px_rgba(17,180,212,0.5)]"
              type="button"
            >
              Request Demo
            </button>
          </form>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Free pilot program available for rural health centers.
        </p>
      </div>
    </section>
  );
}

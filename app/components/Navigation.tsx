export default function Navigation() {
  return (
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
  );
}

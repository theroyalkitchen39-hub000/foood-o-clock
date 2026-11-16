import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export type NavSection = 'home' | 'menu' | 'about' | 'contact';

interface HeaderProps {
  activeSection: NavSection;
  cartCount: number;
  onNavigate: (section: NavSection) => void;
  onOpenCart: () => void;
  onOrderNow: () => void;
}

const NAV_ITEMS: { id: NavSection; label: string }[] = [
  { id: 'home', label: 'HOME' },
  { id: 'menu', label: 'MENU' },
  { id: 'about', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT' },
];

export function Header({
  activeSection,
  cartCount,
  onNavigate,
  onOpenCart,
  onOrderNow,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (section: NavSection) => {
    setMobileMenuOpen(false);
    onNavigate(section);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080808]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 h-16 md:h-[74px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]"
        >
          FOOD O<span className="text-[#FFC400]">&apos;</span>CLOCK
        </a>

        {/* Zone 2: Center Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative py-2 font-display text-[13px] font-semibold tracking-[0.12em] whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] ${
                  isActive
                    ? 'text-white'
                    : 'text-[#BDBDBD] hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId={prefersReducedMotion ? undefined : 'activeNavLine'}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#FFC400]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Cart & ORDER NOW Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag with ${cartCount} items`}
            className="relative inline-flex items-center gap-2 px-3 py-2 text-white hover:text-[#FFC400] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.85} />
            <motion.span
              key={cartCount}
              initial={prefersReducedMotion ? false : { scale: 1.35 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-xs font-bold tabular-nums min-w-[1.25rem] text-center"
            >
              {cartCount}
            </motion.span>
          </button>

          <button
            type="button"
            onClick={onOrderNow}
            className="hidden sm:inline-flex items-center justify-center bg-[#FFC400] text-[#080808] hover:bg-[#FFD233] active:scale-[0.98] font-display text-xs font-extrabold tracking-[0.1em] px-5 py-2.5 transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ORDER NOW
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-white hover:text-[#FFC400] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#080808] border-b border-white/10 px-5 py-5"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`flex items-center justify-between py-3 px-2 font-display text-sm font-semibold tracking-[0.12em] border-b border-white/8 transition-colors ${
                      isActive ? 'text-[#FFC400]' : 'text-white/90 hover:text-[#FFC400]'
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOrderNow();
                }}
                className="w-full bg-[#FFC400] text-[#080808] font-display text-xs font-extrabold tracking-[0.1em] py-3.5 px-5 cursor-pointer"
              >
                ORDER NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

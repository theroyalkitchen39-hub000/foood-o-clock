import { NavSection } from './Header';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#080808] py-12 sm:py-14">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="font-display text-xl font-extrabold tracking-tight text-white"
          >
            FOOD O<span className="text-[#FFC400]">&apos;</span>CLOCK
          </a>
          <p className="mt-2 text-xs font-display font-semibold tracking-[0.18em] uppercase text-[#BDBDBD]">
            GOOD FOOD. GOOD MOOD.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-6 sm:gap-8"
        >
          {(['home', 'menu', 'about', 'contact'] as const).map((sec) => (
            <a
              key={sec}
              href={`#${sec}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(sec);
              }}
              className="font-display text-xs font-semibold tracking-[0.12em] uppercase text-[#BDBDBD] hover:text-[#FFC400] transition-colors"
            >
              {sec}
            </a>
          ))}
        </nav>

        <p className="text-xs text-[#BDBDBD] tabular-nums">
          © {new Date().getFullYear()} FOOD O&apos;CLOCK. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

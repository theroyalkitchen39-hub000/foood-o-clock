import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { HERO_BURGER_IMAGE } from '../data/menuData';
import { ClockSignature } from './ClockSignature';
import { SafeFoodImage } from './SafeFoodImage';

interface HeroSectionProps {
  clockTick: number;
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

export function HeroSection({
  clockTick,
  onExploreMenu,
  onOrderNow,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="home"
      className="relative bg-[#080808] overflow-hidden border-b border-white/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Tagline + Subtle Yellow Line Animation */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="flex items-center gap-4 mb-5"
            >
              <motion.span
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, delay: 0.1, ease }}
                style={{ originX: 0 }}
                className="block w-10 h-[2px] bg-[#FFC400]"
              />
              <span className="font-display text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-[#FFC400] uppercase">
                GOOD FOOD. GOOD MOOD.
              </span>
            </motion.div>

            {/* Main Brand Display Headline */}
            <div className="overflow-hidden">
              <motion.h1
                initial={prefersReducedMotion ? false : { y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
                className="font-display font-extrabold text-white tracking-[-0.03em] leading-[0.95] text-[clamp(2.85rem,6vw,5.25rem)] [text-wrap:balance]"
              >
                FOOD O<span className="text-[#FFC400]">&apos;</span>CLOCK
              </motion.h1>
            </div>

            {/* Supporting Headline */}
            <motion.h2
              initial={prefersReducedMotion ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.24, ease }}
              className="mt-4 font-display font-extrabold text-[clamp(1.25rem,2.3vw,1.85rem)] tracking-[0.02em] text-white/95 leading-tight [text-wrap:balance]"
            >
              YOUR CRAVINGS, OUR PASSION.
            </motion.h2>

            {/* Supporting Description */}
            <motion.p
              initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.34, ease }}
              className="mt-5 text-[#BDBDBD] text-base sm:text-[17px] leading-[1.65] max-w-[46ch]"
            >
              Delicious burgers, crispy fries, fresh shawarma and more. Your
              favorite food is just one order away.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.44, ease }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={onOrderNow}
                className="inline-flex items-center justify-center gap-2.5 bg-[#FFC400] text-[#080808] hover:bg-[#FFD233] active:scale-[0.98] font-display text-xs sm:text-[13px] font-extrabold tracking-[0.12em] px-7 py-4 transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
              </button>

              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center border border-white/25 text-white hover:border-[#FFC400] hover:text-[#FFC400] active:scale-[0.98] font-display text-xs sm:text-[13px] font-bold tracking-[0.12em] px-7 py-4 transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
              >
                EXPLORE MENU
              </button>
            </motion.div>

            {/* Signature Clock Detail — Used Sparingly */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.56, ease }}
              className="mt-10 pt-6 border-t border-white/10 w-full max-w-[46ch] flex items-center gap-4"
            >
              <ClockSignature tickOffset={clockTick} size={42} />
              <div className="flex flex-col">
                <span className="font-display text-xs font-semibold tracking-[0.14em] uppercase text-white">
                  Fresh On The Hour
                </span>
                <span className="text-[13px] text-[#BDBDBD] mt-0.5 tabular-nums">
                  Open daily 11:00 AM — 02:00 AM · Average prep 12–18 min
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Focal Photography Column */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, scale: 0.94 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.15, ease }}
              className="relative bg-[#151515] border border-white/10 overflow-hidden"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <SafeFoodImage
                  src={HERO_BURGER_IMAGE}
                  alt="Signature Food O'Clock Double Smash Burger with melted aged cheddar and crisp fries"
                  priority
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Subtle Editorial Bottom Scrim & Signature Dish Caption */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent pointer-events-none" />
              <div className="relative sm:absolute sm:inset-x-0 sm:bottom-0 px-5 py-4 sm:px-6 sm:py-5 bg-[#080808] sm:bg-transparent flex items-center justify-between gap-4 border-t sm:border-t-0 border-white/10">
                <div>
                  <p className="font-display text-sm font-extrabold tracking-wide text-white">
                    The O&apos;Clock Double Smash
                  </p>
                  <p className="text-xs text-[#BDBDBD] mt-0.5">
                    Double seared beef · Aged cheddar · House glaze
                  </p>
                </div>
                <span className="font-display text-base font-extrabold text-[#FFC400] tabular-nums shrink-0">
                  $12.90
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

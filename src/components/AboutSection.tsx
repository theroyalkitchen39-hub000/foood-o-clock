import { motion, useReducedMotion } from 'motion/react';
import { ABOUT_KITCHEN_IMAGE } from '../data/menuData';
import { SafeFoodImage } from './SafeFoodImage';

const CRAFT_PILLARS = [
  {
    index: '01.',
    title: 'Smashed On The Hour',
    detail:
      'Never frozen, never pre-cooked. Every beef patty hits our 450°F flat-top griddle the second your ticket prints, sealing rich juices behind crisp caramelized edges.',
  },
  {
    index: '02.',
    title: 'Hand-Carved Spice & Smoke',
    detail:
      'Our chicken shawarma marinates 24 hours in roasted garlic, sumac, and warm Aleppo spice before slow-roasting over open flame.',
  },
  {
    index: '03.',
    title: 'Flaky Roll Parathas & Double-Crisp Fries',
    detail:
      'From hand-laminated golden parathas griddled in clarified butter to skin-on fries double-cooked for crunch, texture leads every bite.',
  },
];

const PROOF_METRICS = [
  { value: '100%', label: 'Fresh Daily Halal Cuts' },
  { value: '14 MIN', label: 'Average Kitchen Prep' },
  { value: '4.9 / 5', label: 'Verified Guest Rating' },
];

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="about"
      className="bg-[#151515] py-20 sm:py-24 border-b border-white/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Editorial Documentary Kitchen Photo */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="relative flex-1 min-h-[300px] bg-[#080808] border border-white/10 overflow-hidden">
              <SafeFoodImage
                src={ABOUT_KITCHEN_IMAGE}
                alt="Food O'Clock chef searing smashed burgers over open flame in our dark-steel kitchen"
                className="w-full h-full object-cover object-center lg:absolute lg:inset-0"
              />
            </div>

            {/* Adjacent Proof Metric Strip */}
            <div className="grid grid-cols-3 border-x border-b border-white/10 bg-[#080808]">
              {PROOF_METRICS.map((metric, index) => (
                <div
                  key={metric.label}
                  className={`p-4 sm:p-5 ${
                    index > 0 ? 'border-l border-white/10' : ''
                  }`}
                >
                  <p className="font-display text-lg sm:text-xl font-extrabold text-[#FFC400] tabular-nums">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-[#BDBDBD] leading-snug">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Culinary Story & Numbered Pillars */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-[#FFC400]">
                Inside The Kitchen
              </span>
              <h2 className="mt-3 font-display font-extrabold text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.06] tracking-[-0.02em] text-white [text-wrap:balance]">
                FAST FOOD BUILT WITH CULINARY DISCIPLINE.
              </h2>
              <p className="mt-4 text-[#BDBDBD] text-sm sm:text-base leading-[1.7] max-w-[54ch]">
                FOOD O&apos;CLOCK started with one obsession: street-food soul
                served at midnight-craving speed without cutting a single corner
                on ingredients, fire, or crunch.
              </p>
            </div>

            <div className="mt-10 divide-y divide-white/10 border-t border-b border-white/10">
              {CRAFT_PILLARS.map((pillar) => (
                <div key={pillar.index} className="py-5 sm:py-6 flex gap-5">
                  <span className="font-display text-sm font-extrabold text-[#FFC400] tabular-nums shrink-0 pt-0.5">
                    {pillar.index}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-extrabold text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#BDBDBD] leading-relaxed">
                      {pillar.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

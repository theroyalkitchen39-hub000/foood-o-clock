import { Minus, Plus, SlidersHorizontal } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { MENU_CATEGORIES } from '../data/menuData';
import { CartItem, MenuCategory, MenuItem } from '../types/menu';
import { SafeFoodImage } from './SafeFoodImage';

interface MenuSectionProps {
  items: MenuItem[];
  activeCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
  cartItems: CartItem[];
  onQuickAdd: (item: MenuItem) => void;
  onUpdateSimpleQty: (itemId: string, delta: number) => void;
  onInspectItem: (item: MenuItem) => void;
}

export function MenuSection({
  items,
  activeCategory,
  onSelectCategory,
  cartItems,
  onQuickAdd,
  onUpdateSimpleQty,
  onInspectItem,
}: MenuSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const getItemQuantityInCart = (itemId: string) =>
    cartItems
      .filter((ci) => ci.item.id === itemId)
      .reduce((sum, ci) => sum + ci.quantity, 0);

  return (
    <section
      id="menu"
      className="bg-[#080808] py-20 sm:py-24 border-b border-white/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Section Header + Category Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-[#FFC400]">
              Curated Kitchen Lineup
            </span>
            <h2 className="mt-3 font-display font-extrabold text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.02em] text-white [text-wrap:balance]">
              THE MENU
            </h2>
            <p className="mt-3 text-[#BDBDBD] text-sm sm:text-base max-w-[52ch]">
              Every burger is smashed to order, shawarma carved hot off the
              spit, and paratha rolled crisp by hand.
            </p>
          </motion.div>

          {/* Interactive Category Filter Controls */}
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex flex-wrap items-center gap-1 sm:gap-2"
          >
            {MENU_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => onSelectCategory(category)}
                  className={`relative px-4 py-2.5 font-display text-xs font-bold tracking-[0.1em] uppercase transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] ${
                    isSelected
                      ? 'text-[#080808]'
                      : 'text-[#BDBDBD] hover:text-white bg-[#151515]/70'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId={prefersReducedMotion ? undefined : 'activeCategoryPill'}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-[#FFC400]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((item, idx) => {
            const qtyInCart = getItemQuantityInCart(item.id);
            return (
              <motion.article
                key={item.id}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 20 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(idx * 0.06, 0.3),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-[#151515] border border-white/10 hover:border-[#FFC400]/45 transition-colors duration-200 flex flex-col"
              >
                {/* Food Photograph — Click opens item customization */}
                <button
                  type="button"
                  onClick={() => onInspectItem(item)}
                  aria-label={`Customize ${item.name}`}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#0D0D0D] cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
                >
                  <SafeFoodImage
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-60 pointer-events-none" />
                </button>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Unboxed Clean Metadata (Zero-Pill Discipline) */}
                    <div className="flex items-center gap-2 text-xs text-[#BDBDBD] font-medium tracking-wide">
                      <span className="text-[#FFC400] font-semibold uppercase tracking-[0.12em]">
                        {item.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{item.prepTime}</span>
                      {item.featuredTag && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{item.featuredTag}</span>
                        </>
                      )}
                    </div>

                    <div className="mt-2.5 flex items-start justify-between gap-4">
                      <h3 className="font-display text-lg font-extrabold text-white leading-snug group-hover:text-[#FFC400] transition-colors duration-150">
                        <button
                          type="button"
                          onClick={() => onInspectItem(item)}
                          className="text-left cursor-pointer focus-visible:outline-none focus-visible:underline"
                        >
                          {item.name}
                        </button>
                      </h3>
                      <span className="font-display text-lg font-extrabold text-white tabular-nums shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm text-[#BDBDBD] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Interactive Footer Controls */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onInspectItem(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-display font-semibold tracking-[0.08em] uppercase text-[#BDBDBD] hover:text-white transition-colors cursor-pointer py-2 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Customize</span>
                    </button>

                    {qtyInCart === 0 ? (
                      <button
                        type="button"
                        onClick={() => onQuickAdd(item)}
                        className="inline-flex items-center gap-1.5 bg-[#FFC400] text-[#080808] hover:bg-[#FFD233] active:scale-[0.97] font-display text-xs font-extrabold tracking-[0.08em] uppercase px-4 py-2.5 transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="inline-flex items-center border border-[#FFC400] bg-[#080808]">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() => onUpdateSimpleQty(item.id, -1)}
                          className="w-9 h-9 inline-flex items-center justify-center text-white hover:text-[#FFC400] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 font-display text-xs font-extrabold text-[#FFC400] tabular-nums">
                          {qtyInCart}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() => onQuickAdd(item)}
                          className="w-9 h-9 inline-flex items-center justify-center text-white hover:text-[#FFC400] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Check, Minus, Plus, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MenuAddon, MenuItem } from '../types/menu';
import { SafeFoodImage } from './SafeFoodImage';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (payload: {
    item: MenuItem;
    quantity: number;
    selectedAddons: MenuAddon[];
    spiceLevel: 'Classic' | 'Medium Heat' | 'Extra Spicy';
    notes: string;
  }) => void;
}

const SPICE_LEVELS = ['Classic', 'Medium Heat', 'Extra Spicy'] as const;

export function ItemModal({ item, onClose, onAddToCart }: ItemModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [spiceLevel, setSpiceLevel] = useState<'Classic' | 'Medium Heat' | 'Extra Spicy'>('Classic');
  const [notes, setNotes] = useState('');

  if (!item) return null;

  const selectedAddons = item.addons.filter((addon) =>
    selectedAddonIds.includes(addon.id)
  );
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const lineTotal = (item.price + addonsTotal) * quantity;

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart({
      item,
      quantity,
      selectedAddons,
      spiceLevel,
      notes: notes.trim(),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-item-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.96, y: 12 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.96, y: 12 }
          }
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#151515] border border-white/15 text-white"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close item customization"
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#080808]/85 border border-white/15 flex items-center justify-center text-white hover:text-[#FFC400] hover:border-[#FFC400] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Food Photo */}
          <div className="aspect-[16/9] w-full bg-[#080808] overflow-hidden">
            <SafeFoodImage
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs text-[#BDBDBD] font-medium">
              <span className="text-[#FFC400] font-semibold uppercase tracking-[0.14em]">
                {item.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{item.prepTime} prep</span>
            </div>

            <div className="mt-2 flex items-baseline justify-between gap-4">
              <h3
                id="modal-item-title"
                className="font-display text-2xl font-extrabold text-white"
              >
                {item.name}
              </h3>
              <span className="font-display text-xl font-extrabold text-[#FFC400] tabular-nums shrink-0">
                ${item.price.toFixed(2)}
              </span>
            </div>

            <p className="mt-3 text-sm text-[#BDBDBD] leading-relaxed">
              {item.description}
            </p>

            {/* Spice / Seasoning Level (skip for Drinks) */}
            {item.category !== 'Drinks' && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-white mb-3">
                  Heat Level
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {SPICE_LEVELS.map((level) => {
                    const selected = spiceLevel === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSpiceLevel(level)}
                        className={`py-2.5 px-3 font-display text-xs font-semibold tracking-wide border transition-colors cursor-pointer ${
                          selected
                            ? 'bg-[#FFC400] text-[#080808] border-[#FFC400] font-bold'
                            : 'bg-[#080808] text-[#BDBDBD] border-white/15 hover:border-white/40 hover:text-white'
                        }`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add-ons */}
            {item.addons.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-white mb-3">
                  Optional Upgrades
                </p>
                <div className="space-y-2">
                  {item.addons.map((addon) => {
                    const active = selectedAddonIds.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#080808] border-[#FFC400] text-white'
                            : 'bg-[#080808]/60 border-white/10 text-[#BDBDBD] hover:border-white/30 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-4 h-4 flex items-center justify-center border ${
                              active
                                ? 'bg-[#FFC400] border-[#FFC400] text-[#080808]'
                                : 'border-white/30'
                            }`}
                          >
                            {active && <Check className="w-3 h-3" strokeWidth={3} />}
                          </span>
                          <span className="text-sm font-medium">{addon.name}</span>
                        </div>
                        <span className="font-display text-xs font-bold text-[#FFC400] tabular-nums">
                          +${addon.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Kitchen Note */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <label
                htmlFor="item-kitchen-note"
                className="block font-display text-xs font-bold uppercase tracking-[0.12em] text-white mb-2"
              >
                Kitchen Note (Optional)
              </label>
              <input
                id="item-kitchen-note"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={120}
                placeholder="No pickles, extra toasted bun, sauce on the side..."
                className="w-full bg-[#080808] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#BDBDBD]/50 focus:outline-none focus:border-[#FFC400]"
              />
            </div>

            {/* Footer Action Bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="inline-flex items-center justify-between sm:justify-start border border-white/20 bg-[#080808]">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 inline-flex items-center justify-center text-white hover:text-[#FFC400] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-display text-sm font-extrabold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  className="w-12 h-12 inline-flex items-center justify-center text-white hover:text-[#FFC400] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="submit"
                className="flex-1 bg-[#FFC400] text-[#080808] hover:bg-[#FFD233] active:scale-[0.99] font-display text-xs sm:text-sm font-extrabold tracking-[0.1em] uppercase py-4 px-6 transition-all cursor-pointer tabular-nums"
              >
                Add to Order · ${lineTotal.toFixed(2)}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

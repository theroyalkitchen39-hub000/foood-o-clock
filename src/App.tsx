import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { CartDrawer } from './components/CartDrawer';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header, NavSection } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ItemModal } from './components/ItemModal';
import { MenuSection } from './components/MenuSection';
import { MENU_ITEMS } from './data/menuData';
import { CartItem, MenuAddon, MenuCategory, MenuItem } from './types/menu';

const CART_STORAGE_KEY = 'food_oclock_cart_v1';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const [clockTick, setClockTick] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [inspectedItem, setInspectedItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as CartItem[];
      }
    } catch {
      // Ignore storage read errors
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage write errors
    }
  }, [cartItems]);

  // Scroll-spy for smooth active header underline
  useEffect(() => {
    const sections: NavSection[] = ['home', 'menu', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as NavSection;
            if (sections.includes(id)) {
              setActiveSection(id);
            }
          }
        }
      },
      { rootMargin: '-38% 0px -50% 0px', threshold: 0.01 }
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-dismiss add-to-cart toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const scrollToSection = useCallback((section: NavSection) => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectCategory = (category: MenuCategory) => {
    setActiveCategory(category);
    setClockTick((t) => t + 1);
  };

  const addToCart = ({
    item,
    quantity,
    selectedAddons,
    spiceLevel,
    notes,
  }: {
    item: MenuItem;
    quantity: number;
    selectedAddons: MenuAddon[];
    spiceLevel: 'Classic' | 'Medium Heat' | 'Extra Spicy';
    notes: string;
  }) => {
    const addonKey = selectedAddons
      .map((a) => a.id)
      .sort()
      .join(',');
    const cartKey = `${item.id}::${spiceLevel}::${addonKey}::${notes}`;

    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.cartKey === cartKey);
      if (existing) {
        return prev.map((ci) =>
          ci.cartKey === cartKey
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }
      return [
        ...prev,
        {
          cartKey,
          item,
          quantity,
          selectedAddons,
          spiceLevel,
          notes: notes || undefined,
        },
      ];
    });

    setClockTick((t) => t + 1);
    setToastMessage(`Added ${item.name}`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    addToCart({
      item,
      quantity: 1,
      selectedAddons: [],
      spiceLevel: 'Classic',
      notes: '',
    });
  };

  const handleUpdateSimpleQty = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      let idx = -1;
      for (let i = prev.length - 1; i >= 0; i -= 1) {
        if (prev[i].item.id === itemId) {
          idx = i;
          break;
        }
      }
      if (idx === -1) return prev;
      const target = prev[idx];
      const nextQty = target.quantity + delta;
      if (nextQty <= 0) {
        return prev.filter((_, i) => i !== idx);
      }
      return prev.map((ci, i) =>
        i === idx ? { ...ci, quantity: nextQty } : ci
      );
    });
  };

  const handleUpdateCartItemQty = (cartKey: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) =>
          ci.cartKey === cartKey
            ? { ...ci, quantity: ci.quantity + delta }
            : ci
        )
        .filter((ci) => ci.quantity > 0)
    );
  };

  const handleRemoveCartItem = (cartKey: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartKey !== cartKey));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);

  const handleOrderNow = () => {
    if (totalCartCount > 0) {
      setCartOpen(true);
    } else {
      scrollToSection('menu');
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#080808] text-white flex flex-col">
        <Header
          activeSection={activeSection}
          cartCount={totalCartCount}
          onNavigate={scrollToSection}
          onOpenCart={() => setCartOpen(true)}
          onOrderNow={handleOrderNow}
        />

        <main className="flex-1">
          <HeroSection
            clockTick={clockTick}
            onExploreMenu={() => scrollToSection('menu')}
            onOrderNow={handleOrderNow}
          />

          <MenuSection
            items={MENU_ITEMS}
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            cartItems={cartItems}
            onQuickAdd={handleQuickAdd}
            onUpdateSimpleQty={handleUpdateSimpleQty}
            onInspectItem={(item) => setInspectedItem(item)}
          />

          <AboutSection />

          <ContactSection />
        </main>

        <Footer onNavigate={scrollToSection} />

        {/* Item Customization Modal */}
        {inspectedItem && (
          <ItemModal
            key={inspectedItem.id}
            item={inspectedItem}
            onClose={() => setInspectedItem(null)}
            onAddToCart={addToCart}
          />
        )}

        {/* Slide-Over Cart & Checkout Drawer */}
        <CartDrawer
          isOpen={cartOpen}
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={handleUpdateCartItemQty}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
          onExploreMenu={() => scrollToSection('menu')}
        />

        {/* Subtle Order Feedback Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-5 right-5 z-40 bg-[#151515] border border-[#FFC400]/60 px-4 py-3 flex items-center gap-4 shadow-lg"
            >
              <span className="text-xs sm:text-sm font-medium text-white">
                {toastMessage}
              </span>
              <button
                type="button"
                onClick={() => {
                  setToastMessage(null);
                  setCartOpen(true);
                }}
                className="font-display text-xs font-extrabold tracking-[0.1em] uppercase text-[#FFC400] hover:underline cursor-pointer whitespace-nowrap"
              >
                View Order ({totalCartCount})
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

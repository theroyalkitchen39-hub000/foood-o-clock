import { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CartItem, OrderReceipt } from '../types/menu';
import { SafeFoodImage } from './SafeFoodImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
  onExploreMenu: () => void;
}

const FREE_DELIVERY_THRESHOLD = 25;
const STANDARD_DELIVERY_FEE = 3.5;

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreMenu,
}: CartDrawerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState<'cart' | 'checkout' | 'receipt'>('cart');
  const [fulfillment, setFulfillment] = useState<'Delivery' | 'Pickup'>('Delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  const subtotal = items.reduce((sum, ci) => {
    const addonsPrice = ci.selectedAddons.reduce((a, b) => a + b.price, 0);
    return sum + (ci.item.price + addonsPrice) * ci.quantity;
  }, 0);

  const deliveryFee =
    fulfillment === 'Pickup' || subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : STANDARD_DELIVERY_FEE;

  const total = subtotal + deliveryFee;
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleClose = () => {
    if (step === 'receipt') {
      setStep('cart');
      setReceipt(null);
    }
    onClose();
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      setFormError('Please enter your name and phone number.');
      return;
    }
    if (fulfillment === 'Delivery' && !address.trim()) {
      setFormError('Please enter your delivery street address.');
      return;
    }

    setFormError(null);
    const orderNum = `FOC-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const newReceipt: OrderReceipt = {
      orderNumber: orderNum,
      customerName: customerName.trim(),
      phone: phone.trim(),
      fulfillment,
      address: fulfillment === 'Delivery' ? address.trim() : undefined,
      paymentMethod:
        fulfillment === 'Delivery' ? 'Cash on Delivery' : 'Pay on Pickup',
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      estimatedMinutes: fulfillment === 'Delivery' ? 25 : 14,
      placedAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setReceipt(newReceipt);
    onClearCart();
    setStep('receipt');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Your Food O'Clock Order"
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-[#080808] border-l border-white/15 h-full flex flex-col text-white"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step === 'checkout' && (
                  <button
                    type="button"
                    aria-label="Back to cart"
                    onClick={() => setStep('cart')}
                    className="text-[#BDBDBD] hover:text-white cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <h2 className="font-display text-base font-extrabold tracking-[0.08em] uppercase">
                  {step === 'cart' && 'Your Order'}
                  {step === 'checkout' && 'Checkout Details'}
                  {step === 'receipt' && 'Order Confirmed'}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close order drawer"
                className="w-9 h-9 flex items-center justify-center text-[#BDBDBD] hover:text-[#FFC400] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {step === 'receipt' && receipt ? (
                <div className="space-y-6">
                  <div className="bg-[#151515] border border-[#FFC400]/40 p-6">
                    <div className="flex items-center gap-3 text-[#FFC400]">
                      <CheckCircle2 className="w-6 h-6 shrink-0" />
                      <span className="font-display text-xs font-extrabold tracking-[0.14em] uppercase">
                        Order #{receipt.orderNumber} Confirmed
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-extrabold text-white">
                      Firing Up The Griddle, {receipt.customerName}
                    </h3>
                    <p className="mt-2 text-sm text-[#BDBDBD] leading-relaxed">
                      Estimated {receipt.fulfillment.toLowerCase()} time:{' '}
                      <span className="text-white font-semibold tabular-nums">
                        {receipt.estimatedMinutes} minutes
                      </span>{' '}
                      (placed at {receipt.placedAt}).
                    </p>
                  </div>

                  <div className="space-y-3 border-t border-b border-white/10 py-5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#BDBDBD]">Method</span>
                      <span className="font-medium text-white">
                        {receipt.fulfillment} · {receipt.paymentMethod}
                      </span>
                    </div>
                    {receipt.address && (
                      <div className="flex justify-between gap-4">
                        <span className="text-[#BDBDBD]">Address</span>
                        <span className="text-right text-white">
                          {receipt.address}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#BDBDBD]">Total Paid / Due</span>
                      <span className="font-display font-extrabold text-[#FFC400] tabular-nums">
                        ${receipt.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#BDBDBD]">
                      Items Prepared
                    </p>
                    {receipt.items.map((ci) => (
                      <div
                        key={ci.cartKey}
                        className="flex justify-between text-sm text-white/90"
                      >
                        <span>
                          {ci.quantity}× {ci.item.name}
                        </span>
                        <span className="tabular-nums text-[#BDBDBD]">
                          $
                          {(
                            (ci.item.price +
                              ci.selectedAddons.reduce(
                                (s, a) => s + a.price,
                                0
                              )) *
                            ci.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <ShoppingBag
                    className="w-10 h-10 text-white/25 mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-display text-lg font-extrabold text-white">
                    Your Bag Is Empty
                  </h3>
                  <p className="mt-2 text-sm text-[#BDBDBD] max-w-[28ch]">
                    Browse our smash burgers, flame-grilled shawarma, and crispy
                    loaded fries to start an order.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      onExploreMenu();
                    }}
                    className="mt-6 bg-[#FFC400] text-[#080808] font-display text-xs font-extrabold tracking-[0.12em] uppercase px-6 py-3.5 cursor-pointer"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : step === 'cart' ? (
                <div className="space-y-5">
                  {/* Free Delivery Notice */}
                  <div className="bg-[#151515] border border-white/10 px-4 py-3 text-xs text-[#BDBDBD]">
                    {remainingForFreeDelivery > 0 ? (
                      <span>
                        Add{' '}
                        <span className="text-[#FFC400] font-semibold tabular-nums">
                          ${remainingForFreeDelivery.toFixed(2)}
                        </span>{' '}
                        more for free delivery.
                      </span>
                    ) : (
                      <span className="text-[#FFC400] font-semibold">
                        Your order qualifies for free delivery.
                      </span>
                    )}
                  </div>

                  {/* Line Items */}
                  <div className="divide-y divide-white/10">
                    {items.map((ci) => {
                      const unitPrice =
                        ci.item.price +
                        ci.selectedAddons.reduce((s, a) => s + a.price, 0);
                      return (
                        <div key={ci.cartKey} className="py-4 flex gap-4">
                          <div className="w-20 h-16 bg-[#151515] border border-white/10 overflow-hidden shrink-0">
                            <SafeFoodImage
                              src={ci.item.image}
                              alt={ci.item.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-display text-sm font-bold text-white truncate">
                                {ci.item.name}
                              </h3>
                              <button
                                type="button"
                                aria-label={`Remove ${ci.item.name}`}
                                onClick={() => onRemoveItem(ci.cartKey)}
                                className="text-[#BDBDBD] hover:text-white cursor-pointer shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {ci.item.category !== 'Drinks' && (
                              <p className="text-xs text-[#BDBDBD] mt-0.5">
                                {ci.spiceLevel}
                              </p>
                            )}
                            {ci.selectedAddons.length > 0 && (
                              <p className="text-xs text-[#FFC400]/90 mt-0.5">
                                + {ci.selectedAddons.map((a) => a.name).join(', ')}
                              </p>
                            )}
                            {ci.notes && (
                              <p className="text-xs text-[#BDBDBD]/80 italic mt-0.5">
                                &ldquo;{ci.notes}&rdquo;
                              </p>
                            )}

                            <div className="mt-3 flex items-center justify-between">
                              <div className="inline-flex items-center border border-white/15 bg-[#151515]">
                                <button
                                  type="button"
                                  aria-label="Decrease item quantity"
                                  onClick={() => onUpdateQuantity(ci.cartKey, -1)}
                                  className="w-7 h-7 flex items-center justify-center text-white hover:text-[#FFC400] cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2.5 font-display text-xs font-bold tabular-nums">
                                  {ci.quantity}
                                </span>
                                <button
                                  type="button"
                                  aria-label="Increase item quantity"
                                  onClick={() => onUpdateQuantity(ci.cartKey, 1)}
                                  className="w-7 h-7 flex items-center justify-center text-white hover:text-[#FFC400] cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-display text-sm font-extrabold text-white tabular-nums">
                                ${(unitPrice * ci.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Checkout Form Step */
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-5">
                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#BDBDBD] mb-2.5">
                      Order Method
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Delivery', 'Pickup'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setFulfillment(mode)}
                          className={`py-3 font-display text-xs font-bold uppercase tracking-[0.1em] border transition-colors cursor-pointer ${
                            fulfillment === mode
                              ? 'bg-[#FFC400] text-[#080808] border-[#FFC400]'
                              : 'bg-[#151515] text-[#BDBDBD] border-white/15 hover:text-white'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formError && (
                    <p
                      role="alert"
                      className="text-xs text-[#FFC400] bg-[#151515] border border-[#FFC400]/50 px-4 py-3"
                    >
                      {formError}
                    </p>
                  )}

                  <div>
                    <label
                      htmlFor="checkout-name"
                      className="block font-display text-xs font-semibold uppercase tracking-[0.1em] text-[#BDBDBD] mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Jordan Taylor"
                      className="w-full bg-[#151515] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#BDBDBD]/40 focus:outline-none focus:border-[#FFC400]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-phone"
                      className="block font-display text-xs font-semibold uppercase tracking-[0.1em] text-[#BDBDBD] mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 234-5678"
                      className="w-full bg-[#151515] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#BDBDBD]/40 focus:outline-none focus:border-[#FFC400]"
                    />
                  </div>

                  {fulfillment === 'Delivery' && (
                    <div>
                      <label
                        htmlFor="checkout-address"
                        className="block font-display text-xs font-semibold uppercase tracking-[0.1em] text-[#BDBDBD] mb-2"
                      >
                        Delivery Address
                      </label>
                      <input
                        id="checkout-address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="742 Evergreen Ave, Apt 4B"
                        className="w-full bg-[#151515] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-[#BDBDBD]/40 focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                  )}

                  <div className="bg-[#151515] border border-white/10 p-4 text-xs text-[#BDBDBD]">
                    Payment:{' '}
                    <span className="text-white font-semibold">
                      {fulfillment === 'Delivery'
                        ? 'Cash or Card on Delivery'
                        : 'Pay at Flagship Counter'}
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* Footer Totals & Action */}
            {items.length > 0 && step !== 'receipt' && (
              <div className="px-6 py-5 border-t border-white/10 bg-[#151515] space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#BDBDBD]">
                    <span>Subtotal</span>
                    <span className="tabular-nums text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#BDBDBD]">
                    <span>
                      {fulfillment === 'Pickup' ? 'Counter Pickup' : 'Delivery'}
                    </span>
                    <span className="tabular-nums text-white">
                      {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between font-display text-base font-extrabold text-white">
                    <span>Total</span>
                    <span className="tabular-nums text-[#FFC400]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {step === 'cart' ? (
                  <button
                    type="button"
                    onClick={() => setStep('checkout')}
                    className="w-full bg-[#FFC400] text-[#080808] hover:bg-[#FFD233] font-display text-xs font-extrabold tracking-[0.12em] uppercase py-4 transition-colors cursor-pointer"
                  >
                    Proceed To Checkout
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-form"
                    className="w-full bg-[#FFC400] text-[#080808] hover:bg-[#FFD233] font-display text-xs font-extrabold tracking-[0.12em] uppercase py-4 transition-colors cursor-pointer"
                  >
                    Confirm Order · ${total.toFixed(2)}
                  </button>
                )}
              </div>
            )}

            {step === 'receipt' && (
              <div className="px-6 py-5 border-t border-white/10 bg-[#151515]">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full border border-white/25 hover:border-[#FFC400] hover:text-[#FFC400] font-display text-xs font-bold tracking-[0.12em] uppercase py-3.5 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

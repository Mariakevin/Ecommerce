// === CART ABANDONMENT RECOVERY: Chennai Retail ===

const CartRecovery = {
  // Configuration
  config: {
    exitIntentEnabled: true,
    autoSaveEnabled: true,
    inactivityTimeout: 300000, // 5 minutes
    exitIntentDelay: 5000,     // 5 seconds before showing modal
    maxShowCount: 2,           // Max times to show exit modal per session
    storageKey: 'chennai_cart_backup',
    sessionKey: 'chennai_exit_shown'
  },

  // === EXIT-INTENT DETECTION ===
  exitIntent: {
    shown: false,
    countdown: null,

    init() {
      if (!CartRecovery.config.exitIntentEnabled) return;
      if (sessionStorage.getItem(CartRecovery.config.sessionKey)) return;
      
      document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !this.shown) {
          this.schedule();
        }
      });

      // Also detect mobile back button / tab switch
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && !this.shown) {
          this.schedule();
        }
      });
    },

    schedule() {
      this.countdown = setTimeout(() => {
        if (!this.shown && CartRecovery.getCartItems().length > 0) {
          this.show();
        }
      }, CartRecovery.config.exitIntentDelay);
    },

    cancel() {
      if (this.countdown) clearTimeout(this.countdown);
    },

    show() {
      this.shown = true;
      const count = parseInt(sessionStorage.getItem(CartRecovery.config.sessionKey) || '0');
      if (count >= CartRecovery.config.maxShowCount) return;
      sessionStorage.setItem(CartRecovery.config.sessionKey, count + 1);

      const cartItems = CartRecovery.getCartItems();
      if (cartItems.length === 0) return;

      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      CartRecovery.showModal({
        title: "Don't leave your items behind!",
        subtitle: `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart worth \u20B9${total.toLocaleString('en-IN')}`,
        offer: "Complete your order now and get 10% off",
        couponCode: "COMEBACK10",
        cta: "Complete Order",
        dismiss: "Maybe Later",
        items: cartItems.slice(0, 3) // Show top 3 items
      });
    }
  },

  // === INACTIVITY DETECTION ===
  inactivity: {
    timer: null,

    init() {
      this.reset();
      ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, () => this.reset(), { passive: true });
      });
    },

    reset() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (CartRecovery.getCartItems().length > 0) {
          CartRecovery.showMiniReminder();
        }
      }, CartRecovery.config.inactivityTimeout);
    }
  },

  // === AUTO-SAVE CART ===
  autoSave: {
    init() {
      if (!CartRecovery.config.autoSaveEnabled) return;
      
      // Save cart on every change
      window.addEventListener('cart-updated', (e) => {
        CartRecovery.saveCart(e.detail);
      });

      // Restore cart on page load
      const restored = CartRecovery.restoreCart();
      if (restored) {
        console.log('Cart restored from backup:', restored.length, 'items');
      }
    }
  },

  // === CART OPERATIONS ===
  getCartItems() {
    try {
      const cartData = localStorage.getItem('chennai_cart');
      return cartData ? JSON.parse(cartData) : [];
    } catch {
      return [];
    }
  },

  saveCart(items) {
    try {
      localStorage.setItem(CartRecovery.config.storageKey, JSON.stringify({
        items: items,
        timestamp: Date.now(),
        ttl: 7 * 24 * 60 * 60 * 1000 // 7 days
      }));
    } catch (e) {
      console.warn('Cart auto-save failed:', e);
    }
  },

  restoreCart() {
    try {
      const saved = localStorage.getItem(CartRecovery.config.storageKey);
      if (!saved) return null;
      
      const data = JSON.parse(saved);
      if (Date.now() - data.timestamp > data.ttl) {
        localStorage.removeItem(CartRecovery.config.storageKey);
        return null;
      }
      return data.items;
    } catch {
      return null;
    }
  },

  // === MODAL SYSTEM ===
  showModal({ title, subtitle, offer, couponCode, cta, dismiss, items }) {
    // Remove existing modal
    const existing = document.getElementById('cartRecoveryModal');
    if (existing) existing.remove();

    const itemsHtml = items.map(item => `
      <div style="display:flex;gap:12px;align-items:center;padding:8px 0;border-bottom:1px solid #f3f4f6;">
        <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.name}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;">
        <div style="flex:1;min-width:0;">
          <p style="font-weight:500;font-size:14px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</p>
          <p style="color:#666;font-size:13px;margin:2px 0 0;">Qty: ${item.quantity} \u00D7 \u20B9${item.price.toLocaleString('en-IN')}</p>
        </div>
      </div>
    `).join('');

    const modal = document.createElement('div');
    modal.id = 'cartRecoveryModal';
    modal.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:10001;display:flex;align-items:center;justify-content:center;padding:20px;" onclick="CartRecovery.closeModal(event)">
        <div style="background:white;border-radius:16px;max-width:440px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.3);animation:slideUp 0.3s ease;" onclick="event.stopPropagation()">
          <!-- Header -->
          <div style="background:linear-gradient(135deg,#DC2626,#B91C1C);color:white;padding:24px 24px 16px;border-radius:16px 16px 0 0;position:relative;">
            <button onclick="CartRecovery.closeModal()" style="position:absolute;top:12px;right:12px;background:rgba(255,255,255,0.2);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;" aria-label="Close">\u00D7</button>
            <h3 style="margin:0 0 8px;font-size:20px;font-weight:600;">${title}</h3>
            <p style="margin:0;opacity:0.9;font-size:14px;">${subtitle}</p>
          </div>
          
          <!-- Offer Banner -->
          <div style="background:#FEF2F2;padding:12px 24px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #FECACA;">
            <span class="material-symbols-outlined" style="font-size:20px;color:#DC2626;">local_offer</span>
            <div>
              <p style="margin:0;font-weight:600;color:#DC2626;font-size:14px;">${offer}</p>
              <p style="margin:2px 0 0;color:#991B1B;font-size:13px;">Use code: <strong>${couponCode}</strong></p>
            </div>
          </div>
          
          <!-- Cart Items Preview -->
          <div style="padding:16px 24px;">
            <p style="font-size:12px;text-transform:uppercase;color:#9CA3AF;letter-spacing:0.05em;margin:0 0 8px;font-weight:600;">Your Cart</p>
            ${itemsHtml}
          </div>
          
          <!-- Actions -->
          <div style="padding:0 24px 24px;display:flex;flex-direction:column;gap:8px;">
            <a href="checkout.html" style="display:flex;align-items:center;justify-content:center;gap:8px;background:#DC2626;color:white;padding:14px 24px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;transition:background 0.2s;" onmouseover="this.style.background='#B91C1C'" onmouseout="this.style.background='#DC2626'">
              <span class="material-symbols-outlined" style="font-size:18px;">shopping_cart</span>
              ${cta}
            </a>
            <button onclick="CartRecovery.closeModal()" style="background:none;border:none;color:#666;padding:10px;font-size:14px;cursor:pointer;text-decoration:underline;">
              ${dismiss}
            </button>
          </div>
        </div>
      </div>
      <style>
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      </style>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Copy coupon to clipboard
    navigator.clipboard?.writeText(couponCode).catch(() => {});

    // Track event
    if (typeof gtag === 'function') {
      gtag('event', 'cart_abandonment_recovery_shown', {
        items_count: items.length,
        cart_value: items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
      });
    }
  },

  closeModal(event) {
    if (event && event.target !== event.currentTarget) return;
    const modal = document.getElementById('cartRecoveryModal');
    if (modal) {
      modal.style.opacity = '0';
      modal.style.transition = 'opacity 0.2s';
      setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';
      }, 200);
    }
  },

  // === MINI REMINDER (Inactivity) ===
  showMiniReminder() {
    const existing = document.getElementById('cartMiniReminder');
    if (existing) return;

    const cartItems = this.getCartItems();
    if (cartItems.length === 0) return;

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const reminder = document.createElement('div');
    reminder.id = 'cartMiniReminder';
    reminder.innerHTML = `
      <div style="position:fixed;bottom:90px;right:20px;background:white;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.15);padding:16px 20px;max-width:320px;z-index:999;animation:slideInRight 0.3s ease;border-left:4px solid #DC2626;">
        <div style="display:flex;justify-content:space-between;align-items:start;gap:12px;">
          <div>
            <p style="margin:0;font-weight:600;font-size:14px;">Your cart is waiting!</p>
            <p style="margin:4px 0 0;color:#666;font-size:13px;">${cartItems.length} item${cartItems.length > 1 ? 's' : ''} worth \u20B9${total.toLocaleString('en-IN')}</p>
          </div>
          <button onclick="this.closest('#cartMiniReminder').remove()" style="background:none;border:none;color:#999;cursor:pointer;font-size:18px;padding:0;line-height:1;" aria-label="Dismiss">\u00D7</button>
        </div>
        <a href="cart.html" style="display:block;margin-top:12px;background:#DC2626;color:white;text-align:center;padding:10px;border-radius:8px;text-decoration:none;font-weight:500;font-size:13px;">
          View Cart \u2192
        </a>
      </div>
      <style>
        @keyframes slideInRight { from { opacity:0; transform:translateX(100px); } to { opacity:1; transform:translateX(0); } }
      </style>
    `;

    document.body.appendChild(reminder);

    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (reminder.parentNode) {
        reminder.style.opacity = '0';
        reminder.style.transition = 'opacity 0.3s';
        setTimeout(() => reminder.remove(), 300);
      }
    }, 10000);
  },

  // === CHECKOUT STEP TRACKING ===
  trackCheckoutStep(step) {
    if (typeof gtag === 'function') {
      const cartItems = this.getCartItems();
      gtag('event', 'checkout_progress', {
        checkout_step: step,
        currency: 'INR',
        value: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        items: cartItems.map(item => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      });
    }
  },

  // === INIT ===
  init() {
    this.exitIntent.init();
    this.inactivity.init();
    this.autoSave.init();
    console.log('Cart Recovery system initialized');
  }
};

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => CartRecovery.init());
} else {
  CartRecovery.init();
}

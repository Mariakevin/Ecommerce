// cartStore.js — Reactive cart state (wraps CartService with reactivity)

const cartStore = {
    _state: {
        items: [],
        count: 0,
        subtotal: 0,
        tax: 0,
        deliveryFee: 0,
        total: 0
    },

    init() {
        this._sync();
        window.EventBus.on('cart:updated', () => this._sync());
    },

    _sync() {
        this._state.items = CartService.getCart();
        this._state.count = CartService.getCount();
        this._state.subtotal = CartService.getSubtotal();
        this._state.tax = CartService.getTax();
        this._state.deliveryFee = CartService.getDeliveryFee();
        this._state.total = CartService.getGrandTotal();
        this._updateBadges();
    },

    getState() {
        return { ...this._state };
    },

    addItem(product, qty) {
        CartService.addItem(product, qty);
    },

    removeItem(productId) {
        CartService.removeItem(productId);
    },

    updateQty(productId, qty) {
        CartService.updateQty(productId, qty);
    },

    clear() {
        CartService.clearCart();
    },

    _updateBadges() {
        document.querySelectorAll('.cart-badge').forEach(function(badge) {
            badge.textContent = cartStore._state.count;
            badge.style.display = cartStore._state.count > 0 ? 'flex' : 'none';
        });
    }
};

window.cartStore = cartStore;

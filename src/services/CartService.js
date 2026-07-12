// CartService.js — Cart data access layer
// Manages cart state in localStorage with reactive updates via EventBus

const CartService = {
    STORAGE_KEY: 'chennai_retail_cart',

    getCart() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    },

    _save(cart) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
        window.EventBus.emit('cart:updated', cart);
    },

    addItem(product, qty = 1) {
        const cart = this.getCart();
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                qty: qty
            });
        }
        this._save(cart);
        return cart;
    },

    removeItem(productId) {
        const cart = this.getCart().filter(item => item.id !== productId);
        this._save(cart);
        return cart;
    },

    updateQty(productId, qty) {
        const cart = this.getCart();
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.qty = Math.max(1, qty);
            this._save(cart);
        }
        return cart;
    },

    clearCart() {
        this._save([]);
    },

    getCount() {
        return this.getCart().reduce((sum, item) => sum + item.qty, 0);
    },

    getSubtotal() {
        return this.getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
    },

    getTax(rate = 0.05) {
        return Math.round(this.getSubtotal() * rate);
    },

    getTotal() {
        return this.getSubtotal() + this.getTax();
    },

    hasFreeDelivery() {
        return this.getSubtotal() >= 999;
    },

    getDeliveryFee() {
        return this.hasFreeDelivery() ? 0 : 99;
    },

    getGrandTotal() {
        return this.getTotal() + this.getDeliveryFee();
    }
};

if (typeof module !== 'undefined') module.exports = CartService;
window.CartService = CartService;

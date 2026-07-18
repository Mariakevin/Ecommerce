// OrderService.js — Order management layer
// In production, this would call a real order API

const OrderService = {
    STORAGE_KEY: 'chennai_retail_orders',

    getOrders() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    },

    createOrder(shippingDetails, paymentMethod, deliveryOption) {
        const cart = window.CartService.getCart();
        if (cart.length === 0) return null;

        const deliveryDays = deliveryOption === 'express' ? 1 : 3;
        const expressFee = deliveryOption === 'express' ? 149 : 0;
        const subtotal = window.CartService.getSubtotal();
        const tax = window.CartService.getTax();
        const deliveryFee = subtotal >= 999 ? expressFee : (expressFee || 99);
        const total = subtotal + tax + deliveryFee;
        const order = {
            id: 'CR-2026-' + Math.floor(1000 + Math.random() * 9000),
            items: [...cart],
            subtotal: subtotal,
            tax: tax,
            deliveryFee: deliveryFee,
            total: total,
            shipping: shippingDetails,
            paymentMethod: paymentMethod || 'cod',
            deliveryOption: deliveryOption || 'standard',
            status: 'processing',
            createdAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + deliveryDays * 86400000).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'long', year: 'numeric'
            })
        };

        const orders = this.getOrders();
        orders.unshift(order);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));

        window.CartService.clearCart();
        window.EventBus.emit('order:created', order);

        return order;
    },

    getOrderById(orderId) {
        return this.getOrders().find(o => o.id === orderId) || null;
    }
};

if (typeof module !== 'undefined') module.exports = OrderService;
window.OrderService = OrderService;

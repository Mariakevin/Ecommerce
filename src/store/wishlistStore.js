// wishlistStore.js — Reactive wishlist state

const wishlistStore = {
    STORAGE_KEY: 'chennai_retail_wishlist',

    getWishlist() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    },

    _save(list) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
        this.updateIcons();
        window.EventBus.emit('wishlist:updated', list);
    },

    toggle(productId, name) {
        const list = this.getWishlist();
        const idx = list.indexOf(productId);
        if (idx > -1) {
            list.splice(idx, 1);
            window.showToast(name + ' removed from wishlist', 'info');
        } else {
            list.push(productId);
            window.showToast(name + ' added to wishlist');
        }
        this._save(list);
    },

    isInWishlist(productId) {
        return this.getWishlist().indexOf(productId) > -1;
    },

    getCount() {
        return this.getWishlist().length;
    },

    async getWishlistProducts() {
        const ids = this.getWishlist();
        const products = await window.ProductService.getProducts();
        return products.filter(p => ids.includes(p.id));
    },

    updateIcons() {
        var self = this;
        document.querySelectorAll('.wishlist-btn').forEach(function(btn) {
            var id = btn.dataset.productId;
            var icon = btn.querySelector('.material-symbols-outlined');
            if (!icon) return;
            if (self.isInWishlist(id)) {
                icon.classList.add('fill');
                btn.style.color = 'var(--primary)';
            } else {
                icon.classList.remove('fill');
                btn.style.color = '';
            }
        });
    }
};

window.wishlistStore = wishlistStore;

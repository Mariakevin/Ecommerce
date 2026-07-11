/* ============================================================
   Chennai Retail - Shared JavaScript
   Interactions, cart, search, toasts, and UI components
   ============================================================ */

(function() {
    'use strict';

    /* --------------------------------------------------
       1. Toast Notification System
       -------------------------------------------------- */
    window.showToast = function(message, type = 'success', duration = 3000) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const icons = {
            success: 'check_circle',
            error: 'error',
            info: 'info'
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type} toast-enter`;
        toast.innerHTML = `
            <span class="material-symbols-outlined fill" style="font-size:20px">${icons[type] || 'info'}</span>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('toast-enter');
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    /* --------------------------------------------------
       2. Cart Management
       -------------------------------------------------- */
    const CART_KEY = 'chennai_retail_cart';

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch { return []; }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartBadge();
    }

    window.addToCart = function(product) {
        const cart = getCart();
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.qty += (product.qty || 1);
        } else {
            cart.push({ ...product, qty: product.qty || 1 });
        }
        saveCart(cart);
        showToast(`${product.name} added to cart`);
    };

    window.removeFromCart = function(productId) {
        const cart = getCart().filter(item => item.id !== productId);
        saveCart(cart);
        showToast('Item removed from cart', 'info');
    };

    window.updateCartQty = function(productId, qty) {
        const cart = getCart();
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.qty = Math.max(1, qty);
            saveCart(cart);
        }
    };

    window.getCartTotal = function() {
        return getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
    };

    window.getCartCount = function() {
        return getCart().reduce((sum, item) => sum + item.qty, 0);
    };

    function updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = getCartCount();
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    /* --------------------------------------------------
       3. Wishlist Management
       -------------------------------------------------- */
    const WISH_KEY = 'chennai_retail_wishlist';

    function getWishlist() {
        try {
            return JSON.parse(localStorage.getItem(WISH_KEY)) || [];
        } catch { return []; }
    }

    function saveWishlist(list) {
        localStorage.setItem(WISH_KEY, JSON.stringify(list));
        updateWishlistIcons();
    }

    window.toggleWishlist = function(productId, name) {
        const list = getWishlist();
        const idx = list.indexOf(productId);
        if (idx > -1) {
            list.splice(idx, 1);
            showToast(`${name} removed from wishlist`, 'info');
        } else {
            list.push(productId);
            showToast(`${name} added to wishlist`);
        }
        saveWishlist(list);
    };

    window.isInWishlist = function(productId) {
        return getWishlist().includes(productId);
    };

    function updateWishlistIcons() {
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const id = btn.dataset.productId;
            const icon = btn.querySelector('.material-symbols-outlined');
            if (isInWishlist(id)) {
                icon.classList.add('fill');
                btn.style.color = 'var(--primary)';
            } else {
                icon.classList.remove('fill');
                btn.style.color = '';
            }
        });
    }

    /* --------------------------------------------------
       4. Quantity Stepper
       -------------------------------------------------- */
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.qty-stepper button');
        if (!btn) return;

        const stepper = btn.closest('.qty-stepper');
        const input = stepper.querySelector('input[type="number"]');
        if (!input) return;

        let val = parseInt(input.value) || 1;
        if (btn.dataset.action === 'inc') val++;
        else if (btn.dataset.action === 'dec') val--;

        val = Math.max(parseInt(input.min) || 1, val);
        val = Math.min(parseInt(input.max) || 99, val);
        input.value = val;

        input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    /* --------------------------------------------------
       5. Tab System
       -------------------------------------------------- */
    document.addEventListener('click', function(e) {
        const tabBtn = e.target.closest('.tab-btn');
        if (!tabBtn) return;

        const group = tabBtn.closest('[data-tab-group]');
        if (!group) return;

        const target = tabBtn.dataset.tab;
        group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

        tabBtn.classList.add('active');
        const panel = group.querySelector(`[data-tab="${target}"]`);
        if (panel) panel.classList.add('active');
    });

    /* --------------------------------------------------
       6. Mega Menu (Mobile Toggle)
       -------------------------------------------------- */
    window.toggleMegaMenu = function(menuId) {
        const menu = document.getElementById(menuId);
        if (!menu) return;
        const isOpen = menu.classList.contains('active');
        document.querySelectorAll('.mega-menu-mobile').forEach(m => m.classList.remove('active'));
        if (!isOpen) menu.classList.add('active');
    };

    /* --------------------------------------------------
       7. Mobile Filter Drawer
       -------------------------------------------------- */
    window.openFilters = function() {
        const drawer = document.getElementById('filterDrawer');
        const backdrop = document.getElementById('filterBackdrop');
        if (drawer) drawer.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeFilters = function() {
        const drawer = document.getElementById('filterDrawer');
        const backdrop = document.getElementById('filterBackdrop');
        if (drawer) drawer.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
    };

    /* --------------------------------------------------
       8. Modal System
       -------------------------------------------------- */
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /* --------------------------------------------------
       9. Countdown Timer
       -------------------------------------------------- */
    window.initCountdown = function(element, endDate) {
        function update() {
            const now = Date.now();
            const diff = new Date(endDate).getTime() - now;
            if (diff <= 0) {
                element.querySelectorAll('.countdown-value').forEach(v => v.textContent = '00');
                return;
            }
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);

            const days = element.querySelector('[data-days]');
            const hours = element.querySelector('[data-hours]');
            const mins = element.querySelector('[data-mins]');
            const secs = element.querySelector('[data-secs]');

            if (days) days.textContent = String(d).padStart(2, '0');
            if (hours) hours.textContent = String(h).padStart(2, '0');
            if (mins) mins.textContent = String(m).padStart(2, '0');
            if (secs) secs.textContent = String(s).padStart(2, '0');
        }
        update();
        setInterval(update, 1000);
    };

    /* --------------------------------------------------
       10. Scroll Animations (IntersectionObserver)
       -------------------------------------------------- */
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('[data-animate]').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    /* --------------------------------------------------
       11. Image Gallery
       -------------------------------------------------- */
    window.initGallery = function(container) {
        const mainImg = container.querySelector('.gallery-main img');
        const thumbs = container.querySelectorAll('.gallery-thumb');

        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                if (mainImg) {
                    const newSrc = thumb.querySelector('img')?.src;
                    if (newSrc) mainImg.src = newSrc;
                }
            });
        });

        // Zoom on hover
        if (mainImg) {
            const wrapper = mainImg.closest('.gallery-main');
            if (wrapper) {
                wrapper.addEventListener('mousemove', (e) => {
                    const rect = wrapper.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    mainImg.style.transformOrigin = `${x}% ${y}%`;
                    mainImg.style.transform = 'scale(1.5)';
                });
                wrapper.addEventListener('mouseleave', () => {
                    mainImg.style.transform = 'scale(1)';
                });
            }
        }
    };

    /* --------------------------------------------------
       12. Language Switcher
       -------------------------------------------------- */
    window.toggleLanguage = function(lang) {
        const enBtns = document.querySelectorAll('.lang-en');
        const taBtns = document.querySelectorAll('.lang-ta');
        if (lang === 'ta') {
            enBtns.forEach(b => b.classList.remove('active-lang'));
            taBtns.forEach(b => b.classList.add('active-lang'));
        } else {
            taBtns.forEach(b => b.classList.remove('active-lang'));
            enBtns.forEach(b => b.classList.add('active-lang'));
        }
        showToast(lang === 'ta' ? 'தமிழில் மாற்றப்பட்டது' : 'Switched to English', 'info');
    };

    /* --------------------------------------------------
       13. Search Functionality
       -------------------------------------------------- */
    window.initSearch = function(input, dropdown) {
        if (!input || !dropdown) return;

        input.addEventListener('focus', () => {
            dropdown.classList.add('active');
        });

        input.addEventListener('input', () => {
            const query = input.value.trim().toLowerCase();
            const suggestions = dropdown.querySelectorAll('[data-search-item]');
            let hasVisible = false;
            suggestions.forEach(item => {
                const text = item.textContent.toLowerCase();
                const show = !query || text.includes(query);
                item.style.display = show ? '' : 'none';
                if (show) hasVisible = true;
            });
            const noResults = dropdown.querySelector('[data-no-results]');
            if (noResults) noResults.style.display = hasVisible ? 'none' : '';
        });

        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    };

    /* --------------------------------------------------
       14. Pincode Check (Mock)
       -------------------------------------------------- */
    window.checkPincode = function(pincode) {
        const chennaiPincodes = ['600001','600002','600003','600004','600005','600006','600017','600018','600028','600029','600030','600040','600041','600042','600060','600061','600062','600063','600064','600065','600066','600073','600074','600075','600076','600077','600078','600079','600080','600081','600082','600083','600084','600085','600086','600087','600088','600089','600090','600091','600092','600093','600094','600095','600096','600097','600100','600101','600102','600103','600104','600105','600106','600107','600113','600119','603102','603103','603104','603105','603106','603107','603108','603109','603110'];
        return chennaiPincodes.includes(pincode);
    };

    /* --------------------------------------------------
       15. Number to INR
       -------------------------------------------------- */
    window.formatPrice = function(amount) {
        return '₹' + Number(amount).toLocaleString('en-IN');
    };

    /* --------------------------------------------------
       16. Accordion
       -------------------------------------------------- */
    document.addEventListener('click', function(e) {
        const trigger = e.target.closest('.accordion-trigger');
        if (!trigger) return;

        const item = trigger.closest('.accordion-item');
        const content = item?.querySelector('.accordion-content');
        if (!content) return;

        const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

        // Close siblings
        const group = item.closest('.accordion-group');
        if (group) {
            group.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = '0px');
            group.querySelectorAll('.accordion-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
        }

        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
            trigger.setAttribute('aria-expanded', 'true');
        }
    });

    /* --------------------------------------------------
       17. Confetti Effect
       -------------------------------------------------- */
    window.triggerConfetti = function(container) {
        if (!container) return;
        const colors = ['#e07a5f', '#436086', '#ffb4a1', '#b3d1fd', '#ffdeab', '#9a442d'];
        for (let i = 0; i < 60; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece animate-confetti';
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 3) + 's';
            piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
            piece.style.width = (Math.random() * 8 + 6) + 'px';
            piece.style.height = (Math.random() * 14 + 8) + 'px';
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            container.appendChild(piece);
        }
    };

    /* --------------------------------------------------
       18. Sticky Header Shadow on Scroll
       -------------------------------------------------- */
    function initStickyHeader() {
        const header = document.querySelector('header.sticky-header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('shadow-ambient');
            } else {
                header.classList.remove('shadow-ambient');
            }
        }, { passive: true });
    }

    /* --------------------------------------------------
       19. Product View Toggle (Grid/List)
       -------------------------------------------------- */
    window.setProductView = function(view) {
        const grid = document.getElementById('productGrid');
        const gridBtn = document.getElementById('viewGrid');
        const listBtn = document.getElementById('viewList');
        if (!grid) return;

        if (view === 'list') {
            grid.classList.remove('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
            grid.classList.add('flex', 'flex-col', 'gap-4');
            grid.querySelectorAll(':scope > a, :scope > div').forEach(card => {
                card.classList.add('product-card-list');
            });
            listBtn?.classList.add('active');
            gridBtn?.classList.remove('active');
        } else {
            grid.classList.remove('flex', 'flex-col', 'gap-4');
            grid.classList.add('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
            grid.querySelectorAll(':scope > a, :scope > div').forEach(card => {
                card.classList.remove('product-card-list');
            });
            gridBtn?.classList.add('active');
            listBtn?.classList.remove('active');
        }
    };

    /* --------------------------------------------------
       20. Init on DOM Ready
       -------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function() {
        updateCartBadge();
        updateWishlistIcons();
        initScrollAnimations();
        initStickyHeader();

        // Initialize galleries
        document.querySelectorAll('[data-gallery]').forEach(g => initGallery(g));

        // Initialize search
        document.querySelectorAll('[data-search-input]').forEach(input => {
            const dropdown = input.closest('.relative')?.querySelector('[data-search-dropdown]');
            if (dropdown) initSearch(input, dropdown);
        });

        // Language switcher active styles
        const style = document.createElement('style');
        style.textContent = `.active-lang { color: var(--primary) !important; border-bottom: 2px solid var(--primary); padding-bottom: 2px; }`;
        document.head.appendChild(style);
    });

})();

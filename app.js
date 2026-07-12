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

    /* --------------------------------------------------
        21. Scroll Reveal Engine
        -------------------------------------------------- */
    function initScrollReveal() {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

        document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(el => {
            revealObserver.observe(el);
        });
    }

    /* --------------------------------------------------
        22. Scroll Progress Indicator
        -------------------------------------------------- */
    function initScrollProgress() {
        const bar = document.querySelector('.scroll-progress');
        if (!bar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
        }, { passive: true });
    }

    /* --------------------------------------------------
        23. Cart Fly-to Animation
        -------------------------------------------------- */
    window.flyToCart = function(imageEl) {
        if (!imageEl) return;
        const cartIcon = document.querySelector('header .cart-badge, nav .cart-badge');
        if (!cartIcon) return;

        const imgRect = imageEl.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        const clone = imageEl.cloneNode(true);
        clone.className = 'cart-fly-clone';
        clone.style.width = imgRect.width + 'px';
        clone.style.height = imgRect.height + 'px';
        clone.style.left = imgRect.left + 'px';
        clone.style.top = imgRect.top + 'px';
        clone.style.setProperty('--fly-x', (cartRect.left - imgRect.left) * 0.5 + 'px');
        clone.style.setProperty('--fly-y', (cartRect.top - imgRect.top) * 0.5 + 'px');
        clone.style.setProperty('--fly-x-end', (cartRect.left - imgRect.left) + 'px');
        clone.style.setProperty('--fly-y-end', (cartRect.top - imgRect.top) + 'px');
        document.body.appendChild(clone);

        setTimeout(() => clone.remove(), 750);
    };

    /* --------------------------------------------------
        24. Wishlist Heart Burst
        -------------------------------------------------- */
    window.wishlistBurst = function(btn) {
        if (!btn) return;
        btn.classList.add('wishlist-burst');
        setTimeout(() => btn.classList.remove('wishlist-burst'), 500);

        // Create particles
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('span');
            particle.className = 'wishlist-particle';
            const angle = (i / 6) * 360;
            const dist = 20 + Math.random() * 15;
            particle.style.setProperty('--tx', Math.cos(angle * Math.PI / 180) * dist + 'px');
            particle.style.setProperty('--ty', Math.sin(angle * Math.PI / 180) * dist + 'px');
            particle.style.background = i % 2 === 0 ? 'var(--primary)' : 'var(--primary-container)';
            btn.style.position = 'relative';
            btn.appendChild(particle);
            setTimeout(() => particle.remove(), 600);
        }
    };

    /* --------------------------------------------------
        25. Button Ripple Effect
        -------------------------------------------------- */
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn-ripple');
        if (!btn) return;
        // The CSS ::after pseudo-element handles the ripple via :active
    });

    /* --------------------------------------------------
        26. Sticky Add-to-Cart (Product Page)
        -------------------------------------------------- */
    function initStickyAddToCart() {
        const stickyBar = document.querySelector('.sticky-add-cart');
        const mainAddBtn = document.querySelector('[data-main-add-cart]');
        if (!stickyBar || !mainAddBtn) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyBar.classList.remove('visible');
                } else {
                    stickyBar.classList.add('visible');
                }
            });
        }, { threshold: 0 });

        observer.observe(mainAddBtn);
    }

    /* --------------------------------------------------
        27. Image Lazy Loading
        -------------------------------------------------- */
    function initLazyImages() {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.addEventListener('load', () => img.classList.add('loaded'));
                    }
                    imgObserver.unobserve(img);
                }
            });
        }, { rootMargin: '200px 0px' });

        document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
    }

    /* --------------------------------------------------
        28. Swipe Gesture (Cart Delete)
        -------------------------------------------------- */
    function initSwipeGestures() {
        document.querySelectorAll('.swipe-container').forEach(container => {
            const content = container.querySelector('.swipe-content');
            if (!content) return;

            let startX = 0, currentX = 0, isDragging = false;

            content.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
                content.classList.add('swiping');
            }, { passive: true });

            content.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                currentX = e.touches[0].clientX - startX;
                if (currentX < 0) {
                    content.style.transform = `translateX(${Math.max(currentX, -80)}px)`;
                }
            }, { passive: true });

            content.addEventListener('touchend', () => {
                isDragging = false;
                content.classList.remove('swiping');
                if (currentX < -50) {
                    content.style.transform = 'translateX(-80px)';
                } else {
                    content.style.transform = 'translateX(0)';
                }
                currentX = 0;
            });
        });
    }

    /* --------------------------------------------------
        29. Animated Counter
        -------------------------------------------------- */
    window.animateCounter = function(el, target, duration = 1000) {
        const start = parseInt(el.textContent) || 0;
        const diff = target - start;
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.round(start + diff * eased);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    };

    /* --------------------------------------------------
        30. Parallax Scroll Effect
        -------------------------------------------------- */
    function initParallax() {
        const sections = document.querySelectorAll('.parallax-section');
        if (!sections.length) return;

        window.addEventListener('scroll', () => {
            sections.forEach(section => {
                const bg = section.querySelector('.parallax-bg');
                if (!bg) return;
                const rect = section.getBoundingClientRect();
                const speed = 0.3;
                const yPos = (rect.top * speed);
                bg.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }

    /* --------------------------------------------------
        31. Enhanced Toast with Progress Bar
        -------------------------------------------------- */
    window.showToastEnhanced = function(message, type = 'success', duration = 3500) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const icons = { success: 'check_circle', error: 'error', info: 'info' };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type} toast-enter`;
        toast.innerHTML = `
            <span class="material-symbols-outlined fill" style="font-size:20px">${icons[type] || 'info'}</span>
            <span style="flex:1">${message}</span>
            <span class="material-symbols-outlined" style="font-size:16px;cursor:pointer;opacity:0.6" onclick="this.closest('.toast').remove()">close</span>
            <div style="position:absolute;bottom:0;left:0;height:3px;background:currentColor;opacity:0.3;border-radius:0 0 0 var(--radius-lg);animation:toastProgress ${duration}ms linear forwards"></div>
        `;
        toast.style.position = 'relative';
        toast.style.overflow = 'hidden';
        container.appendChild(toast);

        // Add progress animation
        const progressStyle = document.createElement('style');
        progressStyle.textContent = `@keyframes toastProgress { from { width: 100%; } to { width: 0%; } }`;
        document.head.appendChild(progressStyle);

        setTimeout(() => {
            toast.classList.remove('toast-enter');
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    /* --------------------------------------------------
        32. Skeleton Loading for Product Grid
        -------------------------------------------------- */
    window.showSkeletons = function(container, count = 6) {
        if (!container) return;
        const html = Array.from({ length: count }, () => `
            <div class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-body">
                    <div class="skeleton-line w-75"></div>
                    <div class="skeleton-line w-50"></div>
                    <div class="skeleton-line w-40"></div>
                </div>
            </div>
        `).join('');
        container.innerHTML = html;
    };

    /* --------------------------------------------------
        33. Smooth Anchor Scroll
        -------------------------------------------------- */
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    /* --------------------------------------------------
        34. Page Init
        -------------------------------------------------- */
    // Update DOMContentLoaded to include new inits
    const origDOMContentLoaded = document.addEventListener;
    document.addEventListener('DOMContentLoaded', function() {
        initScrollReveal();
        initScrollProgress();
        initStickyAddToCart();
        initLazyImages();
        initSwipeGestures();
        initParallax();
    });

})();

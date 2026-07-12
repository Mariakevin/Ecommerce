/* ============================================================
   Chennai Retail - Application Shell
   UI interactions only — data/business logic in services/store
   ============================================================ */

(function() {
    'use strict';

    /* --------------------------------------------------
       1. Quantity Stepper (delegated)
       -------------------------------------------------- */
    document.addEventListener('click', function(e) {
        var btn = e.target.closest('.qty-stepper button');
        if (!btn) return;
        var stepper = btn.closest('.qty-stepper');
        var input = stepper.querySelector('input[type="number"]');
        if (!input) return;
        var val = parseInt(input.value) || 1;
        if (btn.dataset.action === 'inc') val++;
        else if (btn.dataset.action === 'dec') val--;
        val = Math.max(parseInt(input.min) || 1, val);
        val = Math.min(parseInt(input.max) || 99, val);
        input.value = val;
        input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    /* --------------------------------------------------
       2. Tab System (delegated)
       -------------------------------------------------- */
    document.addEventListener('click', function(e) {
        var tabBtn = e.target.closest('.tab-btn');
        if (!tabBtn) return;
        var group = tabBtn.closest('[data-tab-group]');
        if (!group) return;
        var target = tabBtn.dataset.tab;
        group.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
        group.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
        tabBtn.classList.add('active');
        var panel = group.querySelector('[data-tab="' + target + '"]');
        if (panel) panel.classList.add('active');
    });

    /* --------------------------------------------------
       3. Mobile Filter Drawer
       -------------------------------------------------- */
    window.openFilters = function() {
        var drawer = document.getElementById('filterDrawer');
        var backdrop = document.getElementById('filterBackdrop');
        if (drawer) drawer.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeFilters = function() {
        var drawer = document.getElementById('filterDrawer');
        var backdrop = document.getElementById('filterBackdrop');
        if (drawer) drawer.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
    };

    /* --------------------------------------------------
       4. Image Gallery
       -------------------------------------------------- */
    window.initGallery = function(container) {
        var mainImg = container.querySelector('.gallery-main img');
        var thumbs = container.querySelectorAll('.gallery-thumb');

        thumbs.forEach(function(thumb) {
            thumb.addEventListener('click', function() {
                thumbs.forEach(function(t) { t.classList.remove('active'); });
                thumb.classList.add('active');
                if (mainImg) {
                    var newSrc = thumb.querySelector('img');
                    if (newSrc) mainImg.src = newSrc.src;
                }
            });
        });

        if (mainImg) {
            var wrapper = mainImg.closest('.gallery-main');
            if (wrapper) {
                wrapper.addEventListener('mousemove', function(e) {
                    var rect = wrapper.getBoundingClientRect();
                    var x = ((e.clientX - rect.left) / rect.width) * 100;
                    var y = ((e.clientY - rect.top) / rect.height) * 100;
                    mainImg.style.transformOrigin = x + '% ' + y + '%';
                    mainImg.style.transform = 'scale(1.5)';
                });
                wrapper.addEventListener('mouseleave', function() {
                    mainImg.style.transform = 'scale(1)';
                });
            }
        }
    };

    /* --------------------------------------------------
       5. Search Functionality
       -------------------------------------------------- */
    window.initSearch = function(input, dropdown) {
        if (!input || !dropdown) return;

        input.addEventListener('focus', function() {
            dropdown.classList.add('active');
        });

        input.addEventListener('input', function() {
            var query = input.value.trim().toLowerCase();
            var suggestions = dropdown.querySelectorAll('[data-search-item]');
            var hasVisible = false;
            suggestions.forEach(function(item) {
                var text = item.textContent.toLowerCase();
                var show = !query || text.includes(query);
                item.style.display = show ? '' : 'none';
                if (show) hasVisible = true;
            });
            var noResults = dropdown.querySelector('[data-no-results]');
            if (noResults) noResults.style.display = hasVisible ? 'none' : '';
        });

        document.addEventListener('click', function(e) {
            if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    };

    /* --------------------------------------------------
       6. Sticky Header
       -------------------------------------------------- */
    function initStickyHeader() {
        var header = document.querySelector('header');
        if (!header) return;
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                header.classList.add('shadow-sm');
            } else {
                header.classList.remove('shadow-sm');
            }
        }, { passive: true });
    }

    /* --------------------------------------------------
       7. Product View Toggle
       -------------------------------------------------- */
    window.setProductView = function(view) {
        var grid = document.getElementById('productGrid');
        var gridBtn = document.getElementById('viewGrid');
        var listBtn = document.getElementById('viewList');
        if (!grid) return;
        if (view === 'list') {
            grid.classList.remove('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
            grid.classList.add('flex', 'flex-col', 'gap-4');
            if (listBtn) listBtn.classList.add('active');
            if (gridBtn) gridBtn.classList.remove('active');
        } else {
            grid.classList.remove('flex', 'flex-col', 'gap-4');
            grid.classList.add('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
            if (gridBtn) gridBtn.classList.add('active');
            if (listBtn) listBtn.classList.remove('active');
        }
    };

    /* --------------------------------------------------
       8. Scroll Reveal (Enhanced)
       -------------------------------------------------- */
    function initScrollReveal() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

        document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(function(el) {
            observer.observe(el);
        });
    }

    /* --------------------------------------------------
       8b. Cart Badge Bounce
       -------------------------------------------------- */
    window.bounceCartBadge = function() {
        document.querySelectorAll('.cart-badge').forEach(function(badge) {
            badge.classList.remove('bounce');
            void badge.offsetWidth;
            badge.classList.add('bounce');
            setTimeout(function() { badge.classList.remove('bounce'); }, 400);
        });
    };

    /* --------------------------------------------------
       9. Scroll Progress
       -------------------------------------------------- */
    function initScrollProgress() {
        var bar = document.querySelector('.scroll-progress');
        if (!bar) return;
        window.addEventListener('scroll', function() {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
        }, { passive: true });
    }

    /* --------------------------------------------------
       10. Cart Fly-to Animation
       -------------------------------------------------- */
    window.flyToCart = function(imageEl) {
        if (!imageEl) return;
        var cartIcon = document.querySelector('header .cart-badge, nav .cart-badge');
        if (!cartIcon) return;
        var imgRect = imageEl.getBoundingClientRect();
        var cartRect = cartIcon.getBoundingClientRect();
        var clone = imageEl.cloneNode(true);
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
        setTimeout(function() {
            clone.remove();
            if (window.bounceCartBadge) window.bounceCartBadge();
        }, 750);
    };

    /* --------------------------------------------------
       11. Wishlist Heart Burst
       -------------------------------------------------- */
    window.wishlistBurst = function(btn) {
        if (!btn) return;
        btn.classList.add('wishlist-burst');
        setTimeout(function() { btn.classList.remove('wishlist-burst'); }, 500);
        for (var i = 0; i < 6; i++) {
            var particle = document.createElement('span');
            particle.className = 'wishlist-particle';
            var angle = (i / 6) * 360;
            var dist = 20 + Math.random() * 15;
            particle.style.setProperty('--tx', Math.cos(angle * Math.PI / 180) * dist + 'px');
            particle.style.setProperty('--ty', Math.sin(angle * Math.PI / 180) * dist + 'px');
            btn.style.position = 'relative';
            btn.appendChild(particle);
            (function(p) { setTimeout(function() { p.remove(); }, 600); })(particle);
        }
    };

    /* --------------------------------------------------
       12. Sticky Add-to-Cart
       -------------------------------------------------- */
    function initStickyAddToCart() {
        var stickyBar = document.querySelector('.sticky-add-cart');
        var mainAddBtn = document.querySelector('[data-main-add-cart]');
        if (!stickyBar || !mainAddBtn) return;
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                stickyBar.classList.toggle('visible', !entry.isIntersecting);
            });
        }, { threshold: 0 });
        observer.observe(mainAddBtn);
    }

    /* --------------------------------------------------
       13. Smooth Anchor Scroll
       -------------------------------------------------- */
    document.addEventListener('click', function(e) {
        var link = e.target.closest('a[href^="#"]');
        if (!link) return;
        var target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    /* --------------------------------------------------
       14. Init on DOM Ready
       -------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize stores
        if (window.cartStore) window.cartStore.init();
        if (window.wishlistStore) window.wishlistStore.updateIcons();

        // Initialize UI
        initScrollReveal();
        initScrollProgress();
        initStickyHeader();
        initStickyAddToCart();

        // Initialize galleries
        document.querySelectorAll('[data-gallery]').forEach(function(g) { initGallery(g); });

        // Initialize search
        document.querySelectorAll('[data-search-input]').forEach(function(input) {
            var dropdown = input.closest('.relative');
            if (dropdown) dropdown = dropdown.querySelector('[data-search-dropdown]');
            if (dropdown) initSearch(input, dropdown);
        });

        // Initialize image lazy load
        document.querySelectorAll('img[data-src]').forEach(function(img) {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() { img.classList.add('loaded'); });
                img.addEventListener('error', function() { img.classList.add('loaded'); });
            }
        });
    });

})();

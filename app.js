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
       6. Shrinking Sticky Header
       -------------------------------------------------- */
    function initStickyHeader() {
        var header = document.getElementById('desktopHeader');
        if (!header) return;
        window.addEventListener('scroll', function() {
            if (window.scrollY > 80) {
                header.classList.add('shrunken');
            } else {
                header.classList.remove('shrunken');
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
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(function(el) {
                el.classList.add('revealed');
            });
            return;
        }

        var allEls = Array.from(document.querySelectorAll('[data-reveal], [data-reveal-stagger]'));

        function checkVisible() {
            var vh = window.innerHeight;
            allEls.forEach(function(el) {
                if (el.classList.contains('revealed')) return;
                var rect = el.getBoundingClientRect();
                if (rect.top < vh + 100 && rect.bottom > -100) {
                    el.classList.add('revealed');
                }
            });
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0, rootMargin: '100px 0px' });

        allEls.forEach(function(el) { observer.observe(el); });

        var ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    checkVisible();
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', checkVisible, { passive: true });

        checkVisible();
        setTimeout(checkVisible, 100);
        setTimeout(checkVisible, 500);
        setTimeout(checkVisible, 1000);
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
       14. Scroll to Top Button
       -------------------------------------------------- */
    function initScrollToTop() {
        var btn = document.getElementById('scrollToTop');
        if (!btn) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------
       15. Live Viewers Counter
       -------------------------------------------------- */
    function initLiveViewers() {
        var el = document.getElementById('liveViewers');
        if (!el) return;

        setInterval(function() {
            var current = parseInt(el.textContent) || 47;
            var change = Math.floor(Math.random() * 7) - 3;
            var newVal = Math.max(20, Math.min(80, current + change));
            el.textContent = newVal;
        }, 4000);
    }

    /* --------------------------------------------------
       16. Floating Social Proof Notification
       -------------------------------------------------- */
    function initFloatingNotification() {
        var notification = document.getElementById('floatingNotification');
        if (!notification) return;

        var names = ['Priya', 'Rahul', 'Kavitha', 'Madhavan', 'Sneha', 'Arun', 'Deepa', 'Vikram'];
        var locations = ['T. Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'Mylapore'];
        var products = ['Elegant Table Lamp', 'Minimalist Coffee Table', 'Modern Wall Art', 'Ceramic Vase Set', 'Designer Throw Pillow'];

        function showNotification() {
            var name = names[Math.floor(Math.random() * names.length)];
            var loc = locations[Math.floor(Math.random() * locations.length)];
            var product = products[Math.floor(Math.random() * products.length)];

            notification.querySelector('.name').textContent = name + ' from ' + loc;
            notification.querySelector('.action').textContent = 'just purchased ' + product;
            notification.style.display = 'flex';
            notification.style.animation = 'none';
            void notification.offsetWidth;
            notification.style.animation = 'slideInLeft 0.4s ease both';

            setTimeout(function() {
                notification.style.display = 'none';
            }, 5000);
        }

        // Show first notification after 8 seconds
        setTimeout(showNotification, 8000);

        // Then every 15 seconds
        setInterval(showNotification, 15000);
    }

    /* --------------------------------------------------
       17. Orders Counter Animation
       -------------------------------------------------- */
    function initOrdersCounter() {
        var el = document.getElementById('ordersCounter');
        if (!el) return;

        var target = 1247;
        var current = 0;
        var increment = Math.ceil(target / 60);
        var timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current.toLocaleString();
        }, 30);
    }

    /* --------------------------------------------------
       18. Recently Viewed (LocalStorage)
       -------------------------------------------------- */
    function initRecentlyViewed() {
        var section = document.getElementById('recentlyViewedSection');
        var container = document.getElementById('recentlyViewedItems');
        if (!section || !container) return;

        var viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        if (viewed.length === 0) {
            section.classList.add('hidden');
            return;
        }

        // Show max 4 items
        var items = viewed.slice(0, 4);
        container.innerHTML = items.map(function(item) {
            return '<a href="product.html?id=' + item.id + '" class="block p-2 bg-white rounded-lg border border-border hover:shadow-md transition-shadow">' +
                '<img src="' + item.image + '" alt="' + item.name + '" class="w-full aspect-square object-contain rounded-md mb-2">' +
                '<p class="text-xs font-medium text-gray-800 truncate">' + item.name + '</p>' +
                '<p class="text-xs font-semibold text-primary">' + (item.price ? '₹' + item.price : '') + '</p>' +
            '</a>';
        }).join('');

        section.classList.remove('hidden');
    }

    function trackRecentlyViewed(product) {
        if (!product || !product.id) return;
        var viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        
        // Remove if already exists
        viewed = viewed.filter(function(item) { return item.id !== product.id; });
        
        // Add to beginning
        viewed.unshift({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price
        });
        
        // Keep max 8 items
        viewed = viewed.slice(0, 8);
        
        localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
    }
    window.trackRecentlyViewed = trackRecentlyViewed;

    /* --------------------------------------------------
       19. Button Hover Micro-interactions
       -------------------------------------------------- */
    function initButtonEffects() {
        document.querySelectorAll('.btn-primary, .btn-buy-now, .btn-add-cart').forEach(function(btn) {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            btn.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });
            btn.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1.02)';
            });
        });
    }

    /* --------------------------------------------------
       20. Form Validation Feedback
       -------------------------------------------------- */
    function initFormValidation() {
        document.querySelectorAll('.form-input[required]').forEach(function(input) {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.classList.add('invalid');
                    this.classList.remove('valid');
                } else {
                    this.classList.remove('invalid');
                    this.classList.add('valid');
                }
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('invalid') && this.value.trim() !== '') {
                    this.classList.remove('invalid');
                    this.classList.add('valid');
                }
            });
        });

        // Email validation
        document.querySelectorAll('input[type="email"]').forEach(function(input) {
            input.addEventListener('blur', function() {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.classList.add('invalid');
                    this.classList.remove('valid');
                }
            });
        });
    }

    /* --------------------------------------------------
       21. Parallax Effect (Hero)
       -------------------------------------------------- */
    function initParallax() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        var heroImg = document.querySelector('.parallax-hero img');
        if (!heroImg) return;

        window.addEventListener('scroll', function() {
            var scrolled = window.scrollY;
            if (scrolled < 600) {
                heroImg.style.transform = 'translateY(' + (scrolled * 0.15) + 'px)';
            }
        }, { passive: true });
    }

    /* --------------------------------------------------
       22. Init on DOM Ready
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
        initScrollToTop();
        initLiveViewers();
        initFloatingNotification();
        initOrdersCounter();
        initRecentlyViewed();
        initButtonEffects();
        initFormValidation();
        initParallax();

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

    // === SERVICE WORKER REGISTRATION ===
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'activated') {
                            console.log('App updated! Refresh for latest version.');
                        }
                    });
                });
            } catch (error) {
                console.log('SW registration failed:', error);
            }
        });
    }

})();

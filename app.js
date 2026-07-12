/* ============================================================
   Chennai Retail - Shared JavaScript
   Cart, search, toasts, and UI components
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

        const icons = { success: 'check_circle', error: 'error', info: 'info' };

        const toast = document.createElement('div');
        toast.className = 'toast toast-' + type + ' toast-enter';
        toast.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px">' + (icons[type] || 'info') + '</span><span>' + message + '</span>';
        container.appendChild(toast);

        setTimeout(function() {
            toast.classList.remove('toast-enter');
            toast.classList.add('toast-exit');
            setTimeout(function() { toast.remove(); }, 300);
        }, duration);
    };

    /* --------------------------------------------------
       2. Cart Management
       -------------------------------------------------- */
    var CART_KEY = 'chennai_retail_cart';

    function getCart() {
        try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
        catch(e) { return []; }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartBadge();
    }

    window.addToCart = function(product) {
        var cart = getCart();
        var existing = cart.find(function(item) { return item.id === product.id; });
        if (existing) {
            existing.qty += (product.qty || 1);
        } else {
            cart.push(Object.assign({}, product, { qty: product.qty || 1 }));
        }
        saveCart(cart);
        showToast(product.name + ' added to cart');
    };

    function updateCartBadge() {
        var count = getCart().reduce(function(sum, item) { return sum + item.qty; }, 0);
        document.querySelectorAll('.cart-badge').forEach(function(badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    /* --------------------------------------------------
       3. Wishlist Management
       -------------------------------------------------- */
    var WISH_KEY = 'chennai_retail_wishlist';

    function getWishlist() {
        try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; }
        catch(e) { return []; }
    }

    function saveWishlist(list) {
        localStorage.setItem(WISH_KEY, JSON.stringify(list));
        updateWishlistIcons();
    }

    window.toggleWishlist = function(productId, name) {
        var list = getWishlist();
        var idx = list.indexOf(productId);
        if (idx > -1) {
            list.splice(idx, 1);
            showToast(name + ' removed from wishlist', 'info');
        } else {
            list.push(productId);
            showToast(name + ' added to wishlist');
        }
        saveWishlist(list);
    };

    function updateWishlistIcons() {
        document.querySelectorAll('.wishlist-btn').forEach(function(btn) {
            var id = btn.dataset.productId;
            var icon = btn.querySelector('.material-symbols-outlined');
            if (getWishlist().indexOf(id) > -1) {
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
       5. Tab System
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
       6. Mobile Filter Drawer
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
       7. Scroll Animations
       -------------------------------------------------- */
    function initScrollAnimations() {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('[data-animate]').forEach(function(el) {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    /* --------------------------------------------------
       8. Image Gallery
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
       9. Search Functionality
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
       10. Pincode Check
       -------------------------------------------------- */
    window.checkPincode = function(pincode) {
        var codes = ['600001','600002','600003','600004','600005','600006','600017','600018','600028','600029','600030','600040','600041','600042','600060','600061','600062','600063','600064','600065','600066','600073','600074','600075','600076','600077','600078','600079','600080','600081','600082','600083','600084','600085','600086','600087','600088','600089','600090','600091','600092','600093','600094','600095','600096','600097','600100','600101','600102','600103','600104','600105','600106','600107','600113','600119','603102','603103','603104','603105','603106','603107','603108','603109','603110'];
        return codes.indexOf(pincode) > -1;
    };

    /* --------------------------------------------------
       11. Accordion
       -------------------------------------------------- */
    document.addEventListener('click', function(e) {
        var trigger = e.target.closest('.accordion-trigger');
        if (!trigger) return;
        var item = trigger.closest('.accordion-item');
        var content = item ? item.querySelector('.accordion-content') : null;
        if (!content) return;
        var isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
        var group = item.closest('.accordion-group');
        if (group) {
            group.querySelectorAll('.accordion-content').forEach(function(c) { c.style.maxHeight = '0px'; });
            group.querySelectorAll('.accordion-trigger').forEach(function(t) { t.setAttribute('aria-expanded', 'false'); });
        }
        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
            trigger.setAttribute('aria-expanded', 'true');
        }
    });

    /* --------------------------------------------------
       12. Sticky Header
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
       13. Product View Toggle
       -------------------------------------------------- */
    window.setProductView = function(view) {
        var grid = document.getElementById('productGrid');
        var gridBtn = document.getElementById('viewGrid');
        var listBtn = document.getElementById('viewList');
        if (!grid) return;
        if (view === 'list') {
            grid.classList.remove('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
            grid.classList.add('flex', 'flex-col', 'gap-4');
            grid.querySelectorAll(':scope > a, :scope > div').forEach(function(card) {
                card.classList.add('product-card-list');
            });
            if (listBtn) listBtn.classList.add('active');
            if (gridBtn) gridBtn.classList.remove('active');
        } else {
            grid.classList.remove('flex', 'flex-col', 'gap-4');
            grid.classList.add('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
            grid.querySelectorAll(':scope > a, :scope > div').forEach(function(card) {
                card.classList.remove('product-card-list');
            });
            if (gridBtn) gridBtn.classList.add('active');
            if (listBtn) listBtn.classList.remove('active');
        }
    };

    /* --------------------------------------------------
       14. Scroll Reveal
       -------------------------------------------------- */
    function initScrollReveal() {
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
       15. Scroll Progress
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
       16. Cart Fly-to Animation
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
        setTimeout(function() { clone.remove(); }, 750);
    };

    /* --------------------------------------------------
       17. Wishlist Heart Burst
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
       18. Sticky Add-to-Cart
       -------------------------------------------------- */
    function initStickyAddToCart() {
        var stickyBar = document.querySelector('.sticky-add-cart');
        var mainAddBtn = document.querySelector('[data-main-add-cart]');
        if (!stickyBar || !mainAddBtn) return;
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
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
       19. Image Lazy Loading
       -------------------------------------------------- */
    function initLazyImages() {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.addEventListener('load', function() { img.classList.add('loaded'); });
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '200px 0px' });
        document.querySelectorAll('img[data-src]').forEach(function(img) { observer.observe(img); });
    }

    /* --------------------------------------------------
       20. Swipe Gesture (Cart Delete)
       -------------------------------------------------- */
    function initSwipeGestures() {
        document.querySelectorAll('.swipe-container').forEach(function(container) {
            var content = container.querySelector('.swipe-content');
            if (!content) return;
            var startX = 0, currentX = 0, isDragging = false;

            content.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
                isDragging = true;
                content.classList.add('swiping');
            }, { passive: true });

            content.addEventListener('touchmove', function(e) {
                if (!isDragging) return;
                currentX = e.touches[0].clientX - startX;
                if (currentX < 0) {
                    content.style.transform = 'translateX(' + Math.max(currentX, -80) + 'px)';
                }
            }, { passive: true });

            content.addEventListener('touchend', function() {
                isDragging = false;
                content.classList.remove('swiping');
                content.style.transform = currentX < -50 ? 'translateX(-80px)' : 'translateX(0)';
                currentX = 0;
            });
        });
    }

    /* --------------------------------------------------
       21. Smooth Anchor Scroll
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
       22. Init on DOM Ready
       -------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function() {
        updateCartBadge();
        updateWishlistIcons();
        initScrollAnimations();
        initScrollReveal();
        initScrollProgress();
        initStickyHeader();
        initStickyAddToCart();
        initLazyImages();
        initSwipeGestures();

        document.querySelectorAll('[data-gallery]').forEach(function(g) { initGallery(g); });

        document.querySelectorAll('[data-search-input]').forEach(function(input) {
            var dropdown = input.closest('.relative');
            if (dropdown) dropdown = dropdown.querySelector('[data-search-dropdown]');
            if (dropdown) initSearch(input, dropdown);
        });
    });

})();

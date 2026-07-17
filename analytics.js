// === GA4 ECOMMERCE TRACKING: Chennai Retail ===

// Wait for dataLayer to be ready
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// === CONSENT MODE V2 (GDPR) ===
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});

function acceptCookies() {
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted'
  });
  localStorage.setItem('cookie_consent', 'accepted');
  const banner = document.getElementById('cookieConsent');
  if (banner) banner.style.display = 'none';
}

function rejectCookies() {
  gtag('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied'
  });
  localStorage.setItem('cookie_consent', 'rejected');
  const banner = document.getElementById('cookieConsent');
  if (banner) banner.style.display = 'none';
}

// === PAGE VIEW ===
function trackPageView(pageName) {
  gtag('event', 'page_view', {
    page_title: pageName,
    page_location: window.location.href
  });
}

// === PRODUCT EVENTS ===
function trackViewItem(product) {
  gtag('event', 'view_item', {
    currency: 'INR',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category || '',
      price: product.price,
      quantity: 1
    }]
  });
}

function trackViewItemList(products, listName) {
  gtag('event', 'view_item_list', {
    item_list_name: listName,
    items: products.map((p, i) => ({
      item_id: p.id,
      item_name: p.name,
      index: i,
      price: p.price
    }))
  });
}

function trackSelectItem(product, listName) {
  gtag('event', 'select_item', {
    item_list_name: listName || '',
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price
    }]
  });
}

// === CART EVENTS ===
function trackAddToCart(product, quantity) {
  gtag('event', 'add_to_cart', {
    currency: 'INR',
    value: product.price * quantity,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category || '',
      price: product.price,
      quantity: quantity
    }]
  });
  // Announce to screen readers
  const announcer = document.getElementById('cart-announcer');
  if (announcer) announcer.textContent = product.name + ' added to cart';
}

function trackRemoveFromCart(product) {
  gtag('event', 'remove_from_cart', {
    currency: 'INR',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity: 1
    }]
  });
}

function trackViewCart(cartItems) {
  gtag('event', 'view_cart', {
    currency: 'INR',
    value: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    items: cartItems.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity
    }))
  });
}

// === CHECKOUT EVENTS ===
function trackBeginCheckout(cartItems, couponCode) {
  gtag('event', 'begin_checkout', {
    currency: 'INR',
    value: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    coupon: couponCode || '',
    items: cartItems.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity
    }))
  });
}

function trackAddShippingInfo(shippingOption) {
  gtag('event', 'add_shipping_info', {
    shipping_tier: shippingOption || 'Standard'
  });
}

function trackAddPaymentInfo(paymentMethod) {
  gtag('event', 'add_payment_info', {
    payment_type: paymentMethod || 'UPI'
  });
}

// === PURCHASE ===
function trackPurchase(order) {
  gtag('event', 'purchase', {
    transaction_id: order.id,
    value: order.total,
    tax: order.tax || 0,
    shipping: order.shipping || 0,
    currency: 'INR',
    coupon: order.couponCode || '',
    items: order.items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category || '',
      price: item.price,
      quantity: item.quantity
    }))
  });
}

// === SEARCH ===
function trackSearch(searchTerm, resultsCount) {
  gtag('event', 'search', {
    search_term: searchTerm,
    results_count: resultsCount || 0
  });
}

// === SHARE ===
function trackShare(contentType, itemId) {
  gtag('event', 'share', {
    method: 'social',
    content_type: contentType,
    item_id: itemId
  });
}

// === WISHLIST ===
function trackAddToWishlist(product) {
  gtag('event', 'add_to_wishlist', {
    currency: 'INR',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.price
    }]
  });
}

// === COOKIE CONSENT BANNER ===
function initCookieConsent() {
  const consent = localStorage.getItem('cookie_consent');
  if (consent) return;
  
  const banner = document.createElement('div');
  banner.id = 'cookieConsent';
  banner.innerHTML = `
    <div style="position:fixed;bottom:0;left:0;right:0;background:#111;color:white;padding:16px 20px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;z-index:10000;font-family:Inter,sans-serif;font-size:14px;">
      <span>We use cookies to improve your experience. By continuing, you agree to our cookie policy.</span>
      <div style="display:flex;gap:8px;">
        <button onclick="acceptCookies()" style="background:#DC2626;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:500;">Accept All</button>
        <button onclick="rejectCookies()" style="background:transparent;color:white;border:1px solid #444;padding:8px 16px;border-radius:6px;cursor:pointer;">Reject</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);
}

// Auto-init cookie consent
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCookieConsent);
} else {
  initCookieConsent();
}

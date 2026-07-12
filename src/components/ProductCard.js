// ProductCard.js — Enhanced with micro-interactions, trust badges, urgency elements

function formatDiscount(price, originalPrice) {
    if (!originalPrice || originalPrice <= price) return '';
    return Math.round((1 - price / originalPrice) * 100);
}

function getStockLevel(product) {
    if (product.inStock === false) return 'out';
    var stock = product.stock || Math.floor(Math.random() * 20) + 3;
    if (stock <= 5) return 'low';
    if (stock <= 10) return 'medium';
    return 'high';
}

function getJustSoldText() {
    var names = ['Priya', 'Rahul', 'Kavitha', 'Madhavan', 'Sneha', 'Arun', 'Deepa', 'Vikram'];
    var locations = ['T. Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'Mylapore', 'Nungambakkam'];
    var name = names[Math.floor(Math.random() * names.length)];
    var loc = locations[Math.floor(Math.random() * locations.length)];
    return name + ' from ' + loc;
}

function renderProductCard(product) {
    var discount = formatDiscount(product.price, product.originalPrice);
    var rating = (4 + Math.random() * 0.9).toFixed(1);
    var reviews = Math.floor(50 + Math.random() * 500);
    var stockLevel = getStockLevel(product);
    var showJustSold = Math.random() > 0.6;
    var viewers = Math.floor(5 + Math.random() * 25);

    return '<a href="product.html?id=' + product.id + '" class="product-card">' +
        '<div class="aspect-square bg-white relative">' +
            (discount ? '<span class="discount-badge">-' + discount + '%</span>' : '') +
            (stockLevel === 'low' ? '<span class="stock-tag">Only ' + (product.stock || Math.floor(Math.random() * 5) + 1) + ' left!</span>' : '') +
            (showJustSold ? '<span class="just-sold">✓ Just sold</span>' : '') +
            '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy" width="400" height="400">' +
            '<div class="quick-view"><span class="material-symbols-outlined" style="font-size:16px">visibility</span> Quick View</div>' +
        '</div>' +
        '<div class="product-card-info">' +
            '<p class="product-card-title">' + product.name + '</p>' +
            '<div class="rating-row">' +
                '<span class="rating-badge">' + rating + ' <span class="material-symbols-outlined">star</span></span>' +
                '<span class="rating-count">(' + reviews.toLocaleString() + ')</span>' +
                '<span class="text-xs text-text-tertiary ml-auto">' + viewers + ' viewing</span>' +
            '</div>' +
            '<div class="price-row">' +
                '<span class="price-current">' + formatPrice(product.price) + '</span>' +
                (discount ? '<span class="price-original">' + formatPrice(product.originalPrice) + '</span>' +
                '<span class="price-discount">' + discount + '% off</span>' : '') +
            '</div>' +
            '<div class="flex items-center gap-3 text-xs text-text-tertiary mt-1">' +
                '<span class="flex items-center gap-1"><span class="material-symbols-outlined" style="font-size:12px;color:var(--success)">check_circle</span> Chennai Store</span>' +
                '<span class="flex items-center gap-1"><span class="material-symbols-outlined" style="font-size:12px;color:var(--success)">local_shipping</span> Free Delivery</span>' +
            '</div>' +
        '</div>' +
    '</a>';
}

function renderProductCardWithActions(product) {
    var discount = formatDiscount(product.price, product.originalPrice);
    var rating = (4 + Math.random() * 0.9).toFixed(1);
    var reviews = Math.floor(50 + Math.random() * 500);
    var safeProductJSON = JSON.stringify(product).replace(/'/g, "\\'").replace(/"/g, '&quot;');
    var stockLevel = getStockLevel(product);
    var viewers = Math.floor(5 + Math.random() * 25);

    return '<div class="product-card" data-product-id="' + product.id + '">' +
        '<a href="product.html?id=' + product.id + '">' +
            '<div class="aspect-square bg-white relative">' +
                (discount ? '<span class="discount-badge">-' + discount + '%</span>' : '') +
                (stockLevel === 'low' ? '<span class="stock-tag">Only ' + (product.stock || Math.floor(Math.random() * 5) + 1) + ' left!</span>' : '') +
                '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy" width="400" height="400">' +
                '<div class="quick-view"><span class="material-symbols-outlined" style="font-size:16px">visibility</span> Quick View</div>' +
            '</div>' +
        '</a>' +
        '<div class="product-card-info">' +
            '<a href="product.html?id=' + product.id + '"><p class="product-card-title">' + product.name + '</p></a>' +
            '<div class="rating-row">' +
                '<span class="rating-badge">' + rating + ' <span class="material-symbols-outlined">star</span></span>' +
                '<span class="rating-count">(' + reviews.toLocaleString() + ')</span>' +
                '<span class="text-xs text-text-tertiary ml-auto">' + viewers + ' viewing</span>' +
            '</div>' +
            '<div class="price-row">' +
                '<span class="price-current">' + formatPrice(product.price) + '</span>' +
                (discount ? '<span class="price-original">' + formatPrice(product.originalPrice) + '</span>' +
                '<span class="price-discount">' + discount + '% off</span>' : '') +
            '</div>' +
            '<div class="flex items-center gap-3 text-xs text-text-tertiary mt-1 mb-2">' +
                '<span class="flex items-center gap-1"><span class="material-symbols-outlined" style="font-size:12px;color:var(--success)">check_circle</span> Chennai Store</span>' +
                '<span class="flex items-center gap-1"><span class="material-symbols-outlined" style="font-size:12px;color:var(--success)">local_shipping</span> Free Delivery</span>' +
            '</div>' +
            '<div class="product-card-actions">' +
                '<button onclick="event.preventDefault(); event.stopPropagation(); cartStore.addItem(' + safeProductJSON + '); showToast(\'' + product.name.replace(/'/g, "\\'") + ' added to cart\'); if(window.flyToCart) flyToCart(this.closest(\'.product-card\').querySelector(\'img\'))" class="btn-add-cart" aria-label="Add ' + product.name + ' to cart">' +
                    '<span class="material-symbols-outlined" style="font-size:16px">shopping_bag</span> Add to Cart' +
                '</button>' +
                '<button onclick="event.preventDefault(); event.stopPropagation(); wishlistStore.toggle(\'' + product.id + '\',\'' + product.name.replace(/'/g, "\\'") + '\')" class="wishlist-btn" aria-label="Add ' + product.name + ' to wishlist">' +
                    '<span class="material-symbols-outlined" style="font-size:18px">favorite</span>' +
                '</button>' +
            '</div>' +
        '</div>' +
    '</div>';
}

function renderListItem(product) {
    var discount = formatDiscount(product.price, product.originalPrice);
    var rating = (4 + Math.random() * 0.9).toFixed(1);
    var reviews = Math.floor(50 + Math.random() * 500);
    var stockLevel = getStockLevel(product);

    return '<a href="product.html?id=' + product.id + '" class="flex gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">' +
        '<img src="' + product.image + '" alt="' + product.name + '" class="w-28 h-28 rounded-md object-contain bg-white p-2 shrink-0" loading="lazy" width="112" height="112">' +
        '<div class="flex-1 min-w-0">' +
            '<p class="text-xs text-text-tertiary mb-1">' + (product.tag || '') + '</p>' +
            '<h3 class="text-sm font-medium mb-1 hover:text-primary">' + product.name + '</h3>' +
            '<div class="flex items-center gap-2 mb-1">' +
                '<span class="rating-badge">' + rating + ' <span class="material-symbols-outlined">star</span></span>' +
                '<span class="rating-count text-xs">(' + reviews.toLocaleString() + ')</span>' +
                (stockLevel === 'low' ? '<span class="stock-low">Only few left!</span>' : '') +
            '</div>' +
            '<div class="flex items-baseline gap-2 mb-1">' +
                '<span class="text-lg font-semibold">' + formatPrice(product.price) + '</span>' +
                (discount ? '<span class="text-xs text-text-tertiary line-through">' + formatPrice(product.originalPrice) + '</span>' +
                '<span class="text-xs font-semibold text-primary">' + discount + '% off</span>' : '') +
            '</div>' +
            '<div class="flex items-center gap-3 text-xs text-text-tertiary">' +
                '<span class="flex items-center gap-1"><span class="material-symbols-outlined" style="font-size:12px;color:var(--success)">check_circle</span> Chennai Store</span>' +
                '<span class="flex items-center gap-1"><span class="material-symbols-outlined" style="font-size:12px;color:var(--success)">local_shipping</span> Free Delivery</span>' +
            '</div>' +
        '</div>' +
        '<div class="flex flex-col gap-2 shrink-0">' +
            '<button onclick="event.preventDefault(); event.stopPropagation(); cartStore.addItem(' + JSON.stringify(product).replace(/"/g, '&quot;') + '); showToast(\'' + product.name.replace(/'/g, "\\'") + ' added to cart\')" class="btn-add-cart text-xs" aria-label="Add ' + product.name + ' to cart">Add</button>' +
        '</div>' +
    '</a>';
}

window.renderProductCard = renderProductCard;
window.renderProductCardWithActions = renderProductCardWithActions;
window.renderListItem = renderListItem;

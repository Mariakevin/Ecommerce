// ProductCard.js — Amazon/Flipkart style product cards

function formatDiscount(price, originalPrice) {
    if (!originalPrice || originalPrice <= price) return '';
    return Math.round((1 - price / originalPrice) * 100);
}

function renderProductCard(product) {
    var discount = formatDiscount(product.price, product.originalPrice);
    var rating = (4 + Math.random() * 0.9).toFixed(1);
    var reviews = Math.floor(50 + Math.random() * 500);

    return '<a href="product.html?id=' + product.id + '" class="product-card">' +
        '<div class="aspect-square bg-white relative">' +
            (discount ? '<span class="discount-badge">-' + discount + '%</span>' : '') +
            '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy" width="400" height="400">' +
        '</div>' +
        '<div class="product-card-info">' +
            '<p class="product-card-title">' + product.name + '</p>' +
            '<div class="rating-row">' +
                '<span class="rating-badge">' + rating + ' <span class="material-symbols-outlined">star</span></span>' +
                '<span class="rating-count">(' + reviews.toLocaleString() + ')</span>' +
            '</div>' +
            '<div class="price-row">' +
                '<span class="price-current">' + formatPrice(product.price) + '</span>' +
                (discount ? '<span class="price-original">' + formatPrice(product.originalPrice) + '</span>' +
                '<span class="price-discount">' + discount + '% off</span>' : '') +
            '</div>' +
            '<p class="delivery-info"><strong>Free delivery</strong> on orders above ₹999</p>' +
        '</div>' +
    '</a>';
}

function renderProductCardWithActions(product) {
    var discount = formatDiscount(product.price, product.originalPrice);
    var rating = (4 + Math.random() * 0.9).toFixed(1);
    var reviews = Math.floor(50 + Math.random() * 500);
    var safeProductJSON = JSON.stringify(product).replace(/'/g, "\\'").replace(/"/g, '&quot;');

    return '<div class="product-card" data-product-id="' + product.id + '">' +
        '<a href="product.html?id=' + product.id + '">' +
            '<div class="aspect-square bg-white relative">' +
                (discount ? '<span class="discount-badge">-' + discount + '%</span>' : '') +
                '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy" width="400" height="400">' +
            '</div>' +
        '</a>' +
        '<div class="product-card-info">' +
            '<a href="product.html?id=' + product.id + '"><p class="product-card-title">' + product.name + '</p></a>' +
            '<div class="rating-row">' +
                '<span class="rating-badge">' + rating + ' <span class="material-symbols-outlined">star</span></span>' +
                '<span class="rating-count">(' + reviews.toLocaleString() + ')</span>' +
            '</div>' +
            '<div class="price-row">' +
                '<span class="price-current">' + formatPrice(product.price) + '</span>' +
                (discount ? '<span class="price-original">' + formatPrice(product.originalPrice) + '</span>' +
                '<span class="price-discount">' + discount + '% off</span>' : '') +
            '</div>' +
            '<p class="delivery-info"><strong>Free delivery</strong></p>' +
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

    return '<a href="product.html?id=' + product.id + '" class="flex gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">' +
        '<img src="' + product.image + '" alt="' + product.name + '" class="w-28 h-28 rounded-md object-contain bg-white p-2 shrink-0" loading="lazy" width="112" height="112">' +
        '<div class="flex-1 min-w-0">' +
            '<p class="text-xs text-text-tertiary mb-1">' + (product.tag || '') + '</p>' +
            '<h3 class="text-sm font-medium mb-1 hover:text-blue-600">' + product.name + '</h3>' +
            '<div class="flex items-center gap-2 mb-1">' +
                '<span class="rating-badge">' + rating + ' <span class="material-symbols-outlined">star</span></span>' +
                '<span class="rating-count text-xs">(' + reviews.toLocaleString() + ')</span>' +
            '</div>' +
            '<div class="flex items-baseline gap-2 mb-1">' +
                '<span class="text-lg font-semibold">' + formatPrice(product.price) + '</span>' +
                (discount ? '<span class="text-xs text-text-tertiary line-through">' + formatPrice(product.originalPrice) + '</span>' +
                '<span class="text-xs font-semibold text-red-600">' + discount + '% off</span>' : '') +
            '</div>' +
            '<p class="text-xs text-text-secondary">Free delivery on orders above ₹999</p>' +
        '</div>' +
        '<div class="flex flex-col gap-2 shrink-0">' +
            '<button onclick="event.preventDefault(); event.stopPropagation(); cartStore.addItem(' + JSON.stringify(product).replace(/"/g, '&quot;') + '); showToast(\'' + product.name.replace(/'/g, "\\'") + ' added to cart\')" class="btn-add-cart text-xs" aria-label="Add ' + product.name + ' to cart">Add</button>' +
        '</div>' +
    '</a>';
}

window.renderProductCard = renderProductCard;
window.renderProductCardWithActions = renderProductCardWithActions;
window.renderListItem = renderListItem;

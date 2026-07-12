// ProductCard.js — Reusable product card component

function renderProductCard(product) {
    return '<a href="product.html?id=' + product.id + '" class="product-card group block">' +
        '<div class="aspect-square bg-surface-alt rounded-lg overflow-hidden mb-3 relative">' +
            '<img src="' + product.image + '" alt="' + product.name + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">' +
        '</div>' +
        '<h3 class="text-sm font-medium mb-1">' + product.name + '</h3>' +
        '<p class="text-sm font-semibold">' + formatPrice(product.price) + '</p>' +
    '</a>';
}

function renderProductCardWithActions(product) {
    return '<div class="product-card group block" data-product-id="' + product.id + '">' +
        '<a href="product.html?id=' + product.id + '">' +
            '<div class="aspect-square bg-surface-alt rounded-lg overflow-hidden mb-3 relative">' +
                '<img src="' + product.image + '" alt="' + product.name + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">' +
            '</div>' +
        '</a>' +
        '<div class="flex items-start justify-between">' +
            '<div class="min-w-0 flex-1">' +
                '<h3 class="text-sm font-medium mb-1 truncate"><a href="product.html?id=' + product.id + '">' + product.name + '</a></h3>' +
                '<p class="text-sm font-semibold">' + formatPrice(product.price) + '</p>' +
            '</div>' +
            '<div class="flex items-center gap-1 ml-2 shrink-0">' +
                '<button onclick="event.stopPropagation(); wishlistStore.toggle(\'' + product.id + '\',\'' + product.name.replace(/'/g, "\\'") + '\'); wishlistBurst(this)" class="wishlist-btn p-1.5 rounded-full hover:bg-surface-alt transition-colors" data-product-id="' + product.id + '">' +
                    '<span class="material-symbols-outlined" style="font-size:18px">favorite</span>' +
                '</button>' +
                '<button onclick="event.stopPropagation(); cartStore.addItem(' + JSON.stringify(product).replace(/"/g, '&quot;') + '); flyToCart(this.closest(\'.product-card\').querySelector(\'img\'))" class="p-1.5 rounded-full hover:bg-surface-alt transition-colors">' +
                    '<span class="material-symbols-outlined" style="font-size:18px">shopping_bag</span>' +
                '</button>' +
            '</div>' +
        '</div>' +
    '</div>';
}

window.renderProductCard = renderProductCard;
window.renderProductCardWithActions = renderProductCardWithActions;

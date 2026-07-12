// format.js — Formatting utilities

function formatPrice(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
}

function getUrlParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
}

window.formatPrice = formatPrice;
window.formatDate = formatDate;
window.getUrlParam = getUrlParam;

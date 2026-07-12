// ProductService.js — Product data access layer
// Interface: getProducts(), getProductById(id), getFeaturedProducts(), getProductsByCategory(category), searchProducts(query)
// Implementation: reads from products.json (mock). In production, swap for API calls.

const ProductService = {
    _products: null,

    async _loadProducts() {
        if (this._products) return this._products;
        const response = await fetch('src/data/products.json');
        this._products = await response.json();
        return this._products;
    },

    async getProducts() {
        return await this._loadProducts();
    },

    async getProductById(id) {
        const products = await this._loadProducts();
        return products.find(p => p.id === id) || null;
    },

    async getFeaturedProducts() {
        const products = await this._loadProducts();
        return products.filter(p => p.featured);
    },

    async getProductsByCategory(category) {
        const products = await this._loadProducts();
        if (!category || category === 'all') return products;
        return products.filter(p => p.category === category);
    },

    async searchProducts(query) {
        const products = await this._loadProducts();
        if (!query) return products;
        const q = query.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.tag.toLowerCase().includes(q)
        );
    },

    async getCategories() {
        const products = await this._loadProducts();
        const cats = [...new Set(products.map(p => p.category))];
        return cats.map(c => ({
            id: c,
            name: products.find(p => p.category === c).tag
        }));
    },

    async sortProducts(products, sortBy) {
        const sorted = [...products];
        switch (sortBy) {
            case 'price_asc': return sorted.sort((a, b) => a.price - b.price);
            case 'price_desc': return sorted.sort((a, b) => b.price - a.price);
            case 'name': return sorted.sort((a, b) => a.name.localeCompare(b.name));
            default: return sorted; // 'featured' or default
        }
    }
};

// Export for ES module usage and global access
if (typeof module !== 'undefined') module.exports = ProductService;
window.ProductService = ProductService;

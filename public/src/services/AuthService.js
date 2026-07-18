// AuthService.js — Authentication layer
// Mock implementation. In production, swap for real auth API.

const AuthService = {
    STORAGE_KEY: 'chennai_retail_user',

    getUser() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
        } catch (e) {
            return null;
        }
    },

    isLoggedIn() {
        return this.getUser() !== null;
    },

    login(email, password) {
        // Mock: accept any email, password must be 6+ chars
        if (!email || !password || password.length < 6) {
            return { success: false, error: 'Invalid credentials' };
        }
        const user = {
            id: 'u1',
            firstName: 'Priya',
            lastName: 'Sharma',
            email: email,
            phone: '+91 98765 43210'
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        window.EventBus.emit('auth:login', user);
        return { success: true, user };
    },

    logout() {
        localStorage.removeItem(this.STORAGE_KEY);
        window.EventBus.emit('auth:logout');
    },

    updateProfile(data) {
        const user = this.getUser();
        if (!user) return { success: false, error: 'Not logged in' };
        Object.assign(user, data);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        return { success: true, user };
    }
};

// Auto-login mock user for demo
if (!AuthService.isLoggedIn()) {
    AuthService.login('priya@email.com', 'demo123');
}

if (typeof module !== 'undefined') module.exports = AuthService;
window.AuthService = AuthService;

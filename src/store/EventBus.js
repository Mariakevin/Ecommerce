// EventBus.js — Pub/sub event system for cross-component communication

const EventBus = {
    _listeners: {},

    on(event, callback) {
        if (!this._listeners[event]) this._listeners[event] = [];
        this._listeners[event].push(callback);
        return () => this.off(event, callback);
    },

    off(event, callback) {
        if (!this._listeners[event]) return;
        this._listeners[event] = this._listeners[event].filter(cb => cb !== callback);
    },

    emit(event, data) {
        if (!this._listeners[event]) return;
        this._listeners[event].forEach(cb => cb(data));
    }
};

window.EventBus = EventBus;

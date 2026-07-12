// Toast.js — Toast notification component

function showToast(message, type, duration) {
    type = type || 'success';
    duration = duration || 3000;

    var container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    var icons = { success: 'check_circle', error: 'error', info: 'info' };

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type + ' toast-enter';
    toast.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px">' + (icons[type] || 'info') + '</span><span>' + message + '</span>';
    container.appendChild(toast);

    setTimeout(function() {
        toast.classList.remove('toast-enter');
        toast.classList.add('toast-exit');
        setTimeout(function() { toast.remove(); }, 300);
    }, duration);
}

window.showToast = showToast;

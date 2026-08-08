// ============================================================
// LOGOUT MODULE – Handles logout with confirmation
// ============================================================

import { logoutAdmin } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (!logoutBtn) return;

  logoutBtn.addEventListener('click', async () => {
    // Use the confirmation dialog from confirm.js
    const confirmed = await window.showConfirm(
      'Logout',
      'Are you sure you want to log out?',
      'Logout',
      'Cancel'
    );
    if (!confirmed) return;

    try {
      await logoutAdmin();
      window.showToast('Logged out successfully.', 'success');
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
      window.showToast('Logout failed. Please try again.', 'error');
    }
  });
});

// ============================================================
// CONFIRMATION DIALOG – Reusable Promise-based confirm modal
// ============================================================

/**
 * Show a confirmation dialog using the existing ERP modal system.
 *
 * @param {string} title - Modal title (e.g., "Delete Record").
 * @param {string} message - The confirmation message to display.
 * @param {string} confirmText - Text for the confirm button (default: "Confirm").
 * @param {string} cancelText - Text for the cancel button (default: "Cancel").
 * @returns {Promise<boolean>} - Resolves to true if confirmed, false if cancelled.
 */
function showConfirm(title, message, confirmText = 'Confirm', cancelText = 'Cancel') {
  return new Promise((resolve) => {
    // Build modal content
    const bodyHTML = `
      <div style="text-align:center; padding:0.5rem 0;">
        <p style="font-size:1rem; color:var(--gray-700); margin-bottom:0.5rem;">${message}</p>
        <p style="font-size:0.85rem; color:var(--gray-500);">This action cannot be undone.</p>
      </div>
    `;

    // Open the modal with custom buttons
    window.openModal(title, bodyHTML, confirmText, () => {
      // Confirm callback
      resolve(true);
    });

    // Override the cancel button behaviour
    const modalCancel = document.getElementById('modalCancel');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    // Store original listeners to avoid duplicates
    const cancelHandler = () => {
      resolve(false);
      window.closeModal();
    };

    // Remove previous listeners (if any) to avoid stacking
    const newCancel = modalCancel.cloneNode(true);
    modalCancel.parentNode.replaceChild(newCancel, modalCancel);
    newCancel.addEventListener('click', cancelHandler);

    // Also handle close button and overlay click
    const closeHandler = () => {
      resolve(false);
      window.closeModal();
    };

    // Clone and replace close button
    const newClose = modalClose.cloneNode(true);
    modalClose.parentNode.replaceChild(newClose, modalClose);
    newClose.addEventListener('click', closeHandler);

    // Overlay click (only if clicked on overlay itself)
    const overlayHandler = (e) => {
      if (e.target === modalOverlay) {
        resolve(false);
        window.closeModal();
      }
    };
    modalOverlay.addEventListener('click', overlayHandler);

    // Store the resolve function so that we can clean up if needed
    window._confirmResolve = resolve;
  });
}

// Expose globally
window.showConfirm = showConfirm;

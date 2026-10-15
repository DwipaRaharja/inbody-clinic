const controllers = new WeakMap();

export function initClinicGallery(root) {
  if (!root) return () => {};
  if (controllers.has(root)) return controllers.get(root);

  const cards = [...root.querySelectorAll('[data-gallery-card]')];
  const filters = [...root.querySelectorAll('[data-gallery-filter]')];
  const count = root.querySelector('[data-gallery-count]');
  const dialog = root.querySelector('[data-gallery-dialog]');
  const fullImage = dialog?.querySelector('[data-gallery-full-image]');
  const dialogTitle = dialog?.querySelector('[data-gallery-dialog-title]');
  const dialogDescription = dialog?.querySelector('[data-gallery-dialog-description]');
  const body = root.ownerDocument.body;
  const view = root.ownerDocument.defaultView;
  const listeners = [];
  let opener = null;
  let ownsDialog = false;
  let savedOverflow = null;

  const listen = (target, type, handler) => {
    target.addEventListener(type, handler);
    listeners.push(() => target.removeEventListener(type, handler));
  };

  function filterPhotos(value) {
    let visibleCount = 0;
    cards.forEach((card) => {
      const categories = (card.dataset.galleryCategories || '').split(/\s+/);
      card.hidden = value !== 'all' && !categories.includes(value);
      if (!card.hidden) visibleCount += 1;
    });
    filters.forEach((filter) => {
      filter.setAttribute('aria-pressed', String(filter.dataset.galleryFilter === value));
    });
    if (count) count.textContent = `Showing ${visibleCount} of ${cards.length} photos`;
  }

  function restorePage() {
    if (savedOverflow) {
      if (savedOverflow.value) {
        body.style.setProperty('overflow', savedOverflow.value, savedOverflow.priority);
      } else {
        body.style.removeProperty('overflow');
      }
      savedOverflow = null;
    }
    ownsDialog = false;
    const previousOpener = opener;
    opener = null;
    if (previousOpener?.isConnected && !previousOpener.closest('[hidden]')) {
      previousOpener.focus({ preventScroll: true });
    }
  }

  function openPhoto(button) {
    const card = button.closest('[data-gallery-card]');
    const image = card?.querySelector('img');
    const source = image?.currentSrc || image?.src;
    if (!card || !root.contains(card) || card.hidden || !source) return;

    if (!dialog || !fullImage || typeof dialog.showModal !== 'function') {
      view?.open(source, '_blank', 'noopener,noreferrer');
      return;
    }
    if (dialog.open) return;

    fullImage.src = source;
    fullImage.alt = image.alt;
    if (dialogTitle) {
      dialogTitle.textContent = card.querySelector('[data-gallery-title]')?.textContent.trim() || image.alt;
    }
    if (dialogDescription) {
      dialogDescription.textContent = card.querySelector('[data-gallery-description]')?.textContent.trim() || '';
    }
    opener = button;
    savedOverflow = {
      value: body.style.getPropertyValue('overflow'),
      priority: body.style.getPropertyPriority('overflow'),
    };
    dialog.showModal();
    ownsDialog = true;
    body.style.setProperty('overflow', 'hidden');
  }

  listen(root, 'click', (event) => {
    const filter = event.target.closest?.('[data-gallery-filter]');
    if (filter && root.contains(filter)) {
      event.preventDefault();
      filterPhotos(filter.dataset.galleryFilter);
      return;
    }
    const button = event.target.closest?.('[data-gallery-open]');
    if (button && root.contains(button)) {
      event.preventDefault();
      openPhoto(button);
    }
  });

  if (dialog) {
    listen(dialog, 'close', restorePage);
    listen(dialog, 'click', (event) => {
      const closeButton = event.target.closest?.('[data-gallery-close]');
      if (ownsDialog && (event.target === dialog || (closeButton && dialog.contains(closeButton)))) {
        event.preventDefault();
        dialog.close();
      }
    });
  }

  function destroy() {
    if (ownsDialog && dialog?.open) dialog.close();
    restorePage();
    listeners.forEach((remove) => remove());
    controllers.delete(root);
  }

  const initialFilter = filters.find((filter) => filter.getAttribute('aria-pressed') === 'true');
  filterPhotos(initialFilter?.dataset.galleryFilter || 'all');
  controllers.set(root, destroy);
  return destroy;
}

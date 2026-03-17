// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// MODAL PROJETS
const modalOverlay = document.getElementById('project-modal');
const modalTitle   = modalOverlay.querySelector('.modal-title');
const modalBody    = modalOverlay.querySelector('.modal-body');
const modalBadge   = document.getElementById('modal-badge');
const modalFooter  = document.getElementById('modal-footer');
const modalCloseBtn = modalOverlay.querySelector('.modal-close');

document.querySelectorAll('.project-card').forEach(card => {
    const btn = card.querySelector('.open-project-modal');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const title   = card.querySelector('.project-title').textContent.trim();
        const details = card.querySelector('.project-details');
        const type    = card.dataset.type || 'Projet';
        const tags    = (card.dataset.tags || '').split(',').map(t => t.trim()).filter(Boolean);

        modalTitle.textContent = title;
        modalBadge.textContent = type;
        modalBody.innerHTML = details ? details.innerHTML : '<p>Détails à venir.</p>';

        modalFooter.innerHTML = '';
        tags.forEach(tag => {
            const chip = document.createElement('span');
            chip.className = 'modal-chip';
            chip.textContent = tag;
            modalFooter.appendChild(chip);
        });

        modalOverlay.classList.add('open');
        document.body.classList.add('modal-open');
    });
});

// close() identique à avant


// Fermer la modal (croix ou clic sur l'overlay)
function closeProjectModal() {
    modalOverlay.classList.remove('open');
    document.body.classList.remove('modal-open');
}

modalCloseBtn.addEventListener('click', closeProjectModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeProjectModal();
    }
});

// Fermer avec Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeProjectModal();
    }
});

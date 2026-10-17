const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector('#enquiry-form');
const status = document.querySelector('#form-status');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const service = String(data.get('service') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = encodeURIComponent(`Laboratory enquiry: ${service}`);
    const body = encodeURIComponent(
      `Hello Super Laboratory Services,\n\nI'd like to make an enquiry.\n\nName: ${name}\nEmail: ${email}\nService: ${service}\n\nEnquiry details:\n${message}\n\nRegards,\n${name}`
    );

    if (status) status.textContent = 'Opening your email app with the enquiry prepared. Please review and send it from your email app.';
    window.location.href = `mailto:slsqc@superlabs.co.za?subject=${subject}&body=${body}`;
  });
}

// NEW PRACTICE LAUNCH - SHARED BEHAVIOR
document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });

    window.addEventListener('scroll', function () {
      if (mobileNav.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      }
    });
  }

  // Lead form (Basin), submitted via fetch so the visitor never leaves the site
  var leadForm = document.getElementById('npl-lead-form');
  if (leadForm) {
    var submitBtn = document.getElementById('npl-lead-submit');
    var note = document.getElementById('npl-lead-note');
    var success = document.getElementById('npl-lead-success');

    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      var formData = new FormData(leadForm);

      fetch(leadForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      })
        .then(function (response) {
          if (response.ok) {
            leadForm.style.display = 'none';
            if (note) note.style.display = 'none';
            if (success) success.classList.add('show');
          } else {
            throw new Error('Submission failed');
          }
        })
        .catch(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Let's Build Your Practice";
          }
          alert('Something went wrong sending your info. Please call us at (312) 869-2404 or try again.');
        });
    });
  }
});

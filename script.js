// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var open = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Generic mailto-handoff form: builds a mailto: link from field values,
  // opens the visitor's email app, and shows an inline confirmation.
  // This site has no backend, so this is the reliable free option.
  document.querySelectorAll('form[data-mailto]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var to = form.getAttribute('data-mailto');
      var subject = form.getAttribute('data-subject') || 'Website enquiry';
      var lines = [];
      form.querySelectorAll('input, select, textarea').forEach(function (field) {
        if (!field.name) return;
        var fieldLabel = field.closest('.field') ? field.closest('.field').querySelector('label') : null;
        var name = fieldLabel ? fieldLabel.textContent.trim() : field.name;
        var value = field.value.trim();
        if (value) lines.push(name + ': ' + value);
      });
      var body = encodeURIComponent(lines.join('\n'));
      var mailtoUrl = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + body;
      window.location.href = mailtoUrl;

      var success = form.parentElement.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        success.textContent = 'Your email app should now open with these details filled in. If it doesn\'t open, please email ' + to + ' directly.';
      }
    });
  });
});

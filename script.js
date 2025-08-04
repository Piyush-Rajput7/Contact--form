const form = document.getElementById('contact-form');
const toast = document.getElementById('toast');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;
  const errors = form.querySelectorAll('.error');
  const inputs = form.querySelectorAll('input, textarea');
  
  errors.forEach(err => err.textContent = '');
  inputs.forEach(input => input.classList.remove('error'));

  const firstName = form.firstName;
  const lastName = form.lastName;
  const email = form.email;
  const message = form.message;
  const consent = form.consent;
  const queryType = form.querySelector('input[name="query"]:checked');

  if (!firstName.value.trim()) {
    setError(firstName, 'First name is required.');
    isValid = false;
  }

  if (!lastName.value.trim()) {
    setError(lastName, 'Last name is required.');
    isValid = false;
  }

  if (!email.value.trim()) {
    setError(email, 'Email is required.');
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    setError(email, 'Enter a valid email.');
    isValid = false;
  }

  if (!queryType) {
    const fieldset = form.querySelector('.radio-group');
    const error = fieldset.querySelector('.error');
    if (error) error.textContent = 'Select a query type.';
    isValid = false;
  }

  if (!message.value.trim()) {
    setError(message, 'Message is required.');
    isValid = false;
  }

  if (!consent.checked) {
    setError(consent, 'Consent is required.');
    isValid = false;
  }

  if (isValid) {
    form.reset();
    showToast();
  }
});

function setError(input, message) {
  const group = input.closest('.form-group') || input.closest('fieldset') || input.closest('.input-wrapper');
  const error = group?.querySelector('.error');
  if (error) {
    error.textContent = message;
    input.classList.add('error');
  }
}

function showToast() {
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
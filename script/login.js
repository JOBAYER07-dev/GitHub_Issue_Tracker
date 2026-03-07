const loginBtn = document.getElementById('login-btn');

const loginSection = document.getElementById('login-section');

const mainSection = document.getElementById('main-section');

loginBtn.addEventListener('click', () => {
  const usernameInput = document.getElementById('input-username').value;
  const passwordInput = document.getElementById('input-password').value;

  if (usernameInput === 'admin' && passwordInput === 'admin123') {
    alert('Login successful!');
    loginSection.classList.add('hidden');
    mainSection.classList.remove('hidden');
  } else {
    alert('Invalid username or password. Please try again.');
  }
});

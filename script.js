// Modal handling
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeBtns = document.querySelectorAll('.close-btn');

// Open modals
loginBtn.addEventListener('click', () => {
    loginModal.classList.add('active');
});

signupBtn.addEventListener('click', () => {
    signupModal.classList.add('active');
});

// Close modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').classList.remove('active');
    });
});

// Form submissions
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const users = getUsers();
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert('Username already taken');
        return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    saveUsers(users);
    setLoggedInUser(username);
    alert('Account created successfully');
    signupModal.classList.remove('active');
    updateUI();
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        setLoggedInUser(username);
        alert('Logged in successfully');
        loginModal.classList.remove('active');
        updateUI();
    } else {
        alert('Invalid username or password');
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    logout();
});

// Theme switcher
const themeSelect = document.getElementById('theme-select');
themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    document.body.className = `theme-${selectedTheme}`;
    localStorage.setItem('theme', selectedTheme);
});

// Initialize theme and UI
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.className = `theme-${savedTheme}`;
    themeSelect.value = savedTheme;
}
updateUI();

// Helper functions
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getLoggedInUser() {
    return localStorage.getItem('loggedInUser');
}

function setLoggedInUser(username) {
    localStorage.setItem('loggedInUser', username);
}

function logout() {
    localStorage.removeItem('loggedInUser');
    updateUI();
}

function updateUI() {
    const loggedInUser = getLoggedInUser();
    const hero = document.getElementById('hero');
    const dashboard = document.getElementById('dashboard');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameDisplay = document.getElementById('username-display');

    if (loggedInUser) {
        hero.style.display = 'none';
        dashboard.style.display = 'block';
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        usernameDisplay.textContent = loggedInUser;
    } else {
        hero.style.display = 'block';
        dashboard.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        signupBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }
}
// Helper functions
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function setSession(email) {
    localStorage.setItem('session', email);
}
function getSession() {
    return localStorage.getItem('session');
}
function clearSession() {
    localStorage.removeItem('session');
}

function showMessage(msg, color = 'red') {
    var msgDiv = document.getElementById('message');
    if (msgDiv) {
        msgDiv.textContent = msg;
        msgDiv.style.color = color;
    }
}

// Registration page logic
if (document.getElementById('register-form')) {
    document.getElementById('register-form').onsubmit = function (e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim().toLowerCase();
        const password = document.getElementById('register-password').value;
        let users = getUsers();
        if (users.some(u => u.email === email)) {
            showMessage('Email already registered.');
            return;
        }
        users.push({ name, email, password });
        saveUsers(users);
        showMessage('Registration successful! Redirecting to login...', 'green');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1200);
    };
}

// Login page logic
if (document.getElementById('login-form')) {
    document.getElementById('login-form').onsubmit = function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            showMessage('Invalid email or password.');
            return;
        }
        setSession(user.email);
        showMessage('Login successful! Redirecting...', 'green');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1000);
    };
}

// Profile page logic
if (document.getElementById('profile-section')) {
    const sessionEmail = getSession();
    if (!sessionEmail) {
        window.location.href = 'login.html';
    } else {
        const users = getUsers();
        const user = users.find(u => u.email === sessionEmail);
        if (!user) {
            clearSession();
            window.location.href = 'login.html';
        } else {
            document.getElementById('profile-name').textContent = user.name;
            document.getElementById('profile-email').textContent = user.email;
        }
    }
    document.getElementById('logout-btn').onclick = function () {
        clearSession();
        window.location.href = 'login.html';
    };
}

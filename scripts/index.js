// https://login-service-wsb-wj.netlify.app/.netlify/functions/login
const $login = document.getElementById('login_input');
const $loginButton = document.getElementById('login_button');
const $password = document.getElementById('password_input');
const $loginError = document.getElementById('login_error');

const loginHandler = () => {
    const password = $password.value;
    const login = $login.value;

    fetch('https://login-service-wsb-wj.netlify.app/.netlify/functions/login', {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((respone) => respone.json())
        .then((respone) => {

            if (respone.isLogged === true) {
                localStorage.setItem('isLoggedIn', 'yes');
                window.location.href = './mainScreen.html';
            } else {
                $loginError.classList.remove('not_visable');
            }
        });
};

$loginButton.addEventListener('click', loginHandler);

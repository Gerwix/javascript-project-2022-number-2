
const $logout = document.getElementById('logout');
const $countrybutton = document.getElementById('country_button');
const $countryInput = document.getElementById('country_input');
const $generateButton = document.getElementById('generate_id');
const $toogleButton = document.getElementById('toogle_screen');

var map = L.map('map').setView([0, 0], 5);

L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=JCCY0cjRH7Db9T7wl28l', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

$toogleButton.addEventListener('click', () => {
    document.getElementById('general_screen').classList.toggle('hidden');
    document.getElementById('notes_screen').classList.toggle('hidden');
})

const logout = () => {
    localStorage.setItem('isLoggedIn', 'no');
    window.location.href = './index.html';
}

const isLoggedIn = localStorage.getItem('isLoggedIn');
if (isLoggedIn !== 'yes') {
    logout();
}

const serchCountry = () => {
    const country = $countryInput.value;
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((res) => res.json())
        .then((res) => {
            const country = res[0]
            if (country) {
                const fullName = country.name.official;
                const population = country.population;
                const capital = country.capital;
                const flag = country.flags.png;

                document.getElementById('country_fullname').innerText = fullName;
                document.getElementById('country_population').innerText = population;
                document.getElementById('country_capital').innerText = capital;
                document.getElementById('country_flag').src = flag;

                map.panTo(country.latlng, { animation: true, duration: 1.0 });
            }
        });
}
$generateButton.addEventListener('click', () => {
    fetch('https://randomuser.me/api/')
        .then((res) => res.json())
        .then((res) => {
            const agent = res.results[0];
            const newName = agent.name.first + ' ' + agent.name.last;
            const email = agent.email;
            const avatar = agent.picture.medium;
            document.getElementById('new_name').innerText = newName;
            document.getElementById('new_email').innerText = email;
            document.getElementById('new_picture').src = avatar;
        });
});

$logout.addEventListener('click', logout);
$countrybutton.addEventListener('click', serchCountry);



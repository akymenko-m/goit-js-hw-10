import './css/styles.css';

const input = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', getInput);
function getInput(event) {
    console.log(event.currentTarget.value);
    nameCountry = event.currentTarget.value;
    
    fetchCountries(nameCountry);
    
}


function fetchCountries(name) {
        // name = nameCountry;
        fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`).then(response => {
        // console.log(response.json());
            if (!response.ok) {
                throw new Error(response.status);
            }
            
            return response.json();
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
}
// fetchCountries();


// fetch("https://restcountries.com/v3.1/name/peru?fields=name.official,capital,population,flags.svg,languages").then(response => {
//     // console.log(response);
//     if (!response.ok) {
//         throw new Error(response.status);
//     }

//     return response.json();
// }).then(data => {
//     console.log(data);
// }).catch(error => {
//     console.log(error);
// });

// fetch("https://restcountries.com/v2/name/peru?fields=name.official,capital,population,flags.svg,languages").then(response => {
//     // console.log(response.json());
//     return response.json();
// }).then(country => {
//     console.log(country);
// }).catch(error => {
//     console.log(error);
// });

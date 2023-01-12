import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#search-box');
const counrtyList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
let prevValue = null;

input.addEventListener('input', debounce(getInput, DEBOUNCE_DELAY));
function getInput() {    
    // console.log(input.value);
    const nameCountry = input.value.trim();
    // console.log(nameCountry);

    if (prevValue === nameCountry || nameCountry.length === 0) {
        counrtyList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    }
    prevValue = nameCountry;


    fetchCountries(nameCountry).then(data => {

        if (data.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name");
            counrtyList.innerHTML = "";
            return;
        }

        if (data.length >= 2 && data.length <= 10) {
            countryInfo.innerHTML = "";
            createList(data);
        }

        if (data.length === 1) {
            counrtyList.innerHTML = "";
            createCard(data);
        }

        // console.log(data);
    }).catch(error => {
        if (error.message === "404") {
            Notify.failure("Oops, there is no country with that name");
        }
        console.log(error);
        counrtyList.innerHTML = "";
        countryInfo.innerHTML = "";
    });
}


function createCard(array) {    
    const itemCard = array.map(el => {
        // console.log(el);
        const languages = Object.values(el.languages);
        // console.log(languages);
        
        return `<div class="country-title"><img src="${el.flags.svg}" alt="Flag of ${el.name.common}" width="40"><p class="country-name">${el.name.official}</p></div>
        <p>Capital: ${el.capital}</p><p>Population: ${el.population}</p><p>Languages: ${languages}</p>`
    });
    // console.log(itemCard);
    countryInfo.innerHTML = itemCard.join('');
}

function createList(array) {
    const itemEl = array.map(el => {
        // console.log(el);
        // console.log(el.flags.svg);
        return `<li class="list-element"><img src="${el.flags.svg}" alt="Flag of ${el.name.common}" width="40">
        <p class="country-name">${el.name.official}</p></li>`
    });

    // console.log(itemEl);
    counrtyList.innerHTML = itemEl.join('');
}
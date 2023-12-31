// phone checker

const phoneInput = document.querySelector('#phone_input')
const phoneBtn = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [25793]\d{2} \d{2}-\d{2}$/

phoneBtn.onclick = ()=> {
    if (regExp.test(phoneInput.value)){
        phoneResult.innerHTML = ' сперма ok'
        phoneResult.style.color = 'green'
    }else {
        phoneResult.innerHTML = 'not ok'
        phoneResult.style.color = 'red'
    }

}


// tab slider

const tabContentBlock = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let currentIndex = 0;

const hideTabContent = () => {
    tabContentBlock.forEach(tabCard => {
        tabCard.style.display = 'none'
    })
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (tabIndex = 0) => {
    tabContentBlock[tabIndex].style.display = 'block'
    tabs[tabIndex].classList.add('tab_content_item_active')
    currentIndex = tabIndex;
}

const changeSlide = () => {
    currentIndex = (currentIndex + 1) % tabs.length;
    hideTabContent();
    showTabContent(currentIndex);
}

const slideInterval = setInterval(changeSlide, 3000);
hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                clearInterval(slideInterval);
                hideTabContent();
                showTabContent(tabIndex);
                slideInterval.setInterval(changeSlide, 3000);
            }
        })
    }
}

let modalShown = false;

const showModalOnScrollEnd = () => {
    const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if (scrollPosition + windowHeight >= bodyHeight && !modalShown) {
        modalShown = true;
        window.removeEventListener('scroll', showModalOnScrollEnd);
    }
};

const closeModalAndReset = () => {
    modalShown = false;
    window.addEventListener('scroll', showModalOnScrollEnd);
};

window.addEventListener('scroll', showModalOnScrollEnd);


document.querySelector('.modal_close').addEventListener('click', closeModalAndReset);

closeModalAndReset()

window.addEventListener('load', () => {
    setTimeout(() => {
        const modal = document.querySelector('.modal');
        modal.style.display = 'block';
    }, 10000);
});

document.querySelector('.modal_close').addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
});


// CONVEVRTeR
// const  som = document.querySelector('#som')
// const  usd = document.querySelector('#usd')
//
// usd.addEventListener('input', (event) =>{
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', '../data/converter.json')
//     xhr.setRequestHeader('Content-type', 'application/json')
//     xhr.send()
//
//     xhr.addEventListener('load', () =>{
//         const data = JSON.parse(xhr.response)
//         som.value = (usd.value * data.usd).toFixed(2)
//
//     })
// })
// som.addEventListener('input', (event) =>{
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', '../data/converter.json')
//     xhr.setRequestHeader('Content-type', 'application/json')
//     xhr.send()
//
//     xhr.addEventListener('load', () =>{
//         const data = JSON.parse(xhr.response)
//         usd.value = (som.value / data.usd).toFixed(2)
//
//     })
// })

const  som = document.querySelector('#som')
const  usd = document.querySelector('#usd')
const  eur = document.querySelector('#eur')

const converter = (element, targetElement, current) => {
    element.addEventListener('input', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../data/converter.json');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send();

        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);

            switch (current) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2);
                    break;
                case 'usd':
                    targetElement.value = (element.value * data.usd).toFixed(2);
                    break;
                case 'eur':
                    if (targetElement === som) {
                        targetElement.value = (element.value * data.eur / data.usd).toFixed(2);
                    } else if (targetElement === usd) {
                        targetElement.value = (element.value * data.eur).toFixed(2);
                    }
                    break;
                default:
                    break;
            }
            element.value === '' && (targetElement = '')
        };
    });
};

converter(som, usd, 'som');
converter(usd, som, 'usd');
converter(eur, som, 'eur');
converter(eur, usd, 'eur');


// card switcher


const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const converter = (element, targetElement, current) => {
    element.addEventListener('input', async () => {
        try {
            const response = await fetch('../data/converter.json');
            if (!response.ok) {
                throw new Error('Ошибка получения данных');
            }
            const data = await response.json();

            switch (current) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2);
                    break;
                case 'usd':
                    targetElement.value = (element.value * data.usd).toFixed(2);
                    break;
                case 'eur':
                    if (targetElement === som) {
                        targetElement.value = (element.value * data.eur / data.usd).toFixed(2);
                    } else if (targetElement === usd) {
                        targetElement.value = (element.value * data.eur).toFixed(2);
                    }
                    break;
                default:
                    break;
            }
            element.value === '' && (targetElement = '');
        } catch (error) {
            console.error('Ошибка при конвертации:', error);
        }
    });
};

converter(som, usd, 'som');
converter(usd, som, 'usd');
converter(eur, som, 'eur');
converter(eur, usd, 'eur');


const cityNameInput = document.querySelector('.cityName')
const btnSearch = document.querySelector('#btn-search')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

const BASE_URL = "http://api.openweathermap.org"

const citySearch = ()=>{
    btnSearch.addEventListener('click', () =>{
        fetch(`${BASE_URL}http://api.openweathermap.org/data/2.5/weather?q=Bishkek$appid`)
            .then(response => response.json())
            .then(data => {
                city.innerHTML = data.name
                temp.innerHTML = Math.round(data.main.temp - 273)

            })
    })
}
citySearch()



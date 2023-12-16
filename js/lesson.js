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

let modalShown = false; // Флаг для отслеживания вызова модального окна

const showModalOnScrollEnd = () => {
    const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if (scrollPosition + windowHeight >= bodyHeight && !modalShown) {
        // Если пользователь достиг конца страницы и модальное окно еще не показано
        // Ваш код для вызова модального окна здесь

        // После вызова модального окна устанавливаем флаг, указывающий, что оно было показано
        modalShown = true;

        // Удаляем обработчик события scroll после показа модального окна
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


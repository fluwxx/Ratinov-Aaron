const createCard = (title, body) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = 'https://via.placeholder.com/150'; // Замените на ваш URL изображения
    image.alt = 'Placeholder Image';
    card.appendChild(image);

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = title;

    const cardBody = document.createElement('p');
    cardBody.textContent = body;

    card.appendChild(cardTitle);
    card.appendChild(cardBody);

    return card;
};

const showCards = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Ошибка получения данных');
        }
        const data = await response.json();

        const cardContainer = document.getElementById('cardContainer');

        data.forEach(({ title, body }) => {
            const card = createCard(title, body);
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка при загрузке карточек:', error);
    }
};

showCards();

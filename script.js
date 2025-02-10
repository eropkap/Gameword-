
// Основной скрипт игры

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-game");
    const modeSelection = document.getElementById("mode-selection");
    const gameSection = document.getElementById("game");
    const modeButtons = document.querySelectorAll(".mode-button");
    const cardDisplay = document.getElementById("card-display");
    const nextButton = document.getElementById("next-card");
    const penaltyButton = document.getElementById("penalty-button");

    let gameCards = [];
    let penalties = [];
    let currentMode = "";

    // Загружаем карточки и штрафы
    fetch("game_cards.json")
        .then(response => response.json())
        .then(data => gameCards = data.cards);

    fetch("penalties.json")
        .then(response => response.json())
        .then(data => penalties = data.penalties);

    // Запуск игры
    startButton.addEventListener("click", function () {
        document.getElementById("menu").classList.add("hidden");
        modeSelection.classList.remove("hidden");
    });

    // Выбор режима
    modeButtons.forEach(button => {
        button.addEventListener("click", function () {
            currentMode = this.dataset.mode;
            gameSection.classList.remove("hidden");
            modeSelection.classList.add("hidden");
            loadCard();
        });
    });

    // Функция загрузки карточки
    function loadCard() {
        let filteredCards = gameCards.filter(card => card.mode === currentMode);
        let selectedCard = filteredCards.length > 0 ? filteredCards[Math.floor(Math.random() * filteredCards.length)] : null;
        cardDisplay.innerText = selectedCard ? selectedCard.text : "Карточек для этого режима нет!";
    }

    // Кнопка "Далее" – новая карточка
    nextButton.addEventListener("click", function () {
        loadCard();
    });

    // Кнопка "Штраф" – случайное наказание
    penaltyButton.addEventListener("click", function () {
        let selectedPenalty = penalties.length > 0 ? penalties[Math.floor(Math.random() * penalties.length)] : null;
        cardDisplay.innerText = selectedPenalty ? selectedPenalty.text : "Штрафов нет!";
    });
});

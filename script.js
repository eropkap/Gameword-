
// Основной скрипт игры

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-game");
    const spinWheel = document.getElementById("spin-wheel");
    const cardDisplay = document.getElementById("card-display");
    const penaltyDisplay = document.getElementById("penalty-display");
    const penaltyButton = document.getElementById("penalty-button");
    const soundEffect = new Audio("sounds/game_sound.mp3");
    const spinSound = new Audio("sounds/intense_music.mp3");
    const penaltySound = new Audio("sounds/sensual_music.mp3");

    let gameCards = [];
    let penalties = [];

    // Загрузка карточек и штрафов из JSON
    fetch("game_cards.json")
        .then(response => response.json())
        .then(data => gameCards = data.cards);

    fetch("penalties.json")
        .then(response => response.json())
        .then(data => penalties = data.penalties);

    // Запуск игры
    startButton.addEventListener("click", function () {
        document.getElementById("menu").style.display = "none";
        document.getElementById("game").style.display = "block";
        soundEffect.play();
    });

    // Вращение колеса фортуны и выбор карточки
    spinWheel.addEventListener("click", function () {
        if (gameCards.length > 0) {
            spinSound.play();
            let randomIndex = Math.floor(Math.random() * gameCards.length);
            let selectedCard = gameCards[randomIndex];
            cardDisplay.innerText = selectedCard.text;
        }
    });

    // Выпадение штрафа
    penaltyButton.addEventListener("click", function () {
        if (penalties.length > 0) {
            penaltySound.play();
            let randomIndex = Math.floor(Math.random() * penalties.length);
            let selectedPenalty = penalties[randomIndex];
            penaltyDisplay.innerText = selectedPenalty.text;
        }
    });
});

// Функция смены режима игры
document.addEventListener("DOMContentLoaded", function () {
    const modeButtons = document.querySelectorAll(".mode-button");
    let currentMode = "normal";

    modeButtons.forEach(button => {
        button.addEventListener("click", function () {
            currentMode = this.dataset.mode;
            loadCardsForMode(currentMode);
        });
    });

    function loadCardsForMode(mode) {
        fetch("game_cards.json")
            .then(response => response.json())
            .then(data => {
                let filteredCards = data.cards.filter(card => card.mode === mode);
                gameCards = filteredCards.length > 0 ? filteredCards : data.cards;
            });
    }
});

// Функция для отображения штрафа
document.addEventListener("DOMContentLoaded", function () {
    const penaltyButton = document.getElementById("penalty-button");
    const penaltyDisplay = document.getElementById("penalty-display");
    const penaltySound = new Audio("sounds/sensual_music.mp3");

    penaltyButton.addEventListener("click", function () {
        if (penalties.length > 0) {
            penaltySound.play();
            let randomIndex = Math.floor(Math.random() * penalties.length);
            let selectedPenalty = penalties[randomIndex];
            penaltyDisplay.innerText = selectedPenalty.text;
        }
    });

    // Функция для переключения карточек (кнопка "Далее")
    const nextButton = document.getElementById("next-card");
    nextButton.addEventListener("click", function () {
        if (gameCards.length > 0) {
            let randomIndex = Math.floor(Math.random() * gameCards.length);
            let selectedCard = gameCards[randomIndex];
            document.getElementById("card-display").innerText = selectedCard.text;
        }
    });

    // Функции для управления настройками
    const settingsButton = document.getElementById("settings-button");
    const settingsPanel = document.getElementById("settings-panel");
    const toggleSound = document.getElementById("toggle-sound");
    const toggleTheme = document.getElementById("toggle-theme");

    settingsButton.addEventListener("click", function () {
        settingsPanel.style.display = settingsPanel.style.display === "none" ? "block" : "none";
    });

    toggleSound.addEventListener("click", function () {
        soundEffect.muted = !soundEffect.muted;
        spinSound.muted = !spinSound.muted;
        penaltySound.muted = !penaltySound.muted;
    });

    toggleTheme.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
    });
});

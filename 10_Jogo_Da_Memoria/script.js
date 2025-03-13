const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let flippedCards = 0;
let firstCard, secondCard;
let attempts = 0;
let canFlip = true;

async function generateImagePairs() {
    const imagePairs = {};
    const usedIds = new Set();
    
    for (const card of [...new Set(cards)]) {
        let id;
        do {
            id = Math.floor(Math.random() * 1000) + 1;
        } while(usedIds.has(id));
        
        usedIds.add(id);
        const url = `https://picsum.photos/id/${id}/200/300`;
        imagePairs[card] = [url, url];
    }
    return imagePairs;
}

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function createCards() {
    const imagePairs = await generateImagePairs();
    shuffleCards(cards);
    const cardsList = document.querySelector(".container");
    cardsList.innerHTML = '';
    
    cards.forEach(cardNumber => {
        const card = document.createElement("div");
        card.className = "card";
        const cardImage = imagePairs[cardNumber].pop();
        
        card.innerHTML = `
            <div class="back"></div>
            <div class="front" style="background-image: url('${cardImage}')"></div>
        `;
        
        card.setAttribute("data-card", cardNumber);
        card.addEventListener("click", handleCardClick);
        cardsList.appendChild(card);
    });
}

function handleCardClick() {
    if (!canFlip || this === firstCard || this.classList.contains('flip')) return;
    
    this.classList.add('flip');
    flippedCards++;
    
    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        canFlip = false;
        attempts++;
        updateAttempts();
        setTimeout(checkForMatch, 1000);
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
    canFlip = true;
}

function disableCards() {
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);
    checkWin();
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 600);
}

function resetBoard() {
    [flippedCards, firstCard, secondCard] = [0, null, null];
}

function updateAttempts() {
    document.querySelector('.attempts span').textContent = attempts;
}

function checkWin() {
    if (document.querySelectorAll('.card:not(.flip)').length === 0) {
        showCongratulations();
    }
}

function showCongratulations() {
    const overlay = document.querySelector('.congratulations-overlay');
    const message = document.querySelector('.congratulations');
    message.innerHTML = `🎉 Parabéns!<br>Você venceu em ${attempts} tentativas!`;
    overlay.style.display = 'flex';
}

function resetGame() {
    attempts = 0;
    updateAttempts();
    resetBoard();
    document.querySelector('.congratulations-overlay').style.display = 'none';
    createCards();
}

// Event Listeners
document.querySelector('.reset-button').addEventListener('click', resetGame);
document.querySelector('.congratulations-overlay').addEventListener('click', resetGame);

// Initialize Game
createCards();
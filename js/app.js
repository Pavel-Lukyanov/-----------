const root = document.getElementById('root');
let arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let btnRepeat = document.getElementById('repeatGame');
let startGame = document.getElementById('startGame');
const backgroundRepeat = document.querySelector('.invisible__container');

//Сортируем массив случайными числами
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let tmp = arr[i];
        let rnd = Math.floor(Math.random() * (i + 1));
        arr[i] = arr[rnd];
        arr[rnd] = tmp;
    }
    return arr;
}

//Создаем контейнер с карточками
function createContainer() {
    shuffle(arr);
    window.container = document.createElement('div');
    container.classList.add('container');

    for (let i = 0; i < arr.length; i++) {
        let closure = document.createElement('div');
        closure.classList.add('closure');
        let card = document.createElement('div');
        card.classList.add('card');
        card.id = i;
        card.textContent = arr[i];
        card.append(closure);
        container.append(card);
    }

    root.append(container);
    gameLogic();
}

//Логика игры
function gameLogic() {
    let cards = document.querySelectorAll('.card');
    let card1 = null;
    let card2 = null;
    let id1 = null;
    let id2 = null;
    let ch = 0;
    let scoreEnd = 0;

    cards.forEach(card => {
        card.addEventListener('click', function () {
            if (this.querySelector('.closure')) {
                this.querySelector('.closure').style.opacity = 0;
                ch++;
                if (ch == 1) {
                    card1 = this.textContent;
                    id1 = this.id;
                }
                if (ch == 2) {
                    card2 = this.textContent;
                    id2 = this.id;
                    if (card1 === card2 && id1 != id2) {
                        let cardOpened1 = document.getElementById(`${id1}`);
                        let cardOpened2 = document.getElementById(`${id2}`);
                        cardOpened1.querySelector('.closure').remove();
                        cardOpened2.querySelector('.closure').remove();
                        scoreEnd++;
                    }
                }
                if (ch == 3) {
                    cards.forEach(card => {
                        if (card.querySelector('.closure')) {
                            card.querySelector('.closure').style.opacity = 1;
                        }
                    })
                    ch = 0;
                }
                if (scoreEnd == 8) {
                    backgroundRepeat.style.display = 'block';
                    btnRepeat.style.display = 'block';
                }
            }
        })
    });

    btnRepeat.addEventListener('click', () => {
        container.remove();
        backgroundRepeat.style.display = 'none';
        btnRepeat.style.display = 'none';
        createContainer();
    })

}

document.addEventListener('DOMContentLoaded', function () {
    startGame.addEventListener('click', () => {
        createContainer();
        backgroundRepeat.style.display = 'none';
        startGame.style.display = 'none';
    })
});
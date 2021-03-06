const cardsField = document.getElementById('cards-field') as HTMLDivElement
const newGameButtons =
    document.querySelectorAll<HTMLButtonElement>('.new-game-button')
const winWindow = document.getElementById('win-window') as HTMLDivElement
const looseWindow = document.getElementById('loose-window') as HTMLDivElement
const header = document.getElementById('header') as HTMLDivElement
const minuteSpan = document.getElementById('minutes') as HTMLSpanElement
const secondSpan = document.getElementById('seconds') as HTMLSpanElement

let totalSeconds = 0

const cover = { imgSrc: './static/img/card-suit.jpg', name: 'back' }

interface dataObject {
    [key: string]: any
}

const data: dataObject = {}

const cardData = [
    { imgSrc: './static/img/cards/card_1.jpg', name: 'card_1' },
    { imgSrc: './static/img/cards/card_2.jpg', name: 'card_2' },
    { imgSrc: './static/img/cards/card_3.jpg', name: 'card_3' },
    { imgSrc: './static/img/cards/card_4.jpg', name: 'card_4' },
    { imgSrc: './static/img/cards/card_5.jpg', name: 'card_5' },
    { imgSrc: './static/img/cards/card_6.jpg', name: 'card_6' },
    { imgSrc: './static/img/cards/card_7.jpg', name: 'card_7' },
    { imgSrc: './static/img/cards/card_8.jpg', name: 'card_8' },
    { imgSrc: './static/img/cards/card_9.jpg', name: 'card_9' },
    { imgSrc: './static/img/cards/card_10.jpg', name: 'card_10' },
    { imgSrc: './static/img/cards/card_11.jpg', name: 'card_11' },
    { imgSrc: './static/img/cards/card_12.jpg', name: 'card_12' },
    { imgSrc: './static/img/cards/card_13.jpg', name: 'card_13' },
    { imgSrc: './static/img/cards/card_14.jpg', name: 'card_14' },
    { imgSrc: './static/img/cards/card_15.jpg', name: 'card_15' },
    { imgSrc: './static/img/cards/card_16.jpg', name: 'card_16' },
    { imgSrc: './static/img/cards/card_17.jpg', name: 'card_17' },
    { imgSrc: './static/img/cards/card_18.jpg', name: 'card_18' },
    { imgSrc: './static/img/cards/card_19.jpg', name: 'card_19' },
    { imgSrc: './static/img/cards/card_20.jpg', name: 'card_20' },
    { imgSrc: './static/img/cards/card_21.jpg', name: 'card_21' },
    { imgSrc: './static/img/cards/card_22.jpg', name: 'card_22' },
    { imgSrc: './static/img/cards/card_23.jpg', name: 'card_23' },
    { imgSrc: './static/img/cards/card_24.jpg', name: 'card_24' },
    { imgSrc: './static/img/cards/card_25.jpg', name: 'card_25' },
    { imgSrc: './static/img/cards/card_26.jpg', name: 'card_26' },
    { imgSrc: './static/img/cards/card_27.jpg', name: 'card_27' },
    { imgSrc: './static/img/cards/card_28.jpg', name: 'card_28' },
    { imgSrc: './static/img/cards/card_29.jpg', name: 'card_29' },
    { imgSrc: './static/img/cards/card_30.jpg', name: 'card_30' },
    { imgSrc: './static/img/cards/card_31.jpg', name: 'card_31' },
    { imgSrc: './static/img/cards/card_32.jpg', name: 'card_32' },
    { imgSrc: './static/img/cards/card_33.jpg', name: 'card_33' },
    { imgSrc: './static/img/cards/card_34.jpg', name: 'card_34' },
    { imgSrc: './static/img/cards/card_35.jpg', name: 'card_35' },
    { imgSrc: './static/img/cards/card_36.jpg', name: 'card_36' },
]

let levelNumber: number

function getLevelNumber() {
    let level = localStorage.getItem('level')

    if (level === 'easy') {
        levelNumber = 3
    }
    if (level === 'medium') {
        levelNumber = 6
    }
    if (level === 'hard') {
        levelNumber = 9
    }

    return levelNumber
}

function randomize() {
    cardData.sort(() => Math.random() - 0.5)

    const newArr = cardData.slice(1, levelNumber.valueOf() + 1)
    const duplicate = [...newArr]
    const finalCardField = newArr.concat(duplicate)

    finalCardField.sort(() => Math.random() - 0.5)

    return finalCardField
}

function checkCards(event: Event) {
    const clickedCard = event.target as HTMLElement

    clickedCard.classList.add('clicked')
    const clickedCards = document.querySelectorAll<HTMLElement>('.clicked')
    const flippedCards = document.querySelectorAll<HTMLElement>('.flipCard')

    if (clickedCards.length === 2) {
        if (
            clickedCards[0].getAttribute('name') ===
            clickedCards[1].getAttribute('name')
        ) {
            setTimeout(() => {
                if (flippedCards.length === levelNumber * 2) {
                    showPopup(winWindow)
                }
                console.log('score')
            }, 1000)

            clickedCards.forEach((card) => {
                card.classList.remove('clicked')
                card.style.pointerEvents = 'none'
            })
        } else {
            setTimeout(() => {
                showPopup(looseWindow)
                console.log('loose')
            }, 1000)
        }
    }
}

function showPopup(screen: HTMLElement) {
    screen.classList.remove('hidden')
    header.style.opacity = '0.5'
    cardsField.style.opacity = '0.5'
    stopTimer()
}

function showCard(card: HTMLElement) {
    card.style.pointerEvents = 'none'
    card.classList.toggle('flipCard')

    setTimeout(() => {
        card.classList.toggle('flipCard')
        card.style.pointerEvents = 'auto'
    }, 4000)
}

function cardGenerator() {
    const cards = randomize()

    cards.forEach((item) => {
        const card = document.createElement('div')
        const face = document.createElement('img')
        const back = document.createElement('img')

        card.classList.add('card')
        face.classList.add('face')
        back.classList.add('back')

        card.setAttribute('name', item.name)

        cardsField.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)

        face.src = item.imgSrc
        back.src = cover.imgSrc

        showCard(card)

        card.addEventListener('click', (event) => {
            card.classList.add('flipCard')

            checkCards(event)
        })
    })
}

function createCardBlock() {
    getLevelNumber()

    if (levelNumber === 9) {
        cardsField.style.gridTemplateColumns = 'repeat(6, 1fr)'
    }
    if (levelNumber === 6) {
        cardsField.style.gridTemplateColumns = 'repeat(4, 1fr)'
    } else if (levelNumber === 3) {
        cardsField.style.gridTemplateColumns = 'repeat(3, 1fr)'
    }

    cardGenerator()
}

newGameButtons.forEach((newGameButton) => {
    newGameButton.addEventListener('click', () => {
        location.href = './index.html'
    })
})

function timer() {
    totalSeconds++

    console.log(totalSeconds)

    let minutes: number | string = Math.floor(totalSeconds / 60)
    let seconds: number | string = totalSeconds % 60

    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`

        data.minutes = minutes
        data.seconds = seconds

        minuteSpan.textContent = `${minutes}`
        secondSpan.textContent = `${seconds}`
    }
}

function startTimer() {
    let interval = setInterval(timer, 1000)
    data.interval = interval
}

function stopTimer() {
    const popUpTime = document.querySelectorAll('.popup__time')
    popUpTime.forEach((time) => {
        time.textContent = `${data.minutes}.${data.seconds}`
    })

    clearInterval(data.interval)
}

createCardBlock()

setTimeout(() => {
    startTimer()
}, 4000)

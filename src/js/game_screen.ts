const cardsField: HTMLElement | null = document.getElementById('cards-field')
const winWindow: HTMLElement | null = document.getElementById('win-window')
const looseWindow: HTMLElement | null = document.getElementById('loose-window')
const screenHeader: HTMLElement | null = document.getElementById('header')
const gameTimeMinutes: HTMLElement | null = document.getElementById('minutes')
const gameTimeSeconds: HTMLElement | null = document.getElementById('seconds')

const LEVEL_EASY = 'easy'
const LEVEL_MEDIUM = 'medium'
const LEVEL_HARD = 'hard'

let totalSeconds = 0

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
const cardCover = { imgSrc: './static/img/card-suit.jpg', name: 'back' }

let cardPairs: number

function getLevelNumber() {
    let level = localStorage.getItem('level')

    if (level === LEVEL_EASY) {
        cardPairs = 3
    }
    if (level === LEVEL_MEDIUM) {
        cardPairs = 6
    }
    if (level === LEVEL_HARD) {
        cardPairs = 9
    }

    return cardPairs
}

function getRandomCards(data: dataObject, toSliceNumber: number) {
    data.sort(() => Math.random() - 0.5)

    const newArray = data.slice(1, toSliceNumber.valueOf() + 1)
    const duplicateArray = [...newArray]
    const finalCardSetArray = newArray.concat(duplicateArray)

    finalCardSetArray.sort(() => Math.random() - 0.5)

    return finalCardSetArray
}

function checkCardsForMatch(event: Event) {
    const clickedCard = event.target as Element

    clickedCard?.classList.add('clicked')

    const clickedCards = document.querySelectorAll<HTMLElement>('.clicked')
    const flippedCards = document.querySelectorAll<HTMLElement>('.flipCard')

    if (clickedCards.length === 2) {
        if (
            clickedCards[0].getAttribute('name') ===
            clickedCards[1].getAttribute('name')
        ) {
            setTimeout(() => {
                if (flippedCards.length === cardPairs * 2) {
                    showPopupScreen(winWindow!)
                }
                console.log('score')
            }, 1000)

            clickedCards.forEach((card) => {
                card.classList.remove('clicked')
                card.style.pointerEvents = 'none'
            })
        } else {
            setTimeout(() => {
                showPopupScreen(looseWindow!)
                console.log('loose')
            }, 1000)
        }
    }
}

function showPopupScreen(screen: HTMLElement) {
    screen.classList.remove('hidden')
    if (screenHeader) screenHeader.style.opacity = '0.5'
    if (cardsField) cardsField.style.opacity = '0.5'
    stopTimer()
}

function showCardTimer(card: HTMLElement) {
    card.style.pointerEvents = 'none'
    card.classList.toggle('flipCard')

    setTimeout(() => {
        card.classList.toggle('flipCard')
        card.style.pointerEvents = 'auto'
    }, 4000)
}

function cardGenerator() {
    const cards = getRandomCards(cardData, cardPairs)

    cards.forEach((item: dataObject) => {
        const card = document.createElement('div')
        const cardFace = document.createElement('img')
        const cardBack = document.createElement('img')

        card.classList.add('card')
        cardFace.classList.add('face')
        cardBack.classList.add('back')

        card.setAttribute('name', item.name)

        cardsField?.appendChild(card)
        card.appendChild(cardFace)
        card.appendChild(cardBack)

        cardFace.src = item.imgSrc
        cardBack.src = cardCover.imgSrc

        showCardTimer(card)

        card.addEventListener('click', (event: MouseEvent) => {
            card.classList.add('flipCard')

            checkCardsForMatch(event)
        })
    })
}

function createCardBlock() {
    getLevelNumber()

    if (cardPairs === 9) {
        cardsField?.classList.add('nine-pairs')
    }
    if (cardPairs === 6) {
        cardsField?.classList.add('six-pairs')
    } else if (cardPairs === 3) {
        cardsField?.classList.add('three-pairs')
    }

    cardGenerator()
}

function timer() {
    totalSeconds++

    let minutes: number = Math.floor(totalSeconds / 60)
    let seconds: number = totalSeconds % 60

    if (seconds < 10) {
        gameTimeSeconds!.textContent = `0${seconds}`
        data.seconds = `0${seconds}`
    } else {
        gameTimeSeconds!.textContent = `${seconds}`
        data.seconds = seconds
    }

    if (minutes < 10) {
        gameTimeMinutes!.textContent = `0${minutes}`
        data.minutes = `0${minutes}`
    } else {
        gameTimeMinutes!.textContent = `${minutes}`
        data.minutes = minutes
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

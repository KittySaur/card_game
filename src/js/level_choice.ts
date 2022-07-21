const levelForm: HTMLElement | null = document.getElementById('level')

const levelChoiceButtons =
    document.querySelectorAll<HTMLButtonElement>('.level__choice')

const levelChoicesDiv: HTMLElement | null =
    document.getElementById('level__choices')

let clicked = false

levelChoicesDiv?.addEventListener('click', (event) => {
    event.preventDefault()

    const target = event.target as HTMLElement

    if (target.closest('button')) {
        console.log(target.dataset.level)

        levelChoiceButtons.forEach((levelButton) => {
            levelButton.classList.remove('error')
        })

        localStorage.setItem('level', target.dataset.level!)

        clicked = true
    }
})

levelForm?.addEventListener('submit', (event: Event) => {
    if (clicked === false) {
        event.preventDefault()
        levelChoiceButtons.forEach((levelButton) => {
            levelButton.classList.add('error')
        })
    }
})

import JSConfetti from './new.js'
const container = document.getElementById("container")

let arrayOfAnimals = ["🐯", "🐯", "🐰", "🐰", "🦞", "🦞", "🐸", "🐸", "🦄", "🦄", "🐲", "🐲"]
let cards = []
let picks = []
let score = 0

document.getElementById("reset").addEventListener("click", resetGame)

function setupGame() {
    let htmlString = ""
    arrayOfAnimals.sort(() => Math.random() - 0.5).forEach(animal => {
        htmlString += `
        <div class="card"><div class="content"><div class="front"></div><div class="back">${animal}</div></div></div>
        `
    })
    container.innerHTML = htmlString
    cards = [...document.getElementsByClassName("card")]
    cards.forEach(card => {
        card.addEventListener("click", pickCard)
    })
}

setupGame()

function pickCard(card) {
    picks.push(this)
    this.firstChild.classList.add("visible")
    this.removeEventListener('click', pickCard)
    if (picks.length == 2) { setTimeout(checkForMatch, 500) }
}

function checkForMatch() {
    if (picks.every(card => card.textContent === picks[0].textContent)) {
        score++
        picks.forEach(card => card.style.opacity = 0.5)
    } else {
        picks.forEach(card => card.firstChild.classList.remove("visible"))
        picks.forEach(card => { card.addEventListener("click", pickCard) })
    }

    picks.length = 0

    if (score === arrayOfAnimals.length / 2) {
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti({ emojis: arrayOfAnimals })
    }
}

function resetGame() {
    cards.length = 0
    score = 0
    setupGame()
}
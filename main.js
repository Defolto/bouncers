const pole = document.querySelector('.pole')
const span = document.querySelector('span')
const sqs = document.querySelectorAll('.sq')
const btn = document.querySelector("button")
const textGameOver = document.getElementById("textGameOver")
const recordHTML = document.getElementById('record')
const recordId = "recordForGame" 

let points = 0
let timer = null
let speed = 2000
let record = 0

if (localStorage.getItem(recordId)) {
    record = localStorage.getItem(recordId)
    recordHTML.innerHTML = record
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clear() {
    sqs.forEach(sq=>{
        sq.classList.remove("sq_active")
    })
}

function createInterval() {
    clearInterval(timer)
    timer = setInterval(() => {
        if (pole.querySelector(".sq_active")) {
            gameOver()
            clear()
            return
        } else {
            speed -= 100
        }

        const newActiveSq = getRandom(0, 15)
        sqs[newActiveSq].classList.add("sq_active")
    }, speed);
}

function start() {
    if (timer) {
        return
    }

    textGameOver.style.display = "none"
    points = 0
    span.innerHTML = points 
    createInterval()
}

function gameOver() {
    if (points > record) {
        record = points
        recordHTML.innerHTML = record  
        localStorage.setItem(recordId, record)
    }

    textGameOver.style.display = "block"
    clear()
    clearInterval(timer)
    timer = null
    speed = 2000
}

start()

pole.addEventListener('click', (e)=>{
    if (e.target.classList.contains("sq_active")) {
        e.target.classList.remove("sq_active")
        points += 1
        span.innerHTML = points
        createInterval()
    } else {
        gameOver()
    }
})

btn.addEventListener('click', ()=>{
    start()
})
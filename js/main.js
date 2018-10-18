// import Countdown from './Countdown.js';

// Recup des elements du dom ------------
const heurPanel = document.getElementById('hours')
const minPanel = document.getElementById('min')
const secPanel = document.getElementById('sec')

const affTime = document.getElementById('affTime')
const timeOut = document.getElementById('timeOut')

const btnstartTimer = document.getElementById('btnStart')
const btnpauseTimer = document.getElementById('btnPause')
const btnreplayTimer = document.getElementById('btnReinit')

const Wthours = document.getElementById('getHours')
const Wtmin = document.getElementById('getMinute')
const Wtsec = document.getElementById('getSecondes')

const Pthours = document.getElementById('getPauseHours')
const Ptmin = document.getElementById('getPauseMinute')
const Ptsec = document.getElementById('getPauseSecondes')

const repeat = document.getElementById('getNbRepeat')

const affWorkSet = document.getElementById("workSet")
const affPauseSet = document.getElementById("pauseSet")
const affPomoRep = document.getElementById("pomorep")
const affEtat = document.getElementById("etat")

let btnplay = true;

// declaration du canvas ----------------
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

ctx.lineCap = 'butt'

// variables -------------------------
let wHours, wMin, wSec,
    pHours, pMin, pSec,
    pomoRep, workTime,
    pauseTime, countWork, countpause

const valMax = 60

function setTimer() {
    wHours = parseInt(Wthours.value > 60 ? 60 : Wthours.value)
    wMin = parseInt(Wtmin.value > 60 ? 60 : Wtmin.value)
    wSec = parseInt(Wtsec.value > 60 ? 60 : Wtsec.value)
    pHours = parseInt(Pthours.value > 60 ? 60 : Pthours.value)
    pMin = parseInt(Ptmin.value > 60 ? 60 : Ptmin.value)
    pSec = parseInt(Ptsec.value > 60 ? 60 : Ptsec.value)
    pomoRep = parseInt(repeat.value > 60 ? 60 : repeat.value)

    workTime = `${wHours}:${wMin}:${wSec}`
    pauseTime = `${pHours}:${pMin}:${pSec}`

    affWorkSet.innerHTML = `Work: ${wHours}:${wMin}:${wSec}`
    affPauseSet.innerHTML = `Pause: ${pHours}:${pMin}:${pSec}`
    affPomoRep.innerHTML = `Pomo: ${pomoRep}/${pomoRep}`

    async function start() {
        let pomo = await createPomo(workTime, "PAUSE")  
        console.log('pomo isDone >>> ')
    }
    start()
    
    // createPomo(workTime, "PAUSE")
}

Rx.fromEvent(btnstartTimer, 'click').subscribe(() => console.log("play click"))


// function createPomo(time, type) {   
//     const pomo = new Countdown(time)
//     affEtat.innerHTML = type
//     pomo.init()

//     btnstartTimer.addEventListener("click", (e) => {
//         e.preventDefault()
//         if(btnplay) {
//             pomo.startTimer()
//             btnstartTimer.disabled = true
//             btnpauseTimer.disabled = false
//             btnplay = false
//         }
//     })
    
//     btnpauseTimer.addEventListener("click", (e) => {
//         e.preventDefault()
//         if(!btnplay) {
//             pomo.pauseTimer()
//             btnstartTimer.disabled = false
//             btnpauseTimer.disabled = true
//             btnplay = true
//         }
//     })
    
//     btnreplayTimer.addEventListener("click", (e) => {
//         e.preventDefault()
//         pomo.reInitTimer()
//         btnstartTimer.disabled = false
//         btnpauseTimer.disabled = true
//         btnplay = true
//     })
// }






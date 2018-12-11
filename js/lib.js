// variables GLOBAL -----------------------------
let pomorepactu = 0
let typeTimer
let etatPom = ["WORK", "PAUSE"]
let compteboucle = 0
const departAudio = new Audio('./audio/depart.mp3')
const finAudio = new Audio('./audio/fin.mp3')
const endAudio = new Audio('./audio/end_01.mp3')

// initAffInfoTimerRep() -----------------------------------
function initAffInfoTimerRep() {
    btnstartTimer.disabled = false
    btnpauseTimer.disabled = true
    affTime.style.display = 'flex'
    timeOut.style.display = 'none'
    btnplay = true

    pomorepactu = 0
    compteboucle = 0

    affWorkSet.innerHTML = `Work: ${wHours}:${wMin}:${wSec}`
    affPauseSet.innerHTML = `Pause: ${pHours}:${pMin}:${pSec}`
    affPomoRep.innerHTML = `Pomo: ${pomorepactu}/${pomoRep}`

    createCounter(0)  
}

// createPomo() ----------------------
function createCounter(timetype) {
    
    if(timetype == 0) {
        typeTimer = workTime
        affEtat.innerHTML = etatPom[0]
        departAudio.play()
    }
    if(timetype == 1) {
        typeTimer = pauseTime
        affEtat.innerHTML = etatPom[1]
        finAudio.play()
    }

    if(pomo){ delete pomo}
    
    pomo = new Countdown(typeTimer)
    pomo.init()
}

// verifLoop() ------------------------
function verifLoop() {
    
    compteboucle += 1
    if(compteboucle == 2) {
        compteboucle = 0
        pomorepactu += 1
    }
    console.log("pomoRepActu >>> ", pomorepactu)

    if(pomorepactu < pomoRep) {
        
        pomo.stopTimer()
        
        if(typeTimer == workTime) {
            createCounter(1)
            pomo.startTimer()
        }else if (typeTimer == pauseTime) {
            createCounter(0)
            pomo.startTimer()
        }
        

    }else {
        pomo.stopTimer()
        reDrawCanvas()
        drawArc(140, 7, this.sec)
        endAudio.play()
        affTime.style.display = 'none'
        timeOut.style.display = 'block'
        timeOut.innerHTML = 'TIME OUT'
        btnstartTimer.disabled = true
        btnpauseTimer.disabled = true
        return true
           
    }
    
}

// countdown *******************************
function Countdown(t) {
     this.timer = t
     this.hours = 0
     this.min = 0
     this.sec = 0
     this.timerid = 0
     this.pause = true
     this.reset = true
    
    // init() --------------------------------
    this.init = function() {
        this.timerid = 0
        const time = this.timer.split(":")
        this.hours = parseInt(time[0])
        this.min = parseInt(time[1])
        this.sec = parseInt(time[2])
        if (isNaN(hours)) {
            hours = 0
        }
        if (isNaN(min)) {
            min = 0
        }
        if (isNaN(sec)) {
            sec = 0
        }
        
        reDrawCanvas()
        drawText(this.hours, this.min, this.sec)
        this.setTimer()
    }
        
    // startTimer() -------------------------- 
    this.startTimer = function() {
        this.pause = false
        this.timerid = setInterval(() => {
            this.setTimer()
        }, 1000)
    }
    // pauseTimer() --------------------------
    this.pauseTimer = function() {
        clearInterval(this.timerid)
        this.pause = true
    }
    // reinitTimer() ------------------------
    this.reInitTimer = function() {
        affTime.style.display = 'flex'
        timeOut.style.display = 'none'
        this.stopTimer()
        this.init()
    }
    // stopTimer() ------------------------
    this.stopTimer = function() {
        clearInterval(this.timerid)
    }
    
    // setTimer() ------------------------
    this.setTimer = function() {
        affPomoRep.innerHTML = `Pomo: ${pomorepactu + 1}/${pomoRep}`
        reDrawCanvas()
            drawArc(200, 17, this.hours)
            drawArc(170, 12, this.min)
            drawArc(140, 7, this.sec)

        if(!this.pause){
            if (this.sec <= 0) {
                if (this.min <= 0) {
                    if (this.hours <= 0) {

                        verifLoop()
                        
                    } else {
                        this.min = 60
                        this.hours--
                        drawArc(200, 17, this.hours)
                        drawText(this.hours, this.min, this.sec)
                    }
                } else {
                    this.sec = 59
                    this.min--
                    drawArc(170, 12, this.min)
                    drawText(this.hours, this.min, this.sec)
                }
            } else {
                drawText(this.hours, this.min, this.sec)
                drawArc(140, 7, this.sec)
                this.sec--
            }
            
        }
    }

}

function reDrawCanvas() {

    ctx.shadowBlur = 0

    ctx.fillStyle = "#555"
    ctx.fillRect(0, 0, 500, 500)

    ctx.strokeStyle = "#888"
    ctx.lineWidth = 23
    ctx.beginPath()
    ctx.arc(250, 250, 200, 0, 2 * Math.PI)
    ctx.stroke()

    ctx.lineWidth = 18
    ctx.beginPath()
    ctx.arc(250, 250, 170, 0, 2 * Math.PI)
    ctx.stroke()

    ctx.lineWidth = 15
    ctx.beginPath()
    ctx.arc(250, 250, 140, 0, 2 * Math.PI)
    ctx.stroke()
}

function drawText(heur, min, sec) {

    heurPanel.innerHTML = `<span>${heur<10?'0':''}${heur}</span><span>heur${heur>1?'s':''}</span>`
    minPanel.innerHTML = `<span>${min<10?'0':''}${min}</span><span>minute${min>1?'s':''}</span>`
    secPanel.innerHTML = `<span>${sec<10?'0':''}${sec}</span><span>seconde${sec>1?'s':''}</span>`
}

function drawArc(radius, strokeSize, time) {
    
    let start = 1.5 * Math.PI

    ctx.shadowColor = "#28d1fa"
    ctx.shadowBlur = 40
    
    ctx.strokeStyle="#81e6ff"

    ctx.lineWidth = strokeSize
    
    ctx.beginPath()
    ctx.arc(250,250,radius,start, (time * ((2*Math.PI)/60))+start)
    ctx.stroke()
}
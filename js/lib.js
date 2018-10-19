let pomorepactu = 0
let pomoRepAff = 0

function createPomo(worktime, pausetime, pomorep) {
      
    pomoRepAff = pomorep

    affWorkSet.innerHTML = `Work: ${wHours}:${wMin}:${wSec}`
    affPauseSet.innerHTML = `Pause: ${pHours}:${pMin}:${pSec}`
    affPomoRep.innerHTML = `Pomo: ${pomorepactu}/${pomoRepAff}`
    affEtat.innerHTML = etatPom[0]

    // -------------------------------------
    pomo = new Countdown(worktime)
    pomo.init()
}

function Countdown(t) {
    this.timer = t
    this.hours = 0
    this.min = 0
    this.sec = 0
    this.pause = true
    
    this.init = function () {
        
        this.timerid = 0
        this.pause = true
        reset = true
        pomorepactu += 1
    
        const time = this.timer.split(":")
        this.hours = parseInt(time[0])
        this.min = parseInt(time[1])
        this.sec = parseInt(time[2])
        if (isNaN(this.hours)) {
            this.hours = 0
        }
        if (isNaN(this.min)) {
            this.min = 0
        }
        if (isNaN(this.sec)) {
            this.sec = 0
        }
        affPomoRep.innerHTML = `Pomo: ${pomorepactu}/${pomoRepAff}`
        reDrawCanvas()
        drawText(this.hours, this.min, this.sec)
        this.setTimer()
    }
        
    
    this.startTimer = function() {
        this.pause = false
        this.timerid = setInterval(() => {
            this.setTimer()
        }, 1000)
    }
    
    this.pauseTimer = function() {
        clearInterval(this.timerid)
        this.pause = true
    }
    
    this.reInitTimer = function() {
        affTime.style.display = 'flex'
        timeOut.style.display = 'none'
        this.stopTimer()
        this.init()
    }
    
    this.stopTimer = function() {
        clearInterval(this.timerid)
    }
    
    this.setTimer = function() {

        if(!this.pause){

            if (this.sec <= 0) {
                if (this.min <= 0) {
                    if (this.hours <= 0) {
                        // console.log('*** done ***')
                        reDrawCanvas()
                        drawArc(140, 7, this.sec)
                        affTime.style.display = 'none'
                        timeOut.style.display = 'block'
                        timeOut.innerHTML = 'TIME OUT'
                        btnstartTimer.disabled = true
                        btnpauseTimer.disabled = true
                        this.stopTimer()
                        // trouver un moyen de remonter que time out ok
                        
                    } else {
                        drawText(this.hours, this.min, this.sec)
                        // console.log(`Encore ${this.hours} heur(s)`)
                        this.hours--
                        drawArc(200, 17, this.hours)
                        this.min = 60
                        // this.startTimer()
                    }
                } else {
                    drawText(this.hours, this.min, this.sec)
                    this.min--
                    // console.log(`Encore ${this.min} minute(s)`)
                    drawArc(170, 12, this.min)
                    this.sec = 60
                    // this.startTimer()
                }
            } else {
                drawText(this.hours, this.min, this.sec)
                drawArc(140, 9, this.sec)
            }
            reDrawCanvas()
            drawArc(200, 17, this.hours)
            drawArc(170, 12, this.min)
            drawArc(140, 7, this.sec)
            this.sec--
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
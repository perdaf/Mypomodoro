// function Countdown(t) {
//     this.timer = t
//     let hours,
//         min,
//         sec

//     this.init = function() {
//         const time = this.timer.split(":")
//         this.hours = parseInt(time[0])
//         this.min = parseInt(time[1])
//         this.sec = parseInt(time[2])
//         if(isNaN(this.hours)){this.hours = 0}
//         if(isNaN(this.min)){this.min = 0}
//         if(isNaN(this.sec)){this.sec = 0}
//     }

//     this.stopTimer = function(timer) {
//         clearInterval(timer)
//     }

//     this.startTimer = function() {

//         ctx.shadowBlur = 0

//         ctx.fillStyle = "#555"
//         ctx.fillRect(0,0,500,500)

//         ctx.strokeStyle="#888"
//         ctx.lineWidth = 23
//         ctx.beginPath()
//         ctx.arc(250,250,200,0, 2*Math.PI)
//         ctx.stroke()

//         ctx.lineWidth = 18
//         ctx.beginPath()
//         ctx.arc(250,250,170,0, 2*Math.PI)
//         ctx.stroke()

//         ctx.lineWidth = 15
//         ctx.beginPath()
//         ctx.arc(250,250,140,0, 2*Math.PI)
//         ctx.stroke()


//         drawArc(200, 17, this.hours)
//         drawArc(170, 12, this.min)
//         drawArc(140, 7, this.sec)

    
//         if(this.sec <= 0){
//             if(this.min <= 0){
//                 if(this.hours <= 0) {
//                     // console.log('*** done ***')
//                     this.stopTimer(timer)
//                     affTime.style.display = 'none'
//                     timeOut.innerHTML = 'TIME OUT'

//                 }else {
//                     drawText(this.hours, this.min, this.sec)
//                     // console.log(`Encore ${this.hours} heur(s)`)
//                     this.hours--
//                     drawArc(200, 17, this.hours)
//                     this.min = 60
//                     this.startTimer()
//                 }
//             }else{
//                 drawText(this.hours, this.min, this.sec)
//                 this.min--
//                 // console.log(`Encore ${this.min} minute(s)`)
//                 drawArc(170, 12, this.min)
//                 this.sec = 60
//                 // this.startTimer()
//             }
//         }else {
//             drawText(this.hours, this.min, this.sec)
//             drawArc(140, 9, this.sec)
//         }
//         this.sec--
//     }

// }
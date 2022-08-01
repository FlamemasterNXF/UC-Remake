const valueContainer = document.querySelector(".value-container")
const container = document.getElementById("circleContainer")
let progressBars = [document.getElementById("bar0")]
let progressValues = [D(0)];

function progress(i, x){
    let hexAdds = [126+(i*(25+(i*5))), i*(25+(i*5)), 180-(i*(15+(i*5)))]
    progressValues[i]=x;
    valueContainer.textContent = `${format(progressValues[0])}%`
    progressBars[i].style.background = `conic-gradient(
      rgb(${hexAdds[0]}, ${hexAdds[1]}, ${hexAdds[2]}) ${progressValues[i].times(3.6)}deg,
      #000 ${progressValues[i].times(3.6)}deg
    )`
    gainNumber(D(1).times(diff).times(theoryEffects[15]).times(lostCycleEffects[2]).times(BREAKPOINTS[1].effect()))
    createBars()
}
function createBars(su=false){
        if(data.circleProg[data.circleProg.length-1].gte(100) || su){
            let newBar = document.createElement('div')
            let prevBar = document.getElementById(`bar${progressBars.length-1}`)
            newBar.classList.add('circular-progress')
            newBar.id = `bar${progressBars.length}`
            newBar.style.height = `${180+(progressBars.length*10)}px`
            newBar.style.width = `${180+(progressBars.length*10)}px`
            container.appendChild(newBar)
            newBar.appendChild(prevBar)
            if (!su){
                for(let i=0;i<data.circleProg.length;i++) data.circleProg[i] = D(1)
                data.circleProg.push(new Decimal(1))
            }
            progressValues.push(new Decimal(1))
            progressBars.push(newBar)
        }
}
function setupBars(x){
    fixCircleProg()
    let i=0
    if(x>0){
        while (data.circleProg.length-1>i){
            createBars(true)
            i++
        }
    }
}

function gainNumber(x){
    data.circleProg[0] = data.circleProg[0].plus(x)
    for(let i=0;i<data.circleProg.length;i++){
        if(i<5){
            if(data.circleProg[i].gte(100)&&data.circleProg[i+1]!==undefined){
                data.circleProg[i+1] = data.circleProg[i+1].plus(data.circleProg[i].div(100).floor())
                numberReset(i+1)
            }
        }
    }
}
function numberReset(x){
    for(let i=0;i<x;i++) data.circleProg[i] = (data.circleProg[i].gte(1e4)?D(0):data.circleProg[i].div(100).sub(data.circleProg[i].div(100).floor()).mul(100))
}
function fixCircleProg(){
    for(let i=0; i<data.circleProg.length;i++){
        data.circleProg[i] = D(data.circleProg[i])
    }
}

function increaseOddities(i){
    data.oddities = data.oddities.plus(i)
}
function mainLoop(){
    increaseOddities(data.oddityGain.div(100))
    updateHTML()
}
window.setInterval(function(){
    mainLoop()
}, 10);
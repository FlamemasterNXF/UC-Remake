let lostCompletionCaps = [D(10),D(10),D(6),D(20),D(50)]
let lostGoals = [D(1),D(1),D(1),D(1),D(1),]
let lostEffectsBase = [D(2),D(2),D(1),D(1),D(1),]
let lostEffects = [D(1),D(1),D(1),D(1),D(1),]
function calculateLostStuf(){
    lostEffects[0] = lostEffectsBase[0].times(data.lostCompletions[0].plus(1))
    lostEffects[1] = lostEffectsBase[1].times(data.lostCompletions[1].plus(1).times(10))
}
function enterLost(){
    lostReset()
}
function lostReset(){

}
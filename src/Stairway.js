let stairDebuffs = [D(0)]
let stairEffect = D(1)
let secretEffects = [D(1),D(0),D(0),D(0),D(0),D(0),D(1),D(0)]
let secretEnergyGain = [D(0),D(0),D(0),D(0),D(0),D(0),D(0),D(0)]
const secretNumbers = ['1','2','3','4','5','6','7','8']
const secretDescriptions = [`Multiplies Oddity gain`,`Adds to the Step Boost`,`Adds to the Theory of Multiplication’s effect`,`Adds to the Theory of Division II’s effect`,`Adds to the Lost Theory of Cycles’ effect`,`Adds to the Lost Cycle II effect`,`Divides the cost of The Theory of Multiplication`,`Produces ???`]
function calculateStairStuff(){
    stairDebuffs[0] = D(1).sub(data.currentStair.div(10))
    stairEffect = data.stairsComplete.plus(1).plus(data.stairsComplete.plus(1).div(10).plus(1)).plus(secretEffects[1]).plus(lostCycleEffects[2])
    secretEnergyGain[0] = data.stairsComplete.plus(1).sub(data.stairSecretEnergy[0].sub(1).sqrt().div(D(100).sub(ringEffects[1])))
    secretEnergyGain[1] = data.stairsComplete.plus(1).div(100).sub(data.stairSecretEnergy[1].sub(1).sqrt().div(D(1000).sub(ringEffects[1])))
    secretEnergyGain[2] = data.stairsComplete.plus(1).div(10).sub(data.stairSecretEnergy[2].sub(1).sqrt().div(D(100).sub(ringEffects[1])))
    secretEnergyGain[3] = data.stairsComplete.plus(2).log10().sub(data.stairSecretEnergy[3].sub(1).sqrt().div(D(100).sub(ringEffects[1])))
    secretEnergyGain[4] = data.stairsComplete.plus(1).div(2).sub(data.stairSecretEnergy[4].sub(1).sqrt().div(D(100).sub(ringEffects[1])))
    secretEnergyGain[5] = data.stairsComplete.plus(2).log(2).div(10).sub(data.stairSecretEnergy[5].sub(1).sqrt().div(D(100).sub(ringEffects[1])))
    secretEnergyGain[6] = data.stairSecretEnergy[6].gte(1)?data.stairsComplete.plus(2).log(10).div(10).sub(data.stairSecretEnergy[6].log10().div(D(100).sub(ringEffects[1]))):data.stairsComplete.plus(2).log(10).div(10)
    secretEnergyGain[7] = data.stairsComplete.gte(4)?data.stairsComplete.sub(3).div(20).sub(data.stairSecretEnergy[7].sqrt().div(D(100).sub(ringEffects[1]))):D(0)
    if (data.stairsComplete.gte(0)) {
        for (let i = 0; i < data.stairSecretEnergy.length; i++) {
            secretEffects[i] = data.stairSecretEnergy[i].div(10)
        }
        secretEffects[6] = data.stairSecretEnergy[6].div(10).plus(1)
    }
    secretMinimum()
}
function secretMinimum(){
    for (let i=0;i<data.stairSecretEnergy.length;i++){
        secretEnergyGain[i] = Decimal.max(secretEnergyGain[i], D(0))
    }
}
function increaseSecretEnergy(diff){
    for (let i=0;i<data.stairSecretEnergy.length;i++){
        data.stairSecretEnergy[i] = data.stairSecretEnergy[i].plus(secretEnergyGain[i].times(diff))
    }
}
function changeStair(mode){
    let confirmed
    if (data.settingsToggles[2]) confirmed=confirm('Are you sure? This will reset everything except for Legends and Stair Secrets!')
    if (confirmed || !data.settingsToggles[2]){
        if (mode===1&&!data.currentStair.plus(1).gt(data.stairsComplete.plus(1))){
            data.currentStair = data.currentStair.plus(1)
            stairReset()
        }
        if (mode===2&&!data.currentStair.equals(0)){
            data.currentStair = data.currentStair.sub(1)
            stairReset()
        }
        if (mode===3){
            data.currentStair = data.stairsComplete.plus(1)
            stairReset()
        }
        if (mode===4){
            data.currentStair = D(0)
            stairReset()
        }
    }
}
function completeStairCheck(){
    if (data.derivs[4].amt.gte(1) && data.hasTheory[10] && !data.stairsComplete.gte(data.currentStair)){
        data.stairsComplete = data.stairsComplete.plus(1)
        stairPopup.style.display = 'flex'
        stairPopup.innerText = `You have Completed Stair ${formatWhole(data.stairsComplete)}! Congratulations!`
    }
}
function closeStairPopup(){
    stairPopup.style.display = 'none'
}
function stairReset(){
    for (let i=0;i<data.autoToggled.length;i++){
        data.autoToggled[i] = false
    }
    data.oddities=D(2)
    data.derivs[4].u = false
    for (let i=0;i<data.derivs.length;i++){
        data.derivs[i].b = D(0)
        data.derivs[i].amt = D(0)
    }
    for (let i=0;i<data.upgrades.length;i++){
        data.upgrades[i].amt = D(0)
    }
    for (let i=0;i<data.hasTheory.length;i++){
        data.hasTheory[i] = false
    }
    data.inLost = false
    for (let i=0;i<data.particles.length;i++){
        data.particles[i] = D(0)
    }
    data.highestOdditiesInLost = D(2)
    for (let i=0;i<data.hasLostTheory.length;i++){
        data.hasLostTheory[i] = false
    }
    for (let i=0;i<data.lostCycleLevels.length;i++){
        data.lostCycleLevels[i] = D(0)
    }
}
let lostCompletionCaps = [D(10),D(10),D(6),D(20),D(50)]
let lostGoals = [D(1.5e6),D(1e11),D(1e96),D(1e96)]
let lostEffectsBase = [D(2),D(20),D(1),D(1)]
let lostEffects = [D(1),D(1),D(1),D(1)]
let lostRewards = [D(1),D(1),D(1),D(1)]
let totalLostCompletions = D(1)
let lostNames = ['Multiplication','Division','Unknown','Broken']
let lostNumbers = ['1','2','3','4']
let lostEffectsTexts = ['Multiplies the cost scaling of Derivatives','Divides Oddity gain based on how many Oddities you have','You only have Derivative 1','Upgrades have no effect']
let lostRewardsTexts = ['Reward: Boost both Theories of Multiplication<br>Final Completion Reward: Divide all Upgrade costs based on your total Lost Derivative Completions','Reward: Boost both Theories of Division<br>Final Completion Reward: Multiply all Theory effects based on your total Lost Derivative Completions','1st Time Reward: Unlock D5<br>Reward (completions 2+): Unlock new Theories','1st Time Reward: Unlock The Theory of Upgrade Derivatives III<br>Reward (completions 2+): Boost both Upgrade Derivative Theories']
function calculateLostStuf(){
    //effects
    lostEffects[0] = lostEffectsBase[0].times(data.lostCompletions[0].plus(1))
    lostEffects[1] = lostEffectsBase[1].plus(data.oddities.div(100)).plus(data.oddities.log2()).times(data.lostCompletions[1].plus(1))
    //rewards
    lostRewards[0] = data.lostCompletions[0].plus(1)
    lostRewards[1] = data.lostCompletions[1].plus(1)
    //goals
    lostGoals[0] = data.lostCompletions[0].gte(1) ? D(1.5e6).times(data.lostCompletions[0].plus(1)) : D(1.5e6)
    //misc
    totalLostCompletions = D(data.lostCompletions[0].plus(data.lostCompletions[1]).plus(data.lostCompletions[2]).plus(data.lostCompletions[3]))
}
function enterLost(x){
    lostReset()
    let i=x-1
    data.inLost[i] = true
    data.inAnyLost = true
    //lostInDisplay.innerHTML = `${lostNames[i]} Derivative Active!`
}
function exitLost(){
    lostReset()
    /*for (let i=0;i<data.inLost;i++){
        data.inLost[i] = false
    }
     */
    data.inLost[0] = false
    data.inLost[1] = false
    data.inLost[2] = false
    data.inLost[3] = false
    data.inLost[4] = false
    data.inAnyLost = false
}
function completeLost(){
    for (let i=0;i<data.inLost.length;i++){
        if (data.inLost[i] && data.oddities.gte(lostGoals[i])){
            data.lostCompletions[i] = data.lostCompletions[i].plus(1)
            exitLost()
        }
    }
}
function lostReset(){
    data.autoToggled = false
    data.oddities=D(2)
    for (let i=0;i<data.derivs.length;i++){
        data.derivs[i].b = D(0)
        data.derivs[i].amt = D(0)
    }
    for (let i=0;i<data.upgrades.length;i++){
        data.upgrades[i].amt = D(0)
    }
}
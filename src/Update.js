function updateHTML(){
    //derivs
    document.getElementById("oddityDisplay").innerHTML = `There are ${format(data.oddities)} Oddities [${format(data.oddityGain)}/s]`
    let derivNames = ['I','II','III','IV']
    document.getElementById("derivI").innerHTML = `Cost: ${format(data.derivs[0].c)} Oddities<br>[${format(data.derivs[0].b)}] ${format(data.derivs[0].amt)}<br>Produces ${format(data.oddityGain.div(data.derivs[0].amt.plus(1)))} Oddities [${format(data.oddityGain)}/s]`
    for (let i=1; i<data.derivs.length; i++){
         document.getElementById(`deriv${derivNames[i]}`).innerHTML = data.derivs[i].u ?
            `Cost: ${format(data.derivs[i].c)} Purchased D.${derivNames[i-1]}<br>[${format(data.derivs[i].b)}] ${format(data.derivs[i].amt)}<br>Produces ${format(derivProductions[i-1])} D.${derivNames[i-1]} [${format(data.derivs[i].amt.times(derivProductions[i-1]))}/s]`
            : `Unlock for ${format(derivUnlockCost[i-1])} Oddities`
    }
    //upgrades
    document.getElementById("upgrade5").innerHTML = `Upgrade ⬥<br>Requires: ${format(data.upgrades[4].c)} Total Upgrade levels (you have ${formatWhole(data.upgrades[0].amt.plus(data.upgrades[1].amt).plus(data.upgrades[2].amt).plus(data.upgrades[3].amt))})<br>Multiplies all upgrade effects by ${formatWhole(upgradeEffects[4])}x`
    let upgradeNames = ["1", "2", "3", "4"]
    for (let i=0;i<4;i++){
        document.getElementById(`upgrade${upgradeNames[i]}`).innerHTML =
            `Upgrade ${upgradeNames[i]}<br>Cost: ${format(data.upgrades[i].c)} Oddities<br>Current effect: ${formatWhole(upgradeEffects[i])}x (You have ${formatWhole(data.upgrades[i].amt)})`
    }
    //lost
    let lostNumbers = ['1','2','3','4','5']
    let lostNames = ['Multiplication','Division','Unknown','Ancient','Broken']
    let lostEffects = ['Multiplies the cost scaling of Derivatives','Divides the production of all Derivatives','You only have Derivative 1','Divides Oddity gain based on how many Oddities you have','Upgrades have no effect']
    let lostRewards = ['Reward: Boost both Theories of multiplication<br>Final Completion Reward: Divide all Upgrade costs based on your total Lost Derivative Completions','Reward: Boost both Theories of Division<br>Final Completion Reward: Multiply all Theory effects based on your total Lost Derivative Completions','1st Time Reward: Unlock D5<br>Reward (completions 2+): Unlock new Theories','Reward: Timespeed is boosted<br>Final Completion award: Timespeed is multiplied by the amount of hours you play*2','1st Time Reward: Unlock The Theory of Upgrade Derivatives III<br>Reward (completions 2+): Boost both Upgrade Derivative Theories']
    for (let i=0;i<lostNumbers.length;i++){
        document.getElementById(`lost${lostNumbers[i]}Title`).innerHTML = `${lostNames[i]} Derivative`
        document.getElementById(`lost${lostNumbers[i]}Effect`).innerHTML = `<br>${lostEffects[i]}`
        document.getElementById(`lost${lostNumbers[i]}Goal`).innerHTML = `<br>Goal: ${lostGoals[i]} Oddities`
        document.getElementById(`lost${lostNumbers[i]}Reward`).innerHTML = `<br>${lostRewards[i]}`
    }
    //hiding tabs
    document.getElementById("mysteriesNav").innerHTML = data.hasTab[0]?'Theories':'???'
    document.getElementById("milestoneNav").innerHTML = data.hasTab[1]?'Legends':'???'
    document.getElementById("lostNav").innerHTML = data.hasTab[2]?'next updoot:tm:':'???'
    //misc
    document.getElementById("autoBuymax").innerHTML = data.autoToggled?'Auto Buymax: ON':'Auto Buymax: OFF'
    unlockLegends()
    unlockTabs()
    showAndHideStuff()
}
let theoryDescriptions = [
    ()=>`The Theory of Reversal<br>Bought D4s multiply D1 production<br>Currently: ${format(theoryEffects[0])}x<br>Unlock Cost: ${format(theoryCosts[0])} Oddities`,
    ()=>`The Theory of Numbers<br>Bought D1s multiply D4 production<br>Currently: ${format(theoryEffects[1])}x<br>Unlock Cost: ${format(theoryCosts[1])} Oddities`,
    ()=>`The Theory of Multiplication<br>Bought D1s multiply Oddity gain<br>Currently: ${format(theoryEffects[2])}x<br>Unlock Cost: ${format(theoryCosts[2])} Oddities`,
    ()=>`The Theory of Upgrade Derivatives<br>Bought D1s multiply Upgrade 1's effect<br>Currently: ${format(theoryEffects[3])}x<br>Unlock Cost: ${format(theoryCosts[3])} Oddities`,
    ()=>`The Theory of Upgrade Derivatives II<br>Bought D4s multiply Upgrade 1's effect<br>Currently: ${format(theoryEffects[4])}x<br>Unlock Cost: ${format(theoryCosts[4])} Oddities`,
    ()=>`The Theory of Division<br>Total Upgrade levels lower the Upgrade ⬥ requirement<br>Currently: /${format(theoryEffects[5])}<br>Unlock Cost: ${format(theoryCosts[5])} Oddities`,
    ()=>`The Theory of Division II<br>Bought D1s slightly reduce the requirement for all Upgrades<br>Currently: /${format(theoryEffects[6])}<br>Unlock Cost: ${format(theoryCosts[6])} Oddities`,
    ()=>`The Theory of Multiplication II<br>Apply The Theory of Multiplication again<br>Currently: ${format(theoryEffects[7])}x<br>Unlock Cost: ${format(theoryCosts[7])} Oddities`,
    ()=>`The Theory of Peak Synergy<br>Bought D4s multiply the Upgrade ⬥ effect, and Upgrade ⬥ multiplies D4 production<br>Currently: ${format(theoryEffects[8])}x<br>Unlock Cost: ${format(theoryCosts[8])} Oddities`,
    ()=>`The Theory of Lost Derivatives<br>Unlock Lost Derivatives, and Oddities multiply Oddity gain<br>Currently: ${format(theoryEffects[9])}x<br>Unlock Cost: ${format(theoryCosts[9])} Oddities`,
]
function theoryTextUpdate(x){
    let i = x-1
    document.getElementById("theoriesText").innerHTML = `${theoryDescriptions[i]()}<br>Effects are only shown once you've unlocked the Theory!`
}
let lostDescriptions = [
    ()=>`Exact multiplier: ${format(lostEffects[0])}`,
    ()=>`Exact divisor: ${format(lostEffects[1])}`,
    ()=>`oba3`,
    ()=>`ob4`,
    ()=>`o5`,
]
function lostTextUpdate(x){
    let i = x-1
    document.getElementById("lostText").innerHTML=`${lostDescriptions[i]()}<br>You've reached the goal ${formatWhole(data.lostCompletions[i])}/${formatWhole(lostCompletionCaps[i])} Times`
}
function unlockTabs(){
    data.hasTab[0] = data.derivs[3].amt.gte(1)
    data.hasTab[1] = data.upgrades[2].amt.gte(1)
    data.hasTab[2] = data.hasTheory[9]
}
function showAndHideStuff(){
    //derivs
    let derivStuff = document.getElementById("bigDerivativeContainer")
    let buyMax = document.getElementById("buymaxContainer")
    let autoBuymax = document.getElementById("autoBuymax")
    derivStuff.style.display = data.currentTab===1 ? 'flex' : 'none'
    buyMax.style.display = data.currentTab===1 ? 'flex' : 'none'
    autoBuymax.style.display = data.upgrades[3].amt.gte(1) ? 'flex' : 'none'
    //upgrades
    let upgrades = [document.getElementById("upgrade1"),document.getElementById("upgrade2"),document.getElementById("upgrade3"),document.getElementById("upgrade4"),document.getElementById("upgrade5")]
    upgrades[4].style.display = data.upgrades[3].amt.gte(1) ? 'flex' : 'none'
    //theories
    let theoryStuff = document.getElementById("theoriesContainer")
    theoryStuff.style.display = data.currentTab===2?'flex':'none'
    let theoryNumbers = ['1','2','3','4','5','6','7','8','9','10']
    for (let i=0;i<data.hasTheory.length;i++){
        document.getElementById(`theory${theoryNumbers[i]}`).style.backgroundColor = data.hasTheory[i] ? '#9d670a' : '#0a629d'
    }
    //legends
    let legendsNumbers = ['1']
    let legendsStuff = document.getElementById("legendsContainer")
    legendsStuff.style.display = data.currentTab===3?'flex':'none'
    for (let i=0;i<legendsNumbers.length;i++){
        document.getElementById(`legend${legendsNumbers[i]}`).style.backgroundColor = data.hasLegend[i] ? '#967109' : '#542780'
    }
    //lost
    let lostStuff = document.getElementById("bigLostContainer")
    lostStuff.style.display = data.currentTab===4?'flex':'none'
    //settings
    let settingsStuff = document.getElementById("settingsContainer")
    settingsStuff.style.display = data.currentTab===0 ? 'flex':'none'
    //misc
    let ourgwa = document.getElementById("ourgwa")
    ourgwa.style.display = ourgwatriggered ? 'flex':'none'
}
// region element declarations
const oddityDisplay = document.getElementById("oddityDisplay")
const derivI = document.getElementById("derivI")
const derivDisplays = [];
for (let i=1; i<data.derivs.length; i++){
    derivDisplays[i] = document.getElementById(`deriv${derivNames[i]}`)
}
const upgrade5 = document.getElementById("upgrade5")
const upgradeDisplays = [];
for (let i=0; i<4; i++){
    upgradeDisplays[i] = document.getElementById(`upgrade${upgradeNames[i]}`)
}
const mysteriesNav = document.getElementById("mysteriesNav")
const milestoneNav = document.getElementById("milestoneNav")
const lostNav = document.getElementById("lostNav")
const autoBuymax = document.getElementById("autoBuymax")
const legend2 = document.getElementById('legend2')
const upgrades = [document.getElementById("upgrade1"),document.getElementById("upgrade2"),document.getElementById("upgrade3"),document.getElementById("upgrade4"),document.getElementById("upgrade5")]
const theoryDisplays = []
for (let i=0; i<data.hasTheory.length; i++){
    theoryDisplays[i] = document.getElementById(`theory${theoryNumbers[i]}`)
}
const legendsDispays = []
for (let i=0; i<data.hasLegend.length; i++){
    legendsDispays[i] = document.getElementById(`legend${legendsNumbers[i]}`)
}
const lostInDisplay = document.getElementById("lostInDisplay")
const ourgwa = document.getElementById("ourgwa")
// endregion
function updateHTML(){
    //constant
    oddityDisplay.innerText = `There are ${format(data.oddities)} Oddities [${format(data.oddityGain)}/s]`
    mysteriesNav.innerText = data.hasTab[0]?'Theories':'???'
    milestoneNav.innerText = data.hasTab[1]?'Legends':'???'
    lostNav.innerText = data.hasTab[2]?'Lost Derivatives':'???'
    lostInDisplay.style.display = data.inLost?'flex':'none'
    ourgwa.style.display = ourgwatriggered ? 'flex':'none'
    //derivs
    if (data.currentTab === 1){
        derivI.innerHTML = `Cost: ${format(data.derivs[0].c)} Oddities<br>[${format(data.derivs[0].b)}] ${format(data.derivs[0].amt)}<br>Produces ${format(data.oddityGain.div(data.derivs[0].amt.plus(1)))} Oddities [${format(data.oddityGain)}/s]`
        for (let i=1; i<data.derivs.length; i++){
            derivDisplays[i].innerHTML = data.derivs[i].u ?
                `Cost: ${format(data.derivs[i].c)} Purchased D.${derivNames[i-1]}<br>[${format(data.derivs[i].b)}] ${format(data.derivs[i].amt)}<br>Produces ${format(derivProductions[i-1])} D.${derivNames[i-1]} [${format(data.derivs[i].amt.times(derivProductions[i-1]))}/s]`
                : `Unlock for ${format(derivUnlockCost[i-1])} Oddities`
        }
        //upgrades
        upgrade5.innerHTML = `Upgrade ⬥<br>Requires: ${format(data.upgrades[4].c)} Total Upgrade levels (you have ${formatWhole(data.upgrades[0].amt.plus(data.upgrades[1].amt).plus(data.upgrades[2].amt).plus(data.upgrades[3].amt))})<br>Multiplies all upgrade effects by ${formatWhole(upgradeEffects[4])}x`
        for (let i=0;i<4;i++){
            upgradeDisplays[i].innerHTML =
                `Upgrade ${upgradeNames[i]}<br>Cost: ${format(data.upgrades[i].c)} Oddities<br>Current effect: ${formatWhole(upgradeEffects[i])}x (You have ${formatWhole(data.upgrades[i].amt)})`
        }
        autoBuymax.innerHTML = data.autoToggled?'Auto Buymax: ON':'Auto Buymax: OFF'
        autoBuymax.style.display = data.upgrades[3].amt.gte(1) ? 'flex' : 'none'
        upgrades[4].style.display = data.upgrades[3].amt.gte(1) ? 'flex' : 'none'
    }
    //theories
    if (data.currentTab === 2){
        for (let i=0;i<data.hasTheory.length;i++){
            theoryDisplays[i].style.backgroundColor = data.hasTheory[i] ? '#9d670a' : '#0a629d'
        }
    }
    //lost

    //misc
    if (data.currentTab === 3){
        for (let i=0;i<legendsNumbers.length;i++){
            legendsDispays[i].style.backgroundColor = data.hasLegend[i] ? '#967109' : '#542780'
        }
    }
    unlockLegends()
    unlockTabs()
    tabChangeHTML()
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
function unlockTabs(){
    data.hasTab[0] = data.derivs[3].amt.gte(1) || data.hasTab[0]
    data.hasTab[1] = data.upgrades[2].amt.gte(1) || data.hasTab[1]
    data.hasTab[2] = data.hasTheory[9] || data.hasTab[2]
}
let derivStuff = document.getElementById("bigDerivativeContainer")
let buyMax = document.getElementById("buymaxContainer")
let theoryStuff = document.getElementById("theoriesContainer")
let legendsStuff = document.getElementById("legendsContainer")
let lostStuff = document.getElementById("bigLostContainer")
let settingsStuff = document.getElementById("settingsContainer")
function tabChangeHTML(){
    //derivs
    derivStuff.style.display = data.currentTab===1 ? 'flex' : 'none'
    buyMax.style.display = data.currentTab===1 ? 'flex' : 'none'
    //upgrades
    //theories
    theoryStuff.style.display = data.currentTab===2?'flex':'none'
    //legends
    legendsStuff.style.display = data.currentTab===3?'flex':'none'
    //lost
    lostStuff.style.display = data.currentTab===4?'flex':'none'
    //settings
    settingsStuff.style.display = data.currentTab===0 ? 'flex':'none'
}
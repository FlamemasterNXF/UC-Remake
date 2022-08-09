function updateHTML(){
    // region constant
    DOM('oddityDisplay').innerText = `There are ${format(data.oddities)} Oddities [${format(data.oddityGain)}/s]`
    ENTROPY.updateHTML()
    DOM('mysteriesNav').innerText = data.hasTab[0]?'Theories':'???'
    DOM('milestoneNav').innerText = data.hasTab[1]?'Legends':'???'
    DOM('lostNav').innerText = data.hasTab[2]?'Lost Derivatives':'???'
    DOM('circleNav').innerText = data.hasTab[3]?'Circles':'???'
    DOM('inversionsNav').innerText = data.hasTab[4]?'Inversions':'???'
    DOM('complexityNav').innerText = data.hasTab[5]?'Complexity':'???'
    DOM('lostInDisplay').style.display = data.inLost?'flex':'none'
    DOM('ourgwa').style.display = ourgwatriggered ? 'flex':'none'
    //endregion
    //derivs
    if (data.currentTab === 1){
        DOM('deriv0').innerHTML = `Cost: ${format(data.derivs[0].c)} Oddities<br>[${format(data.derivs[0].b)}] ${format(data.derivs[0].amt)}<br>Produces Oddities [${format(data.oddityGain)}/s]`
        for (let i=1; i<data.derivs.length; i++){
            DOM(`deriv${i}`).innerHTML = data.derivs[i].u ?
                `Cost: ${format(data.derivs[i].c)} Purchased D.${derivNames[i-1]}<br>[${format(data.derivs[i].b)}] ${format(data.derivs[i].amt)}<br>Produces D.${derivNames[i-1]} [${format(data.derivs[i].amt.times(derivProductions[i-1]))}/s]`
                : `Unlock for ${format(derivUnlockCost[i-1])} Oddities`
        }
        //upgrades
        DOM('upgrade4').innerHTML = `Upgrade ⬥<br>Requires: ${format(data.upgrades[4].c)} Total Upgrade levels (you have ${formatWhole(data.upgrades[0].amt.plus(data.upgrades[1].amt).plus(data.upgrades[2].amt).plus(data.upgrades[3].amt))})<br>Multiplies all upgrade effects by ${formatWhole(upgradeEffects[4])}x`
        for (let i=0;i<4;i++){
            DOM(`upgrade${i}`).innerHTML =
                `Upgrade ${upgradeNames[i]} [${formatWhole(data.upgrades[i].amt)}]<br>Cost: ${format(data.upgrades[i].c)} Oddities<br>Current effect: ${formatWhole(upgradeEffects[i])}x => D${i+1}`
        }
        DOM('autoBuymax').innerHTML = data.autoToggled[0]?'Auto Buymax: ON':'Auto Buymax: OFF'
        DOM('autoBuymax').style.display = data.upgrades[3].amt.gte(1) ? 'flex' : 'none'
        DOM('upgrade4').style.display = data.upgrades[3].amt.gte(1) ? 'flex' : 'none'
    }
    //theories
    if (data.currentTab === 2){
        for (let i=0;i<theoryDescriptions.length;i++){
            DOM(`theory${i}`).style.backgroundColor = data.hasTheory[i] ? '#9d670a' : '#0a629d'
        }
    }
    //lost
    if (data.currentTab === 4){
        DOM('lostTopText').innerText=`Ancient Particles: ${format(data.particles[0])} // Derivative Particles: ${format(data.particles[1])} [${format(particleGains[0])}/s] // Dream Particles: ${format(data.particles[2])} [${format(particleGains[1])}/s]`
        DOM('lostInfo').innerHTML=`<br>Activating The Lost Derivative will reset everything before Theories<br>While the Lost Derivative is active only D1 can be purchased, but you will gain Ancient Particles based on how many Oddities you gain!<br>`
        DOM('lostEffect').innerText= data.inLost?data.oddities.gt(data.highestOdditiesInLost)?`You'll gain ${format(ancientParticleGain)} Ancient Particles if you disable The Lost Derivative`:`You need more than ${format(data.highestOdditiesInLost)} Oddities to gain more Ancient Particles`:`Activate The Lost Derivative to gain more Ancient Particles`
        DOM('derivativeParticleEffect').innerHTML=derivativeParticleEffect2.gt(1)?`Current Derivative Particle effects:<br>Dream Particle gain multiplier [${format(derivativeParticleEffect)}x]<br>Upgrade 5 multiplier [${format(derivativeParticleEffect2)}x]`:`Current Derivative Particle effects:<br>Dream Particle gain multiplier [${format(derivativeParticleEffect)}]x`
        DOM('dreamParticleEffect').innerHTML=`Current Dream Particle effects:<br>Oddity gain multiplier [${format(dreamParticleEffects[0])}x]<br>D1 Cost divisor [/${format(dreamParticleEffects[1])}]<br>Upgrade Requirement divisor [/${format(dreamParticleEffects[2])}]`
        DOM('lostTheory0').innerHTML= data.hasLostTheory[0]?`Lost Theory of Dreams<br>Dream Particles divide D1s cost<br>Unlocked!`:`Lost Theory of Dreams<br>Dream Particles divide D1s cost<br>Unlock Cost: ${format(lostTheoryCosts[0])} Derivative Particles`
        DOM('lostTheory1').innerHTML= data.hasLostTheory[1]?`Lost Theory of Dreams II<br>Dream Particles divide the cost of Upgrades 1-4<br>Unlocked!`:`Lost Theory of Dreams II <br>Dream Particles divide the cost of Upgrades 1-4<br>Unlock Cost: ${format(lostTheoryCosts[1])} Derivative Particles`
        DOM('lostTheory2').innerHTML= data.hasLostTheory[2]?`Lost Theory of Cycles<br>Total Lost Cycle levels multiply Oddity gain<br>Currently: ${format(lostTheory3Effect)}x`:`Lost Theory of Cycles <br>Total Lost Cycle levels multiply Oddity gain<br>Unlock Cost: ${format(lostTheoryCosts[2])} Derivative Particles<br>Currently: ${format(lostTheory3Effect)}x`
        for (let i=0;i<data.lostCycleLevels.length;i++){
            DOM(`lostCycle${i}`).innerHTML = `Lost Cycle ${lostCycleNumbers[i]}<br>${lostCycleEffectTexts[i]} [${format(lostCycleEffects[i])}x]<br>Cost: ${format(lostCycleCosts[i])} Derivative Particles<br>This Lost Cycle is currently level ${formatWhole(data.lostCycleLevels[i])}`
        }
        DOM('lostAutoBuymax').innerHTML = data.autoToggled[1]?'Auto Lost Cycle Buymax: ON':'Auto Lost Cycle Buymax: OFF'
    }
    //circles
    if (data.currentTab === 5){
        updateCircleHTML()
    }
    //circles
    if (data.currentTab === 6){
        INVERSIONS.updateHTML()
    }
    //misc
    if (data.currentTab === 3){
        for (let i=0;i<legendsNumbers.length;i++){
            DOM(`legend${i}`).style.backgroundColor = data.hasLegend[i] ? '#967109' : '#542780'
        }
    }
    if (data.currentTab ===0){
        DOM(`settingsToggle1`).innerText = data.settingsToggles[1]?'Toggle Animations [ON]':'Toggle Animations [OFF]'
        DOM(`settingsToggle3`).innerText = data.settingsToggles[2]?'Toggle Offline Progress [ON]':'Toggle Offline Progress [OFF]'
        DOM(`changelog`).style.display = data.settingsToggles[0]?'inline':'none'
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
    ()=>`The Theory of Multiplication III<br>Bought D2s and D3s multiply Oddity gain<br>Currently: ${format(theoryEffects[10])}x<br>Unlock Cost: ${format(theoryCosts[10])} Oddities`,
    ()=>`The Theory of Upgrade Derivatives III<br>Bought D5s multiply the Upgrade ⬥ effect<br>Currently: ${format(theoryEffects[11])}x<br>Unlock Cost: ${format(theoryCosts[11])} Oddities`,
    ()=>`The Theory of Reversal II<br>Bought D5s multiply D1 production<br>Currently: ${format(theoryEffects[12])}x<br>Unlock Cost: ${format(theoryCosts[12])} Oddities`,
    ()=>`The Theory of Numbers II<br>Bought D1s multiply D5 production<br>Currently: ${format(theoryEffects[13])}x<br>Unlock Cost: ${format(theoryCosts[13])} Oddities`,
    ()=>`The Theory of Peak Synergy II<br>Bought D5s boost D4, bought D4s boost D5, Upgrade ⬥ boosts D5, AND Bought D5s boost Upgrade ⬥ again<br>Currently: ${format(theoryEffects[14])}x<br>Unlock Cost: ${format(theoryCosts[14])} Oddities`,
    ()=>`The Theory of Circular Derivatives I<br>Bought D2 and D3s boost Circle Progress Speed<br>Currently: ${format(theoryEffects[15])}x<br>Unlock Cost: ${format(theoryCosts[15])} Oddities`,
    ()=>`The Theory of Circular Derivatives II<br>Total Cycle levels boost D1<br>Currently: ${format(theoryEffects[16])}x<br>Unlock Cost: ${format(theoryCosts[16])} Oddities`,
    ()=>`The Theory of Circles Beyond Cycles<br>Total Cycle levels boost D1 and D5 production<br>Currently: ${format(theoryEffects[17])}x<br>Unlock Cost: ${format(theoryCosts[17])} Oddities`,
    ()=>`The Theory of Circular Derivatives III<br>Total Cycle levels reduce the requirement for Upgrades 1-4<br>Currently: /${format(theoryEffects[18])}<br>Unlock Cost: ${format(theoryCosts[18])} Oddities`,
    ()=>`The Theory of Atomic Derivatives<br>Unlock a new Derivative Particle effect<br>Unlock Cost: ${format(theoryCosts[19])} Oddities`,
]
function theoryTextUpdate(i){
    document.getElementById("theoriesText").innerHTML = `${theoryDescriptions[i]()}<br>Effects are only shown once you've unlocked the Theory!`
}
function unlockTabs(){
    data.hasTab[0] = data.derivs[3].amt.gte(1) || data.hasTab[0]
    data.hasTab[1] = data.upgrades[3].amt.gte(1) || data.hasTab[1]
    data.hasTab[2] = data.hasTheory[9] || data.hasTab[2]
    data.hasTab[3] = data.hasLegend[5] || data.hasTab[3]
    data.hasTab[4] = data.hasLegend[7] || data.hasTab[4]
    data.hasTab[5] = false || data.hasTab[5]
}
function tabChangeHTML(){
    //derivs
    DOM(`bigDerivativeContainer`).style.display = data.currentTab===1 ? 'flex' : 'none'
    DOM(`buymaxContainer`).style.display = data.currentTab===1 ? 'flex' : 'none'
    DOM(`autoBuymax`).style.display = data.hasLegend[0] ? 'flex' : 'none'
    DOM(`upgradeBuymax`).style.display = data.hasLegend[2]?'flex':'none'
    DOM(`derivVButton`).style.display = data.hasLegend[6]?'flex':'none'
    //upgrades
    DOM(`upgradeContainer`).style.display = data.oddities.gte(1e17) || data.upgrades[0].amt.gte(1)?'flex':'none'
    //theories
    DOM(`theoriesContainer`).style.display = data.currentTab===2?'flex':'none'
    DOM(`theoryRow4`).style.display = data.hasLegend[6]?'flex':'none'
    DOM('theoryRow5').style.display = data.hasSecret[1]?'flex':'none'
    //legends
    DOM(`legendsContainer`).style.display = data.currentTab===3?'flex':'none'
    //lost
    DOM(`bigLostContainer`).style.display = data.currentTab===4?'flex':'none'
    DOM(`lostAutoBuymax`).style.display = data.hasLegend[3]?'flex':'none'
    DOM('lostCycle2').style.display = data.hasSecret[0]?'block':'none'
    DOM('lostCycle3').style.display = data.hasSecret[2]?'block':'none'
    //circles
    DOM('bigCirclesContainer').style.display = data.currentTab===5?'flex':'none'
    DOM('cycleBuyMax').style.display = data.hasLegend[4]?'flex':'none'
    //inversions
    DOM('bigInversionsContainer').style.display = data.currentTab===6?'flex':'none'
    DOM('inversionInversionNav').style.display = false?'flex':'none'
    //settings
    DOM(`settingsContainer`).style.display = data.currentTab===0 ? 'flex':'none'
    //nav
    DOM(`milestoneNav`).style.display = data.hasTab[0] || data.hasTab[1]?'inline':'none'
    DOM(`lostNav`).style.display = data.hasLegend[0] || data.hasTab[2]?'inline':'none'
    DOM(`circleNav`).style.display = data.particles[0].gte(1) || data.hasTab[3]?'inline':'none'
    DOM(`inversionsNav`).style.display = data.breakpointsUnlocked[1] || data.hasTab[4]?'inline':'none'
    DOM(`complexityNav`).style.display = false || data.hasTab[5]?'inline':'none'
    //animations
    animationCavnas.style.display = data.currentTab===4?'flex':'none'
}
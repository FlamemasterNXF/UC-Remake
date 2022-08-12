const INVERSIONS = {
    prevDeep: D(0),
    totalITheoryLevels(){
        let total = D(0)
        for(let i=0; i<data.invertedTheoryLevels.length;i++){
            total = total.plus(data.invertedTheoryLevels[i])
        }
        return total
    },
    calcGain(){
        return data.oddities.gte(1e150) ? ((D(data.oddities.exponent-150).plus((data.entropy.sqrt().div(100)).clampMin(1))).times(this.iTheoryEffects()[4])).pow(this.deepInversionEffects()[1]): D(0)
    },
    gain(diff){
        if(data.inversionEnabled){ data.inversions = data.inversions.plus(this.calcGain().times(diff)) }
        else if(data.inversionInversionControl[1] && data.inversions.gte(1)) data.inversions = data.inversions.sub(this.inversionDecay().times(diff)).clampMin(1)
    },
    inversionEffect(){
        return data.inversions.sqrt().clampMin(1)
    },
    inversionDecay(){
        if(!data.inversionInversionControl[1] || !data.oddities.gte(1.1e150)) return D(0)
        return data.oddities.div(1e150).sqrt().log2()
    },
    deepInversionRequirement(){
        return D(5).times(data.deepInversionCap.plus(1))
    },
    effectDescriptions: [
        'Inversions boost Breakpoint 4', 'Inversions boost Oddity gain while the Lost Derivative is active', 'Inversions Boost the Lost Theory of Cycles',
        'Circle Progress boosts The Theory of Upgrade Derivatives', 'Ancient Particles boost Inversion gain', 'Total Upgrade Levels boost the Theory of Division'
    ],
    updateHTML(){
        let op = data.inversionInversionControl[1]?'multiplying':'dividing'
        DOM('inversionsDisplay').innerText = `There are ${format(data.inversions)} Inversions, ${op} Oddity gain by ${format(this.inversionEffect())}\n +${format(this.calcGain())}/s [Gain ${boolToReadable(data.inversionEnabled,'ED')}]`
        DOM('toggleInversions').innerText = `${boolToReadable(!data.inversionEnabled, 'EDT')} Inversion Production`
        DOM('deepInversionActivate').innerText = `There are ${formatWhole(data.deepInversion)} Supercharged Deep Inversions.\nThere are ${formatWhole(data.deepInversionCap)} total Deep Inversions\n You need ${formatWhole(this.deepInversionRequirement())} Inverted Theories to gain another.`
        DOM('deepInversionEffectText').innerText = `The Supercharged Deep Inversions cause these effects:\n
        Oddity gain: ^${format(this.deepInversionEffects()[0])}\nInversion gain: ^${format(this.deepInversionEffects()[1])}\nEntropy gain: ^${format(this.deepInversionEffects()[2])}\nDream and Derivative Particle gains: ^${format(this.deepInversionEffects()[3])}\nInverted Theory effects: ^${format(this.deepInversionEffects()[4])}`
        DOM('deepInversionEffectText2').innerText = `Your best Oddity amount with max Supercharge is ${format(data.bestOdditiesMaxDeep)}, providing a ${format(data.maxSuperChargeEffect)}x multiplier to Oddity gain`
        DOM('inversionInversion').innerHTML = data.inversionInversionControl[1]?`<i>Your Inversions are Inverted</i><br>Undo the Unthinkable things you've done`:data.inversionInversionControl[0]?`<i>Are you prepared to venture into the far unknown?</i><br>Invert your Inversions`:`Unknown<br>Cost: 1e100 Inversions`
        DOM('inversionInversionEffectText').innerText = `Your Inverted Inversions have these effects:\nOddity gain: ${format(this.inversionEffect())}x\nEntropy Gain: ${format((this.inversionEffect().log2()).clampMin(1))}x\nThey change the effects of Supercharged Deep Inversions\nSelf Decay when not being gained: -${format(this.inversionDecay())}/s`
        for(let i=0;i<data.invertedTheoryLevels.length;i++){
            DOM(`iTheory${i}`).innerText = `Inverted Theory ${numToRoman(i+1)} [${format(data.invertedTheoryLevels[i])}]\n${this.effectDescriptions[i]}\nCurrently ${format(this.iTheoryEffects()[i])}x\nCost: ${format(this.iTCost())}`
        }
    },
    iTCost(){
        return D(500).times(this.totalITheoryLevels().plus(1))
    },
    deepInversionEffects(x=data.deepInversion){
        return [
            data.inversionInversionControl[1]?D(1).plus(x.div(10)):D(1).sub(x.div(10)), //Oddity gain
            data.inversionInversionControl[1]?D(1).sub(x.div(10)):D(1).plus(x.div(20)), //Inversion Gain
            D(1).plus(x.div(50)), //Entropy Gain
            D(1).sub(x.div(5)), //Dream/Derivative Gain
            D(1).plus(x.div(100)) //Inverted Theory Effects
        ]
    },
    calcMaxSuperchargeEffect(r=false){
        data.maxSuperChargeEffect = !r?(data.bestOdditiesMaxDeep.log10().times(data.deepInversionCap)).clampMin(1):D(1)
    },
    iTheoryEffects() {
        let iTheoryEffects = Array(6).fill(D(1))
        iTheoryEffects[0] = data.invertedTheoryLevels[0].sub(data.invertedTheoryLevels[0].div(2)).plus((data.inversions.sqrt().sub(data.invertedTheoryLevels[0].times(2))).div(10)).clampMin(1)
        iTheoryEffects[1] = data.invertedTheoryLevels[1].sub(data.invertedTheoryLevels[1].div(2)).plus((data.inversions.sqrt().sub(data.invertedTheoryLevels[1].times(2))).div(10)).clampMin(1)
        iTheoryEffects[2] = data.invertedTheoryLevels[2].sub(data.invertedTheoryLevels[2].div(2)).plus((data.inversions.sqrt().sub(data.invertedTheoryLevels[2].times(2))).div(10)).clampMin(1)
        iTheoryEffects[3] = data.invertedTheoryLevels[3].sub(data.invertedTheoryLevels[3].div(2)).plus((c().sqrt().sub(data.invertedTheoryLevels[3].times(2))).div(10)).clampMin(1)
        iTheoryEffects[4] = data.invertedTheoryLevels[4].sub(data.invertedTheoryLevels[4].div(2)).plus((data.particles[0].sqrt().sub(data.invertedTheoryLevels[4].times(2))).div(10)).clampMin(1)
        iTheoryEffects[5] = data.invertedTheoryLevels[5].sub(data.invertedTheoryLevels[5].div(2)).plus((totalUpgradeLevels().sqrt().sub(data.invertedTheoryLevels[5].times(2))).div(10)).clampMin(1)
        for(let i=0;i<data.invertedTheoryLevels.length;i++){
            iTheoryEffects[i] = iTheoryEffects[i].pow(this.deepInversionEffects()[4])
            if(data.invertedTheoryLevels[i].lt(1)) iTheoryEffects[i] = D(1)
        }
        return iTheoryEffects
    },
    buyITheory(i){
        if(data.inversions.gte(this.iTCost())){
            data.inversions = data.inversions.sub(this.iTCost())
            data.invertedTheoryLevels[i] = data.invertedTheoryLevels[i].plus(1)
        }
    },
    activateDeepInversion(){
        createPrompt('Deep Supercharge', 1, 'How many would you like to Supercharge?\nNote that this will reset the Derivatives Tab and Dream and Derivative Particles!')
    },
    controlInversionInversion(){
        if(!data.inversionInversionControl[0] && data.inversions.gte(1)){ data.inversionInversionControl[0] = true }
        else{ data.inversionInversionControl[1] = !data.inversionInversionControl[1] }
    },
    setDeepInversion(x){
        DOM('promptContainer').style.display = 'none'
        try{
            let safe = parseInt(x)
            if(isNaN(safe)) throw `NaN at INVERSIONS.setDeepInversion('${x}')`
            if(D(safe).eq(0) && this.prevDeep.eq(data.deepInversionCap) && data.oddities.gt(data.bestOdditiesMaxDeep)) {
                data.bestOdditiesMaxDeep = data.oddities
                this.calcMaxSuperchargeEffect()
            }
            if(D(safe).lte(data.deepInversionCap)) {
                data.deepInversion = D(safe)
                lostReset()
                data.particles[1] = D(100)
                data.particles[2] = D(100)
                this.prevDeep = D(safe)
            }
            else
                createAlert('Failure', 'You don\'t have enough Deep Inversions for that!', 'Aw...')
        }
        catch (e) {
            createAlert('Error', 'That\'s not a valid number!', 'Oops')
            console.error(e)
        }
    },
    gainDeepInversion(){
        if(this.totalITheoryLevels().gte(this.deepInversionRequirement())){
            data.deepInversionCap = data.deepInversionCap.plus(1)
            data.bestOdditiesMaxDeep = D(0)
            this.calcMaxSuperchargeEffect(true)
            createAlert('Deep Inversion Gained!', 'You have gained 1 Deep Inversion!\nBest Oddities with max Supercharge has been reset.', 'Awesome.')
        }
    }

}
function changeInversionsTab(i){
    DOM(`${i}Container`).style.display = 'flex'
    if(i!=='invertedTheories') DOM('invertedTheoriesContainer').style.display = 'none'
    if(i!=='deepInversions') DOM('deepInversionsContainer').style.display = 'none'
    if(i!=='inversionInversion') DOM('inversionInversionContainer').style.display = 'none'
}
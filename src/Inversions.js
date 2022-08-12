const INVERSIONS = {
    totalITheoryLevels(){
        let total = D(0)
        for(let i=0; i<data.invertedTheoryLevels.length;i++){
            total = total.plus(data.invertedTheoryLevels[i])
        }
        return total
    },
    calcGain(){
        return data.oddities.gte(1e150) ? (D(data.oddities.exponent-150).plus((data.entropy.sqrt().div(100)).clampMin(1))).times(this.iTheoryEffects()[4]) : D(0)
    },
    gain(diff){
        if(data.inversionEnabled){ data.inversions = data.inversions.plus(this.calcGain().times(diff)) }
    },
    inversionEffect(){
        return data.inversions.sqrt().clampMin(1)
    },
    deepInversionRequirement(){
        return this.totalITheoryLevels().plus(5).times(data.deepInversionCap.plus(1))
    },
    effectDescriptions: [
        `Inversions boost Breakpoint 4`, 'Inversions boost Oddity gain while the Lost Derivative is active', 'Inversions Boost the Lost Theory of Cycles',
        `Circle Progress boosts The Theory of Upgrade Derivatives`, 'Ancient Particles boost Inversion gain', 'Total Upgrade Levels boost the Theory of Division'
    ],
    updateHTML(){
        DOM('inversionsDisplay').innerText = `There are ${format(data.inversions)} Inversions, dividing Oddity gain by ${format(this.inversionEffect())}\n +${format(this.calcGain())}/s [Gain ${boolToReadable(data.inversionEnabled,'ED')}]`
        DOM('toggleInversions').innerText = `${boolToReadable(!data.inversionEnabled, 'EDT')} Inversion Production`
        DOM('deepInversionActivate').innerText = `There are ${formatWhole(data.deepInversion)} Deep Inversions Supercharged.\nThere are ${formatWhole(data.deepInversionCap)} total Deep Inversions\n You need ${formatWhole(this.deepInversionRequirement())} Inversion Theories to gain another.`
        DOM('deepInversionEffectText').innerText = `The Supercharged Deep Inversions cause these effects:\n
        Oddity gain: ^${format(this.deepInversionEffects()[0])}\nInversion gain: ^${format(this.deepInversionEffects()[1])}\nEntropy gain: ^${format(this.deepInversionEffects()[2])}\nDream and Derivative Particle gains: ^${format(this.deepInversionEffects()[3])}\nInverted Theory effects: ^${format(this.deepInversionEffects()[4])}`
        for(let i=0;i<data.invertedTheoryLevels.length;i++){
            DOM(`iTheory${i}`).innerText = `Inverted Theory ${numToRoman(i+1)} [${format(data.invertedTheoryLevels[i])}]\n${this.effectDescriptions[i]}\nCurrently ${format(this.iTheoryEffects()[i])}x\nCost: ${format(this.iTCost())}`
        }
    },
    iTCost(){
       return D(500).times(this.totalITheoryLevels().plus(1))
    },
    iTheoryEffects() {
        let iTheoryEffects = []
        data.invertedTheoryLevels[0].sub(data.invertedTheoryLevels[0].div(2)).plus((data.inversions.sqrt().sub(data.invertedTheoryLevels[0].times(2))).div(10)).clampMin(1)
        data.invertedTheoryLevels[1].sub(data.invertedTheoryLevels[1].div(2)).plus((data.inversions.sqrt().sub(data.invertedTheoryLevels[1].times(2))).div(10)).clampMin(1)
        data.invertedTheoryLevels[2].sub(data.invertedTheoryLevels[2].div(2)).plus((data.inversions.sqrt().sub(data.invertedTheoryLevels[2].times(2))).div(10)).clampMin(1)
        data.invertedTheoryLevels[3].sub(data.invertedTheoryLevels[3].div(2)).plus((c().sqrt().sub(data.invertedTheoryLevels[3].times(2))).div(10)).clampMin(1)
        data.invertedTheoryLevels[4].sub(data.invertedTheoryLevels[4].div(2)).plus((data.particles[0].sqrt().sub(data.invertedTheoryLevels[4].times(2))).div(10)).clampMin(1)
        data.invertedTheoryLevels[5].sub(data.invertedTheoryLevels[5].div(2)).plus((totalUpgradeLevels().sqrt().sub(data.invertedTheoryLevels[5].times(2))).div(10)).clampMin(1)
        for(let i=0;i<data.invertedTheoryLevels.length;i++){
            if(data.invertedTheoryLevels[i].lt(1)) iTheoryEffects[i] = D(1)
        }
        return iTheoryEffects
    },
    deepInversionEffects(x=data.deepInversion){
        return [
            D(1).sub(x.div(10)), //Oddity gain
            D(1).plus(x.div(20)), //Inversion Gain
            D(1).plus(x.div(50)), //Entropy Gain
            D(1).sub(x.div(5)), //Dream/Derivative Gain
            D(1).plus(x.div(100)) //Inverted Theory Effects
        ]
    },
    buyITheory(i){
        if(data.inversions.gte(this.iTCost())){
            data.inversions = data.inversions.sub(this.iTCost())
            data.invertedTheoryLevels[i] = data.invertedTheoryLevels[i].plus(1)
        }
    },
    activateDeepInversion(){
        createPrompt('Deep Supercharge', 1, 'How many would you like to Supercharge?\nNote that this will reset your Oddities!')
    },
    setDeepInversion(x){
        DOM('promptContainer').style.display = 'none'
        try{
            let safe = parseInt(x)
            if(isNaN(safe)) throw `NaN at INVERSIONS.setDeepInversion('${x}')`
            if(D(safe).lte(data.deepInversionCap))
                data.deepInversion = D(safe)
            else
                createAlert('Failure', 'You don\'t have enough Deep Inversions for that!', 'Aw...')
        }
        catch (e) {
            createAlert('Error', 'That\'s not a valid number!', 'Oops')
            console.error(e)
        }
    },
    gainDeepInversion(){
        if(this.totalITheoryLevels().gte(this.deepInversionRequirement())) data.deepInversionCap = data.deepInversionCap.plus(1)
    }

}
function changeInversionsTab(i){
    DOM(`${i}Container`).style.display = 'flex'
    if(i!=='invertedTheories') DOM('invertedTheoriesContainer').style.display = 'none'
    if(i!=='deepInversions') DOM('deepInversionsContainer').style.display = 'none'
    if(i!=='inversionInversion') DOM('inversionInversionContainer').style.display = 'none'
}
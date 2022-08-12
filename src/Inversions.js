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
    effectDescriptions: [
        `Inversions boost Breakpoint 4`, 'Inversions boost Oddity gain while the Lost Derivative is active', 'Inversions Boost the Lost Theory of Cycles',
        `Circle Progress boosts The Theory of Upgrade Derivatives`, 'Ancient Particles boost Inversion gain', 'Total Upgrade Levels boost the Theory of Division'
    ],
    updateHTML(){
        DOM('inversionsDisplay').innerText = `There are ${format(data.inversions)} Inversions, dividing Oddity gain by ${format(this.inversionEffect())}\n +${format(this.calcGain())}/s [Gain ${boolToReadable(data.inversionEnabled,'ED')}]`
        DOM('toggleInversions').innerText = `${boolToReadable(!data.inversionEnabled, 'EDT')} Inversion Production`
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
    buyITheory(i){
        if(data.inversions.gte(this.iTCost())){
            data.inversions = data.inversions.sub(this.iTCost())
            data.invertedTheoryLevels[i] = data.invertedTheoryLevels[i].plus(1)
        }
    },

}
function changeInversionsTab(i){
    DOM(`${i}Container`).style.display = 'flex'
    if(i!=='invertedTheories') DOM('invertedTheoriesContainer').style.display = 'none'
    if(i!=='deepInversions') DOM('deepInversionsContainer').style.display = 'none'
    if(i!=='inversionInversion') DOM('inversionInversionContainer').style.display = 'none'
}
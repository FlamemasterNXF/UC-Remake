const INVERSIONS = {
    totalITheoryLevels(){
        let total = D(0)
        for(let i=0; i<data.invertedTheoryLevels.length;i++){
            total = total.plus(data.invertedTheoryLevels[i])
        }
        return total
    },
    calcGain(){
        return data.oddities.gte(1e150) ? D(data.oddities.exponent-150).plus((data.entropy.sqrt().div(100)).clampMin(1)) : D(0)
    },
    gain(diff){
        if(data.inversionEnabled){ data.inversions = data.inversions.plus(this.calcGain().times(diff)) }
    },
    inversionEffect(){
        return data.inversions.sqrt().clampMin(1)
    },
    effectDescriptions: [
        `Inversions divide Entropy gain`, 'Inversions boost Oddity gain while the Lost Derivative is active', 'Inversions Boost the Lost Theory of Cycles',
        `Circle Progress boosts The Theory of Multiplication`, 'Ancient Particles boost Inversion gain', 'Total Upgrade Levels boost Inversion gain'
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
        for(let i=0;i<data.invertedTheoryLevels.length;i++){
            iTheoryEffects[i] = data.invertedTheoryLevels[i].gte(1)?
                (data.invertedTheoryLevels[i].sub(data.invertedTheoryLevels[i].div(10))).plus(data.inversions.sqrt().sub(data.invertedTheoryLevels[i].times(2))).clampMin(1):D(1)
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
const INVERSIONS = {
    calcGain(){
        return data.oddities.gte(1e150) ? D(data.oddities.exponent-150).plus((data.entropy.sqrt().div(100)).clampMin(1)) : D(0)
    },
    gain(diff){
        if(data.inversionEnabled){ data.inversions = data.inversions.plus(this.calcGain().times(diff)) }
    },
    inversionEffect(){
        return data.inversions.sqrt().clampMin(1)
    },
    updateHTML(){
        DOM('inversionsDisplay').innerText = `There are ${format(data.inversions)} Inversions, dividing Oddity gain by ${format(this.inversionEffect())}\n +${format(this.calcGain())}/s [Gain ${boolToReadable(data.inversionEnabled,'ED')}]`
        DOM('toggleInversions').innerText = `${boolToReadable(!data.inversionEnabled, 'EDT')} Inversion Production`
        for(let i=0;i<data.hasInvertedTheory.length;i++){
            DOM(`iTheory${i}`).innerText = data.hasInvertedTheory[i]?`Inverted Theory ${numToRoman(i+1)}\n${this.effectDescriptions[i]}\nCurrently: ${format(this.iTheoryEffects()[i])}`:`Inverted Theory ${numToRoman(i+1)}\n${this.effectDescriptions[i]}\nCost: ${format(this.costs[i])}`
            DOM(`iTheory${i}`).style.backgroundColor = data.hasInvertedTheory[i] ? '#8f0062' : '#02a046'
        }
    },
    buyITheory(i){
        if(data.inversions.gte(this.costs[i]) && !data.hasInvertedTheory[i]){
            data.hasInvertedTheory[i] = true
            data.inversions = data.inversions.sub(this.costs[i])
        }
    },
    effectDescriptions: [
        `Inversions divide Entropy gain`, `Bought Inverted Theories boost Inverted Theories`, `Circle Progress boosts The Theory of Multiplication`
    ],
    costs: [
        D(2e3), D(2e3), D(1e96)
    ],
    iTheoryEffects() {
        return [
            data.hasInvertedTheory[0]&&data.inversions.gte(10)?data.inversions.log10():D(0),
            data.hasInvertedTheory[1]?checkAllIndexes(data.hasInvertedTheory, true):D(0),
            data.hasInvertedTheory[2]&&c().gte(10)?c().sqrt().log10():D(0),
        ]
    }

}
function changeInversionsTab(i){
    DOM(`${i}Container`).style.display = 'flex'
    if(i!=='invertedTheories') DOM('invertedTheoriesContainer').style.display = 'none'
    if(i!=='deepInversions') DOM('deepInversionsContainer').style.display = 'none'
    if(i!=='inversionInversion') DOM('inversionInversionContainer').style.display = 'none'
}
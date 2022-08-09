const INVERSIONS = {
    calcGain(){
        if(data.oddities.gte(1e150) && data.inversionEnabled){ return D(data.oddities.exponent-150).plus((data.entropy.sqrt().div(100)).clampMin(1)) }
        else{ return D(0) }
    },
    gain(diff){
        data.inversions = data.inversions.plus(this.calcGain().times(diff))
    },
    inversionEffect(){
        return data.inversions.sqrt().clampMin(1)
    },
    updateHTML() {
        DOM('inversionsDisplay').innerText = `There are ${format(data.inversions)} Inversions, dividing Oddity gain by ${format(this.inversionEffect())}\n +${format(this.calcGain())}/s [Gain ${boolToReadable(data.inversionEnabled,'ED')}]`
        DOM('toggleInversions').innerText = `${boolToReadable(!data.inversionEnabled, 'EDT')} Inversion Production`
        for(let i=0;i<data.hasInvertedTheory.length;i++){
            DOM(`iTheory${i}`).innerText = `Inverted Theory ${numToRoman(i+1)}\n${this.effectDescriptions[i]}\nCost: WIP`
        }
    },
    effectDescriptions: [
        `Inversions `, `b`, `ALBANIS`
    ]

}
function changeInversionsTab(i){
    DOM(`${i}Container`).style.display = 'flex'
    if(i!=='invertedTheories') DOM('invertedTheoriesContainer').style.display = 'none'
    if(i!=='deepInversions') DOM('deepInversionsContainer').style.display = 'none'
    if(i!=='inversionInversion') DOM('inversionInversionContainer').style.display = 'none'
}
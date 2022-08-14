const ENTROPY = {
    entropyGain() {
        if(data.oddities.gt(1e150) && data.inversionInversionControl[1] && data.inversions.gte(3)){ return (data.oddities.log10()).pow(INVERSIONS.deepInversionEffects()[2]).times(INVERSIONS.inversionEffect().log2()) }
        if(data.oddities.gt(1e150)){ return (data.oddities.log10()).pow(INVERSIONS.deepInversionEffects()[2]) }
        else{ return D(0) }
    },
    gainEntropy(diff) {
        data.entropy = data.entropy.plus(this.entropyGain().times(diff))
    },
    updateHTML() {
        DOM('entropyDisplay').style.display = this.entropyGain().gt(0) ? 'flex' : 'none'
        DOM('entropyDisplay').innerText = `There is ${format(data.entropy)} Entropy, dividing Oddity gain by ${format(data.entropy)} [+${format(this.entropyGain())}/s]`
    }
}

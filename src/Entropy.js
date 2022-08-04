const ENTROPY = {
    entropyGain() {
        if(data.oddities.gt(1e150)){
            return data.oddities.sub(1e150).log10()
        }
        else{ return D(0) }
    },
    gainEntropy(diff) {
        data.entropy = data.entropy.plus(this.entropyGain().times(diff))
    },
    updateHTML() {
        DOM('entropyDisplay').style.display = this.entropyGain().gt(0) ? 'flex' : 'none'
        DOM('entropyDisplay').innerText = `You have accumulated ${format(data.entropy)} Entropy, dividing your Oddity gain by ${format(data.entropy)} [+${format(this.entropyGain())}/s]`
    }
}

let singGoal = D(10)
let ringularityNames = [`Z`,`X`,`B`,`N`,`K`,`O`]
let ringularityDescs = [`Reduces the Cost of Theory of Multi II based on Secret 7's effect`,`Reduces the reduction in the Secret Energy gain formula based on Secret 6’s effect`,`Multiplies Ancient Particle gain based on Secret 1’s effect`,`Multiplies all the Dream Particle effects based on Secret 3’s effect`,`Add to the Theory of Lost Derivatives’ effect based on Secret 4’s effect`,`Add to the Theory of Divison’s effect based on Secret 2’s effect`]
let ringSymbols = [`/`,`-`,`*`,`*`,`+`,`+`]
let ringEffects = [D(1), D(0), D(1), D(1), D(0), D(0)]
let singEffect = D(1)
function calculateSingStuff(){
    singGoal = D(10).times(D(10).pow(data.totalSingularities))
    singCollapse()
    singEffect = data.totalSingularities.gte(1)?data.totalSingularities.times(600):D(1)
    ringEffects[0] = data.ringularityInvested[0]?secretEffects[6].sqrt():D(1)
    ringEffects[1] = data.ringularityInvested[1]?secretEffects[5].sqrt():D(0)
    ringEffects[2] = data.ringularityInvested[2]?secretEffects[0].log10().sqrt():D(1)
    ringEffects[3] = data.ringularityInvested[3]?secretEffects[2].log2():D(1)
    ringEffects[4] = data.ringularityInvested[4]?secretEffects[3].div(20):D(0)
    ringEffects[5] = data.ringularityInvested[5]?secretEffects[1].log10():D(0)
}
function ringInvest(x){
    let i=x-1
    if (data.singularities.gte(1) && !data.ringularityInvested[i]){
        data.singularities = data.singularities.sub(1)
        data.ringularityInvested[i] = true
    }
}
function ringRespec(){
    let confirmed
    if (data.settingsToggles[4]) confirmed=confirm('Are you sure? This will reset Matter and Secret 8!')
    if (confirmed || !data.settingsToggles[4]){
        for(let i=0;i<data.ringularityInvested.length;i++){
            data.ringularityInvested[i] = false
            data.singularities = data.totalSingularities
            data.matter = D(0)
            data.stairSecretEnergy[7] = D(0)
        }
    }
}
function gainMatter(diff){
    data.matter = data.matter.plus(secretEffects[7].times(diff))
}
function singCollapse(){
    if (data.matter.gte(singGoal)){
        data.totalSingularities=data.totalSingularities.plus(1)
        data.singularities=data.singularities.plus(1)
        data.matter = D(0)
        data.stairSecretEnergy[7] = D(0)
        singPopup.style.display=`flex`
    }
}
function closeBHPopup(){
    singPopup.style.display = 'none'
}

let singGoal = D(10)
let ringularityNames = [`Z`,`X`,`B`,`N`,`K`,`O`]
let ringularityDescs = [`Reduces the Cost of Theory of Multi II based on Secret 7's effect`,`Reduces the reduction in the Secret Energy gain formula based on Secret 6’s effect`,`Multiplies Ancient Particle gain based on Secret 1’s effect`,`Multiplies all the Dream Particle effects based on Secret 3’s effect`,`Add to the Theory of Lost Derivatives’ effect based on Secret 4’s effect`,`Add to the Theory of Divison’s effect based on Secret 2’s effect`]
function calculateSingStuff(){
    singGoal = D(10).times(D(10).pow(data.totalSingularities))
    singCollapse()
}
function ringInvest(x){
    let i=x-1
    if (data.singularities.gte(1)){
        data.singularities = data.singularities.sub(1)
        data.ringularityInvested[i] = true
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

let singGoal = D(10)
function calculateSingStuff(){
    singGoal = D(10).times(D(10).pow(data.totalSingularities))
    singCollapse()
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

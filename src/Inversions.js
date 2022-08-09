const INVERSIONS = {
    
}
function changeInversionsTab(i){
    DOM(`${i}Container`).style.display = 'flex'
    if(i!=='invertedTheories') DOM('invertedTheoriesContainer').style.display = 'none'
    if(i!=='deepInversions') DOM('deepInversionsContainer').style.display = 'none'
    if(i!=='inversionInversion') DOM('inversionInversionContainer').style.display = 'none'
}
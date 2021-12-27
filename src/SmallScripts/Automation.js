function autoToggle(x){
    let i=x-1
    data.autoToggled[i] ? data.autoToggled[i] = false : data.autoToggled[i] = true
}
function automate(){
    if (data.autoToggled[0]) buyMaxDeriv()
    if (data.autoToggled[1]) buyMaxLostCycles()
}
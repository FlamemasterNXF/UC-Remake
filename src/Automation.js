function autoToggle(){
    data.autoToggled ? data.autoToggled = false : data.autoToggled = true
}
function automate(){
    if (data.autoToggled)
    buyMaxDeriv()
}
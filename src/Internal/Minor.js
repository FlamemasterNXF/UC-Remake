const DOMCache = new Map()
const DOM = (id) => {
    const cachedEl = DOMCache.get(id)
    if (cachedEl) return cachedEl

    const el = document.getElementById(id)
    DOMCache.set(id, el)
    return el
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min
}

/*MODE OPTIONS
OF: ON/OFF
OFL: On/Off
ED: ENABLED/DISABLED
EDL: Enabled/Disabled
UL: Unlocked/Locked
*/
function boolToReadable (bool, mode='OF'){
    if(mode==='OF') return bool?'ON':'OFF'
    if(mode==='OFL') return bool?'On':'Off'
    if(mode==='ED') return bool?'ENABLED':'DISABLED'
    if(mode==='EDL') return bool?'Enabled':'Disabled'
    if(mode==='UL') return bool?'Unlocked':'Locked'
}
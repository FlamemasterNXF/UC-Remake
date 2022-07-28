function getTotalCircleProgress(){
    let total = D(0)
    for(let i=0; i<data.circleProg.length;i++){
        total = total.plus(data.circleProg[i].times(i+1))
    }
    return(total)
}
function getTotalCycleLevels(){
    let total = D(0)
    for(let i=1; i<10; i++){
        total = total.plus(data.cycleLevels[i])
    }
    return total
}
const c = () => getTotalCircleProgress()
const l = () => getTotalCycleLevels()

const CYCLES = {
    names: [...Array(10).keys()].slice(1),
    effectDescriptions: [
        "D1 is boosted while the Lost Derivative is active based on Circle progress, but this Cycles’s effect is divided based on Ancient Particles",
        "The second Dream Particle Effect is boosted based on Circle Progress and bought D1s while the Lost Derivative is active",
        "The Theory of Multiplication is boosted based on Circle Progress and Dream Particles",
        "D4 is boosted based on Circle Progress and Ancient Particles",
        "The first Dream Particle Effect is boosted based on Circle Progress but divide the effect of Cycle 6",
        "The third Dream Particle Effect is boosted based on Circle Progress but divide the effect of Cycle 5",
        "Lost Cycle 1 is boosted based on Circle Progress",
        "Dream Particle production is multiplied based on Circle Progress and bought D1s but this Cycles’s effect is divided by bought D4s",
        "The Derivative Particle Effect is multiplied based on Circle Progress and Dream Particles but this Cycle's effect is divided by Lost Cycle 2 levels"
    ],
    1: {
        active(){ return data.inLost || BREAKPOINTS[2].enabled },
        nerf(){ if(this.active()){ return data.oddities.gte(10)?(data.particles[0].log10()):D(1) } else { return D(1) } },
        effect(){ if (this.active() && data.cycleLevels[0].gte(1)){ return (c().log2().sqrt()).plus(data.cycleLevels[0]).sub(this.nerf()).clampMin(1) } else { return D(1) } },
        cost(){return D(5e4).times(data.cycleLevels[0].plus(data.cycleLevels[0].div(10).plus(1)))},
        desc(){return `Current Multiplier: ${format(this.effect())}x\nCurrent Nerf: -${format(this.nerf())}`},
        level: D(0)
    },
    2: {
        active(){ return data.inLost },
        effect(){ if (this.active() && data.cycleLevels[1].gte(1)){ return (c().log2().sqrt()).plus((data.cycleLevels[1])).plus(data.derivs[0].b).clampMin(1) } else { return D(1) } },
        cost(){return D(5e4).times(data.cycleLevels[1].plus(data.cycleLevels[0].div(10).plus(1))) },
        desc(){return `Current Multiplier: ${format(this.effect())}x`},
        level: D(0)
    },
    3: {
        effect(){ if(data.cycleLevels[2].gte(1)){ return (c().log2().sqrt()).plus(data.particles[2].sqrt().log10()).sqrt().plus((data.cycleLevels[2])).clampMin(1) } else { return D(1) } },
        cost(){return D(1e5).times(data.cycleLevels[2].plus(data.cycleLevels[0].div(10).plus(1))) },
        desc(){return `Current Boost: +${format(this.effect())}`},
        level: D(0)
    },
    4: {
        effect(){ if(data.cycleLevels[3].gte(1)){ return (c().log2().sqrt()).plus(data.particles[0].sqrt()).sqrt().log2().plus((data.cycleLevels[3])) } else { return D(1) } },
        cost(){return D(1e5).times(data.cycleLevels[3].plus(data.cycleLevels[0].div(10).plus(1))) },
        desc(){return `Current Multiplier: ${format(this.effect())}x`},
        level: D(0)
    },
    5: {
        nerf(){ if(data.cycleLevels[4].gte(1)){ return (data.cycleLevels[4].div(10).plus(1)).div(theoryEffects[16]) } else { return D(1) } },
        effect(){ if(data.cycleLevels[4].gte(1)){ return (c().sqrt()).plus((data.cycleLevels[4])).div(2).times(theoryEffects[17]).div(CYCLES[6].nerf()).div(CYCLES[1].nerf()).clampMin(1) } else { return D(1) } },
        cost(){return D(1e5).times(data.cycleLevels[4].plus(data.cycleLevels[0].div(10).plus(1))) },
        desc(){return `Current Multiplier: ${format(this.effect())}x\nCurrent Nerf: /${format(CYCLES[6].nerf())}`},
        level: D(0)
    },
    6: {
        nerf(){ if(data.cycleLevels[5].gte(1)){ return (data.cycleLevels[5].div(10).plus(1)).div(theoryEffects[16]) } else { return D(1) } },
        effect(){ if(data.cycleLevels[5].gte(1)){ return (c().sqrt()).plus((data.cycleLevels[5])).div(2).times(theoryEffects[17]).div(CYCLES[5].nerf()).div(CYCLES[1].nerf()).clampMin(1) } else { return D(1) } },
        cost(){return D(1e5).times(data.cycleLevels[5].plus(data.cycleLevels[0].div(10).plus(1))) },
        desc(){return `Current Multiplier: ${format(this.effect())}x\nCurrent Nerf: /${format(CYCLES[5].nerf())}`},
        level: D(0)
    },
    7: {
        effect(){ if(data.cycleLevels[6].gte(1)){ return (c().log2().sqrt()).plus(data.lostCycleLevels[1].sqrt()).plus((data.cycleLevels[6])).clampMin(1) } else { return D(1) } },
        cost(){return D(1e5).times(data.cycleLevels[6].plus(data.cycleLevels[0].div(10).plus(1))) },
        desc(){return `Current Multiplier: ${format(this.effect())}x`},
        level: D(0)
    },
    8: {
        nerf(){ if(data.derivs[3].b.gte(1)){ return data.derivs[3].b } else { return D(1) } },
        effect(){ if(data.cycleLevels[7].gte(1)){ return ((c().log2().sqrt()).plus(data.derivs[0].b)).sqrt().plus((data.cycleLevels[7])).sub(this.nerf()).clampMin(1) } else { return D(1) } },
        cost(){return D(1e5).times(data.cycleLevels[7].plus(data.cycleLevels[0].div(10).plus(1))) },
        desc(){return `Current Multiplier: ${format(this.effect())}x\nCurrent Nerf: -${format(this.nerf())}`},
        level: D(0)
    },
    9: {
        nerf(){ if(data.derivs[1].b.gte(1)){ return data.lostCycleLevels[1] } else { return D(1) } },
        effect(){ if(data.cycleLevels[8].gte(1)){ return ((c().log2().sqrt()).plus(data.particles[2].sqrt())).sqrt().div(10).plus((data.cycleLevels[8])).sub(this.nerf()).clampMin(1) } else { return D(1) } },
        cost(){return D(1e5).times(data.cycleLevels[8].plus(data.cycleLevels[0].div(10).plus(1))) },
        desc(){return `Current Multiplier: ${format(this.effect())}x\nCurrent Nerf: -${format(this.nerf())}`},
        level: D(0)
    },
}
const BREAKPOINTS = {
    names: [...Array(5).keys()].slice(1),
    effectDescriptions: [
        "Circle Progress Speed is boosted based on Derivative Particles but divide Dream Particle production based on this Breakpoint’s effect",
        "Cycle 1 is active outside of the Lost Derivative but divide Cycle 5 and Cycle 6 based on Cycle 1’s effect",
        "Circle Progress and Total Cycle levels boost The Theory of Lost Derivatives but The Theory of Multiplication is divided based on its effect",
        "Bought D3s are factored into The Theory of Peak Synergy’s first effect, but divide the production of Dream Particles and Derivative Particles based on Circle Progress and total Cycle levels"
    ],
    1: {
        cost: D(1e30),
        unlocked: false,
        enabled: false,
        nerf(){ if(data.breakpointsEnabled[0]){ return this.effect().pow(3) } else { return D(1) } },
        effect() { if(data.breakpointsEnabled[0]){ return data.particles[1].log10().log2() } else { return D(1) } }
    },
    2: {
        cost: D(1e50),
        unlocked: false,
        enabled: false,
        nerf(){ if(data.breakpointsEnabled[1]){ return CYCLES[1].effect().div(3) } else { return D(1) } },
        effect() { if(data.breakpointsEnabled[1]){ return D(1)} }
    },
    3: {
        cost: D(1e60),
        unlocked: false,
        enabled: false,
        nerf(){ if(data.breakpointsEnabled[2]){ return this.effect().log2() } else { return D(1) } },
        effect() { if(data.breakpointsEnabled[2]){ return l().sqrt().plus(c().log2()) } else { return D(1) } }
    },
    4: {
        cost: D(1),
        available(){ return SECRETS[4].unlocked() },
        unlocked: false,
        enabled: false,
        nerf(){ if(data.breakpointsEnabled[3]){ return l().div(2).plus(c().div(2)) } else { return D(1) } },
        effect() { if(data.breakpointsEnabled[3]){ return D(1)} },
    },
}
const SECRETS = {
    names: [...Array(5).keys()].slice(1),
    descriptions: [
        "Unlock the 3rd Lost Cycle\nRequirement: Unlock Breakpoint 1",
        "Unlock a new row of Theories\nRequirement: Unlock Breakpoint 2",
        "Unlock the 4th Lost Cycle\nRequirement: Unlock Breakpoint 3",
        "Unlock a New Breakpoint\nRequirement: Reach 1e69 Oddities",
    ],
    1: {unlocked(){ return data.breakpointsUnlocked[0] }},
    2: {unlocked(){ return data.breakpointsUnlocked[1] }},
    3: {unlocked(){ return data.breakpointsUnlocked[2] }},
    4: {unlocked(){ return data.oddities.gte(1e69) }},
}

function buyCycle(i){
    if(data.particles[1].gte(CYCLES[i].cost())){
        data.particles[1] = data.particles[1].sub(CYCLES[i].cost())
        CYCLES[i].level = CYCLES[i].level.plus(1); data.cycleLevels[i-1] = data.cycleLevels[i-1].plus(1)
    }
}
function toggleBreakPoint(i){
    if(!BREAKPOINTS[i].unlocked && data.oddities.gte(BREAKPOINTS[i].cost)){
        BREAKPOINTS[i].unlocked = true
        data.breakpointsUnlocked[i-1] = true
        data.oddities = data.oddities.sub(BREAKPOINTS[i].cost)
    }
    else{ BREAKPOINTS[i].enabled = !BREAKPOINTS[i].enabled; data.breakpointsEnabled[i-1] = !data.breakpointsEnabled[i-1] }
}
function updateCircleHTML(){
    DOM('circleDerivPDisplay').innerText = `You have ${format(data.particles[1])} Derivative Particles`
    for(let i=1;i<10;i++){
        DOM(`cycle${i}`).innerText = `Cycle ${CYCLES.names[i-1]} [${data.cycleLevels[i-1]}]\n${CYCLES[i].desc()}\nCost: ${format(CYCLES[i].cost())} Derivative Particles`
    }
    for(let i=1;i<5;i++){
        BREAKPOINTS[i].enabled = data.breakpointsEnabled[i-1]
        if(data.breakpointsUnlocked[i-1]){
            DOM(`breakpoint${i}`).innerText = data.breakpointsEnabled[i-1]?`Breakpoint ${BREAKPOINTS.names[i-1]} [ENABLED]\nCurrent effect: ${format(BREAKPOINTS[i].effect())}x\nCurrent Nerf: /${format(BREAKPOINTS[i].nerf())}`:`Breakpoint ${BREAKPOINTS.names[i-1]} [DISABLED]`
        }
        else { DOM(`breakpoint${i}`).innerText = `Breakpoint ${BREAKPOINTS.names[i-1]} [LOCKED]\nUnlock Cost: ${format(BREAKPOINTS[i].cost)}` }
    }
    for(let i=1;i<5;i++){
        data.hasSecret[i-1] = SECRETS[i].unlocked()
        DOM(`secret${i}`).innerText = SECRETS[i].unlocked()?`${SECRETS.descriptions[i-1]}\nUnlocked!`:`${SECRETS.descriptions[i-1]}\n LOCKED`
    }
}
function updateCycleText(i){
    DOM('cycleEffectText').innerText = CYCLES.effectDescriptions[i]
}
function updateBreakpointText(i){
    DOM('breakpointEffectText').innerText = BREAKPOINTS.effectDescriptions[i]
}
function changeCirclesTab(i){
    DOM(`${i}Container`).style.display = 'flex'
    if(i!=='cycles') DOM('cyclesContainer').style.display = 'none'
    if(i!=='breakpoints') DOM('breakpointsContainer').style.display = 'none'
    if(i==='breakpoints') DOM('breakpoint4').style.display = BREAKPOINTS[4].available()?'block':'none'
    if(i!=='secrets') DOM('secretsContainer').style.display = 'none'
}
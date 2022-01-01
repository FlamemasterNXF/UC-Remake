function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min
}
function minimum(value, min){
    if (value.lt(min)) value = D(min)
    return value
}
function maximum(value, max){
    if (value.gt(max)) value = D(max)
    return value
}
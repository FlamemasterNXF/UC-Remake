const OFFLINE = {
    active(){ return data.offline.time > 1 },
    boost: this.active?data.offline.time+1:1
}
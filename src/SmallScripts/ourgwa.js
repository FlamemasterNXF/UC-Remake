function sound(src) {
    //what is this its all from w3 schools help
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
let china
let ourgwatriggered = false
function ourgwatrigger(){
    china = new sound("src/Internal/Red_Sun_in_the_Sky.mp3");
    china.play()
    ourgwatriggered = true
}
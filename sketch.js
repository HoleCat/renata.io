var song;
var sliderVolume;
var sliderRate;
var sliderPan;
var buttonPlay;
var buttonJump;
var amp;
var volumenHistory = [];
function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
    soundFormats('mp3', 'ogg');
    song = loadSound("librerias/noelia.mp3", loaded);

    amp = new p5.Amplitude();

    sliderRate = createSlider(0, 1.5, 1, 0.01);
    sliderPan = createSlider(-1, 1, 0.5, 0.01);
    
    song.setVolume(1);
}

function loaded() {

    buttonPlay = createButton("play");
    buttonPlay.mousePressed(togglePlaying);

    buttonJump = createButton("jump");
    buttonJump.mousePressed(jumpSong);

    console.log("loaded");

}

function togglePlaying() {
    if(song.isPlaying()){
        buttonPlay.html("play");
        song.pause();
    } else {
        buttonPlay.html("pause");
        song.play();
    }
}

function jumpSong() {
    var duracion = song.duration();
    var ran = random(duracion);
    console.log(ran);
    song.jump(ran);
}

function draw() {

    background(song.currentTime()*17, 0, 0);

    var vol = amp.getLevel();
    volumenHistory.push(vol);
    //var diam = map(vol, 0, 0.3, 10, 200);
    stroke(255);
    noFill();

    translate(width/2,height/2);

    beginShape();
    for(var i = 0; i< 360; i++){
        var r = map(volumenHistory[i]*17,0,1,100,120);
        var x = r * cos(i);
        var y = r * sin(i);
        vertex(x, y);
    }
    endShape();

    if(volumenHistory.length > 360) {
        volumenHistory.splice(0, 1);
    }

    //stroke(255,0,0);
    //line(volumenHistory.length, 0, volumenHistory.length, height);
    //fill(255, 0,255);
    //ellipse(width / 2, height / 2, diam, diam);

    song.rate(sliderRate.value());
    song.pan(sliderPan.value());
}
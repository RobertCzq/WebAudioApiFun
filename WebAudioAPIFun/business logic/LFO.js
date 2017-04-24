
var audio_context = window.AudioContext || window.webkitAudioContext;

var con = new audio_context();

var osc = con.createOscillator();
var lfo = con.createOscillator();

var lfo_amp = con.createGain();
lfo_amp.gain.value = 200;

osc.frequency.value = 300;
lfo.frequency.value = 15;
    
lfo.connect(lfo_amp);
lfo_amp.connect(osc.frequency);
osc.connect(con.destination);

osc.start();
lfo.start();


function SetNote (key)
{
    switch(key) {
        case "z":
            osc.frequency.value = 261.63;
            break;
        case "x":
            osc.frequency.value = 293.66;
            break;
        case "c":
            osc.frequency.value = 329.63;
            break;
        case "v":
            osc.frequency.value = 349.23;
            break;
            
    }
}


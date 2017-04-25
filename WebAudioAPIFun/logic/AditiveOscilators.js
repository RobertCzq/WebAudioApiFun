var audio_context = window.AudioContext || window.webkitAudioContext;

var con = new audio_context();

// this time, we create two oscillators
var osc = con.createOscillator();
var lfo = con.createOscillator();

// lfo_amp is not an oscillator - it is a 'gain node'
var lfo_amp = con.createGain();


var osc1, lfo1, amp1;
nx.onload = function()
{
nx.colorize("#26A8E7");
    //Set values to dial value at start of program
    lfo_amp.gain.value = osc1.value;
    osc.frequency.value = lfo1.value;
    lfo.frequency.value = amp1.value;
    osc1.on('*', SetOscFrequency); 
    lfo1.on('*', SetLfoFrequency);
    amp1.on('*', SetLfo_ampGain);
};

function SetOscFrequency(data)
{
    osc.frequency.value = data.value;
}

function SetLfoFrequency(data)
{
    lfo.frequency.value = data.value;
}

function SetLfo_ampGain(data)
{
    lfo_amp.gain.value = data.value;
}


// now for the wiring 
// ...
// connect the lfo oscillator 
// to the gain node, so it is boosted
// from the range -1 to 1 to -200 to 200
lfo.connect(lfo_amp);
// connect the gain node into the frequency 
// control for the main oscillator
lfo_amp.connect(osc.frequency);
// connect the main osciilator to the audio out
osc.connect(con.destination);


osc.start();
lfo.start();

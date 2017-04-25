var audio_context = window.AudioContext || window.webkitAudioContext;
var con = new audio_context();
var keyboard, decay, amplification, decaySeconds, gainValue ;

nx.onload = function()
{
    nx.colorize("#26A8E7");
    decaySeconds = decay.value;
    gainValue = amplification.value;
    keyboard.on('*', KeyboardChanged); 
    decay.on('*', SetDecayValue);
    amplification.on('*', SetGainValue);
};

function SetGainValue(data)
{
    gainValue = data.value;
}

function SetDecayValue(data)
{
    decaySeconds = parseFloat(data.value);
}

function KeyboardChanged(data)
{ 
    if (data.on !== 0)
    {
        var osc = con.createOscillator();
        var amp = con.createGain();
        osc.frequency.value = nx.mtof(data.note);
        osc.connect(amp);
        osc.type = 'sine';
        amp.connect(con.destination);
        amp.gain.value = gainValue;
        amp.gain.linearRampToValueAtTime(0, con.currentTime + decaySeconds);
        osc.start();
        osc.stop(con.currentTime + decaySeconds + 0.1);
    }
}

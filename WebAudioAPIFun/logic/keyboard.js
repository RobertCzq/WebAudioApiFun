var audio_context = window.AudioContext || window.webkitAudioContext;
var con = new audio_context();
var keyboard; 

nx.onload = function()
{
 
    keyboard.on('*', playSynth); 

};


function playSynth(data){
    // it is all done with two unit generators or modules
    // an oscillator
    var osc = con.createOscillator();
    // and a gain node
    var amp = con.createGain();
    
    osc.frequency.value = nx.mtof(data.note);
    
    // connect the oscillator into the gain node
    osc.connect(amp);
  
    // now we set up the behaviour of the gain 
    // node into the future
    // - the time now
    var now = con.currentTime;
    // - start with gain at 0
    amp.gain.value = 0;
    // - in 2 seconds, gain up to 0.1
    amp.gain.linearRampToValueAtTime(0.1, now + 2);
    // - in 4 seconds, gain back down to zero
    amp.gain.linearRampToValueAtTime(0, now + 4);
    
    // use a sine oscillator
    // we can also use other types:
    // https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/type
    
    osc.type = 'sine';
    
    // connect the oscillator to the audio out
    amp.connect(con.destination);
    // start it
    osc.start();
    // finally, switch off the oscillator in 4.1 seconds time
    // when the gain is back down to zero. 
    osc.stop(now + 4.1);
    
}



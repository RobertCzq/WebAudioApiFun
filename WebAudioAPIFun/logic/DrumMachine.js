
var audio_context = window.AudioContext || window.webkitAudioContext;
var con = new audio_context();
var drum1, drum2, drum3;


// this variable stores the drum pattern
var seq = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];


var step = 0;
var interval = 0.125;

var matrix, volume1, volume2, volume3, volume1Value, volume2Value, volume3Value;

// tell nexus ui what to do when it is ready
nx.onload = function () {
    // set the matrix widget number of columns to
    // the same as the length of the first sequence
    matrix.col = seq[0].length;
    // set the number of rows to the number of rows in
    // the seq variable
    matrix.row = seq.length;
    matrix.init();

    // tell it what to do when the matrix changes
    matrix.on('*', function (data) {
        if (data.row !== undefined) {
            seq[data.row][data.col] = data.level;
        }

    });

    volume1.on('*', SetVolume1Value);
    volume2.on('*', SetVolume2Value);
    volume3.on('*', SetVolume3Value);


};

function SetVolume1Value(data) {
    volume1Value = data.value;
}
function SetVolume2Value(data) {
    volume2Value = data.value;
}
function SetVolume3Value(data) {
    volume3Value = data.value;
}



loadSample('/samples/001_drum2.wav', function (buffer) {
    drum1 = buffer;
});
loadSample('/samples/000_drum1.wav', function (buffer) {
    drum2 = buffer;
});

loadSample('/samples/002_drum3.wav', function (buffer) {
    drum3 = buffer;
});



function playSound(buffer, time, volume) {
    var player = con.createBufferSource();
    var amp = con.createGain();
    player.buffer = buffer;
    player.loop = false;
    amp.gain.value = volume;
    player.connect(amp);
    amp.connect(con.destination);
    player.start(time);
}


// this code will wake up every (wait_time) ms
// and schedule a load of drum triggers on the clock
// each time, remembering where it scheduled to in the future
// so it does not repeat anything
var wait_time = 0.5;
var got_up_to;

setInterval(function () {
    var now = con.currentTime;
    // how far into the future will we schedule?
    // we schedule beyond the next wait time as we cannot
    // rely on it being exactly 'wait_time' ms before
    // we get woken up again, therefore put in a few
    // extra events on the scheduler to cover any delays
    var max_future_time = now + (wait_time * 1.5);
    if (got_up_to > now) {// already scheduled up to this point
        now = got_up_to;
    }

    while (now <= max_future_time) {
        step++;
        if (seq[0][step % seq[0].length]) {
            playSound(drum1, now, volume1Value);
        }
        if (seq[1][step % seq[1].length]) {
            playSound(drum2, now, volume2Value);
        }
        if (seq[2][step % seq[2].length]) {
            playSound(drum3, now, volume3Value);
        }


        now += interval;
    }
    got_up_to = now;

}, wait_time * 1000);



function loadSample(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        var audioData = request.response;
        con.decodeAudioData(audioData, function (buffer) {
            console.log(buffer);
            callback(buffer);
        });
    };
    request.send();
}


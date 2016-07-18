/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH=500;
var HEIGHT=50;
var rafID = null;

window.onload = function() {

    // grab our canvas
	canvasContext = document.getElementById( "meter" ).getContext("2d");
	
    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia = 
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

}


function didntGetStream() {
    alert('Stream generation failed.');
}

var mediaStreamSource = null;

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    // kick off the visual updating
    drawLoop();
}

function drawLoop( time ) {
    // clear the background
    canvasContext.clearRect(0,0,1100,550);

    // check if we're currently clipping
    // if (meter.checkClipping())
    //     canvasContext.fillStyle = "red";
    // else
    //     canvasContext.fillStyle = "green";

    // draw a bar based on the current volume
    canvasContext.fillStyle = "green"
    canvasContext.fillRect(0, 0, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "yellow"
    canvasContext.fillRect(0, 50, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "orange"
    canvasContext.fillRect(0,100, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "purple"
    canvasContext.fillRect(0, 150, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "blue"
    canvasContext.fillRect(0, 200, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "pink"
    canvasContext.fillRect(0, 250, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "red"
    canvasContext.fillRect(0, 300, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "lightgreen"
    canvasContext.fillRect(0, 350, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "lightblue"
    canvasContext.fillRect(0, 400, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "brown"
    canvasContext.fillRect(0, 450, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "lightyellow"
    canvasContext.fillRect(0, 500, meter.volume*WIDTH*5, HEIGHT);

       // draw a bar based on the current volume
    canvasContext.fillStyle = "green"
    canvasContext.fillRect(500, 0, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "yellow"
    canvasContext.fillRect(500, 50, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "orange"
    canvasContext.fillRect(500,100, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "purple"
    canvasContext.fillRect(500, 150, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "blue"
    canvasContext.fillRect(500, 200, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "pink"
    canvasContext.fillRect(500, 250, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "red"
    canvasContext.fillRect(500, 300, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "lightgreen"
    canvasContext.fillRect(500, 350, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "lightblue"
    canvasContext.fillRect(500, 400, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "brown"
    canvasContext.fillRect(500, 450, meter.volume*WIDTH*5, HEIGHT);
    canvasContext.fillStyle = "lightyellow"
    canvasContext.fillRect(500, 500, meter.volume*WIDTH*5, HEIGHT);

  var input=meter.volume;
  document.body.style.backgroundColor = "rgb(" +  Math.floor(input*255)+ "," + Math.floor(input*255) + "," + Math.floor(input*255) + ")";
    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );
}

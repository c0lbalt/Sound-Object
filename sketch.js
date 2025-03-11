let basicSynth;
let filt;
let LFOfilt;
let panner;

let fmSynth;
let values;

let noise1;
let noiseEnv;
let filt1;
let values1;

let gif;
let showgif = false;

function setup() {
  createCanvas(400, 400);

  gif = loadImage("assets/spaceship_engine_starting.gif");

  panner = new Tone.AutoPanner({
    frequency: 0.5,
    depth: 0.3,
  }).toDestination().start()

  filt = new Tone.Filter(400, "lowpass", -24).connect(panner);
  basicSynth = new Tone.Synth().connect(filt);
  LFOfilt = new Tone.LFO(0.1, 300, 1500).start();
  LFOfilt.connect(filt.frequency);

  fmSynth = new Tone.FMSynth({
    harmonicity: 2,
    modulationIndex: 10,
    oscillator: {
      type: "sine"
    },
    envelope: {
      attack: 0.2,
      decay: 0.3,
      sustain: 0.8,
      release: 1.5
    },
    modulation: {
      type: "sine"
    },
    modulationEnvelope: {
      attack: 0.8,
      decay: 0.1,
      sustain: 0.9,
      release: 1.5
    }
  }).toDestination();
  values = new Float32Array([2, 3, 4, 5, 6, 7, 8]);

  filt1 = new Tone.AutoFilter({
    frequency: 0.2,
    depth: 0.4,
    baseFrequency: 300,
    octaves: 3,
  }).toDestination().start();

  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.3,
    decay: 0.4,
    sustain: 0.6,
    release: 1.5,
  }).connect(filt1);

  noise1 = new Tone.Noise({
    type: "pink"
  }).connect(noiseEnv).start();
  
  values1 = new Float32Array([-30, -25, -20, -15, -12, -15, -20, -25, -30]);
}

function draw() {
  background(220);

  if (showgif) {
    image(gif, 0, 0, width, height);
  }
}

function mouseClicked(){
  basicSynth.triggerAttackRelease(random(150, 250), 3);
  basicSynth.frequency.rampTo(random(600, 900), 3);
  LFOfilt.frequency.value = random(1, 4);
  LFOfilt.frequency.rampTo(random(20, 40), 3);

  showgif = !showgif;

  fmSynth.harmonicity.value = 2;
  fmSynth.triggerAttackRelease(random(150, 250), 5);
  fmSynth.harmonicity.setValueAtTime(random(2, 4), Tone.now() + 2.5);
  fmSynth.harmonicity.setValueCurveAtTime(values, Tone.now(), 10);
}

function keyPressed(){
  if(key == 'a'){
    noiseEnv.triggerAttackRelease(30);
    noise1.volume.setValueCurveAtTime(values1, Tone.now(), 30);
    console.log("testing")
  }
}
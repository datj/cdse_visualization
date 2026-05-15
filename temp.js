//VERSION=3
const factor = 1 / 100; // EDIT FACTOR
const offset = 273.15; // EDIT OFFSET

function setup() {
  return {
    // EDIT VARIABLE NAME
    input: ["LST", "dataMask"],
    output: [
      { id: "default", bands: 4, sampleType: "UINT8" },
      { id: "index", bands: 1, sampleType: "FLOAT32" },
      { id: "eobrowserStats", bands: 1, sampleType: "FLOAT32" },
      { id: "dataMask", bands: 1 },
    ],
  };
}

function evaluatePixel(samples) {
  // EDIT VARIABLE NAME
  var originalValue = samples.LST;

  let val = originalValue * factor - offset;

  let dataMask = samples.dataMask;

  const indexVal = dataMask === 1 ? val : NaN;
  const imgVals = visualizer.process(val);

  return {
    default: imgVals.concat(dataMask * 255),
    index: [indexVal],
    eobrowserStats: [val],
    dataMask: [dataMask],
  };
}

// EDIT COLOR BAR
const ColorBar = [
  [-306.3, [0, 0, 4]],
  [-296.3, [27, 12, 65]],
  [-286.3, [76, 12, 107]],
  [-276.3, [120, 28, 109]],
  [-266.3, [165, 45, 96]],
  [-256.3, [206, 68, 70]],
  [-246.3, [237, 105, 37]],
  [-236.3, [251, 154, 7]],
  [-226.3, [247, 208, 60]],
  [-216.3, [252, 255, 164]],
];
const visualizer = new ColorRampVisualizer(ColorBar);


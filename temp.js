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
  [-306.3, [250, 235, 231]],
  [-296.3, [252, 198, 187]],
  [-286.3, [250, 161, 143]],
  [-276.3, [248, 124, 99]],
  [-266.3, [236, 112, 151]],
  [-256.3, [231, 76, 60]],
  [-246.3, [203, 67, 53]],
  [-236.3, [120, 40, 31]],
  [-226.3, [93, 31, 24]],
  [-216.3, [57, 19, 3]]
];
const visualizer = new ColorRampVisualizer(ColorBar);


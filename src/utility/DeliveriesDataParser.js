import DataHelper from './DataHelper'

// Function to parse Deliveries.csv
const parseDeliveriesData = function (rawData) {
  let returnDataObject = {
    superOverMaxRuns: 0,
    mostSixBarChartData: {
      rows: []
    },
    wicketDistributionChartData: {
      rows: []
    },
    maxCatchesPlayer: {name: '', val: 0},
    maxRunoutsPlayer: {name: '', val: 0},
    maxRunsPlayer: {name: '', val: 0}
  }
  let superOverMatches = {}
  let sixesData = {}
  let wicketsData = {}
  let catchesData = {}
  let runOutData = {}
  let runsData = {}
  // Parse each line of data
  let dataLines = rawData.split('\n')
  dataLines.shift()
  dataLines.pop()
  for (let i = 0; i < dataLines.length; i++) {
    let currentRowArr = dataLines[i].split(',')
    // Increment number of sixes for each player that has hit a six
    if (currentRowArr[15] === '6') {
      DataHelper.UpcrementValueInObj(currentRowArr[6], 1, sixesData)
    }
    // Increment number of wickets for each player that has taken a wicket
    if (currentRowArr[18] !== '' && DataHelper.ValidDismissal(currentRowArr[19])) {
      DataHelper.UpcrementValueInObj(currentRowArr[8], 1, wicketsData)
    }
    // Increment total number of runs in super over for each match
    if (currentRowArr[9] === '1') {
      DataHelper.UpcrementValueInObj(currentRowArr[0], +(currentRowArr[17]), superOverMatches)
    }
    // Increment catches count
    if (currentRowArr[19] === 'caught') {
      DataHelper.UpcrementValueInObj(currentRowArr[20], 1, catchesData)
    }
    // Increment runouts count
    if (currentRowArr[19] === 'run out') {
      DataHelper.UpcrementValueInObj(currentRowArr[20], 1, runOutData)
    }
    // Increment batsman runs
    DataHelper.UpcrementValueInObj(currentRowArr[6], +(currentRowArr[15]), runsData)
  }
  // Update max super over runs in returnDataObject
  returnDataObject.superOverMaxRuns = DataHelper.findObjKeyWithMaxValue(superOverMatches).maxVal
  // Parse the aggregated sixesData and form data object for google chart.
  Object.getOwnPropertyNames(sixesData).map(function (eachKey, idx) {
    returnDataObject.mostSixBarChartData.rows = DataHelper.InsertNestedArrInTopTen([eachKey, sixesData[eachKey]], returnDataObject.mostSixBarChartData.rows)
  })
  // Parse the aggregated wicketsData and form data object for google chart.
  Object.getOwnPropertyNames(wicketsData).map(function (eachKey, idx) {
    returnDataObject.wicketDistributionChartData.rows = DataHelper.InsertNestedArrInTopTen([eachKey, wicketsData[eachKey]], returnDataObject.wicketDistributionChartData.rows)
  })
  // Update max catches data in returnDataObject
  let maxCatchesPlayerData = DataHelper.findObjKeyWithMaxValue(catchesData)
  returnDataObject.maxCatchesPlayer.name = maxCatchesPlayerData.keyNameWithMax
  returnDataObject.maxCatchesPlayer.val = maxCatchesPlayerData.maxVal
  // Update max runouts data in returnDataObject
  let maxRunoutsPlayerData = DataHelper.findObjKeyWithMaxValue(runOutData)
  returnDataObject.maxRunoutsPlayer.name = maxRunoutsPlayerData.keyNameWithMax
  returnDataObject.maxRunoutsPlayer.val = maxRunoutsPlayerData.maxVal
  // Update max runs data in returnDataObject
  let maxRunsPlayerData = DataHelper.findObjKeyWithMaxValue(runsData)
  returnDataObject.maxRunsPlayer.name = maxRunsPlayerData.keyNameWithMax
  returnDataObject.maxRunsPlayer.val = maxRunsPlayerData.maxVal
  return returnDataObject
}

export default {parseDeliveriesData}

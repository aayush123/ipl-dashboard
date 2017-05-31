// Function to parse Matches.csv data.
const parseMatchesData = function (rawData) {
  let returnDataObject = {
    mostVictoriousTeam: '',
    tossBattingWinProb: 0,  //  done
    tossFieldingWinProb: 0, //  done
    superOverMatchCount: 0, //  done
    mostPlayedAtVenue: '',
    mostConsistentPlayerOfMatch: ''
  }
  let victoryCountObj = {}
  let matchInVenueCountObj = {}
  let playerOfMatchCountObj = {}
  let tossProbObj = {
    batFirstWinCount: 0,
    fieldFirstWinCount: 0,
    totalMatches: 0
  }
  let dataLines = rawData.split('\n')
  dataLines.shift()
  dataLines.pop()
  for (let i = 0; i < dataLines.length; i++) {
    let currentRowArr = dataLines[i].split(',')
    UpcrementValueInObj(currentRowArr[14], 1, matchInVenueCountObj)
    if (currentRowArr[8] === 'no result') {
      continue
    }
    UpcrementValueInObj(currentRowArr[13], 1, playerOfMatchCountObj)
    UpcrementValueInObj(currentRowArr[10], 1, victoryCountObj)
    tossProbObj.totalMatches++
    if (currentRowArr[6] === currentRowArr[10]) {
      if (currentRowArr[7] === 'bat') {
        tossProbObj.batFirstWinCount++
      } else {
        tossProbObj.fieldFirstWinCount++
      }
    }
    if (currentRowArr[8] === 'tie') {
      returnDataObject.superOverMatchCount++
    }
  }
  returnDataObject.tossBattingWinProb = tossProbObj.batFirstWinCount / tossProbObj.totalMatches
  returnDataObject.tossFieldingWinProb = tossProbObj.fieldFirstWinCount / tossProbObj.totalMatches
  returnDataObject.mostVictoriousTeam = findObjKeyWithMaxValue(victoryCountObj).keyNameWithMax
  returnDataObject.mostPlayedAtVenue = findObjKeyWithMaxValue(matchInVenueCountObj).keyNameWithMax
  returnDataObject.mostConsistentPlayerOfMatch = findObjKeyWithMaxValue(playerOfMatchCountObj).keyNameWithMax
  return returnDataObject
}

// Function to parse Deliveries.csv
const parseDeliveriesData = function (rawData) {
  let returnDataObject = {
    superOverMaxRuns: 0,
    // winLossStackChartData: {},
    mostSixBarChartData: {
      columns: [
        {
          'type': 'string',
          'label': 'Player'
        },
        {
          'type': 'number',
          'label': 'Number of Sixes'
        }
      ],
      rows: [],
      options: {
        title: 'Number of Sixes per Player'
      }
    },
    wicketDistributionPieChartData: {
      columns: [
        {
          'type': 'string',
          'label': 'Player'
        },
        {
          'type': 'number',
          'label': 'Number of Wickets'
        }
      ],
      rows: [],
      options: {
        title: 'Number of Wickets per Player'
      }
    }
  }
  // let stackChartData = []
  let superOverMatches = {}
  let sixesData = {}
  let wicketsData = {}

  // Parse each line of data
  let dataLines = rawData.split('\n')
  dataLines.shift()
  dataLines.pop()
  for (let i = 0; i < dataLines.length; i++) {
    let currentRowArr = dataLines[i].split(',')
    // Increment number of sixes for each player that has hit a six
    if (currentRowArr[15] === '6') {
      UpcrementValueInObj(currentRowArr[6], 1, sixesData)
    }
    // Increment number of wickets for each player that has taken a wicket
    if (currentRowArr[18] !== '' && ValidDismissal(currentRowArr[19])) {
      UpcrementValueInObj(currentRowArr[8], 1, wicketsData)
    }
    // Increment total number of runs in super over for each match
    if (currentRowArr[9] === '1') {
      UpcrementValueInObj(currentRowArr[0], +(currentRowArr[17]), superOverMatches)
    }
  }
  // Update max super over runs in returnDataObject
  returnDataObject.superOverMaxRuns = findObjKeyWithMaxValue(superOverMatches).maxVal
  // Parse the aggregated sixesData and form data object for google chart.
  // Logic returns array which is disorderd. check values...
  Object.getOwnPropertyNames(sixesData).map(function (eachKey, idx) {
    InsertNestedArrInTopTen([eachKey, sixesData[eachKey]], returnDataObject.mostSixBarChartData.rows)
  })
  // Parse the aggregated wicketsData and form data object for google chart.
  Object.getOwnPropertyNames(wicketsData).map(function (eachKey, idx) {
    InsertNestedArrInTopTen([eachKey, wicketsData[eachKey]], returnDataObject.wicketDistributionPieChartData.rows)
  })
  return returnDataObject
}

// Helper Functions
// Function to check if value belongs in top 10 and then insert only
function InsertNestedArrInTopTen (nestedArray, parentArray) {
  if (parentArray.length === 10 && nestedArray[1] > parentArray[parentArray.length - 1][1]) {
    let lesserValueArray = []
    while (nestedArray[1] > parentArray[parentArray.length - 1][1]) {
      lesserValueArray.push(parentArray.pop())
      if (parentArray.length === 0) {
        break
      }
    }
    parentArray.push(nestedArray)
    while (parentArray.length !== 10) {
      parentArray.push(lesserValueArray.shift())
    }
  } else if (parentArray.length < 10) {
    parentArray.push(nestedArray)
  }
}
// Function to check dismissal type
function ValidDismissal (dismissalType) {
  let validDismissalTypes = ['bowled', 'caught', 'caught and bowled', 'lbw', 'stumped']
  for (let idx in validDismissalTypes) {
    if (dismissalType === validDismissalTypes[idx]) {
      return true
    }
  }
  return false
}

// Function to increment or insert key's value in an object
function UpcrementValueInObj (value, incrementBy, object) {
  if (value in object) {
    object[value] += incrementBy
  } else {
    object[value] = incrementBy
  }
}

// Function to find the key with max value in Object
function findObjKeyWithMaxValue (object) {
  let keyNameWithMax = ''
  let maxVal = -1
  Object.getOwnPropertyNames(object).map(function (eachKey, index) {
    if (object[eachKey] > maxVal) {
      maxVal = object[eachKey]
      keyNameWithMax = eachKey
    }
  })
  return {keyNameWithMax, maxVal}
}

const DataHelper = { parseMatchesData, parseDeliveriesData }
export default DataHelper

// Function to parse Matches.csv data.
const parseMatchesData = function (rawData) {
  let returnDataObject = {
    seasonWiseTeamChartRows: {},
    teamWinLossGraphData: {
      rows: []
    },
    mostVictoriousTeam: '',
    tossBattingWinProb: 0,
    tossFieldingWinProb: 0,
    superOverMatchCount: 0,
    mostPlayedAtVenue: '',
    mostConsistentPlayerOfMatch: ''
  }
  let seasonWiseTeamPerformance = {}
  let lossCountObj = {}
  let victoryCountObj = {}
  let matchInVenueCountObj = {}
  let playerOfMatchCountObj = {}
  let tossProbObj = {
    batFirstWinCount: 0,
    fieldFirstWinCount: 0,
    totalMatches: 0
  }
  let dataLines = rawData.split('\n')
  // Remove Header
  dataLines.shift()
  // Remove empty last line
  dataLines.pop()
  for (let i = 0; i < dataLines.length; i++) {
    let currentRowArr = dataLines[i].split(',')
    // Increment count of matches in a venue
    UpcrementValueInObj(currentRowArr[14], 1, matchInVenueCountObj)
    // No further processing if no result of match
    if (currentRowArr[8] === 'no result') {
      continue
    }
    // Increment Player of Match count for this match's Player of Match
    UpcrementValueInObj(currentRowArr[13], 1, playerOfMatchCountObj)
    // Increment victory count of winning team
    UpcrementValueInObj(currentRowArr[10], 1, victoryCountObj)
    // Increment total matches played count
    tossProbObj.totalMatches++
    // Process toss probability if winner is same as toss winner
    if (currentRowArr[6] === currentRowArr[10]) {
      if (currentRowArr[7] === 'bat') {
        // Increment count if winner won toss and chose to bat
        tossProbObj.batFirstWinCount++
      } else {
        // Increment count if wiiner won toss and chose to field
        tossProbObj.fieldFirstWinCount++
      }
    }
    // 'tie' result signifies super over. Increment super over match count
    if (currentRowArr[8] === 'tie') {
      returnDataObject.superOverMatchCount++
    }
    // Increment loss count of losing team.
    if (currentRowArr[4] === currentRowArr[10]) {
      UpcrementValueInObj(currentRowArr[5], 1, lossCountObj)
    } else {
      UpcrementValueInObj(currentRowArr[4], 1, lossCountObj)
    }
    UpdateMatchResultForSeason(currentRowArr[1], currentRowArr[4], currentRowArr[5], currentRowArr[10], seasonWiseTeamPerformance)
  }
  returnDataObject.seasonWiseTeamChartRows = ParseSeasonWiseData(seasonWiseTeamPerformance)
  returnDataObject.tossBattingWinProb = round(tossProbObj.batFirstWinCount / tossProbObj.totalMatches, 2)
  returnDataObject.tossFieldingWinProb = round(tossProbObj.fieldFirstWinCount / tossProbObj.totalMatches, 2)
  returnDataObject.mostVictoriousTeam = findObjKeyWithMaxValue(victoryCountObj).keyNameWithMax
  returnDataObject.mostPlayedAtVenue = findObjKeyWithMaxValue(matchInVenueCountObj).keyNameWithMax
  returnDataObject.mostConsistentPlayerOfMatch = findObjKeyWithMaxValue(playerOfMatchCountObj).keyNameWithMax
  // Parse victoryCountObj and lossCountObj to form chart data
  Object.getOwnPropertyNames(victoryCountObj).map(function (eachTeamName, idx) {
    returnDataObject.teamWinLossGraphData.rows.push([eachTeamName, victoryCountObj[eachTeamName], lossCountObj[eachTeamName]])
  })
  return returnDataObject
}

// Function to parse Deliveries.csv
const parseDeliveriesData = function (rawData) {
  let returnDataObject = {
    superOverMaxRuns: 0,
    mostSixBarChartData: {
      rows: []
    },
    wicketDistributionChartData: {
      rows: []
    }
  }
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
    returnDataObject.mostSixBarChartData.rows = InsertNestedArrInTopTen([eachKey, sixesData[eachKey]], returnDataObject.mostSixBarChartData.rows)
  })
  // Parse the aggregated wicketsData and form data object for google chart.
  Object.getOwnPropertyNames(wicketsData).map(function (eachKey, idx) {
    returnDataObject.wicketDistributionChartData.rows = InsertNestedArrInTopTen([eachKey, wicketsData[eachKey]], returnDataObject.wicketDistributionChartData.rows)
  })
  return returnDataObject
}

// Helper Functions

// Function to parse aggregated season wise performance and convert it to data format for google chart.
function ParseSeasonWiseData (seasonWiseTeamPerformance) {
  let returnObj = {}
  Object.getOwnPropertyNames(seasonWiseTeamPerformance).map(function (eachTeamName, idx) {
    returnObj[eachTeamName] = []
    Object.getOwnPropertyNames(seasonWiseTeamPerformance[eachTeamName]).map(function (eachSeason, idx) {
      returnObj[eachTeamName].push([eachSeason, round(seasonWiseTeamPerformance[eachTeamName][eachSeason].wins / seasonWiseTeamPerformance[eachTeamName][eachSeason].total, 2) * 100])
    })
  })
  return returnObj
}

// Function to update match result for both participating teams in seasonWise data.
function UpdateMatchResultForSeason (season, team1, team2, winner, parentObj) {
  if (!(team1 in parentObj)) {
    parentObj[team1] = {}
  }
  if (!(team2 in parentObj)) {
    parentObj[team2] = {}
  }
  if (!(season in parentObj[team1])) {
    parentObj[team1][season] = { 'total': 0, 'wins': 0 }
  }
  if (!(season in parentObj[team2])) {
    parentObj[team2][season] = { 'total': 0, 'wins': 0 }
  }
  UpcrementValueInObj('total', 1, parentObj[team1][season])
  UpcrementValueInObj('total', 1, parentObj[team2][season])
  UpcrementValueInObj('wins', 1, parentObj[winner][season])
}

// Function to check if value belongs in top 10 and then insert only. Uses "worthy merge sort"
function InsertNestedArrInTopTen (newElem, parentArray) {
  let newArr = []
  let newElemInserted = false
  while (newArr.length !== 10 && !newElemInserted && parentArray.length > 0) {
    if (newElem[1] > parentArray[0][1]) {
      newArr.push(newElem)
      newElemInserted = true
    } else {
      newArr.push(parentArray.shift())
    }
  }
  if (newArr.length !== 10) {
    if (newElemInserted) {
      while (newArr.length < 10) {
        newArr.push(parentArray.shift())
      }
    } else {
      newArr.push(newElem)
    }
  }
  return newArr
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

function round (value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

// const DataHelper = { parseMatchesData, parseDeliveriesData }
export default { parseMatchesData, parseDeliveriesData }

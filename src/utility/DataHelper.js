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

export default {findObjKeyWithMaxValue, UpcrementValueInObj, ParseSeasonWiseData, UpdateMatchResultForSeason, InsertNestedArrInTopTen, ValidDismissal, round}

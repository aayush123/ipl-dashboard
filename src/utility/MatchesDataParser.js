import DataHelper from './DataHelper'

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
    mostConsistentPlayerOfMatch: {name: '', val: 0}
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
    DataHelper.UpcrementValueInObj(currentRowArr[14], 1, matchInVenueCountObj)
    // No further processing if no result of match
    if (currentRowArr[8] === 'no result') {
      continue
    }
    // Increment Player of Match count for this match's Player of Match
    DataHelper.UpcrementValueInObj(currentRowArr[13], 1, playerOfMatchCountObj)
    // Increment victory count of winning team
    DataHelper.UpcrementValueInObj(currentRowArr[10], 1, victoryCountObj)
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
      DataHelper.UpcrementValueInObj(currentRowArr[5], 1, lossCountObj)
    } else {
      DataHelper.UpcrementValueInObj(currentRowArr[4], 1, lossCountObj)
    }
    DataHelper.UpdateMatchResultForSeason(currentRowArr[1], currentRowArr[4], currentRowArr[5], currentRowArr[10], seasonWiseTeamPerformance)
  }
  returnDataObject.seasonWiseTeamChartRows = DataHelper.ParseSeasonWiseData(seasonWiseTeamPerformance)
  returnDataObject.tossBattingWinProb = DataHelper.round(tossProbObj.batFirstWinCount / tossProbObj.totalMatches, 2)
  returnDataObject.tossFieldingWinProb = DataHelper.round(tossProbObj.fieldFirstWinCount / tossProbObj.totalMatches, 2)
  returnDataObject.mostVictoriousTeam = DataHelper.findObjKeyWithMaxValue(victoryCountObj).keyNameWithMax
  returnDataObject.mostPlayedAtVenue = DataHelper.findObjKeyWithMaxValue(matchInVenueCountObj).keyNameWithMax
  let mostConsistentPlayerOfMatchData = DataHelper.findObjKeyWithMaxValue(playerOfMatchCountObj)
  returnDataObject.mostConsistentPlayerOfMatch = {name: mostConsistentPlayerOfMatchData.keyNameWithMax, val: mostConsistentPlayerOfMatchData.maxVal}
  // Parse victoryCountObj and lossCountObj to form chart data
  Object.getOwnPropertyNames(victoryCountObj).map(function (eachTeamName, idx) {
    returnDataObject.teamWinLossGraphData.rows.push([eachTeamName, victoryCountObj[eachTeamName], lossCountObj[eachTeamName]])
  })
  return returnDataObject
}

export default {parseMatchesData}

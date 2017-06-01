import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // Data from deliveries.csv
  superOverMaxRuns: 0,
  mostSixBarChartData: {
    type: 'ColumnChart',
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
      // title: 'Number of Sixes per Player',
      height: '400',
      vAxis: {
        title: 'Number of Sixes'
      },
      hAxis: {
        title: 'Player Name'
      },
      series: {
        0: { color: '#d67107' }
      }
    }
  },
  wicketDistributionChartData: {
    type: 'BarChart',
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
      // title: 'Number of Wickets per Player',
      height: '400',
      vAxis: {
        title: 'Player Name'
      },
      hAxis: {
        title: 'Number of Wickets'
      },
      series: {
        0: { color: '#038c80' }
      }
    }
  },

  // Data from Matches.csv
  teamWinLossGraphData: {
    type: 'ColumnChart',
    columns: [
      {
        'type': 'string',
        'label': 'Teams'
      },
      {
        'type': 'number',
        'label': 'Wins'
      },
      {
        'type': 'number',
        'label': 'Losses'
      }
    ],
    rows: [],
    options: {
      // title: 'Team Win/Loss Statistics',
      isStacked: 'true',
      height: '500',
      vAxis: {
        title: 'Count of Wins/Losses'
      },
      hAxis: {
        title: 'Team Name'
      },
      series: {
        0: { color: '#1d8804' }
      }
    }
  },
  mostVictoriousTeam: '',
  tossBattingWinProb: 0,
  tossFieldingWinProb: 0,
  superOverMatchCount: 0,
  mostPlayedAtVenue: '',
  mostConsistentPlayerOfMatch: ''
}

const mutations = {
  updateDeliveriesData (state, payload) {
    state.superOverMaxRuns = payload.superOverMaxRuns
    state.mostSixBarChartData.rows = payload.mostSixBarChartData.rows
    state.wicketDistributionChartData.rows = payload.wicketDistributionChartData.rows
  },
  updateMatchesData (state, payload) {
    state.teamWinLossGraphData.rows = payload.teamWinLossGraphData.rows
    state.mostVictoriousTeam = payload.mostVictoriousTeam
    state.tossBattingWinProb = payload.tossBattingWinProb
    state.tossFieldingWinProb = payload.tossFieldingWinProb
    state.superOverMatchCount = payload.superOverMatchCount
    state.mostPlayedAtVenue = payload.mostPlayedAtVenue
    state.mostConsistentPlayerOfMatch = payload.mostConsistentPlayerOfMatch
  },
  setStateFromCache (state, payload) {
    state = payload
  }
}

const getters = {
  compeleteState: state => state,
  chartGetter: (state) => {
    return {
      teamWinLossGraphData: state.teamWinLossGraphData,
      wicketDistributionChartData: state.wicketDistributionChartData,
      mostSixBarChartData: state.mostSixBarChartData
    }
  },
  triviaGetter: (state) => {
    return {
      superOverMaxRuns: state.superOverMaxRuns,
      mostVictoriousTeam: state.mostVictoriousTeam,
      tossBattingWinProb: state.tossBattingWinProb,
      tossFieldingWinProb: state.tossFieldingWinProb,
      superOverMatchCount: state.superOverMatchCount,
      mostPlayedAtVenue: state.mostPlayedAtVenue,
      mostConsistentPlayerOfMatch: state.mostConsistentPlayerOfMatch
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})

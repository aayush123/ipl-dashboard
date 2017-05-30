import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  team_win_loss_graph: {
    columns: [
      {
        'type': 'string',
        'label': 'Teams'
      }
    ],
    rows: [],
    options: {
      title: 'Team Win/Loss Statistics'
    }
  }
}

const getters = {
  basicGetter: state => state.team_win_loss_graph.options.title
}

export default new Vuex.Store({
  state,
  getters
})

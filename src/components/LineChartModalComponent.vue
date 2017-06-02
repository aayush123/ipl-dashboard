<template lang="html">
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <slot name="header">
              <h3>
                {{selectedTeamName}}
                <button class="modal-default-button" type="button" title="Close" @click="$emit('close')">
                  <span aria-hidden="true">&times;</span>
                  <span class="hide">Close</span>
                </button>
              </h3>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <vue-chart
                id="seasonWiseTeamPerformanceChart"
                :columns="columns"
                :rows="seasonWiseTeamChartRows[selectedTeamName]"
                :options="options"
              ></vue-chart>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  // props: ['chartRows', 'objKey']
  data: function () {
    return {
      columns: [
        {
          'type': 'string',
          'label': 'Season'
        },
        {
          'type': 'number',
          'label': 'Win Ratio'
        }
      ],
      options: {
        title: 'Win Percentage of Team',
        height: '500',
        vAxis: {
          title: 'Win Percentage',
          viewWindow: {
            min: 0,
            max: 100
          }
        },
        hAxis: {
          title: 'Year'
        },
        series: {
          0: { color: '#1d8804' }
        }
      }
    }
  },
  computed: {
    seasonWiseTeamChartRows: function () {
      return this.$Store.getters.chartGetter.seasonWiseTeamChartRows
    },
    selectedTeamName: function () {
      return this.$Store.getters.selectedTeamNameGetter
    }
  }
}
</script>

<style lang="css">
.modal-mask {
  z-index: 9998;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 60%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #777;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  color: black;
  background: transparent;
  border-style: none;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
}
</style>

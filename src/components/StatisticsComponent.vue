<template lang="html">
  <div class="container">
    <div class="row">
      <div class="page-header">
        <center><h1>IPL Statistics</h1></center>
      </div>
    </div>
    <div class="row">
      <div class="page-header">
        <h3>Wins/Losses Statistics of All Teams</h3>
      </div>
      <div class="col-md-10 col-md-offset-1">
        <vue-chart
          id="teamWinLossGraph"
          :chart-events="teamWinLossGraphData.chartEvents"
          :chart-type="teamWinLossGraphData.type"
          :columns="teamWinLossGraphData.columns"
          :rows="teamWinLossGraphData.rows"
          :options="teamWinLossGraphData.options"
        ></vue-chart>
        <br><strong>Click on a team's bar to see season-wise performance.</strong>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="page-header">
        <h3>Top 10 Wicket Takers</h3>
      </div>
      <div class="col-md-10 col-md-offset-1">
        <vue-chart
          id="wicketDistributionChart"
          :chart-type="wicketDistributionChartData.type"
          :columns="wicketDistributionChartData.columns"
          :rows="wicketDistributionChartData.rows"
          :options="wicketDistributionChartData.options"
        ></vue-chart>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="page-header">
        <h3>Top 10 Six Hitters</h3>
      </div>
      <div class="col-md-10 col-md-offset-1">
        <vue-chart
          id="mostSixBarChart"
          :chart-type="mostSixBarChartData.type"
          :columns="mostSixBarChartData.columns"
          :rows="mostSixBarChartData.rows"
          :options="mostSixBarChartData.options"
        ></vue-chart>
      </div>
    </div>
    <hr>
    <LineChartModal v-if='modalDisplayStatus' @close='modalClose'></LineChartModal>
  </div>
</template>

<script>
import LineChartModal from '@/components/LineChartModalComponent'
export default {
  methods: {
    modalClose: function () {
      this.$Store.commit('toggleModal')
    }
  },
  components: { LineChartModal },
  computed: {
    teamWinLossGraphData: function () {
      return this.$Store.getters.chartGetter.teamWinLossGraphData
    },
    wicketDistributionChartData: function () {
      return this.$Store.getters.chartGetter.wicketDistributionChartData
    },
    mostSixBarChartData: function () {
      return this.$Store.getters.chartGetter.mostSixBarChartData
    },
    modalDisplayStatus: function () {
      return this.$Store.getters.modalDisplayStatusGetter
    }
  }
}
</script>

<style lang="css">
</style>

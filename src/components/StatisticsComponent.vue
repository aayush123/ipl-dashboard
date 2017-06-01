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
          :chart-type="teamWinLossGraphData.type"
          :columns="teamWinLossGraphData.columns"
          :rows="teamWinLossGraphData.rows"
          :options="teamWinLossGraphData.options"
        ></vue-chart>
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
  </div>
</template>

<script>
export default {
  computed: {
    teamWinLossGraphData: function () {
      return this.$Store.getters.chartGetter.teamWinLossGraphData
    },
    wicketDistributionChartData: function () {
      return this.$Store.getters.chartGetter.wicketDistributionChartData
    },
    mostSixBarChartData: function () {
      return this.$Store.getters.chartGetter.mostSixBarChartData
    }
  }
}
</script>

<style lang="css">
</style>

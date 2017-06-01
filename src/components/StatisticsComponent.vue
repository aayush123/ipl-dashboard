<template lang="html">
  <div class="container">
    <div class="page-header">
      <h1>IPL Statistics</h1>
    </div>
    <div class="row">
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

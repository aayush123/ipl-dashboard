<template lang="html">
  <div class="" id= "main">
    <vue-chart
            chart-type="BarChart"
            :columns="columns"
            :rows="rows"
            :options="options"
        ></vue-chart>
        <span>{{test}}</span>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      test: this.$Store.getters.basicGetter,
      columns: [{
        'type': 'string',
        'label': 'Year'
      }, {
        'type': 'number',
        'label': 'Sales'
      }, {
        'type': 'number',
        'label': 'Expenses'
      }],
      rows: [
        ['2004', 1000, 400],
        ['2005', 1170, 460],
        ['2006', 660, 1120],
        ['2007', 1030, 540]
      ],
      options: {
        title: 'Company Performance',
        hAxis: {
          title: 'Year',
          minValue: '2004',
          maxValue: '2007'
        },
        vAxis: {
          title: '',
          minValue: 300,
          maxValue: 1200
        },
        width: 900,
        height: 500,
        curveType: 'function'
      }
    }
  }
}
</script>

<style lang="css">
</style>

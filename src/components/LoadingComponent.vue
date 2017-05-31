<template lang="html">
  <div class="row">
    <div class="col-md-6 col-md-offset-3">
      <img class="img-fluid" style="max-width: 100%" src="/static/loading.png" />
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import DataHelper from '../assets/js/DataManipUtil'
export default {
  methods: {
    redirect: function () {
      this.$router.push('/')
    }
  },
  mounted: function () {
    // console.log(typeof localStorage)
    $.ajax({
      url: '/static/matches.csv',
      success: data => {
        let matchesData = DataHelper.parseMatchesData(data)
        console.log(matchesData)
        // this.$router.push('/trivia')
      },
      error: error => {
        console.log(error)
        this.$router.push('/error')
      }
    })
    $.ajax({
      url: '/static/deliveries.csv',
      success: data => {
        let deliveriesData = DataHelper.parseDeliveriesData(data)
        console.log(deliveriesData)
        this.$router.push('/trivia')
      },
      error: error => {
        console.log(error)
        this.$router.push('/error')
      }
    })
  }
}
</script>

<style lang="css">
</style>

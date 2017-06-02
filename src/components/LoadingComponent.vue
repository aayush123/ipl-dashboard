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
    let localCacheAvailable = false
    if (localStorage.getItem('iplState') !== null) {
      localCacheAvailable = true
      console.log('bypassing loading screen as local cache available')
      this.$Store.commit('setStateFromCache', JSON.parse(localStorage.getItem('iplState')))
      this.$router.push('/stats')
    }
    $.ajax({
      url: '/static/matches.csv',
      success: data => {
        this.$Store.commit('updateMatchesData', DataHelper.parseMatchesData(data))
      },
      error: error => {
        console.log(error)
        if (!localCacheAvailable) {
          this.$router.push('/error')
        } else {
          this.$router.push('/trivia')
        }
      }
    })
    $.ajax({
      url: '/static/deliveries.csv',
      success: data => {
        this.$Store.commit('updateDeliveriesData', DataHelper.parseDeliveriesData(data))
        if (!localCacheAvailable) {
          this.$router.push('/trivia')
        }
        console.log('updating cached state')
        localStorage.setItem('iplState', JSON.stringify(this.$Store.getters.compeleteState))
      },
      error: error => {
        console.log(error)
        if (!localCacheAvailable) {
          this.$router.push('/error')
        } else {
          this.$router.push('/trivia')
        }
      }
    })
  }
}
</script>

<style lang="css">
</style>

<template>
  <div id="app">
    <SideBar></SideBar>
    <div class="" id= "main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar'
export default {
  name: 'app',
  components: { SideBar },
  created: function () {
    this.$router.replace('/loading')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0px;
  padding: 0px;
}
</style>

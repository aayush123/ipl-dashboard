<template>
  <div id="app">
    <!-- <Header></Header> -->
    <SideBar></SideBar>
    <div class="" id= "main">
      <router-view></router-view>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
// import $ from 'jquery'
import SideBar from './components/SideBar'
export default {
  name: 'app',
  components: { SideBar },
  // created: function () {
  //   $.ajax({
  //     url: '/static/test.json',
  //     success: data => {
  //       console.log('from success')
  //       this.$router.push('/trivia')
  //     },
  //     error: error => {
  //       console.log(error)
  //       this.$router.push('/error')
  //     }
  //   })
  // }
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
</style>

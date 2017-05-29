<template>
  <div id="app">
    <!-- <Header></Header> -->
    <SideBar></SideBar>
    <router-view></router-view>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
// import Header from './components/Header'
// import Footer from './components/Footer'
import SideBar from './components/SideBar'
export default {
  name: 'app',
  components: { SideBar }
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

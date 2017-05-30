<template lang="html">
  <div>
    <h1>{{countVal}}</h1>
    <button @click='increment'>Increment</button>
  </div>
</template>

<script>
export default {
  name: 'CounterCompTest',
  // data () {
  //   return {
  //     countVal: this.$Store.getters.countVal
  //   }
  // },
  computed: {
    countVal: function () {
      return this.$Store.getters.countVal
    }
  },
  methods: {
    increment: function (event) {
      this.$Store.commit('increment')
    }
  }
}
</script>

<style lang="css">
</style>

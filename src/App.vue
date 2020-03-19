<template>
  <div id="app">
    <Vdom/>
  </div>
</template>

<script>
import Vdom from './components/vdom.vue'

export default {
  name: 'app',
  components: {
    Vdom
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <hello></hello>
    <p>
      Welcome to your Vue.js app!
    </p>
    <flat-card></flat-card>
  </div>
</template>

<script>
import Hello from './components/Hello'
import FlatCard from './components/FlatCardComponent'
export default {
  components: {
    FlatCard,
    Hello
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 10px;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>

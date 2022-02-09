<template>
  <div id="app">
    <NavBar />
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",

  components: {
    NavBar,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comforter+Brush&family=Open+Sans:wght@300;400&family=Roboto:wght@300&display=swap');

html, body {
  font-family: 'Roboto', sans-serif;
}

#app {
  font-family: 'Roboto', sans-serif;
}

.center {
  text-align: center;
}

.btn-circle {
  width: 50px;
  height: 50px;
  padding: 7px 10px;
  border-radius: 25px;
  font-size: 10px;
  text-align: center;
}
</style>

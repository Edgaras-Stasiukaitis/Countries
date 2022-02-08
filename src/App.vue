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
    NavBar
  },
};
</script>

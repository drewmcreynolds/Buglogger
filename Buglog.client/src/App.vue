<template>
  <header>
    <Navbar />
  </header>
  <main class="gradbg">
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.gradbg{
background: rgb(105,0,166);
background: radial-gradient(circle, rgba(105,0,166,1) 63%, rgba(0,129,21,1) 100%);
}

</style>

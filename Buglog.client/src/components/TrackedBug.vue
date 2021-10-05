<template>
  <div class="mx-2">
    <img :src="trackedBug.tracker.picture" height="45" :title="trackedBug.tracker.name" :aria-label="trackedBug.tracker.name">
  </div>
</template>

<script>
export default {
  props: {
    trackedBug: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>

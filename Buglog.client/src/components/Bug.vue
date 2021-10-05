<template>
  <div>
    <div class="d-flex card bg-black bg-opacity-75 text-light rounded border-success p-3">
      <div class="text-success text-center">
        <h2 :class="{'text-danger': bug.closed }">
          Bug Title:  {{ bug.title }}
        </h2>
      </div>
      <div>
        <h4 class="text-white border border-success">
          <span class="text-end">{{ bug.description }}</span>
          <br />
          <br />
        </h4>
      </div>
      <div v-if="bug.closed">
        <h4 class="text-danger">
          Closed
        </h4>
      </div>

      <div v-else class="text-success">
        <br />
        <h4 :class="{'text-danger': bug.priority === 1 }">
          Priority Level: {{ bug.priority }}
        </h4>
      </div>
      <div class="m-auto">
        <router-link :to="{name: 'BugDetails', params: {bugId: bug.id}}">
          <button type="button" class="text-success bg-dark rounded-pill">
            Bug Details
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bug: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>

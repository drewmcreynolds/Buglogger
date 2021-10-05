<template>
  <div>
    <div class="d-flex row bg-black text-success p-5 rounded-3 elevation-3 mt-3 bg-opacity-75 border border-success">
      <div class="col-md-3 text-success">
        <h2 :class="{'text-danger': bug.bug.closed }">
          Bug Title: {{ bug.bug.title }}
        </h2>
      </div>
      <div v-if="bug.bug.closed">
        <h4 class="text-danger">
          Closed the Bug
        </h4>
      </div>
      <div v-else class="text-success col-md-3">
        <h4 :class="{'text-danger': bug.bug.priority === 1 ,'text-warning': bug.bug.priority === 2 ,'text-info': bug.bug.priority === 3 }">
          Priority Level: {{ bug.bug.priority }}
        </h4>
      </div>
      <div class="col-md-3">
        <h4>
          Bug Description:
        </h4>
        <h6>
          {{ bug.bug.description }}
        </h6>
      </div>
      <div class="m-auto text-end col-md-3">
        <router-link :to="{name: 'BugDetails', params: {bugId: bug.bug.id}}">
          <button class="text-success bg-black rounded-pill p-3 border-success">
            Get the Bug Details
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

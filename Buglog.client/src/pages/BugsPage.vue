<template>
  <div v-if="bugs">
    <div class="container-fluid">
      <div class="row d-flex">
        <div class="col-1"></div>
        <div class="col-md-10 d-flex justify-content-between">
          <button type="button" class="text-success bg-black rounded-pill p-3 m-3" @click="closedFilter = !closedFilter">
            Filter
          </button>
          <button class="text-success bg-black rounded-pill p-3 mt-3" @click="unsortBugs()">
            Most Recent
          </button>
          <button v-if="sorted === false" type="button" class="text-success bg-black rounded-pill p-3 mt-3" @click="sortBugs()">
            Sort by Priority
          </button>
          <button v-if="sorted === true" type="button" class="text-success bg-black rounded-pill p-3" @click="toggleAscending()">
            Sort by Priority
          </button>
        </div>
        <div class="col-1"></div>
      </div>
      <div v-if="sorted === false" class="row">
        <Bug v-for="b in bugs" :key="b.id" :bug="b" class="col-md-3 p-2" />
      </div>
      <div v-if="sorted === true" class="row">
        <Bug v-for="b in sortedBugs" :key="b.id" :bug="b" class="col-md-3 p-2" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import Pop from '../utils/Pop.js'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
export default {
  name: 'Home',
  setup() {
    const ascending = ref(true)
    const closedFilter = ref(false)
    const sorted = ref(false)
    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    function closedFilterFunction(b) {
      if (closedFilter.value) {
        return b.closed === false
      }
      return true
    }
    function bugSorter(a, b) {
      if (ascending.value) {
        return b.priority - a.priority
      }
      return a.priority - b.priority
    }
    return {
      sorted,
      closedFilter,
      sortedBugs: computed(() => AppState.sortedBugs.sort(bugSorter)),
      bugs: computed(() => AppState.bugs.filter(closedFilterFunction)),
      sortBugs() {
        sorted.value = true
      },
      toggleAscending() {
        ascending.value = !ascending.value
      },
      unsortBugs() {
        sorted.value = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>

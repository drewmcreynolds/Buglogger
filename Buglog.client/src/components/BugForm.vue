<template>
  <form @submit.prevent="createBug()">
    <div class="form-group">
      <label for="title"></label>
      <input v-model="editable.title"
             type="text"
             name="title"
             id="title"
             placeholder="Bug Title"
             class="form-control"
      >
    </div>
    <div class="form-group">
      <label for="description"></label>
      <input v-model="editable.description"
             type="text"
             name="description"
             id="description"
             placeholder="Project Description"
             class="form-control"
      >
    </div>
    <div class="form-group">
      <label for="priority"></label>
      <input v-model="editable.priority"
             type="number"
             name="priority"
             id="priority"
             placeholder="Priority 1-5"
             class="form-control"
      >
    </div>
    <div class="btn-group">
      <button type="submit" class="btn btn-success selectable mt-4">
        <b>Submit</b>
      </button>
    </div>
  </form>
</template>

<script>
import { bugsService } from '../services/BugsService.js'
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop.js'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createBug() {
        try {
          await bugsService.createBug(editable.value)
          editable.value = {}
          Pop.toast('You Made a Bug!', 'success')
          const modal = Modal.getInstance(document.getElementById('bug-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

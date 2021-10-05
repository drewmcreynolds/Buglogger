<template>
  <form @submit.prevent="editBug()">
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
import { ref } from '@vue/reactivity'
import { bugsService } from '../services/BugsService.js'
import { Modal } from 'bootstrap'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async editBug() {
        try {
          await bugsService.editBug(editable.value, route.params.bugId)
          Pop.toast('Bug has been Edited', 'success')
          const modal = Modal.getInstance(document.getElementById('edit-form'))
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

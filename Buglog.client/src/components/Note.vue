<template>
  <div class="row d-flex">
    <div class="col-md-11 p-3">
      <img :src="note.creator.picture" height="35">
      <h5 class="p-3 text-success">
        {{ note.body }}
      </h5>
    </div>
    <div class="col-md-1 p-3">
      <div v-if="account.id === note.creatorId">
        <i class="mdi mdi-delete-circle mdi-48px text-warning selectable justify-content flex-end" @click="deleteNote(note.id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState.js'
import { notesService } from '../services/NotesService.js'
import Pop from '../utils/Pop.js'
export default {
  props: {
    note: { type: Object, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async deleteNote(noteId) {
        try {
          await notesService.deleteNote(noteId)
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

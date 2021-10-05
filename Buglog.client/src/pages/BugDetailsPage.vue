<template>
  <div v-if="currentBug.title">
    <div class="container">
      <div class="card container-fluid bg-black bg-opacity-75 text-success mt-4 border border-success border-3">
        <div class="row card-header">
          <div class="col-md-6 text-success">
            <h1 :class="{ 'text-danger': currentBug.closed }">
              {{ currentBug.title }}
            </h1>
          </div>
          <div class="col-md-6">
            <div v-if="currentBug.closed">
              <h2 class="text-danger">
                Closed the bug
              </h2>
            </div>
            <div v-else>
              <div class="text-success text-end">
                <h2 :class="{'text-warning': currentBug.priority === 1 }">
                  Priority Level: {{ currentBug.priority }}
                </h2>
                <h3 v-if="currentBug.priority === 1" class="text-warning">
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="row card-body d-flex justify-content-between">
          <div class="col-md-4">
            <h6>{{ new Date(currentBug.updatedAt).toLocaleTimeString() }}</h6>
            <h3 class="text-success">
              Bug Description:
            </h3>
            <br />
            <h5 class="text-white ">
              {{ currentBug.description }}
            </h5>
            <br />
            <div v-if="currentBug.closed">
              <p class="text-danger">
                You can't track a closed bug
              </p>
            </div>
            <div v-else>
              <div v-if="trackedCheck">
                <button @click="deleteTrackedBug(account.id)"
                        type="button"
                        class="text-white bg-danger fs-5 rounded-pill border border-success p-3 m-3"
                >
                  Stop Track
                </button>
              </div>
              <div v-else>
                <button @click="createTrackedBug(currentBug.id)"
                        fs-3type="button"
                        class="text-success bg-black fs-5 rounded-pill border border-success p-3 m-3"
                >
                  Track Bug
                </button>
              </div>
            </div>
            <h5 class="mt-3">
              Trackers:
            </h5>
            <TrackedBug v-for="t in trackedBugs" :key="t.id" :tracked-bug="t" />
          </div>
          <div class="d-flex col-md-4">
          </div>
          <div class="col-md-4 text-end">
            <h5>Creator:</h5>
            <img :src="currentBug.creator.picture" height="65" data-bs-toggle="tooltip" :title="currentBug.creator.name">
            <div v-if="currentBug.closed">
              <p class="text-danger">
                unable to edit a closed bug
              </p>
            </div>
            <div v-else>
              <button v-if="account.id === currentBug.creatorId"
                      @click="closeBug(currentBug.id)"
                      type="button"
                      class="text-success bg-black fs-5 rounded-pill border border-success p-3 m-3"
              >
                <b>Close bug</b>
              </button>
              <button v-if="account.id === currentBug.creatorId"
                      type="button"
                      class="text-success bg-black fs-5 rounded-pill border border-success p-3 m-3"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-form"
              >
                <b>Edit Bug</b>
              </button>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div v-if="currentBug.closed">
            <p class="text-danger">
              Closed the Bug
            </p>
          </div>
          <div v-else>
            <div v-if="user.isAuthenticated">
              <form @submit.prevent="createNote()" id="noteForm">
                <div class="form-group">
                  <label for="note"></label>
                  <textarea name="note"
                            id="note"
                            cols="2"
                            rows="2"
                            class="form-control bg-dark opacity-30 text-success m-2 p-2"
                            placeholder="Make a Note"
                            v-model="editable.body"
                  >
                </textarea>
                </div>
                <div class="d-flex justify-content-end my-2">
                  <button type="submit" class="text-success bg-black fs-5 rounded-pill border border-success p-3 m-3">
                    <b>Submit</b>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row d-flex mt-5">
        <div class="col-md-4"></div>
        <div class="card body col-md-4 bg-black border border-success border-3 bg-opacity-75">
          <h3 class="text-center text-success">
            Notes:
          </h3>
          <Note v-for="n in notes" :key="n.id" :note="n" />
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <span>
      Loading......
    </span>
  </div>
  <Modal id="edit-form">
    <template #modal-title>
      Edit This Bug
    </template>
    <template #modal-body>
      <EditForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { bugsService } from '../services/BugsService.js'
import { AppState } from '../AppState.js'
import { notesService } from '../services/NotesService.js'
import { trackedBugsService } from '../services/TrackedBugsService.js'
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    onMounted(async() => {
      try {
        await trackedBugsService.Tracked()
        await bugsService.getBugsNotes(route.params.bugId)
        await bugsService.getBugById(route.params.bugId)
        await bugsService.getTrackedBugs(route.params.bugId)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      editable,
      account: computed(() => AppState.account),
      currentBug: computed(() => AppState.currentBug),
      notes: computed(() => AppState.notes),
      trackedBugs: computed(() => AppState.trackedBugs),
      trackedCheck: computed(() => AppState.trackedCheck),
      user: computed(() => AppState.user),
      async createNote() {
        try {
          editable.value.bugId = route.params.bugId
          await notesService.createNote(editable.value)
          document.getElementById('noteForm').reset()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async createTrackedBug(bugId) {
        try {
          await trackedBugsService.createTrackedBug(bugId)
          await bugsService.getTrackedBugs(this.currentBug.id)
          await trackedBugsService.Tracked()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async closeBug(bugId) {
        try {
          const result = window.confirm('Do you want to Close this Bug?')
          if (result === true) {
            await bugsService.closeBug(bugId)
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async deleteTrackedBug(accountId) {
        try {
          await trackedBugsService.deleteTrackedBug(accountId)
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

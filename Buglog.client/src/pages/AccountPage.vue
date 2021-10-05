<template>
  <div class="text-success text-end">
    <h1 class="text-center">
      Hello! {{ account.name }}
    </h1>
  </div>
  <div v-if="accountBugs">
    <div class="container">
      <div class="row">
        <AccountTrackedBug v-for="b in accountBugs" :key="b.id" :bug="b" class="col-md-12" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { accountService } from '../services/AccountService.js'
import { AppState } from '../AppState'
import Pop from '../utils/Pop.js'
export default {
  name: 'Account',
  setup() {
    onMounted(async() => {
      try {
        await accountService.getTrackedBugs()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      accountBugs: computed(() => AppState.accountBugs),
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>

</style>

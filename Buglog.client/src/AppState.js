import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  accountBugs: [],
  account: {},
  bugs: [],
  currentBug: {},
  notes: [],
  sortedBugs: [],
  trackedCheck: false,
  trackedBugs: [],
  user: {}

})

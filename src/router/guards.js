import { useSessionStore } from '../stores/session'

export const setupGuards = router => {
  router.beforeEach(to => {
	  if (to.meta.public) {
		  return
	  }

	  const store = useSessionStore()
	  const isLoggedIn = store.isAuthenticated

	  if (isLoggedIn) {
		  return '/admin'
	  } else {
		  return '/login'
	  }

	  return
  })
}

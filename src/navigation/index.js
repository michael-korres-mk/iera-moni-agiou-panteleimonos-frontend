import { useSessionStore } from '../stores/session'

let menu = []
const store = useSessionStore()
const isLoggedIn = true //store.isAuthenticated
if (isLoggedIn) {
  menu = [
    {
      title: 'ΑΡΧΙΚΗ',
      to: 'home',
      meta: {
        title: 'ΑΡΧΙΚΗ',
        auth: false,
      },
    },
	  {
		  title: 'ΠΡΟΓΡΑΜΜΑ ΑΚΟΛΟΥΘΙΩΝ',
		  to: 'devotionals',
		  meta: {
			  title: 'ΠΡΟΓΡΑΜΜΑ ΑΚΟΛΟΥΘΙΩΝ',
			  auth: false,
		  },
	  },
	  {
		  title: 'ΑΓΙΟΣ ΠΑΝΤΕΛΕΗΜΩΝ',
		  to: 'saint',
		  meta: {
			  title: 'ΑΓΙΟΣ ΠΑΝΤΕΛΕΗΜΩΝ',
			  auth: false,
		  },
	  },
	  {
		  title: 'ΕΠΙΚΟΙΝΩΝΙΑ',
		  to: 'contact',
		  meta: {
			  title: 'ΕΠΙΚΟΙΝΩΝΙΑ',
			  auth: false,
		  },
	  },




  ].filter(entry => store.isAuthenticated === entry.meta.auth)
}
export default menu

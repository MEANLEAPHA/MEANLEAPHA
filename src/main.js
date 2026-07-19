import { createApp } from 'vue'
import App from './App.vue'


// Font Awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Choose icons you want
import { faUser, faSignInAlt, faTriangleExclamation, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faUser, faSignInAlt, faTriangleExclamation, faArrowRightFromBracket)

const app = createApp(App)

// Register globally
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')

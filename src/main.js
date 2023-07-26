import { createApp } from 'vue'
import router from './router'
import './assets/tailwind.css'
import App from './App.vue'
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App)

app.use(router)
app.use(
    createAuth0({
        domain: process.env.VUE_APP_AUTH0_DOMAIN,
        clientId: process.env.VUE_APP_AUTH0_CLIENTID,
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    })
);

app.mount('#app')
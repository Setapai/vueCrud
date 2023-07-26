import { createRouter, createWebHistory } from "vue-router";
import Login from '@/pages/login.vue';
import DashBoard from '@/pages/dashboard.vue';
import bcrypt from 'bcryptjs'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    }, 
    {
        path: '/Dashboard',
        name: 'Dashboard',
        component: DashBoard
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/'
    }
];


// this.$store.state.userIsAuthorized && 

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach( (to,from,next) => {
     bcrypt.compare(process.env.VUE_APP_SECRETKEY, localStorage.getItem('auth') ?? '', function (err, result) {
        // result is tru and name is login proceed to dash board else continue access to navigation
         if (result){
             to.name === 'Login' ? next({ name: 'Dashboard' }) : next()
        }else{
             to.name !== 'Login' ? next({ name: 'Login' }) : next()
        }
    });

    // const authStore = useAuthStore();
    // return (!authStore.$state.isUserAuth && to.name !== 'Login') ? next({name:'Login'}) : next()

});

export default router

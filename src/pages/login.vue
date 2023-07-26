<template>
    <div class="container mx-auto h-screen font-poppins">
        <div class="flex flex-col-reverse sm:flex-row h-full items-center justify-around ">
            <div id="rightBox" class="space-y-4 w-2/4 p-16 inline-flex flex-col text-slate-600 text-center sm:text-left ">
                <h1 class="text-4xl" @click="logoutAuth0()">Inventory CRUD</h1>
                <h1 class="text-md">Create, Read, Update and Delete</h1>
                <p class="text-2xl ">
                    The Technology Being used for this project are <br>
                    <b>
                        <i>
                            <iconComponent class="p-4" text="Vue"
                                :style="{ backgroundImage: 'url(' + iconImages[0] + ')' }" />
                            <iconComponent class="p-5" text="Express"
                                :style="{ backgroundImage: 'url(' + iconImages[1] + ')' }" />
                            <iconComponent class="p-5" text="Tailwind"
                                :style="{ backgroundImage: 'url(' + iconImages[2] + ')' }" />
                            <iconComponent class="p-5" text="Firestore"
                                :style="{ backgroundImage: 'url(' + iconImages[3] + ')' }" />
                            <iconComponent class="p-4" text="Auth0"
                                :style="{ backgroundImage: 'url(' + iconImages[5] + ')' }" />
                        </i>
                    </b>
                </p>
                <p>By Amor Novilunio III</p>
            </div>
            <div id="leftBox" class="w-2/4 p-5 flex flex-col space-y-5 ">
                <h1 v-if="signUp" class=" text-4xl text-slate-600">Sign Up</h1>
                <div class="flex flex-col space-y-5">
                    <inputComponent class="text-center" placeholder="Username" Type="text" v-model="uname" tabindex="1" />
                    <inputComponent class="text-center" placeholder="Password" Type="password" v-model="pword"
                        tabindex="2" />
                    <div class="flex flex-col items-end space-y-3">
                        <!--  -->
                        <p v-if="!signUp" @click="signUp = !signUp" class="text-blue-400 cursor-pointer hover:text-sky-300"
                            tabindex="3">
                            Don't have an account yet?
                        </p>
                        <p v-else @click="signUp = !signUp" class="text-blue-400 cursor-pointer hover:text-sky-300"
                            tabindex="3">
                            Have an account? Log in
                        </p>
                        <!--  -->
                        <button v-if="signUp" @click="register(uname, pword)"
                            class="p-3 rounded shadow-lg w-56 float-right text-slate-600 bg-white outline-none focus:shadow-inner focus:bg-gray-100 hover:shadow-inner"
                            tabindex="4">Create Account</button>
                        <button v-else @click="login(uname, pword)"
                            class="p-3 rounded shadow-lg w-56 float-right text-slate-600 bg-white outline-none focus:shadow-inner focus:bg-gray-100 hover:shadow-inner"
                            tabindex="4">Login</button>
                        <!--  -->
                        <a @click="loginWithAuth0()"
                            class="cursor-pointer rounded w-56 text-center bg-white p-3 shadow-lg focus:shadow-inner focus:bg-gray-100 hover:shadow-inner outline-none"
                            tabindex="5">
                            <iconComponent class="p-3" text2="Login Using Auth0"
                                :style="{ backgroundImage: 'url(' + iconImages[5] + ')' }" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<script setup>
import { ref,onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import { axiosRequestPost } from '../service/serverRequest.js';
import bcrypt from 'bcryptjs'
import inputComponent from '../components/input.vue';
import iconComponent from '../components/login/icon.vue';
import Swal from 'sweetalert2'
import { useAuth0 } from '@auth0/auth0-vue';

// Variables
const router = useRouter()
const signUp = ref(false);
const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
let uname = '';
let pword = '';
const isAuth = ref(isAuthenticated);
const userData = ref(user);


onUpdated(()=>{
    console.log(isAuth.value ? 'logged In': 'not logged in ')
    userData.value = JSON.stringify(userData.value)
     userData.value && oauthLoginCheck()
})

const iconImages = [
    require('@/assets/logo/logo.png'),
    require('@/assets/logo/ex.png'),
    require('@/assets/logo/tailwind.png'),
    require('@/assets/logo/Firestore.png'),
    require('@/assets/logo/google.svg'),
    require('@/assets/logo/auth0.png'),
];

const oauthLoginCheck=()=>{
    let  data = JSON.parse(userData.value)
      axiosRequestPost('users/auth0', data).then(request => {
        const data = request.data.data;
        if (data.username) {
            Swal.showLoading()
            bcrypt.hash(process.env.VUE_APP_SECRETKEY, parseInt(process.env.VUE_APP_SALT_ROUNDS), function (err, hash) {
                // Store hash in your password DB.
                localStorage.setItem('auth', hash);
                localStorage.setItem('id', data.id);
                bcrypt.compare(process.env.VUE_APP_SECRETKEY, localStorage.getItem('auth'), function (err, result) {
                    Swal.fire({
                        icon: 'success',
                        showConfirmButton: false
                    })
                    setInterval(() => {
                        Swal.close()
                        result && router.push({ name: 'Dashboard' })
                    }, 1000);
                });
            });
        }
    });
}

const loginWithAuth0 =()=>{
    loginWithRedirect();
}

const logoutAuth0 = ()=>logout({ logoutParams: { returnTo: window.location.origin } });

// Functions
const login = (uname, pword) => {
    let data = {
        username: uname ?? '',
        password: pword ?? ''
    }
    axiosRequestPost('users/login', data).then(request => {
        const data = request.data.data;
        if (data.username) {
            Swal.showLoading()
            bcrypt.hash(process.env.VUE_APP_SECRETKEY, parseInt(process.env.VUE_APP_SALT_ROUNDS), function (err, hash) {
                // Store hash in your password DB.
                localStorage.setItem('auth', hash);
                localStorage.setItem('id', data.id);
                bcrypt.compare(process.env.VUE_APP_SECRETKEY, localStorage.getItem('auth'), function (err, result) {
                    Swal.fire({
                        icon: 'success',
                        showConfirmButton: false
                    })
                    let redirect = setInterval(() => {
                        Swal.close()
                        clearInterval(redirect)
                        result && router.push({ name: 'Dashboard' })
                    }, 1000);
                });
            });
        } else if (uname === '' || pword === '') {
            Swal.fire({
                title: 'Error!',
                text: 'Please Fill Up Forms',
                icon: 'info',
                confirmButtonText: 'Confirm',
                confirmButtonColor: 'rgb(14 116 144)'
            })

        }
        else {
            Swal.fire({
                title: 'Account Not Found',
                icon: 'warning',
                confirmButtonText: 'Confirm',
                confirmButtonColor: 'rgb(14 116 144)'
            })
        }
    }).catch(() => {
        Swal.fire({
            title: 'Error!',
            text: 'Server Problem',
            icon: 'error',
            confirmButtonText: 'Close',
            confirmButtonColor: 'red'
        })
    });
}

const register = (uname, pword) => {
    let data = {
        username: uname ?? '',
        password: pword ?? ''
    }
    axiosRequestPost('users/register', data).then(request => {
        const data = request.data.status;
        if (data == 400) {
            Swal.fire({
                title: 'Error!',
                text: 'Please Fill Up Forms',
                icon: 'info',
                confirmButtonText: 'Confirm',
                confirmButtonColor: 'rgb(14 116 144)'
            })
        } else if (data == 409) {
            Swal.fire({
                title: 'Duplicate',
                text: 'Username Already Exist',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: 'red'
            })
        } else {
            bcrypt.hash(process.env.VUE_APP_SECRETKEY, parseInt(process.env.VUE_APP_SALT_ROUNDS), function (err, hash) {
                // Store hash in your password DB.
                localStorage.setItem('auth', hash);
                localStorage.setItem('id', data.id);
                bcrypt.compare(process.env.VUE_APP_SECRETKEY, localStorage.getItem('auth'), function (err, result) {
                    result && router.push({ name: 'Dashboard' })
                    Swal.fire({
                        icon: 'success',
                        showConfirmButton: false
                    })
                    let redirect = setInterval(() => {
                        Swal.close()
                        clearInterval(redirect)
                        result && router.push({ name: 'Dashboard' })
                    }, 1000);
                });
            });
        }

    }).catch(err => {
        console.log(err, 'serverProblem')
    });
}
</script>

<style scoped></style>
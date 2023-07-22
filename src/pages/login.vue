<template>
    <div class="container mx-auto h-screen font-poppins">
        <div class="flex flex-col-reverse sm:flex-row h-full items-center justify-around ">
            <div id="rightBox" class="space-y-4 w-2/4 p-5 inline-flex flex-col text-slate-600 text-center sm:text-left ">
                <h1 class="text-4xl">Inventory System</h1>
                <p class="text-2xl ">
                    The Technology Being used for this project are <br>
                    <b>
                        <i>
                            <iconComponent class="p-4" text="Vue" :style="{ backgroundImage: 'url(' + image[0] + ')' }" />
                            <iconComponent class="p-5" text="Express"
                                :style="{ backgroundImage: 'url(' + image[1] + ')' }" />
                            <iconComponent class="p-5" text="Tailwind"
                                :style="{ backgroundImage: 'url(' + image[2] + ')' }" />
                            <iconComponent class="p-5" text="And Firestore"
                                :style="{ backgroundImage: 'url(' + image[3] + ')' }" />
                        </i>
                    </b>
                </p>
                <p>By Amor Novilunio III</p>
            </div>
            <div id="leftBox" class="w-2/4 p-5 flex flex-col space-y-5 ">
                <h1 v-if="signUp" class=" text-4xl text-slate-600">Sign Up</h1>
                <form class="flex flex-col space-y-5" action="" method="post">
                    <inputComponent placeholder="Username" type="text" name="uname" tabindex="1" />
                    <inputComponent placeholder="Password" type="password" name="pword" tabindex="2" />
                    <div class="flex flex-col items-end space-y-3">
                        <p v-if="!signUp" @click="signUp = !signUp" class="text-blue-400 cursor-pointer hover:text-sky-300"
                            tabindex="3">
                            Don't have an account yet?
                        </p>
                        <p v-else @click="signUp = !signUp" class="text-blue-400 cursor-pointer hover:text-sky-300"
                            tabindex="3">
                            Have an account? Log in
                        </p>
                        <button v-if="signUp"
                            class="p-3 rounded shadow-lg w-48 float-right text-slate-600 bg-white outline-none focus:shadow-inner focus:bg-gray-100 hover:shadow-inner"
                            tabindex="4">Create Account</button>
                        <button v-else
                            class="p-3 rounded shadow-lg w-28 float-right text-slate-600 bg-white outline-none focus:shadow-inner focus:bg-gray-100 hover:shadow-inner"
                            tabindex="4">Login</button>
                        <a href="#shiz"
                            class="cursor-pointer rounded bg-white p-3 shadow-lg focus:shadow-inner focus:bg-gray-100 hover:shadow-inner outline-none" tabindex="5">
                            <iconComponent class="p-5" text2="Login Using Google"
                                :style="{ backgroundImage: 'url(' + image[4] + ')' }" />
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';
import inputComponent from '../components/login/input.vue';
import iconComponent from '../components/login/icon.vue';

const signUp = ref(false);

const iconImages = [
    require('@/assets/logo/logo.png'),
    require('@/assets/logo/ex.png'),
    require('@/assets/logo/tailwind.png'),
    require('@/assets/logo/Firestore.png'),
    require('@/assets/logo/google.svg'),
]

export default {
    name: 'LoginPage',
    components: {
        inputComponent,
        iconComponent,
    },
    methods: {
    }, data() {
        return {
            image: iconImages,
            signUp: signUp
        }
    }
}
</script>

<style scoped></style>
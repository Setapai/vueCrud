<template>
    <div class="container mx-auto font-poppins absolute top-0 left-0 right-0 bottom-0">
        <div class="flex flex-col h-full items-center justify-center ">
            <div class="shadow-2xl rounded p-5">
                <div class="flex flex-row justify-between items-center">
                    <h1 class="my-5 text-xl">Dashboard</h1>
                    <h1 class="my-5 text-sm cursor-pointer" @click="logoutBtn()">Logout</h1>
                </div>
                <div class="flex">
                    <input
                        class="text-left shadow-lg p-3 outline-none rounded focus:shadow-inner focus:bg-gray-100 hover:shadow-inner transition-all"
                        placeholder='Search...'
                         :value="searchRef"
                        @input="event => search(event)">
                    <buttonComponent data-te-toggle="modal" data-te-target="#openModal" class="w-56" tabindex="2"
                        text="Add Products" @click="isView(false,0)" />
                </div>
                <!-- Inventory -->
                <div class="h-96 p-5 overflow-auto mt-5">
                    <table class="min-w-full text-sm font-light text-center">
                        <thead class="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" class="px-6 py-4">#</th>
                                <th scope="col" class="px-6 py-4">Product</th>
                                <th scope="col" class="px-6 py-4">Quantity</th>
                                <th scope="col" class="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-for='(inventory, index) in inventory' :key='inventory.id'>
                            <tr class="border-b dark:border-neutral-500">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">{{ index + 1 }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ inventory.product }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ inventory.qty }}</td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <buttonComponent class="mx-1" text="delete" @click="isDelete(inventory.id)" />
                                    <buttonComponent class="mx-1" text="view" @click="isView(true, inventory.id)"
                                        data-te-toggle="modal" data-te-target="#openModal" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Pagination -->
                <!-- <nav aria-label="Page navigation ">
                    <ul class="list-style-none flex justify-end">
                        <li>
                            <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:bg-neutral-100  dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#">Previous</a>
                        </li>
                        <li>
                            <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:bg-neutral-100  dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#">1</a>
                        </li>
                        <li aria-current="page">
                            <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:bg-neutral-100  dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#">2</a>
                        </li>
                        <li>
                            <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:bg-neutral-100  dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#">3</a>
                        </li>
                        <li>
                            <a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-slate-600 transition-all duration-300 hover:bg-neutral-100  dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#">Next</a>
                        </li>
                    </ul>
                </nav> -->
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div data-te-modal-init
        class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="openModal" tabindex="-1" aria-modal="true" role="dialog">
        <div data-te-modal-dialog-ref
            class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px] text-slate-600">
            <div
                class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-gray-100 bg-clip-padding text-current shadow-lg outline-none">
                <div
                    class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <!--Modal title-->
                    <span v-if="isOpen" >
                        <h5 v-for='(inventoryItem) in inventoryItem' :key='inventoryItem.id' class="text-xl font-medium leading-normal" id="exampleModalScrollableLabel">
                            {{ inventoryItem.product }}
                        </h5>
                    </span>
                    <h5 v-else class="text-xl font-medium leading-normal" id="exampleModalScrollableLabel">
                        Add A Product
                    </h5>
                    <!--Close button-->
                    <button type="button" ref="closeModalBtn"
                        class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-modal-dismiss aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!--Modal body-->
                <div class="relative p-4 space-y-3">
                    <input
                        class="text-center w-full shadow-lg p-3 outline-none rounded focus:shadow-inner focus:bg-gray-100 hover:shadow-inner transition-all"
                        placeholder='Product' v-model="prodRef">
                    <input
                        class="text-center w-full shadow-lg p-3 outline-none rounded focus:shadow-inner focus:bg-gray-100 hover:shadow-inner transition-all"
                        placeholder='Quantity' v-model="qtyRef">
                </div>

                <!--Modal footer-->
                <div
                    class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <span v-if="isOpen">
                        <buttonComponent v-for='(inventoryItem) in inventoryItem' :key='inventoryItem.id' 
                        @click="addUpdateProduct(prodRef, qtyRef, inventoryItem.id, true)" class="w-56"
                        text="Save Changes" tabindex="3" />
                    </span>
                    <buttonComponent v-else @click="addUpdateProduct(prodRef, qtyRef)" class="w-56" text="Save Changes"
                        tabindex="3" />

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue'
import buttonComponent from '../components/button.vue';
import { axiosRequestPost, axiosRequestGet } from '../service/serverRequest.js';
import { useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import Swal from 'sweetalert2'

import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";


// LifeCycle
onMounted(() => {
    initTE({ Modal, Ripple });
    getAllProducts();
})

// Variables
const router = useRouter()
const isOpen = ref(false)
const closeModalBtn = ref();
const prodRef = ref('');
const qtyRef = ref('');
const searchRef = ref('');
const inventory = ref([]);
const inventoryItem = ref([]);
const { logout, isAuthenticated } = useAuth0();
const isAuth = ref(isAuthenticated);


// getALlProducts
const getAllProducts=()=>{
        let data={
            id:localStorage.getItem('id')
        }
      axiosRequestPost('inventory',data).then(request => {
        const data = request.data.data;
        inventory.value = data
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

// getSiglePorduct
const isView = (value, id) => {
    isOpen.value = value
    if (value) {
        let data = {
            id: localStorage.getItem('id'),
            search: id,
            field: '',
        }
        axiosRequestPost('inventory/search', data).then(request => {
            const data = request.data.data;
            inventoryItem.value = data;
            prodRef.value = data[0].product;
            qtyRef.value = data[0].qty
        })
    } else {
        prodRef.value = '';
        qtyRef.value = ''
    }
};

// searchProducts
const search = (e) => {
    searchRef.value = e.target.value 
    if(e.target.value.length !== 0){
          let data = {
            id: localStorage.getItem('id'),
            search: searchRef.value,
            field: 'product',
        }
        axiosRequestPost('inventory/search', data).then(request => {
            const data = request.data.data;
            console.log(data);
            inventory.value = data
        })
    }else{
        getAllProducts()
    }
   
};

// deletePorduct
const isDelete = (id) => {
    let data = {id:id}
    Swal.showLoading()
    axiosRequestPost('inventory/delete', data).then(request => {
        const data = request.data.data;
        if (data) {
            Swal.fire({
                title: 'Product Deleted Successfully',
                icon: 'success',
                confirmButtonText: 'Confirm',
                confirmButtonColor: 'rgb(14 116 144)'
            }).then(() => {
                prodRef.value = ''
                qtyRef.value = ''
                getAllProducts();
                closeModalBtn.value.click()
            })
        }
        else {
            Swal.fire({
                title: 'Error!',
                text: 'Failed To Delete product',
                icon: 'info',
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
};
// update and add products
const addUpdateProduct = (prod, qty,id, update) => {
    let data = {
        userId: localStorage.getItem('id'),
        product: prod,
        qty: qty,
    }
    if (update) {
          data.id = id
          Swal.showLoading()
          axiosRequestPost('inventory/update', data).then(request => {
            const data = request.data.data;
            if (data) {
                Swal.fire({
                    title: 'Product Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'Confirm',
                    confirmButtonColor: 'rgb(14 116 144)'
                }).then(() => {
                    prodRef.value = ''
                    qtyRef.value = ''
                    getAllProducts();
                    closeModalBtn.value.click()
                })
            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed To Update product',
                    icon: 'info',
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
    } else {
        Swal.showLoading()
        axiosRequestPost('inventory/add', data).then(request => {
            const data = request.data.data;
            if (data) {
                Swal.fire({
                    title: 'Product Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'Confirm',
                    confirmButtonColor: 'rgb(14 116 144)'
                }).then(() => {
                    prodRef.value = ''
                    qtyRef.value = ''
                    getAllProducts()
                    closeModalBtn.value.click()
                })
            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed To Add product',
                    icon: 'info',
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

}


const logoutBtn = () => {
    localStorage.removeItem('auth')
    isAuth.value ? logout():
    router.push({ name: 'Login' })
};
</script>

<style></style>
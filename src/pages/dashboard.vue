<template>
    <div class="container mx-auto font-poppins absolute top-0 left-0 right-0 bottom-0">
        <div class="flex flex-col h-full items-center justify-center ">
            <div class="shadow-2xl rounded p-5">
                <h1 class="my-5 text-xl">Dashboard</h1>
                <div class="flex">
                    <inputComponent class="text-left" placeholder="Search..." tabindex="1" />
                    <buttonComponent data-te-toggle="modal" data-te-target="#openModal" class="w-56" tabindex="2"
                        text="Add Products" @click="isView(false)" />
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
                        <tbody>
                            <tr class="border-b dark:border-neutral-500">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">counter</td>
                                <td class="whitespace-nowrap px-6 py-4">Mark</td>
                                <td class="whitespace-nowrap px-6 py-4">23</td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <buttonComponent class="mx-1" text="delete" />
                                    <buttonComponent class="mx-1" text="view" @click="isView(true)" data-te-toggle="modal"
                                        data-te-target="#openModal" />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <!-- Pagination -->
                <nav aria-label="Page navigation ">
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
                </nav>
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
                    <h5 v-if="isOpen" class="text-xl font-medium leading-normal" id="exampleModalScrollableLabel">
                        Product
                    </h5>
                    <h5 v-else class="text-xl font-medium leading-normal" id="exampleModalScrollableLabel">
                        Add A Product
                    </h5>
                    <!--Close button-->
                    <button type="button"
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
                    <inputComponent class="text-center w-full" placeholder="Product Name" tabindex="1" Name="name" />
                    <inputComponent class="text-center w-full" placeholder="Quantity" tabindex="2" Name="qty"
                        Type="number" />
                </div>

                <!--Modal footer-->
                <div
                    class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">

                    <buttonComponent data-te-toggle="modal" data-te-target="#openModal" class="w-56" text="Save Changes"
                        tabindex="3" />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import inputComponent from '../components/input.vue';
import buttonComponent from '../components/button.vue';
import { ref } from 'vue'
import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";

const isOpen = ref(false)


export default {
    name: 'DashboardPage',
    components: {
        inputComponent,
        buttonComponent,
    }, methods: {
        isView(value) {
            isOpen.value = value;
        },
    },
    mounted() {
        initTE({ Modal, Ripple });
    },
    data() {
        return {
            isOpen: isOpen
        }
    }
}
</script>

<style></style>
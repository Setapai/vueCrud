<template>
    <button
        class="p-3 rounded shadow-lg float-right text-slate-600 bg-white outline-none focus:shadow-inner focus:bg-gray-100 hover:shadow-inner" v-bind="$attrs"
        tabindex={{tabIndex}}>{{text}}</button>
</template>


<script>
export default {
    name: "ButtonComponent",
    props: {
        text: String,
        tabIndex: String,
    }
}
</script>
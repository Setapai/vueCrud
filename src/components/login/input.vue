<template>
    <input class="shadow-lg p-3 outline-none text-center rounded focus:shadow-inner focus:bg-gray-100 hover:shadow-inner transition-all"
        placeholder={{placeHolder}} name={{name}} type={{type}} tabindex={{tabIndex}}>
</template>


<script>
export default {
    name: "InputComponent",
    props: {
        placeHolder: String,
        name: String,
        type: String,
        tabIndex: String,
    }
}
</script>
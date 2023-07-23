<template>
    <input class="shadow-lg p-3 outline-none rounded focus:shadow-inner focus:bg-gray-100 hover:shadow-inner transition-all" v-bind="$attrs"
    Name={{name}} Type={{type}} tabindex={{tabIndex}}    
    placeholder={{placeHolder}}>
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
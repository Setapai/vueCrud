<template>
    {{ text }}
    <span id="logo" v-bind="$attrs" />&nbsp;
    {{ text2 }}
</template>


<script>
export default {
    name: "iconComponent",
    props: {
        text: String,
        text2: String,
        image:  String
    }
}
</script>

<style scoped>
#logo {
    background: v-bind(image);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}
</style>
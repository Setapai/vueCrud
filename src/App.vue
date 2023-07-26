<template>
    <main class="bg-gray-100">
        <router-view/>
    </main>
</template>
<!-- Global Style -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
.font-poppins{
  font-family: 'Poppins', sans-serif;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>

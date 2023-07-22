<template>
    <main class="bg-gray-100">
      <Login/>
    </main>
</template>

<script>

// Import Login Child Here
import Login from './pages/login.vue'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<!-- Global Style -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
.font-poppins{
  font-family: 'Poppins', sans-serif;
}
</style>

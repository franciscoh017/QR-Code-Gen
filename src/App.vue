<template>
  <Navbar/>

  <main class="section">
    <Generator />
  </main>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Generator from '@/components/Generator.vue';
export default {
  components: {
    Navbar,
    Generator
  }
}
</script>

<style>

</style>
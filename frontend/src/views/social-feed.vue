<template>
  <main class="home card-grid site-block">
    <img-card v-for="(imges, index) in 80" :tagNum="index" />
  </main>
  
</template>

<script>


 import ImgCard from '@/cmps/img-card' 

export default {
  name: 'home',
  components: {
    ImgCard
  }
}
</script>

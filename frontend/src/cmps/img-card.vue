<template>
  <section class="card-img card">
    <img class="images" :src="`https://cataas.com/cat/${tags[tagNum]}`"/>

  </section>
</template>

<script>
export default {

  name: 'ImgCard',
 
  props: {
    tagNum: Number
  },

  data: () => {
    return {
      Images: null,
      tags: ['cute','funny', 'serious', 'white', 'gif', 'happy', 'sleeping', 'grumpy', 'old', 'fat','cute',  'funny', 'serious', 'white', 'gif', 'happy', 'sleeping', 'grumpy', 'old', 'fat','cute', 'funny', 'serious', 'white', 'gif', 'happy', 'sleeping', 'grumpy', 'old', 'fat','cute',  'funny', 'serious', 'white', 'gif', 'happy', 'sleeping', 'grumpy', 'old', 'fat','cute',  'funny', 'serious', 'white', 'gif', 'happy', 'sleeping', 'grumpy', 'old', 'fat','cute',  'funny', 'serious', 'white', 'gif', 'happy', 'sleeping', 'grumpy', 'old', 'fat','cute', 'funny', 'serious', 'white', 'gif', 'happy', 'sleeping', 'grumpy', 'old', 'fat','cute', 'funny', 'serious', 'white', 'gif', 'happy', 'sleeping', 'grumpy', 'old', 'fat','cute',  'funny', 'serious', 'white', 'gif', 'happy', 'sleeping', 'grumpy', 'old', 'fat']
    }
  }
}
</script>
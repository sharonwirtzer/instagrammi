<template>
  <header>

      <router-link to="/"> <span class="logo">Instagrammi</span> </router-link>
      <input type="text" placeholder=" search" class="search" />
      
<div  class="header-icon">

      <router-link to="/"
        ><img :src="require('@/assets/img/home.webp')" class="icon"
      /></router-link>

      <img @click="isShow = !isShow" :src="require('@/assets/img/messenger1.png')" class="icon" />

      <router-link to="/social-feed"
        ><img :src="require('@/assets/img/compass.png')" class="icon"
      /></router-link>

      <img @click="isShow = !isShow" :src="require('@/assets/img/4.png')" class="icon" />

      <router-link to="/user/60bcb3a035af92e3eaad7475"
        ><img :src="require('@/assets/img/dapne.jpeg')" class="icons"
      /></router-link>

   <div v-show="isShow">Hold tight, we're working on it! </div>

</div>
  </header>
</template>
<script>

export default {
  name: "ToggleDiv",
  data: function () {
    return {
      isShow: false
    };
  },
    created() {
            setTimeout(() => this.isShow = false, 1000)
        },

  props: {
    msg: String,
  },
};

</script>

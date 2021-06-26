<template>

   <img :src="post.postImgUrl" class="feed-image" />
   
</template>

<script>
export default {
  name: "myProfilePost",
  props: {
    post: Object,
  },
};
</script>



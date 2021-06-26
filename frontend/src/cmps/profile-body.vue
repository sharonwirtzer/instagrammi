<template>
  <div class="post-details">
    <div class="feed">
      <post-details
        @setPost="emitSetPost"
        :post="post"
        :key="post._id"
      >
      </post-details>
    </div> 
  </div>
</template>

<script>
import postDetails from "../cmps/post-details";
import filterType from "./filter-type";

export default {
  
  props: {
    post: Object,
  },
  methods: {
    emitSetPost(post) {
      this.$emit("setPost",post)
      
    },
  },
  components: {
    postDetails,
    filterType,
  },
};
</script>



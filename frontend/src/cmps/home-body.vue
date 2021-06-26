<template>
  <div class="home-body">
    <div class="feed" >
      <feed-post
        v-for="post in posts"
        @setPost="emitSetPost"
        @deletePost="emitDeletePost"
        :post="post"
        :key="posts.indexOf(post)"
      >
      </feed-post>
    </div>
  </div>
</template>

<script>
import feedPost from "../cmps/feed-post";
import filterType from "./filter-type";

export default {
  name: "homeBody",
  props: {
    step: Number,
    posts: Array,
    filters: Array,
    image: String,
    selectedFilter: String,
    value: String,
  },
  methods: {
    emitSetPost(post) {
      this.$emit("setPost",post)
    },
    emitDeletePost(postId){
      this.$emit("deletePost",postId)
    }
  },
  components: {
    feedPost,
    filterType,
  },
};
</script>



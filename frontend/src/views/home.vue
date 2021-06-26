<template>
  <div id="app">
    <home-body
      :step="step"
      :posts="posts"
      :image="image"
      :selectedFilter="selectedFilter"
      v-model="caption"
      @setPost="setPost"
      @deletePost="deletePost"
    />
  </div>
</template>

<script>
import homeBody from "@/cmps/home-body";
import { postService } from "../services/post.service";
import eventBus from "../event-bus";

export default {
  name: "Home",
  data() {
    return {
      step: 1,
      posts: [],
      image: "",
      selectedFilter: "",
      caption: "",
      postService,
    };
  },

  methods: {
    uploadImage(evt) {
      const files = evt.target.files;
      if (!files.length) return;

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (evt) => {
        this.image = evt.target.result;
        this.step = 2;
      };
    },
    async setPost(post) {
      try {
        const updatedPostProcess = await postService.update(post);
        const updatedPost = updatedPostProcess.data;
        this.posts = this.posts.map((currPost) =>
          currPost._id === updatedPost._id ? updatedPost : currPost
        );
      } catch (err) {
        console.log(
          "error while trying to update post from my-profile-app cmp: ",
          err
        );
        throw err;
      }
    },
    async deletePost(postId){  
    try {
      await postService.remove(postId);
      this.posts = this.posts.filter(({_id}) => _id !== postId)   
    } catch (err) {
      console.log('error while trzing to delete post from Home component: ',err)
      throw err
    }
    },

    goToHome() {
      this.image = "";
      this.selectedFilter = "";
      this.caption = "";
      this.step = 1;
    },
  },

  async mounted() {
    if (localStorage.posts) {
      this.posts = JSON.parse(localStorage.posts);
    }

    this.posts = await postService.query();
  },
  watch: {
    post: {
      handler(newPosts) {
        localStorage.posts = JSON.stringify(newPosts);
      },
      deep: true,
    },
  },
  created() {
    eventBus.$on("setPost", this.setPost);
    eventBus.$on('postUpdate', (updatedPost)=> {
      this.posts = this.posts.map((currPost) =>
          currPost._id === updatedPost._id ? updatedPost : currPost
        );
    })
  },
  components: {
    homeBody,
  },
};
</script>








<template>
  <div class="post-card">
    <div class="post-modal">
      <img :src="post.postImgUrl" class="post-card-img-url" @dblclick="like" />
      <div class="post-modal-right">
        <div class="header-card">
          <img :src="post.byUser.imgUrl" class="img-url" />
          <div class="username">
            <router-link class="my-username" :to="`/user/${post.byUser._id}`"
              >{{ post.byUser.username }}
            </router-link>
            <br />
            <span class="loc">{{ post.loc }}</span>
          </div>

          <div>
            <div v-if="!isHidden" class="delete-post1-d"></div>
            <h1 v-if="!isHidden" class="delete-post-d" @click="deletepost">
              Delete post
            </h1>
          </div>
          <img
            :src="require('@/assets/img/33.png')"
            v-on:click="isHidden = !isHidden"
            class="dots"
            height="15px"
          />
        </div>

        <div class="image-card" :class="post.filter">
          <div class="caption-card">
            <span class="username">{{ post.username }}</span>
            <span class="caption">{{ post.caption }}</span>

            <p
              v-for="(comment, idx) in post.comments"
              class="username"
              :key="idx"
            >
              {{ comment.by }}
              <span class="comment-txt">{{ comment.txt }}</span>
            </p>
          </div>

          <div class="content">
            <div class="heart">
              <i :class="{ fas: this.post.hasBeenLiked }" @click="like"> </i>
            </div>
          </div>
          <p class="likes-card">
            <img
              :class="post.filter"
              @click="like"
              class="himage"
              :src="currLikeImg"
              height="30"
            />

            <img
              class="post-actions"
              :src="require('@/assets/img/topic.png')"
              height="30"
            />

            <img
              class="post-actions"
              :src="require('@/assets/img/sent.png')"
              height="30"
            />

            <img
              class="card-save"
              :src="require('@/assets/img/save2.webp')"
              height="30"
            />
          </p>
        </div>

        <p class="username">{{ post.likes }} likes</p>

        <span class="created-at"> {{ moment(post.createdAt).fromNow() }}</span>

        <div class="card-comment">
          <img
            class="happy"
            :src="require('@/assets/img/happy.png')"
            height="30"
          />

          <input
            v-model="comment"
            type="text"
            class="commentin"
            placeholder="Add a comment..."
          />

          <button @click="addComment" class="Post" :disabled="!comment">
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    post: Object,
  },
  data() {
    return {
      myDate: null,

      comment: "",
      isHidden: true,
    };
  },

  methods: {
    moment,
    clearTextarea() {
      this.$refs.emoji.clear();
    },

    addComment() {
      this.$emit("setPost", {
        ...this.post,
        comments: [
          ...this.post.comments,
          { by: "daphné.picaudé", txt: this.comment },
        ],
      });
      this.comment = "";
    },
    like() {
      this.$emit("setPost", {
        ...this.post,
        likes: this.post.hasBeenLiked
          ? this.post.likes - 1
          : this.post.likes + 1,
        hasBeenLiked: !this.post.hasBeenLiked,
      });
    },
    async deletepost() {
      const post = this.post;
      const updatedPost = await postService.remove(post);
    },
  },
  computed: {
    currLikeImg() {
      const srcs = [
        "https://cdn-0.emojis.wiki/emoji-pics/twitter/red-heart-twitter.png",
        "https://image.flaticon.com/icons/png/512/20/20119.png",
      ];
      return this.post.hasBeenLiked ? srcs[0] : srcs[1];
    },
  },
};
</script>


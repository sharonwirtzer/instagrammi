 <template>
  <div class="container">
    <div class="profile-info">
      <img :src="user.imgUrl" class="my-image" />

      <div class="profile-user-settings">
        <h1 class="profile-user-name">{{ user.username }}</h1>

        <div>
          <ul class="profile-stats">
            <li><span class="profile-name">{{user.postid.length}}</span> posts</li>
            <li><span class="profile-name">{{user.followers.length}}</span> followers</li>
            <li><span class="profile-name">{{user.following.length}}</span> following</li>
          </ul>
        </div>

        <div class="profile-bio">
          <p class="profile-name">{{ user.username }}</p>
          <p>{{ user.bio }}</p>
        </div>
      </div>
    </div>
     <div class="loading" v-if="loading"><img :src="require('@/assets/img/loading.gif')">  </div>
<img src="">
    <div v-if="!showAddPostModal"  class="posts"> 
      <my-profile-post
        @click.native="
          visible = !visible;
          postToEdit = post;
        "
        v-for="post in userPosts"
        :post="post"
        :key="post"
      />

      <i @click="visible = !visible">
        <div class="screen" v-if="visible">
          <button class="back-btn">
            <img :src="require('@/assets/img/x.png')" height="30px" />
          </button>
          <profile-body
            @click.native.stop
            :post="postToEdit"
            :image="image"
            v-model="caption"
            @setPost="setPost"
          />
        </div>
      </i>
    </div> 

    <div class="screen" v-if="showAddPostModal">
      <div class="new-post1">
        <p class="new-post">
          New post

          <a class="go-to-home" v-if="showAddPostModal" @click="goToHome"
            ><img
              class="go-to-home"
              :src="require('@/assets/img/x.png')"
              height="30px"
            />
          </a>
        </p>
        <textarea
          class="caption-input"
          placeholder="Write a caption..."
          type="text"
          v-model="caption"
        >
        </textarea>
        <div
          class="selected-image"
          :style="{ backgroundImage: 'url(' + image + ')' }"
        ></div>
        <div class="new-post">
          <a class="checkmark" v-if="showAddPostModal" @click="sharePost"
            ><img :src="require('@/assets/img/checkmark.png')" height="30px" />
          </a>
        </div>
      </div>
    </div>

    <div class="home-cta" @click="goToHome">
      <i class=""></i>
    </div>
    <div class="upload-cta">
      <input
        type="file"
        name="file"
        id="file"
        class="inputfile"
        @change="uploadImage"
        :disabled="showAddPostModal"
      />
    </div>

    <label class="upload-img" for="file">
      <img :src="require('@/assets/img/add.png')" height="40px" />
    </label>
  </div>
</template>


<script>
import EventBus from "@/event-bus";
import myProfilePost from "@/cmps/my-profile-post";
import profileBody from "@/cmps/profile-body";
import { uploadImg } from "../services/img-upload.service.js";
import { userService } from "../services/user.service";
import { postService } from "../services/post.service.js";

export default {
  data() {
    return {
      loading: true,
      user: null,
      posts: null,
      showAddPostModal: false,
      image: "",
      selectedFilter: "",
      caption: "",
      visible: false,
      visible2: false,
      visible3: false,
      postToEdit: null,
    };
  },

  methods: {
    async uploadImage(evt) {
      const files = evt.target.files;
      if (!files.length) return;
this.loading= true;
      const res = await uploadImg(evt);
      console.log("onUploadImg -> res", res);

      this.image = res.url;
      this.showAddPostModal = true;
       this.loading= false;
      
    },

    async sharePost() {
      const post = {
        byUser: {
          _id: this.user._id ,
          imgUrl:this.user.imgUrl,
          username: this.user.username ,
        },
        postImgUrl: this.image,
        likes: 0,
        caption: this.caption,
        loc: "Tel Aviv, Israel",
        comments: [{ by: "", txt: "" }],
        createdAt: Date.now(),
      };
      const updatedPost = await postService.add(post);
      this.posts.unshift(post);
      this.loading= false;
      this.goToHome();
    },

    goToHome() {
      this.image = "";
      this.selectedFilter = "";
      this.caption = "";
      this.showAddPostModal = false;
    },
    setPost(post) {
      this.postToEdit = JSON.parse(JSON.stringify(post));
      postService.update(this.postToEdit);
    },
  },
  components: {
    myProfilePost,
    profileBody,
  },
  computed: {
    userPosts() {
       return this.posts;
    },
  },
  async created() {
    EventBus.$on("filter-selected", (evt) => {
      this.selectedFilter = evt.filter;
      
    });
    try {
      const { userId } = this.$route.params;
      this.user = await userService.getById(userId);
      Promise.all(["promise1", "promise2"]);
      const postsPrm = this.user.postid.map((currPostId) =>
        postService.getById(currPostId)
      );
      this.posts = await Promise.all(postsPrm);
      this.loading= false;
    } catch (err) {
      console.log("error while tryung to updated post: ", err);
      throw err;
    }
  },
  async mounted() {},
  watch: {
    posts: {
      handler(newPosts) {
        localStorage.posts = JSON.stringify(newPosts);
      },
      deep: true,
    },
  },
};
</script>
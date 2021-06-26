<template>
 <div id="app" class="main-layout">
    <app-header />
    <router-view/>
    <app-footer />
  </div>
</template>

<script>

import appHeader from './cmps/app-header'
import appFooter from './cmps/app-footer'
import {socketService} from './services/socket.service'
import { postService } from './services/post.service'
import EventBus from './event-bus'

export default {
  components: {
    appHeader,
    appFooter,
  },
  created(){
    socketService.setup()
    socketService.on('postUpdate', (updatedPost)=> {
      console.log(updatedPost)
      EventBus.$emit('postUpdate', updatedPost)
    })
  }
}
</script>


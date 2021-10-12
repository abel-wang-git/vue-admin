<template>
  <div class="mediaCard">
    <i v-if="media.resourceType===3" class="el-icon-folder" style="font-size: 100px" />
    <div
      v-if="media.resourceType===2"
      @mouseover="playerVideo(playerKey + media.resourceId)"
      @mouseleave="pauseVideo(playerKey + media.resourceId)"
    >
      <video-player
        v-if="media.resourceType===2"
        :ref="playerKey+media.resourceId"
        class="video-player vjs-custom-skin mediaImage"
        :playsinline="true"
        :options="playerOptions(media)"
      />
    </div>
    <img v-if="media.resourceType===1" :src="mediaUrl + media.resourceId" class="mediaImage">
    <span v-if="media.resourceUrl" style="text-align: center;width: 100px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
      {{ media.resourceUrl }}
    </span>
    <div v-else style="width: 100px;">
      <el-input v-model="resourceUrl" placeholder="请输入内容" @blur="saveMedias" />
    </div>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import { mediaUpload } from '@/api/media_resource'
export default {
  name: 'MediaCard',
  components: {
    videoPlayer
  },
  data() {
    return {
      resourceUrl: null
    }
  },
  props: {
    media: Object({}),
    playerKey: String('')
  },
  methods: {
    playerOptions(m) {
      return {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '1:1', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          src: this.mediaUrl + m.resourceId, // 路径
          type: 'video/mp4' // 类型
        }],
        poster: this.imgPrefix + m.videoCover, // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controls: false
      }
    },
    playerVideo(m) {
      this.$refs[m].player.play()
    },
    pauseVideo(m) {
      this.$refs[m].player.pause()
    },
    saveMedias() {
      if (this.resourceUrl) {
        const param = new FormData()
        param.append('resourceUrl', this.resourceUrl)
        param.append('pid', this.media.pid)
        param.append('resourceType', 3)
        mediaUpload(param).then(response => {
          this.media = response.data
        })
      }
    }
  }
}
</script>

<style scoped>
  .mediaImage{
    width: 90px;
    height: 90px;
  }
  .mediaCard{
    display: -webkit-flex; /* Safari */;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 10px 10px;
  }
</style>

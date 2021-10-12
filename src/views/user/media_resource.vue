<template>
  <div class="">
    <el-row />
    <div class="flex-wrap mediaPath">
      <div v-for="(p, index) in mediaPath" :key="p.resourceId" class="mediaPathItem" @dblclick="choosePath(p,index)">
        <div style="font-size: 18px">
          {{ p.resourceUrl }} <span style="padding: 0 10px">/</span>
        </div>
      </div>
      <el-button type="primary" size="mini" @click="addMediaType">添加分类</el-button>
    </div>
    <div class="flex-wrap">
      <div v-for="m in medias" :key="m.resourceId" @dblclick="chooseMedia(m)">
        <MediaCard player-key="medias" :media="m" />
      </div>
      <el-upload
        action="upload"
        class="avatar-uploader"
        :http-request="uploadMedia"
        :headers="headerObj"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeMediaUpload"
      >
        <i class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </div>
    <el-divider content-position="left">选择的图片</el-divider>
    <div class="flex-wrap">
      <div v-for="m in chooseMediasData" :key="m.resourceId" @dblclick="removeMedia(m)">
        <MediaCard player-key="choose" :media="m" />
      </div>
    </div>
    <div class="flex-wrap" style="justify-content: center">
      <el-button type="primary" @click="confirmChoose"> 确定</el-button>
    </div>
  </div>
</template>

<script>
import { mediaList, mediaUpload } from '@/api/media_resource'
import { getToken } from '@/utils/auth'
import 'video.js/dist/video-js.css'
import MediaCard from './media_card'

export default {
  components: {
    MediaCard
  },
  props: {
    chooseMedias: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      headerObj: {
        Authorization: 'Bearer ' + getToken()
      },
      resourceUrl: '',
      curreyMediaId: 0,
      mediaPath: [{ resourceId: 0, resourceUrl: 'root', resourceType: 3 }],
      form: {},
      medias: [],
      chooseMediasData: [],
      media: {}
    }
  },
  watch: {
    chooseMedias: function(v) {
      this.chooseMediasData = v
    }
  },
  created() {
    mediaList({ pid: 0 }).then(response => {
      this.medias = response.data
    })
  },
  methods: {
    uploadMedia(params) {
      console.log(params)
      const param = new FormData()
      param.append('file', params.file)
      param.append('pid', this.curreyMediaId)
      const isImage = params.file.type === 'image/jpeg' || params.file.type === 'image/png'
      const isVideo = params.file.type === 'video/mp4'
      if (isImage) {
        param.append('resourceType', 1)
      }
      if (isVideo) {
        param.append('resourceType', 2)
      }
      mediaUpload(param).then(response => {
        this.media = response.data
        this.medias.push(this.media)
      })
    },
    beforeMediaUpload(file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      const isVideo = file.type === 'video/mp4'
      const isLt2M = file.size / 1024 / 1024 < 100

      if (!isImage && !isVideo) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100MB!')
      }
      return (isImage || isVideo) && isLt2M
    },
    handleAvatarSuccess(res, file) {
      if (res.code !== 200) {
        this.$message.warning('上传失败')
        return
      }
    },
    addMediaType() {
      this.resourceUrl = ''
      this.media = { 'resourceUrl': '', 'resourceType': 3, pid: this.curreyMediaId }
      this.medias.push(this.media)
    },
    chooseMedia(m) {
      if (m.resourceType === 3) {
        this.curreyMediaId = m.resourceId
        this.mediaPath.push(m)
        mediaList({ pid: m.resourceId }).then(response => {
          this.medias = response.data
        })
      } else {
        if (!m.ischoose) {
          m.ischoose = true
          this.chooseMediasData.push(m)
        } else {
          this.removeMedia(m)
        }
      }
    },
    removeMedia(m) {
      m.ischoose = false
      this.chooseMediasData = this.chooseMediasData.filter(media => media.resourceId !== m.resourceId)
    },
    choosePath(p, index) {
      this.mediaPath = this.mediaPath.slice(0, index)
      this.chooseMedia(p)
    },
    confirmChoose() {
      this.$emit('chooseMedias', this.chooseMediasData)
    }
  }
}
</script>

<style scoped>
  .flex-wrap{
    display: -webkit-flex; /* Safari */;
    display: flex;
    flex-wrap: wrap
  }
  .mediaPath{
    padding-top: 10px;
    padding-bottom: 10px;
    user-select: none;
  }
  .avatar-uploader-icon{
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .avatar-uploader{
    padding: 10px 10px;
  }
  .mediaPathItem{
    cursor:pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

</style>

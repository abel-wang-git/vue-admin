<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <div class="step" :style="{'background-color': '#409EFF' }" @click="stepIndex = 1">商品信息</div>
      </el-col>
      <el-col :span="12">
        <div class="step" :style="{'background-color': stepIndex>1 ? '#409EFF' : '#909399'}" @click="stepIndex = 2">图文编辑</div>
      </el-col>
    </el-row>
    <el-divider />
    <el-tabs v-show="stepIndex === 1" v-model="activeName">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-form>
          <el-form-item label="商品名称">
            <el-input v-model="form.commodityName" />
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              ref="categoryCascade"
              v-model="form.categoryId"
              clearable
              collapse-tags
              :options="categoryList"
              :props="{value: 'categoryId', label: 'categoryName', emitPath:false }"
            />
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-cascader
              ref="categoryCascade"
              v-model="form.merchantCategoryId"
              clearable
              collapse-tags
              :options="merchantCategories"
              :props="{ value: 'merchantCategoryId', label: 'categoryName', emitPath:false }"
            />
          </el-form-item>
          <el-form-item label="商品类型">
            <el-radio v-model="form.commodityType" label="1">实物</el-radio>
            <el-radio v-model="form.commodityType" label="2">虚拟物品</el-radio>
          </el-form-item>
          <el-form-item label="减库存方式 ">
            <el-radio v-model="form.stockMode" label="1">下单立减</el-radio>
            <el-radio v-model="form.stockMode" label="2">付款减库存</el-radio>
          </el-form-item>
          <el-form-item label="商品状态 ">
            <el-radio v-model="form.state" label="1">发布</el-radio>
            <el-radio v-model="form.state" label="2">不发布</el-radio>
          </el-form-item>
          <el-form-item label="轮播图" />
          <div style="display: -webkit-flex; /* Safari */;display: flex; flex-wrap: wrap">
            <div v-for="s in form.slide" :key="s.resourceId">
              <MediaCard :media="s" />
            </div>
            <div class="add_media_resource" @click="mediaResourceVisible = true">
              <i class="el-icon-plus" />
            </div>
          </div>
        </el-form>
        <el-button @click="saveCommodity">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="价格库存" name="sku">
        <sku :commodity-id="form.commodityId" />
      </el-tab-pane>
      <el-tab-pane label="物流设置" name="logistics">
        <el-form>
          <el-form-item label="运费模版">
            <el-select v-model="form.carriageTemplateId" />
            <el-button type="text" @click="addCarriageTemplate">添加运费模版</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="服务设置" name="fourth">服务设置</el-tab-pane>
    </el-tabs>
    <el-tag v-show="stepIndex === 2">标签一</el-tag>
    <el-dialog title="媒体资源" :visible.sync="mediaResourceVisible" width="60%">
      <MediaResource :choose-medias="form.slide" @chooseMedias="chooseMedia" />
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import MediaResource from '../user/media_resource'
import MediaCard from '../user/media_card'
import Sku from './sku'
import { categoryList } from '@/api/category'
import { merchantCategoryList } from '@/api/category'
import { commoditySave } from '@/api/commodity'

export default {
  components: { MediaCard, MediaResource, Sku },
  data() {
    return {
      headerObj: {
        Authorization: 'Bearer ' + getToken()
      },
      activeName: 'logistics',
      isCollapse: true,
      mediaResourceVisible: false,
      stepIndex: 1,
      categoryList: [],
      merchantCategories: [],
      form: {
        slide: []
      },
      sku: {
        spaceAttributes: [
          {}
        ]
      }
    }
  },
  mounted() {
    categoryList().then(response => {
      this.categoryList = response.data
    })
    merchantCategoryList().then(response => {
      this.merchantCategories = response.data
    })
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.$set(this.form, 'avatar', res.data)
    },
    chooseMedia(e) {
      this.form.slide = e
      this.mediaResourceVisible = false
    },
    saveCommodity() {
      commoditySave(this.form).then(response => {
        this.$set(this.form, 'commodityId', response.data)
        this.activeName = 'sku'
      })
    },
    addCarriageTemplate() {
      const routeData = this.$router.resolve({
        path: '/carriage/list'
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped>
  .step{
    text-align: center;
    padding: 10px 0;
    border-radius: 40px 0;
    color: white;
  }
  .add_media_resource{
    margin: 10px;
    width: 100px;
    height: 100px;
    border-radius: 20px;
    border: #1f2d3d dashed 1px;
    font-size: 50px;
    text-align: center;
    line-height: 100px;
  }
</style>

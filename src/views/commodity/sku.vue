<template>
  <el-form :inline="true">
    <el-divider content-position="left">规格属性</el-divider>
    <el-card v-for="(attr, index) in sku.spaceAttributes" :key="index" class="box-card" shadow="never" :body-style="{ padding: '10px' }">
      <div slot="header" class="clearfix">
        <el-form-item label-width="200px" style="margin-bottom:0">
          <el-input v-model="attr.attributeNameTemp" size="small" @input="inputAttributeName(attr,index)" />
        </el-form-item>
        <el-button type="text" @click="addSpecsValue(attr,index)">添加规格值</el-button>
        <el-button type="text" style="color: red" @click="removeSpecs(index)">删除规格属性</el-button>
      </div>
      <div class="specs-attribute">
        <div v-for="(attrValue, vIndex) in attr.value" :key="'v'+vIndex" class="specs-attribute-item">
          <el-form-item label-width="200px" style="margin-bottom:0">
            <el-input v-model="attrValue.attributeValue" size="small" @input="inputValue(attr,index,vIndex)" />
          </el-form-item>
          <i v-if="vIndex!==0" class="el-icon-delete" @click="removeValue(attr ,vIndex,index)" />
        </div>
      </div>
    </el-card>
    <div style="text-align: center">
      <el-button type="text" @click="addSpecsAttr">添加规格属性</el-button>
    </div>
    <el-divider content-position="left">规格明细</el-divider>
    <div style="padding: 10px">
      <table class="specs-table">
        <tr>
          <th v-for="(sa, k) in sku.spaceAttributes" :key="'k'+k">
            {{ sa.attributeName }}
          </th>
          <th>
            价格
          </th>
          <th>库存</th>
          <th>重量</th>
          <th>成本价</th>
          <th>图片</th>
        </tr>
        <tr v-for="(s,i) in sku.specs" :key="'attr'+i">
          <td v-for="(sv, j) in s.skuAttributeValue" :key="'j'+j">
            {{ sv.attributeValue }}
          </td>
          <td v-for="i in specsName" :key="'td'+i">
            <el-input v-model="s[i]" class="specs-input" @input="$forceUpdate()" />
          </td>
        </tr>
      </table>
    </div>
    <div style="text-align: center">
      <el-button type="primary" @click="saveSku()">下一步</el-button>
      <div style="display: none">
        {{ specs }}
      </div>
    </div>
  </el-form>
</template>

<script>
import { commoditySkuSave } from '@/api/commodity'
export default {
  props: {
    commodityId: Number(0)
  },
  data() {
    return {
      sku: {
        spaceAttributes: [],
        specs: []
      },
      specsName: [
        'specsImage',
        'specsStock',
        'costPrice',
        'specsPrice',
        'weight'
      ]
    }
  },
  computed: {
    specs() {
      return this.computedSpecs()
    }
  },
  methods: {
    addSpecsValue(attr, index) {
      if (attr.value) {
        this.$set(attr.value, attr.value.length, { attributeId: attr.attributeId, attributeName: attr.attributeName })
      } else {
        attr.value = []
        this.$set(attr.value, 0, { attributeId: attr.attributeId, attributeName: attr.attributeName })
      }
      this.$set(this.sku.spaceAttributes, index, attr)
      this.$forceUpdate()
    },
    addSpecsAttr() {
      if (this.commodityId === 0) {
        this.$message('请先保存')
        return
      }
      this.$set(this.sku.spaceAttributes, this.sku.spaceAttributes.length, { commodityId: this.commodityId })
    },
    removeSpecs(index) {
      this.sku.spaceAttributes.splice(index, 1)
      this.$forceUpdate()
    },
    removeValue(attr, vIndex, index) {
      attr.value.splice(vIndex, 1)
      this.$set(this.sku.spaceAttributes, index, attr)
      this.$forceUpdate()
    },
    saveSku() {
      this.sku.specs = this.specs
      commoditySkuSave(this.sku).then(response => {
        this.sku = response.data
      })
    },
    inputValue(attr, index, vIndex) {
      var identical = attr.value.some((v, i) => {
        return vIndex !== i && v.attributeValue === attr.value[vIndex].attributeValue
      })
      if (!identical) {
        this.$set(this.sku.spaceAttributes, index, attr)
      } else {
        this.$message('存在相同的规格')
      }
    },
    inputAttributeName(attr, index) {
      var identical = this.sku.spaceAttributes.some((v, i) => {
        return index !== i && v.attributeName === this.sku.spaceAttributes[index].attributeNameTemp
      })
      if (!identical) {
        attr.attributeName = attr.attributeNameTemp
        if (attr.value) {
          attr.value.forEach((a) => {
            a.attributeName = attr.attributeName
            a.commodityId = this.commodityId
          })
        }
        this.$set(this.sku.spaceAttributes, index, attr)
      } else {
        attr.attributeName = ''
        this.$message('存在相同的属性')
      }
    },
    computedSpecs() {
      const specs = []
      this.sku.spaceAttributes.forEach((attr, index) => {
        if (attr.value) {
          specs.push(attr.value)
        }
      })
      if (specs.length === 0) {
        this.sku.specs = []
        return []
      }

      var newSpace = this.cartesianProduct(specs).map(function(i) {
        return { 'skuAttributeValue': i, specsName: i.map(function(s) { return s.attributeName + ':' + (s.attributeValue || '') + ';' }).join('') }
      })
      console.log('生产' + JSON.stringify(newSpace))
      console.log('旧的' + JSON.stringify(this.sku.specs))
      const n = newSpace.map((spec) => {
        // 之前存在的规格要做到回显
        for (let i = 0; i < this.sku.specs.length; i++) {
          // 判断属性数组是否相同
          var identical = this.equalAttribute(this.sku.specs[i].skuAttributeValue, spec.skuAttributeValue)

          if (identical) {
            spec = this.sku.specs[i]
          }
        }
        return spec
      })
      this.sku.specs = JSON.parse(JSON.stringify(n))
      return n
    },
    cartesianProduct(arr) {
      if (!arr) return
      return arr.reduce(function(a, b) {
        return a.map(function(x) {
          return b.map(function(y) {
            return x.concat([y])
          })
        }).reduce(function(a, b) { return a.concat(b) }, [])
      }, [[]])
    },
    equalAttribute(a, b) {
      if (a.length !== b.length) {
        return false
      }
      var isEqual = a.every((ai) => {
        return b.some((bi) => {
          return ai.attributeName === bi.attributeName && ai.attributeValue === bi.attributeValue
        })
      })
      console.log(JSON.stringify(a) + '==' + JSON.stringify(b) + ' return ' + isEqual)
      return isEqual
    }
  }
}
</script>

<style scoped>
  .specs-attribute{
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction: row;
    flex-wrap: wrap;
  }
  .el-card /deep/ .el-card__header {
    padding: 10px;
  }
  .specs-attribute-item{
    align-items: center;
    display: flex;
    margin-right: 10px;
  }
  .specs-table{
    min-height: 25px;
    line-height: 25px;
    text-align: center;
    border-collapse: collapse;
    border-radius: 4px;
    border-style:hidden;
    box-shadow: 0 0 0 1px #d8d8d8;
    width: 100%;
    box-sizing: border-box;
  }
  .specs-table td {
    text-align: center;
    height: 10px;
    border: 1px solid #d8d8d8;
    font-size: 14px;
  }
  .specs-table th {
    min-width: 100px;
    text-align: center;
    border: 1px solid #d8d8d8;
    padding: 0 10px;
    font-size: 14px;
  }
  /deep/ .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
</style>

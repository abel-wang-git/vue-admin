<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>
    <form method="POST" name="ePayment" action="https://payment.ipay88.com.my/ePayment/entry.asp">
      <input name="MerchantCode" value="M35397"><br>

      <input name="PaymentId" value="2"><br data-tomark-pass>

      <input name="RefNo" value="27"><br data-tomark-pass>

      <input name="Amount" value="100.00"><br data-tomark-pass>

      <input name="Currency" value="MYR"><br data-tomark-pass>

      <input name="ProdDesc" value="RechargeOrder"><br data-tomark-pass>

      <input name="UserName" value="test124"><br data-tomark-pass>

      <input name="UserEmail" value="test124@gmail.com"><br data-tomark-pass>

      <input name="UserContact" value="18235404640"><br data-tomark-pass>

      <input name="Remark" value="RechargeOrder"><br data-tomark-pass>

      <input name="Lang" value="UTF-8"><br data-tomark-pass>

      <input name="SignatureType" value="SHA256"><br data-tomark-pass>

      <input name="ResponseURL" value="https://user.bountee.com.my/#/"><br data-tomark-pass>

      <input name="BackendURL" value="http://api.bountee.com.my/api/recharge/order/payment/callback"><br data-tomark-pass>

      <input name="Signature" value="06248e8479ba686cb19e16cce62af045c1b96fa15c5a0cc87f1c2d29cdb2bd3e"><br data-tomark-pass>

      <input type="submit" value="提交"/>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

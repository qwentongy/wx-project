<template>
  <view>
    <view class="account">
      <!-- 选中按钮 -->
      <label class="radio">
        <radio :checked='isCheckoutAll' color="#c00000" @click="changeChecked" /><text>全选</text>
      </label>
      <view class="price">
        <text>总金额:</text>
        <text class="price-color">{{cartPrice}}</text>
      </view>
      <!-- 结算按钮 -->
      <view class="settle" @click="settleButton">
        结算({{cartChecked}})
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {

      };
    },
    methods: {
      ...mapMutations('cart', ['updateGoodsStateAll']),
      changeChecked() {
        this.updateGoodsStateAll(!this.isCheckoutAll)
      },
      settleButton() {

      },

    },
    computed: {
      ...mapGetters('cart', ['cartChecked', 'cartCount', 'cartPrice']),
      isCheckoutAll() {
        return this.cartCount == this.cartChecked
      }
    }
  }
</script>

<style lang="scss">
  .account {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 80rpx;
    background-color: aqua;
    align-items: center;
    padding: 0 5rpx;
    font-size: 15px;


    .price {
      .price-color {
        color: #c00000;
      }
    }

    .settle {
      background-color: #c00000;
      height: 80rpx;
      padding: 0 50rpx;
      line-height: 80rpx;
    }
  }
</style>

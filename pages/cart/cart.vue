<template>
  <view>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <!-- 商品列表区域 -->
    <block>
      <my-goods :goodsList="cartInfo" :showRadio="true" @radio-change="radioChangeHandler"></my-goods>
    </block>
  </view>
</template>

<script>
  import tabBar_badge from '@/mixins/tabbar-badge.js'
  import {
    mapMutations
  } from "vuex"
  import {
    mapState
  } from 'vuex'

  export default {
    data() {
      return {}
    },
    mixins: [tabBar_badge],
    computed: {
      ...mapState('cart', ['cartInfo'])
    },
    methods: {
      ...mapMutations('cart', ['updateGoodsState']),
      // 商品的勾选状态发生了变化
      radioChangeHandler(e) {
        // console.log(e) // 输出得到的数据 -> {goods_id: 395, goods_state: false}
        this.updateGoodsState(e)
      },
    }
  }
</script>

<style lang="scss">
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }

  .goods-item-left {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
</style>

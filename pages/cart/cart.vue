<template>
  <view class="cart-container" v-if="cartInfo.length !== 0">
    <!-- 收获地址 -->
    <my-address></my-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <!-- 商品列表区域 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cartInfo" :key="i"
        :url="`/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`">
        <uni-swipe-action-item :right-options="options" @click="tellDeleteGoods(goods)" :auto-close="autoClose">
          <my-goods :goods="goods" :showRadio="true" @radio-change="radioChangeHandler"
            @changeGoodsCount="changeGoodsCount"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>

    <!-- 结算区域 -->
    <my-settle></my-settle>


  </view>

  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import tabBar_badge from '@/mixins/tabbar-badge.js'
  import {
    mapMutations,
    mapState
  } from "vuex"

  export default {
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: 'red'
          }
        }]
      }
    },
    mixins: [tabBar_badge],
    computed: {
      ...mapState('cart', ['cartInfo'])
    },
    methods: {
      ...mapMutations('cart', ['updateGoodsState', 'updataGoodsCount', 'deleteGoods']),
      // 商品的勾选状态发生了变化
      radioChangeHandler(e) {
        // console.log(e) // 输出得到的数据 -> {goods_id: 395, goods_state: false}
        this.updateGoodsState(e)
      },
      changeGoodsCount(e) {
        this.updataGoodsCount(e)
      },
      tellDeleteGoods(e) {
        console.log(e);
        this.deleteGoods(e)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 80rpx;
  }

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


  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>

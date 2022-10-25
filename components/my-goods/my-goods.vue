<template>
  <view>
    <view class="goods-list">
      <block v-for="(goods, i) in goodsList" :key="i">
        <navigator class="goods-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`">
          <!-- 商品左侧图片区域 -->
          <view class="goods-item-left">
            <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click.stop="radioClickHandler(goods)">
            </radio>
            <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
          </view>
          <!-- 商品右侧信息区域 -->
          <view class="goods-item-right">
            <!-- 商品标题 -->
            <view class="goods-name">{{goods.goods_name}}</view>
            <view class="goods-info-box">
              <!-- 商品价格 -->
              <view class="goods-price">￥{{goods.goods_price}}</view>
              <uni-number-box @change="changeValue" v-if="showRadio" v-model="goods.goods_count" />
            </view>
          </view>
        </navigator>
      </block>
    </view>
  </view>
</template>

<script>
  import {
    mapMutations
  } from "vuex"
  export default {
    data() {
      return {
        // 商品列表的数据
        goodsList: [],
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      };
    },
    props: {
      goodsList: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      // radio 组件的点击事件处理函数
      radioClickHandler(goods) {
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
        this.$emit('radio-change', {
          // 商品的 Id
          goods_id: goods.goods_id,
          // 商品最新的勾选状态
          goods_state: !goods.goods_state
        })
      },
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

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

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        display: flex;
        justify-content: space-between;

        .goods-price {
          font-size: 16px;
          color: #c00000;
        }
      }

    }
  }
</style>

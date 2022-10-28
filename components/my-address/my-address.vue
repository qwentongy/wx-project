<template>
  <view>
    <view class="address-choose-box" v-if="JSON.stringify(address) ==='{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
    </view>

    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：<text>{{address.userName}}</text></view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：<text>{{address.telNumber}}</text></view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addstr}}</view>
      </view>
    </view>

    <img class="img" src="/static/cart_border@2x.png" alt="" srcset="">
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapGetters
  } from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {
        // addresss: {}
      };
    },
    methods: {
      ...mapMutations('user', ['updataAddress']),
      async chooseAddress() {
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        // console.log(succ);
        if (err === null && succ.errMsg === 'chooseAddress:ok') {
          // 为 data 里面的收货地址对象赋值
          // this.address = succ
          // console.log(this.addres);
          this.updataAddress(succ)
        }
      },

    },
    computed: {
      ...mapState('user', ['address']),
      ...mapGetters('user', ['addstr'])
      // 收货详细地址的计算属性

    }
  }
</script>

<style lang="scss">
  .img {
    width: 100%;
    height: 8rpx;
  }

  .address-choose-box {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  // 渲染收货信息的盒子
  .address-info-box {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;

    // 第一行
    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-right {
        display: flex;
        align-items: center;

        .phone {
          margin-right: 5px;
        }
      }
    }

    // 第二行
    .row2 {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
      }
    }
  }
</style>

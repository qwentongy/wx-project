<template>
  <view>
    <view class="search-button">
      <search-button @click="showSearch"></search-button>
    </view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="swiper in swiperList" :key="swiper.goods_id">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + swiper.goods_id">
          <img :src="swiper.image_src" alt="">
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航栏 -->
    <view class="nav">
      <view v-for="(nav,index) in navList" :key="index" class="nav-item" @click="navClickHandle(nav)">
        <img :src="nav.image_src" alt="">
      </view>
    </view>
    <!-- 楼层 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
              mode="widthFix"></image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0"
              :url="item2.url">
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import tabBar_badge from '@/mixins/tabbar-badge.js'
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    mixins: [tabBar_badge],
    mounted() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        try {
          const {
            data: res
          } = await uni.$http.get('/api/public/v1/home/swiperdata')
          this.swiperList = res.message
        } catch (e) {
          //TODO handle the exception
          uni.$showMsg()
        }
      },
      async getNavList() {
        try {
          const {
            data: res
          } = await uni.$http.get('/api/public/v1/home/catitems')
          this.navList = res.message
        } catch (e) {
          //TODO handle the exception
          uni.$showMsg()
        }
      },
      async getFloorList() {
        try {
          const {
            data: res
          } = await uni.$http.get('/api/public/v1/home/floordata')
          // 通过双层 forEach 循环，处理 URL 地址
          res.message.forEach(floor => {
            floor.product_list.forEach(prod => {
              prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
            })
          })
          this.floorList = res.message
        } catch (e) {
          //TODO handle the exception
          uni.$showMsg()
        }
      },
      navClickHandle(nav) {
        if (nav.name == '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      showSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-button {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  // 轮播图
  swiper {
    height: 330rpx;

    .swiper-item,
    img {
      width: 100%;
      height: 100%;
    }
  }

  // 导航栏
  .nav {
    display: flex;
    justify-content: space-around;

    .nav-item {
      width: 150rpx;
      height: 160rpx;
      margin: 10rpx 0;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  // 楼层
  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
</style>

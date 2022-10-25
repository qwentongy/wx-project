<template>
  <view>
    <search-button @click="showSearch"></search-button>
    <view class="scroll-view-container">
      <!-- 左侧滑动区域 -->
      <scroll-view :scroll-y="true" class="left-scroll-view" :style="{height: wh + 'px'}">
        <view :class="['left-scroll-view-item',active == index?'active':'']" v-for="(category,index) in categoryList"
          :key="index" @click="changeActive(index)">
          {{category.cat_name}}
        </view>
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view :scroll-y="true" class="right-scroll-view" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="right-scroll-view-item">
          <view class="right-scroll-view-item-header">
            {{categoryList[active].cat_name}}
          </view>
          <view class="right-scroll-view-item-body" v-for="(category2,index) in categoryList[active].children"
            :key="index">
            <view class="category2-title">{{category2.cat_name}}</view>
            <navigator class="category3" v-for="category3 in category2.children" :key="category3.cat_id"
              :url="`/subpkg/goods_detail/goods_detail?goods_id=${category3.cat_id}`">
              <img :src="category3.cat_icon.replace('dev','web')" alt="">
              <view>{{category3.cat_name}}</view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import tabBar_badge from '@/mixins/tabbar-badge.js'
  export default {
    data() {
      return {
        wh: 0,
        categoryList: [],
        active: 0,
        scrollTop: 0
      };
    },
    mixins: [tabBar_badge],
    mounted() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight - 50
      this.getCategoryList()
    },
    methods: {
      async getCategoryList() {
        try {
          const {
            data: res
          } = await uni.$http.get('/api/public/v1/categories')
          this.categoryList = res.message
        } catch (e) {
          //TODO handle the exception
          uni.$showMsg()
        }
      },
      changeActive(index) {
        this.active = index,
          this.scrollTop = this.scrollTop === 0 ? 1 : 0
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
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 300rpx;
      // background-color: gray;

      .left-scroll-view-item {
        width: 100%;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;

        &.active {
          background-color: pink;
        }
      }
    }

    .right-scroll-view {
      .right-scroll-view-item-header {
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        padding: 15px 0;
      }

      .right-scroll-view-item-body {
        display: flex;
        flex-wrap: wrap;

        .category2-title {
          width: 100%;
          margin: 35rpx;
        }


        .category3 {
          width: 33.33%;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;

          img {
            width: 60px;
            height: 60px;
          }
        }
      }
    }
  }
</style>

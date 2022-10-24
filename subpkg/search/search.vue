<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar :focus="true" radius="100" cancelButton="none" @input="gitSearchValue">
      </uni-search-bar>
    </view>
    <!-- 搜索结果 -->
    <view class="search-result" v-for="searchResultItem in searchResult" :key="searchResultItem.goods_id"
      v-if="searchResult.length !==0">
      <navigator class="search-result-item"
        :url="`/subpkg/goods_detail/goods_detail?goods_id=${searchResultItem.goods_id}`">
        {{searchResultItem.goods_name}}
      </navigator>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-if="searchResult.length == 0">
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in historys" :key="i"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        searchValue: '',
        timer: null,
        searchResult: [],
        searchHistory: JSON.parse(uni.getStorageSync('search-history')) || [],
        show: false
      };
    },
    methods: {
      gitSearchValue(value) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.searchValue = value
          this.getSearchResult()
        }, 500)
      },
      async getSearchResult() {
        if (this.searchValue == '') {
          this.searchResult = []
          return
        }
        try {
          const {
            data: res
          } = await uni.$http.get('/api/public/v1/goods/qsearch', {
            query: this.searchValue
          })
          this.searchResult = res.message,
            this.searchHistory.push(this.searchValue)
        } catch (e) {
          //TODO handle the exception
          uni.$showMsg()
        }
      },
      clearHistory() {
        this.searchHistory = []
        uni.setStorageSync('search-history', '')
      },

    },
    computed: {
      historys() {
        // reverse()先将数组翻转,先翻转是为了把后面添加的值翻转到前面
        // 若有重复再利用set数据去重,去重会将后重复的数去除
        const historys = [...new Set([...this.searchHistory].reverse())]
        uni.setStorageSync('search-history', JSON.stringify(historys))
        return historys
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .search-result {
    // background-color: pink;

    .search-result-item {
      width: 100%;
      height: 50rpx;
      line-height: 50rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 6rpx;
      padding: 26rpx 0;
      border-bottom: 1px solid #efefef;

      &:hover {
        background-color: pink;
      }
    }
  }


  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>

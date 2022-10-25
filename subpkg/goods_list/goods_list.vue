<template>
  <view>
    <my-goods :goodsList='goodsList'></my-goods>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        // 商品列表的数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        // 节流阀
        isLoading: false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    onReachBottom() {
      if (this.queryObj.pagesize * this.queryObj.pagenum >= this.total) return uni.$showMsg('没有更多商品了')
      if (this.isLoading) return
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.goodsList = []
      this.total = 0
      this.getGoodsList()
      uni.stopPullDownRefresh()
    },
    methods: {
      // 获取商品列表数据的方法
      async getGoodsList() {
        this.isLoading = true
        // 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
        // 为数据赋值
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
        this.isLoading = false
      },

    }
  }
</script>

<style lang="scss">
</style>

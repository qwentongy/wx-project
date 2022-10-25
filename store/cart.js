export default {
  namespaced: true,

  state: {
    // 拿数据一定记得转化回来
    cartInfo: JSON.parse(uni.getStorageSync('cartInfo')) || []
  },

  mutations: {
    addCart(state, goodsInfo) {
      const findResult = state.cartInfo.find(x => x.goods_id == goodsInfo.goods_id)
      // console.log(findResult)
      if (!findResult) {
        state.cartInfo.push(goodsInfo)
      } else {
        findResult.goods_count++
      }
      // 存数据一定记得用JSON.stringify
      uni.setStorageSync('cartInfo', JSON.stringify(state.cartInfo))
    },
    // 更新购物车中商品的勾选状态
    updateGoodsState(state, goods) {
      // 根据 goods_id 查询购物车中对应商品的  信息对象
      const findResult = state.cartInfo.find(x => x.goods_id === goods.goods_id)

      // 更新对应商品的勾选状态
      findResult.goods_state = goods.goods_state
      // 持久化存储到本地
      uni.setStorageSync('cartInfo', JSON.stringify(state.cartInfo))

    },
    // 更新购物车中商品的购买数量
    // updataGoodsCount(state, goods) {
    //   const findResult = state.cartInfo.find(x => x.goods_id === goods.goods_id)
    //   findResult.goods_count = goods.goods_count
    //   uni.setStorageSync('cartInfo', JSON.stringify(state.cartInfo))
    // }
  },



  getters: {
    cartCount(state) {
      let c = 0
      // 循环统计商品的数量，累加到变量 c 中
      // console.log(this.cartInfo);
      state.cartInfo.forEach(goods => c += goods.goods_count)
      return c
    }
  }
}

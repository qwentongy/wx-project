<template>
  <view>
    <button @click="onTableModel">三级表格</button>
  </view>
</template>

<script>
  import tabBar_badge from '@/mixins/tabbar-badge.js'
  import TableModel from '@/pages/my/table_model/table_model.vue'
  export default {
	  mixins: [tabBar_badge],
	  components: {
		  TableModel
	  },
    data() {
      return {

      };
    },
    methods: {
		onTableModel() {
			uni.navigateTo({
				url: '/pages/my/table_model/table_model'
			})
		}
	}
  }
</script>

<style lang="scss">

</style>

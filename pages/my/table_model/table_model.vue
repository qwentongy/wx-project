<template>
	<view>
		<view class="table">
			<view class="tr" v-for="(item,index) in tableData" :key="index" @click="openProduct(index)">
				<view class="td">{{item[0].a}}</view>
				<view class="td">{{item[0].b}}</view>
				<view class="td">{{item[0].c}}</view>
				<view class="tr" v-for="(product,index) in item[1]" :key="index" @click.stop="openColor(index)">
					<view class="td">{{product.name}}</view>
					<view class="td">{{product.b}}</view>
					<view class="td">{{product.c}}</view>
					<view v-if="product.name == color.b" class="tr" v-for="(color,index) in item[2]" :key="index">
						<view class="td">{{color.name}}</view>
						<view class="td">{{color.b}}</view>
						<view class="td">{{color.c}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				tableData:[
					{a:1,b:2,c:3},
					{a:4,b:5,c:6},
					{a:7,b:8,c:9},
				],
				productData: [
					{name:'产品1',b:666,c:666},
					{name:'产品2',b:666,c:666},
				],
				productColorSizeData: [
					{name:'颜色1',b:'产品2',c:666},
					{name:'颜色2',b:'产品2',c:666},
				],
				temp: [],
			};
		},
		onLoad() {
			this.tableData = this.tableData.map(item => {
				return [item,this.temp,this.temp]
			})
			console.log(this.tableData);
		},
		methods: {
			openProduct(index) {
				console.log(index);
				this.$set(this.tableData[index],1,this.productData)
			},
			openColor(index) {
				console.log(index);
				console.log(this.tableData[index]);
				this.$set(this.tableData[index],2,this.productColorSizeData)
			}
		}
	}
</script>

<style lang="scss">
.table {
	.tr {
		display: flex;
		flex-wrap: wrap;
		.td {
			box-sizing: border-box;
			border-right: 1px solid black;
			border-bottom: 1px solid black;
			width: 33%;
			height: 60upx;
			line-height: 60upx;
			text-align: center;
		}
		.tr {
			width: 100vw;
		}
	}
}
</style>

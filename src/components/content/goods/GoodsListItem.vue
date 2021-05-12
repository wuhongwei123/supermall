<template>
  <div class="goods-item" >
      <img :src="showImage" alt="" @click="itemClick">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
      goodsItem: {
          type: Object,
          default() {
            return  {}
          }
      }
  },
  methods: {
      imgLoad() {
        if (this.$route.path.indexOf('/home')) {
            this.$bus.$emit('itemImgLoad')
        } else if (this.$route.path.indexOf('/detail')) {
            this.$bus.$emit('detailItemImgLoad')
        }
      },
      itemClick() {
          this.$router.push({ path: `/detail/${this.goodsItem.iid}` })
        //   console.log(this.goodsItem.iid)
      }
  },
  computed: {
      showImage() {
          return this.goodsItem.image || this.goodsItem.show.img
      }
  }
}
</script>

<style scoped>
  .goods-item {
      padding-bottom: 40px;
      position: relative;
      width: 45%;
  }

  .goods-item img {
      width: 100%;
      border-radius: 5px;
  }

  .goods-info {
      font-size: 12px;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      overflow: hidden;
      text-align: center;
  }

  .goods-info p{
      overflow: hidden;
      /* 溢出部分以省略号显示 */
      text-overflow: ellipsis;
      /* 段落文本不进行换行 */
      white-space: nowrap;
      margin-top: 3px;
  }

  .goods-info .price {
      color: var(--color-high-text);
      margin-right: 20px;
  }

  .goods-info .collect {
      position: relative;
  }

  .goods-info .collect::before {
      content: '';
      position: absolute;
      left:-15px;
      top: -1px;
      width: 14px;
      height: 14px;
      background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }


</style>
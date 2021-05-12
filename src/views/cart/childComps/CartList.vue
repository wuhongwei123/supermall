<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">     
      <cart-list-item v-for="(item,index) in cartList" 
      :key="index"
      :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from './CartListItem'
export default {
  name: "cartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  components: {
    Scroll,
    CartListItem
  },
  activated () {
    this.$refs.scroll.scroll.refresh()
  }
};
</script>

<style scoped>
.cart-list {
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
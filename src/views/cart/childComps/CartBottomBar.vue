<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
      :is-checked="isSeclectAll"
      @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
       合计：{{'￥' + totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算 ({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
  components: {
     CheckButton 
  },
  computed: {
    totalPrice() {
       return this.$store.state.cartList.filter(item=>{
         return item.checked
       }).reduce((preValue,item)=> {
         return preValue + item.lowNowPrice * item.count
       },0).toFixed(2)
    },
    checkedLength() {
       return this.$store.state.cartList.filter( item => item.checked).length
    },
    isSeclectAll() {
      //  return !this.cartList(item=>!item.checked).length
       if(this.$store.state.cartList.length === 0 ) return false
      //  return  !this.cartList.find(item => !item.checked)
      for (let item of this.$store.state.cartList) {
        if(!item.checked) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    checkClick() {
      if(this.isSeclectAll) {
        this.$store.state.cartList.forEach(item=> item.checked = false)
      } else {
        this.$store.state.cartList.forEach(item=> item.checked = true)
      }
    },
    calcClick() {
      if (this.checkedLength == 0) {
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  },
  name: "CartBottomBar"
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex; 
    height: 40px;
    background-color: #eee;
    bottom: 133px;
    line-height: 40px;
    font-size: 14px;
  }
  .check-button { 
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .price {
    margin-left: 30px;
  }
  .calculate {
    width: 90px;
    margin-left: auto;
    background-color: red;
    text-align: center;
    color: #fff;
  }
</style>
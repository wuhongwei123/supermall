<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- <tab-control :titles="['流行','新款','精选']" 
    @tabClick="tabClick" ref="tabControl" class="tab-control" v-show="isTabFixed"/> -->
    <scroll class="content" ref="scroll" :probe-type="3" 
    @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad.once="swiperImageLoad"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control :titles="['流行','新款','精选']" 
    @tabClick="tabClick" ref="tabControl"/>
    <goods-list :goods="showGoods"/>
     </scroll> 
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from "network/home";




export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners:[],
      recommends:[],
      goods: {
        'pop': {page: 0,list:[]},
        'new': {page: 0,list:[]},
        'sell': {page: 0,list:[]},
      },
      currentType: 'pop',
      isShowBackTop : false,
      tabOffSetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop') 
    this.getHomeGoods('new') 
    this.getHomeGoods('sell')
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated () {
    this.$refs.scroll.scrollTo(0,this.saveY,1) 
    // console.log(this.saveY)  
  },
  deactivated () {
    this.saveY = this.$refs.scroll.scroll.y
    // console.log(this.saveY)
  },
  
  methods: {
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'  
          break  
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
       this.isShowBackTop = (-position.y) > 1000
      // 2.决定tabControl是否吸顶position： fiexd
      //  this.isTabFixed = (-position.y) > this.tabOffSetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
      
    },
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res=>{
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page +=1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    /* padding-top:44px; */
    height: 100vh;
    overflow-y: scroll
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .content {
    height: calc(100% - 93px); 
    margin-top: 44px;
    
  }
  
</style>
module.exports = {
    plugins: {
      autoprefixer: {},
      "postcss-px-to-viewport" : {
          viewportWidth: 375,
          viwqpoerHeight: 667,
          unitPrecision: 5, //小数位数
          viewportUnit: 'vw', //转换为视口单位
          selectorBlackList: ['ignore','tab-bar','tab-bar-item'],//指定不需要转换的类
          minPixelValue: 1, //小于1不转化
          mediaQuery: false//是否允许媒体查询
      }
    }
  }
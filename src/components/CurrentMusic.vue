<template>
  <div class="current-music">
    <p class="title">{{data.title}}</p>
    <p class="author">{{data.author}}</p>
    <p class="content">{{data.content}}</p>
    <audio :src='data.url' controls></audio>
    <!-- 播放切换按钮 -->
    <div class="icon-bar">
      <span :class="left_icon_class"
        @mouseover='changeHoverClass("left", "hover")'
        @mouseout='changeHoverClass("left", "out")'></span>
      <span :class="center_icon_class"
        @click='changePlayStatus()'></span>
      <span :class="right_icon_class"
        @mouseover='changeHoverClass("right", "hover")'
        @mouseout='changeHoverClass("right", "out")'></span>
    </div>

    <!-- <div class="small-img">头像缩略图</div> -->
    <!-- 进度条，当前播放信息 -->
    <div class="play">
      <div class="words">
        <!-- 此处的名称均可做成超链接 -->
        <!-- <span class="title">{{data.title}}</span>
        <span class="author">{{data.author}}</span> -->
      </div>

      <div class="process"></div>

      <div class="time">
        <span class="cur-time"></span>
        <span class="all-time"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      left_icon_class: 'icon-left',
      right_icon_class: 'icon-right',
      center_icon_class: 'icon-center'
    }
  },
  methods: {
    changePlayStatus () {
      this.center_icon_class = this.center_icon_class === 'icon-center'
        ? 'icon-center icon-center-play' : 'icon-center'
    },
    // playbar style
    changeHoverClass (el, type) {
      if (el === 'left') {
        this.left_icon_class = type === 'hover' ? 'icon-left icon-left-active' : 'icon-left'
      } else if (el === 'right') {
        this.right_icon_class = type === 'hover' ? 'icon-right icon-right-active' : 'icon-right'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.current-music{
  .icon-bar{
    background-color: #333;
    span{
      display: inline-block;
      height: 30px;
      width: 30px;
      background-image: url('https://static.soyoung.com/sy-pre/playbar-1556417446881.png');
      cursor: pointer;
      &.icon-left{
        background-position: 0px 486px;
        &.icon-left-active{
          background-position: -30px 486px;
        }
      }
      &.icon-center{
        height: 36px;
        width: 36px;
        background-position: 0px 412px;
        margin-top: 4px;
        &.icon-center-play{
          background-position: 0px 451px;
        }
      }
      &.icon-right{
        background-position: -79px 486px;
        &.icon-right-active{
          background-position: -109px 486px;
        }
      }
    }
  }
}
</style>

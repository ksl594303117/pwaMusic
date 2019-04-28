<template>
  <div>
    <p class="title">{{data.title}}</p>
    <p class="author">{{data.author}}</p>
    <p class="content">{{data.content}}</p>
    <audio :src='data.url' controls></audio>
    <!-- 播放切换按钮 -->
    <div class="icon-bar">
      <span class="icon-left">left</span>
      <span class="icon-center">center</span>
      <span class="icon-right">right</span>
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
  props: ['data']
}
</script>

<style lang='less' scoped>
</style>

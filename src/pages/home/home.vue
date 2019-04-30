<template>
  <div class="home">
    <CurrentMusic :data="current_music"></CurrentMusic>

    <div class="list-box">
      <p class="cur-music" @click="showList()">
        {{current_music.title}} {{current_music.author}}
      </p>
      <div class="music-list" v-if="show_music">
        <MusicItem
          v-for="(item, i) in musicList"
          :key="i"
          :data="item"
          :active="item.id === current_music.id ? true : false"
          @changeMusic='changeMusic'></MusicItem>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentMusic from '@components/CurrentMusic'
import MusicItem from '@components/MusicItem'

export default {
  name: 'home',
  data () {
    return {
      show_music: false,
      // 当前播放歌曲信息
      current_music: {},
      // 歌单列表
      musicList: [{
        id: '1001',
        title: '随便他们怎么说吧11',
        author: '宗儒',
        content: '一只白色的百灵鸟，翅膀上有风铃在摇晃',
        url: '11111'
      }, {
        id: '1002',
        title: '我一定会爱上你',
        author: '谢春花',
        content: '一只白色的百灵鸟，翅膀上有风铃在摇晃',
        url: '22222'
      }, {
        id: '1003',
        title: '才华有限公司',
        author: '金玟岐',
        content: '一只白色的百灵鸟，翅膀上有风铃在摇晃',
        url: '33333'
      }, {
        id: '1004',
        title: '追梦的蚂蚁',
        author: 'JAEFOREAL/蜡笔大Boom',
        content: '一只白色的百灵鸟，翅膀上有风铃在摇晃',
        url: '44444'
      }]
    }
  },
  mounted(){
    this.current_music = this.musicList[0]
  },
  methods: {
    showList () {
      this.show_music = !this.show_music
    },
    changeMusic (id) {
      this.current_music = this.musicList.filter(item => {
        return item.id === id
      })[0]
      console.log(this.current_music)
    }
  },
  components: {
    CurrentMusic,
    MusicItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.home{
  border: 1px solid blue;
  height: 200px;
  width: 600px;
  position: relative;
  .list-box{
    position: absolute;
    bottom: 0;
    right: 10px;
    .cur-music{
      height: 30px;
      line-height: 30px;
      margin: 0;
      cursor: pointer;
    }
    .music-list{
      position: absolute;
      width: 200px;
      height: 65px;
      border: 1px solid pink;
      box-sizing: border-box;
      padding: 5px 8px;
      overflow-y: scroll;
      bottom: 30px;
      right: 0;
      background-color: #fff;
    }
  }
}
</style>

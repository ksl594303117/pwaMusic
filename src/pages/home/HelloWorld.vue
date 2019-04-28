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
  name: 'HelloWorld',
  data () {
    return {
      show_music: false,
      // 当前播放歌曲信息
      current_music: {
        id: '1002',
        title: '我一定会爱上你',
        author: '谢春花',
        content: '一只白色的百灵鸟，翅膀上有风铃在摇晃',
        url: 'https://m701.music.126.net/20190428174014/72be470263256b01c5a894defcbaa5e6/jdyyaac/555c/0559/5658/b609f00a8c232b10d8eea2ee3bdc7bc1.m4a'
      },
      // 歌单列表
      musicList: [{
        id: '1001',
        title: '随便他们怎么说吧',
        author: '宗儒',
        content: '一只白色的百灵鸟，翅膀上有风铃在摇晃',
        url: 'https://m10.music.126.net/20190428174319/08639fb15b5a5d1af95534b5cf30358a/ymusic/545b/0358/535c/c1677defab429fe5b53dd66b09ee8a4d.mp3'
      }, {
        id: '1002',
        title: '我一定会爱上你',
        author: '谢春花',
        content: '一只白色的百灵鸟，翅膀上有风铃在摇晃',
        url: 'https://m701.music.126.net/20190428174014/72be470263256b01c5a894defcbaa5e6/jdyyaac/555c/0559/5658/b609f00a8c232b10d8eea2ee3bdc7bc1.m4a'
      }, {
        id: '1003',
        title: '才华有限公司',
        author: '金玟岐',
        content: '一只白色的百灵鸟，翅膀上有风铃在摇晃',
        url: 'https://m701.music.126.net/20190428174424/6a3d63fd3ca440355f167d3610de811f/jdyyaac/055b/035c/030f/219e696b5146903930894ec9f25b701c.m4a'
      }, {
        id: '1004',
        title: '追梦的蚂蚁',
        author: 'JAEFOREAL/蜡笔大Boom',
        content: '一只白色的百灵鸟，翅膀上有风铃在摇晃',
        url: 'https://m801.music.126.net/20190428174632/78014dbab2488ae19ce488dcf78e6dd5/jdyyaac/000b/555b/065e/7a74b23616b17582ead714a7094b20f9.m4a'
      }]
    }
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

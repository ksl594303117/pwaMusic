import MusicItem from '@components/MusicItem'
import CurrentMusic from '@components/CurrentMusic'

export default {
  name: 'Index',
  data () {
    return {
      // 当前播放歌曲信息
      current_music: {
        title: '白色的小花',
        author: 'kouone',
        content: '一只白色的百灵鸟，翅膀上有风铃在摇晃'
      },
      // 歌单列表
      musicList: [{
        title: '白色的小花',
        author: 'kou1'
      }, {
        title: '粉色的小花',
        author: 'kou2'
      }, {
        title: '黄色的小花',
        author: 'kou3'
      }, {
        title: '蓝色的小花',
        author: 'kou4'
      }]
    }
  },
  components: {
    MusicItem,
    CurrentMusic
  }
}

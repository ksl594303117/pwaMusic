<template>
  <div
    class='music-item' :class="active ? 'active' : ''"
    @click="play(data.id)" :title="data.title + ' ' + data.author">
    <span class="title">{{data.title}}</span>
    <span class="author">{{data.author}}</span>
  </div>
</template>

<script>
export default {
  props: ['data', 'active'],
  methods: {
    play (id) {
      this.$emit('changeMusic', id)
    }
  }
}
</script>

<style lang='less' scoped>
.music-item{
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &.active{
    color: red;
  }
}
</style>

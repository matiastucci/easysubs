<script>

  import Videos from 'services/videos'

  export default {
    name: 'App',

    mounted() {
      this.$nextTick(() => {
        this.$el.addEventListener('drop', event => {
          event.preventDefault()
        })
        this.$el.addEventListener('dragover', event => {
          event.preventDefault()
        })
      })
    },

    methods: {
      clearVideos() {
        Videos.clear()
        this.$router.push('home')
      },
    },

  }
</script>

<template lang="pug">
  .window

    .window-content
      router-view

    footer.toolbar.toolbar-footer
      .toolbar-actions
        .btn-group.pull-right
          a.btn.btn-default(@click='clearVideos' v-if='$route.name === \'videos\'')
            span.icon.icon-trash
          router-link.btn.btn-default(v-else to='/home')
            span.icon.icon-home
          router-link.btn.btn-default(to='/settings')
            span.icon.icon-cog
          router-link.btn.btn-default(to='/info')
            span.icon.icon-info
</template>

<style lang="scss">
  @import "../styles/app.scss";
</style>

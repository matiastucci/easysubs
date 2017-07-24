<script>

  import Videos from '@/services/videos'
  import Helpers from '@/services/helpers'

  export default {
    name: 'Easysubs',

    data () {
      return {
        updateDownloading: false,
        updateExists: false,
        updateDownloaded: false
      }
    },

    mounted () {
      this.$nextTick(() => {
        this.$el.addEventListener('drop', event => {
          event.preventDefault()
        })
        this.$el.addEventListener('dragover', event => {
          event.preventDefault()
        })
      })
      Helpers.bus.$on('update-available', () => {
        this.updateExists = true
      })
      Helpers.bus.$on('update-downloaded', () => {
        this.updateExists = false
        this.updateDownloading = false
        this.updateDownloaded = true
      })
      Helpers.bus.$on('update-error', () => {
        this.updateExists = false
        this.updateDownloaded = false
        this.updateDownloading = false
      })
    },

    methods: {
      clearVideos () {
        Videos.clear()
        this.$router.push('home')
      },
      setDownloading () {
        this.updateExists = false
        this.updateDownloading = true
      },
      quitAndInstall () {
        Helpers.quitAndInstall()
      }
    }

  }
</script>

<template lang="pug">
  .window

    .window-content
      router-view

    footer.toolbar.toolbar-footer
      .toolbar-actions
        a.btn.btn-primary(v-if='updateExists' @click='setDownloading()') Update
        .btn.spinner(v-if='updateDownloading')
          .bounce1
          .bounce2
          .bounce3
          p (this may take a while)
        a.btn.btn-primary(v-if='updateDownloaded' @click='quitAndInstall()') Restart

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
  @import "styles/app.scss";
  .toolbar-actions {
    .spinner {
      &.btn {
        box-shadow: none;
      }
      p {
        display: inline;
        margin-left: 10px;
      }
    }
  }
</style>

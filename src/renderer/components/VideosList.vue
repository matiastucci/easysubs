<script>
  import Analytics from '@/services/analytics'
  import Videos from '@/services/videos'
  import Subtitles from '@/services/subtitles'

  export default {
    name: 'VideosList',

    data () {
      return {
        videos: Videos.get(),
        downloadsCount: 0
      }
    },

    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!Videos.get().length) {
          vm.$router.push('home')
        }
      })
    },

    mounted () {
      for (let i = 0; i < this.videos.length; i++) {
        const video = this.videos[i]
        this.downloadSub(video.id, video.name, video.path, video.size)
      }
    },

    beforeDestroy () {
      Videos.clear()
    },

    methods: {
      downloadSub (id, name, path, size) {
        this.downloadsCount++
        Subtitles.get(id, name, path, size).then(sub => {
          if (!sub.file.hasUrl) {
            Analytics.event('Download error', name)
            this.changeStatus(id, 'error')
            return
          }
          const subName = Subtitles.getName(sub.file.path)
          const key = Object.keys(sub)[0]
          Subtitles.download(sub.file.id, sub[key].url, subName).then(() => {
            this.changeStatus(id, 'completed')
            if (this.downloadsCount === this.videos.length) {
              Analytics.event('Download success', name)
              new Notification('Download completed', {
                body: 'Enjoy your subs :)'
                // TODO: fix icon path
              })
            }
          })
        })
      },
      changeStatus (id, status) {
        for (let i = 0; i < this.videos.length; i++) {
          if (this.videos[i].id === id) {
            this.videos[i].status = status
            return
          }
        }
      }
    }
  }
</script>

<template lang="pug">
  #files-list
    table.table-striped
      thead
        tr
          th.th-name Name
          th Status
      tbody
        tr(v-for='video in videos')
          td {{ video.name }}
          td.text-center
            .spinner(v-if='video.status === \'loading\'')
              .bounce1
              .bounce2
              .bounce3
            span.icon.icon-cancel(v-else-if='video.status === \'error\'')
            span.icon.icon-check(v-else-if='video.status === \'completed\'')
</template>

<style lang="scss">
  #files-list {
    width: 100%;
    table {
      table-layout: fixed;
      .th-name {
          width: 80%;
      }
      .text-center {
        text-align: center;
      }
    }
  }
</style>

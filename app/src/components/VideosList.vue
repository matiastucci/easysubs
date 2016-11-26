<script>

  import Videos from 'services/videos'

  export default {
    name: 'VideosList',

    data() {
      return {
        videos: Videos.get(),
      }
    },

    methods: {

    },
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
          td
            .spinner(v-if='video.status === \'loading\'')
              .bounce1
              .bounce2
              .bounce3
</template>

<style lang="scss">
  #files-list {
    width: 100%;
    table {
      table-layout: fixed;
      .th-name {
          width: 80%;
      }
    }
  }
</style>

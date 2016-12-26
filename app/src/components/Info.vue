<script>

  import Helpers from 'services/helpers'

  export default {
    name: 'Info',

    methods: {
      toggleDevTools() {
        Helpers.toggleDevTools()
      },
    },
  }
</script>

<template lang="pug">
  #info.padded-more
    h5(@click='toggleDevTools()') What's this?
    p Easysubs is an open source app that allows you to download subtitles from
      a.js-external-link(href='http://www.opensubtitles.org') &nbsp;OpenSubtitles&nbsp;
      | in a very fast way.
    h5 Why?
    p Hi, my name is
      a.js-external-link(href='https://tucci.me') &nbsp;Mati Tucci&nbsp;
      | and I was using a similar app that recently stopped being free.
      | So, that was a good excuse to spend a few hours building my own free app.
    .info-footer
      a.js-external-link(href='https://github.com/matiastucci/easysubs')
        span.icon.icon-github
      a.js-external-link(href='https://twitter.com/TucciMatias')
        span.icon.icon-twitter
</template>

<style lang="scss">
  #info {
    h5 {
      margin-bottom: 5px;
    }
    p {
      margin-top: 5px;
    }
    .info-footer {
      text-align: center;
      .icon-github, .icon-twitter {
        font-size: 20px;
        margin: 10px;
        cursor: pointer;
      }
    }
  }
</style>

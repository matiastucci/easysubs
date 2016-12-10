<script>
  export default {
    name: 'Info',

    data() {
      return {

      }
    },

    methods: {

    },
  }
</script>

<template lang="pug">
  #info.padded-more
    h5 What's this?
    p Easysubs is an open source app that allows you to download subtitles from
      a(href='http://www.opensubtitles.org') &nbsp;OpenSubtitles&nbsp;
      | in a very fast way.
    h5 Why?
    p Hi, my name is
      a(href='https://tucci.me') &nbsp;Mati Tucci&nbsp;
      | and I was using a similar app that recently stopped being free.
      | So, that was a good excuse to spend a few hours building my own free app.
    .info-footer
      a(href='https://github.com/matiastucci/easysubs')
        span.icon.icon-github
      a(href='https://twitter.com/TucciMatias')
        span.icon.icon-twitter
</template>

<style lang="scss">
  #info {
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

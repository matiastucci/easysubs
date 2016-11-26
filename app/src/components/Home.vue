<script>

  import Videos from 'services/videos'

  export default {
    name: 'Home',

    data() {
      return {
        dragging: false,
      }
    },

    beforeRouteEnter(to, from, next) {
      next(vm => {
        const videos = Videos.get()
        if (videos && videos.length) {
          vm.$router.push('videos')
        }
      })
    },

    mounted() {
      this.$nextTick(() => {
        this.$el.addEventListener('drop', this.onDrop)
        this.$el.addEventListener('dragover', this.onDragover)
        this.$el.addEventListener('dragleave', this.onDragleave)
      })
    },

    beforeDestroy() {
      this.$el.removeEventListener('drop', this.onDrop)
      this.$el.removeEventListener('dragover', this.onDragover)
      this.$el.removeEventListener('dragleave', this.onDragleave)
    },

    methods: {
      onDrop(e) {
        this.dragging = false

        const files = e.dataTransfer.files
        const videos = []

        for (const file in files) {
          if (files.hasOwnProperty(file)) {
            const filename = files[file].name
            const fileExt = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase()
            if (Videos.allowedExtensions().indexOf(fileExt) !== -1) {
              files[file].status = 'loading'
              videos.push(files[file])
            }
          }
        }

        if (!videos.length) { return }

        Videos.set(videos)
        this.$router.push('videos')
      },
      onDragover() {
        this.dragging = true
      },
      onDragleave() {
        this.dragging = false
      },
    },
  }
</script>

<template lang="pug">
  #home.padded-more
    .drop-text(v-bind:class='{\'dragging\': dragging}') Drop your videos here
</template>

<style lang="scss">
  #home {
    background-color: #fff;
    .drop-text {
      height: 100%;
      background-color: #eee;
      border-radius: 5px;
      border: 3px #bdbdbd dashed;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5em;
      transition: border .4s;
      &.dragging {
        border-color: #6d6c6d !important;
      }
    }
  }
</style>

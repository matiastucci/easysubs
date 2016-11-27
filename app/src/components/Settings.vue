<script>

  import Settings from 'services/settings'

  export default {
    name: 'Settings',

    data() {
      return {
        subLanguage: { value: 'eng' },
        subExtension: { value: 'srt' },
      }
    },

    methods: {
      saveSettings() {
        // TODO: pass data
        Settings.set()
      }
    },
  }
</script>

<template lang="pug">
  #settings.padded-more
    form
      .form-group
        label Subtitle Language
        select.form-control(v-model='subLanguage')
          option(v-bind:value='{value: \'eng\'}') English
          option(v-bind:value='{value: \'fre\'}') French
          option(v-bind:value='{value: \'spa\'}') Spanish
          option(v-bind:value='{value: \'ger\'}') German
          option(v-bind:value='{value: \'ita\'}') Italian
          option(v-bind:value='{value: \'por\'}') Portuguese
      .form-group
        label Subtitle Extension
        select.form-control(v-model='subExtension')
          option(v-bind:value='{value: \'srt\'}') .srt
          option(v-bind:value='{value: \'vtt\'}') .vtt
      .form-actions
        button.btn.btn-form.btn-primary.pull-right(@click.prevent='saveSettings') Save
</template>

<style lang="scss">
  #settings {
    display: flex;
    justify-content: center;
    align-items: center;
    form {
      width: 80%;
    }
  }
</style>

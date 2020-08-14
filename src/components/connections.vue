<script>
export default {
  name: 'connections'
}
</script>

<template lang="pug">
.box
  h1
    span Connections
    button.round.add +
  form
    .form-item
      span Connection string:&nbsp;
      input(type="text")
    button Connect
</template>

<style scoped lang="scss"></style>

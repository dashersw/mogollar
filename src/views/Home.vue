<script>
export default {
  name: 'Home'
}
</script>

<template lang="pug">
  .home
    main
      h1 Welcome!
      .box
        p.colletion-error Please, connect your database first.
</template>

<style lang="scss" scoped>
main {
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
}
</style>

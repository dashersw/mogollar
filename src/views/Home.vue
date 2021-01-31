<script>
import WelcomeCard from '@/components/WelcomeCard.vue'
export default {
  name: 'Home',
  components: {
    WelcomeCard
  }
}
</script>

<template lang="pug">
.home
  main
    WelcomeCard
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: stretch;
  height: calc(100% + 58px);
  align-items: center;
  justify-content: center;
}
</style>

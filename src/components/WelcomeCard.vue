<script>
export default {
  name: 'WelcomeCard'
}
</script>

<template lang="pug">
.box
  img(src='@/assets/logo.svg')
  h3 You haven't created a connection yet
  button(type='button') Add Connection
</template>

<style lang="scss" scoped>
.box {
  display: grid;
  grid-template-columns: minmax(400px, 1fr);
  gap: 1rem;
  padding: 3rem;

  * {
    justify-self: center;
  }

  img {
    width: 200px;
    margin-bottom: 2rem;
  }
}

button {
  padding: 1rem;
  border: solid 1px var(--fg-color);
  background: transparent;

  &:hover {
    background: var(--button-hover-bg);
  }
}
</style>

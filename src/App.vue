<template lang="pug">
  #app
    .title-bar
      | Mogollar
    router-view.views
</template>

<style lang="scss">
@import url('./assets/reset.css');
@import url('./assets/theme.scss');

body {
  background-color: var(--bg-color);
  color: var(--fg-color);
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.title-bar {
  background: transparent;
  height: 40px;
  line-height: 40px;
  display: block;
  -webkit-app-region: drag;
  font-weight: var(--bold);
  text-align: center;
}

.views {
  padding: 1rem;
}
</style>

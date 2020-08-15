<script>
const sidebarSize = { max: 600, min: 350 }

import Connections from '@/components/connections.vue'

export default {
  name: 'App',

  components: {
    Connections
  },

  methods: {
    mouseDown(e) {
      this.isSidebarResize = true
      this.startX = this.$refs.scrollContainer.offsetWidth - e.pageX
    },
    mouseMove(e) {
      const width = this.startX + e.pageX
      if (this.isSidebarResize && width < sidebarSize.max && width > sidebarSize.min) {
        this.$refs.scrollContainer.style.width = `${width}px`
      }
    }
  }
}
</script>

<template lang="pug">
  #app
    .title-bar
      | Mogollar
    .views(@mousemove="mouseMove" @mouseup="isSidebarResize = false")
      .scroll-container(ref="scrollContainer")
        .resize-handle(@mousedown="mouseDown")
        .top
        .scrollable
          aside
            Connections.connections
        .bottom
      router-view.view(ref="views" data-elastic)
</template>

<style lang="scss">
@import url('./assets/reset.css');
@import url('./assets/theme.css');

html {
  height: 100%;
  overflow: hidden;
}

body {
  background-color: transparent;
  color: var(--fg-color);
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.title-bar {
  background: linear-gradient(rgba(84, 84, 84, 0.8) 0%, rgba(64, 64, 64, 0.8) 100%);
  backdrop-filter: blur(20px);
  box-shadow: 0 -0.5px 0px inset rgba(0, 0, 0, 0.8), 0 -1px 0px inset rgba(0, 0, 0, 0.3);
  height: 38px;
  line-height: 40px;
  display: block;
  -webkit-app-region: drag;
  font-size: var(--sm-font-size);
  // font-weight: var(--book);
  text-align: center;
  z-index: 9;
}

.views {
  height: 100vh;
  top: 0px;
  position: absolute;
  width: 100%;
  display: grid;
  grid-template-columns: min-content 1fr;
}

.scroll-container {
  width: 400px;
  position: relative;
  padding: 98px 0 0;
  overflow: scroll;
  scroll-snap-type: y mandatory;
  scroll-padding: 38px 0 0;

  .resize-handle {
    content: '';
    width: 6px;
    height: 80px;
    cursor: col-resize;
    position: absolute;
    right: 0px;
    top: calc(50% + 38px);
    z-index: 9;
    border-radius: 3px;
    background-color: var(--box-bg);
    user-select: none;
    -webkit-user-drag: none;
  }
}

.scrollable {
  scroll-snap-align: none;
  scroll-snap-type: center;
  display: table;
  min-height: calc(100% + 98px);
  min-width: 350px;

  &,
  aside {
    width: 100%;
  }
}

.scrollable * {
  scroll-snap-align: start end;
}

.top {
  top: 0;
  scroll-snap-align: start;
}

aside {
  width: 30rem;
  padding: 2rem;
}

.view {
  background: var(--bg-color);
  flex-grow: 1;
  padding: 38px 0 0 0;
}
</style>

<script>
import Connections from '@/components/connections.vue'
import VueResizable from 'vue-resizable'
const currentOS = process.platform

export default {
  name: 'App',
  components: {
    Connections,
    VueResizable
  },
  data() {
    return {
      currentOS
    }
  }
}
</script>

<template lang="pug">
  #app
    .title-bar
      | Mogollar
    .views
      vue-resizable( :width='450' :fitParent='true' :minWidth='450' :maxWidth='750' :active=['r'] )
          .scroll-container(:class="{'os-windows': currentOS === 'win32'}")
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.title-bar {
  background: linear-gradient(rgba(84, 84, 84, 0.8) 0%, rgba(64, 64, 64, 0.8) 100%);
  backdrop-filter: blur(20px);
  box-shadow: 0 -0.5px 0px inset rgba(0, 0, 0, 0.8), 0 -1px 0px inset rgba(0, 0, 0, 0.3);
  height: var(--title-bar-height);
  line-height: 40px;
  display: block;
  -webkit-app-region: drag;
  font-size: var(--sm-font-size);
  // font-weight: var(--book);
  text-align: center;
  z-index: 1;
  padding: 0 80px;
  user-select: none;
}

.views {
  top: var(--title-bar-height);
  height: 100vh;
  position: absolute;
  width: 100%;
  display: grid;
  grid-template-columns: min-content 1fr;
}

.scroll-container {
  overflow: auto;
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-padding: var(--title-bar-height) 0 0;
  background: var(--bg-color);

  &.os-windows {
    background: var(--bg-color);
  }
}

.scrollable {
  scroll-snap-align: none;
  scroll-snap-type: center;
  display: table;
  width: 100%;
  min-height: 100%;
}

.scrollable * {
  scroll-snap-align: start end;
}

.top {
  top: 0;
  scroll-snap-align: start;
}

aside {
  width: inherit;
  padding: 2rem;
}

.resizable-component {
  /* Fix resize height problem */
  height: 100vh !important;
  > .resizable-r {
    width: 0.1rem !important;
    right: -0.1rem !important;
    background: var(--box-bg);
  }
}

.view {
  background: var(--bg-color);
  flex-grow: 1;
}
</style>

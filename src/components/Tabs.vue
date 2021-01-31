<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'tabs',
  computed: {
    ...mapState(['routeTabs'])
  },
  methods: {
    ...mapActions(['setCollection'])
  }
}
</script>

<template lang="pug">
  div(v-if="routeTabs.length > 0")
    ul
      li(v-for="(tab,index) in routeTabs" :key="index")
        .tab(:class="{'active': tab.selected}" @click="setCollection(tab.title)")
          .pipe |
          .title
            | {{tab.title}}
          .close-button +
    slot
  div.empty(v-else="")
    img(src='@/assets/logo.svg')
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  background: var(--bg-color);
}

li {
  flex: 1;
  max-width: 200px;
  border-radius: 0.2em 0.2em 0 0;
  transition: var(--transition);

  & + li {
    .tab {
      .pipe {
        color: var(--button-bg);
      }
    }

    &:hover {
      .pipe {
        color: transparent;
      }
    }
  }

  &:hover {
    background: var(--button-hover-bg);
    color: var(--fg-color);
    cursor: default;
  }
}

.tab {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px 5px 5px 0px;
  border-radius: 0.2em 0.2em 0px 0px;
  height: 40px;
  color: var(--fg-dim-color);
}

.pipe {
  margin-bottom: 5px;
  color: transparent;
}

.title {
  margin-left: 10px;
  margin-right: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.close-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  border-radius: 99px;
  width: 20px;
  height: 20px;
  padding-left: 1px;
  padding-bottom: 2px;
  background: transparent;
  transition: var(--transition);
  transform: rotate(45deg);

  &:hover {
    cursor: pointer;
    color: var(--fg-color);
    background: rgba(196, 196, 196, 0.4);
  }
}

.active {
  background: var(--button-bg);
  color: var(--fg-color);
}

.empty {
  padding: 4rem 2rem 4rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 300px;
  height: auto;
  opacity: 0.2;
}
</style>

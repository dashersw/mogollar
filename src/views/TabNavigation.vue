<script>
import { mapState } from 'vuex'

import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import Connection from '@/components/connection.vue'

export default {
  name: 'TabNavigation',
  components: { Tabs, Tab, Connection },
  computed: {
    ...mapState(['routeTabs'])
  }
}
</script>

<template lang="pug">
  Tabs
    Tab(v-for="(tab, index) in routeTabs" :key="index" :isSelected="tab.selected")
      Connection
</template>

<script>
import record from './record'
import modal from './modal'
import { clipboard } from 'electron'
export default {
  name: 'records',
  data() {
    return {
      isModalVisible: this.showModal,
      modalRecord: null
    }
  },
  components: { record, modal },
  props: ['records', 'showModal'],
  methods: {
    async copyToClipboard(record) {
      clipboard.writeText(JSON.stringify(record, null, 2))
    }
  }
}
</script>

<template lang="pug">
  div.record-root
    modal(v-if="isModalVisible" @close="isModalVisible = false" :record="modalRecord")
    record.asd(v-for="record in records" :record="record" :tabindex="0" :rootname="'Document'" :indentLevel="1" v-on:dblclick.native ="isModalVisible = !isModalVisible; modalRecord = record; " @keydown.native.meta.8="$emit('deleteRecord', record)" @keydown.native.meta.67="copyToClipboard(record)")
</template>

<style scoped lang="scss">
.record-root {
  background: linear-gradient(to bottom, #222, #222 50%, transparent 50%, transparent);
  background-size: 100% 60px;
}
</style>

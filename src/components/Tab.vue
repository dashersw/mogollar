<script>
export default {
  name: 'Tab',
  props: {
    isSelected: { type: Boolean, default: false }
  }
}
</script>

<template lang="pug">
  div(v-show="isSelected")
    slot
</template>

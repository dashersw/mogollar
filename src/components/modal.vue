<script>
export default {
  name: 'modal',
  data() {
    return {}
  },
  props: ['record'],
  filters: {
    pretty: function(value) {
      return JSON.stringify(value, null, 2)
    }
  },
  methods: {}
}
</script>
<template lang="pug"> 
  transition
      div.modal-mask
        div.modal-wrapper
          div.modal-container
            div.modal-body 
              textarea(:spellcheck="false") {{ record | pretty }}
            div.modal-footer
              button.modal-default-button(@click="$emit('close')") OK
</template>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
textarea {
  height: 600px;
  resize: none;
  font-size: 14px;
  min-width: 440px;
  background-color: #000;
  color: #fff;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  min-height: inherit;
  max-height: 90vh;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #000000;
  color: white;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  width: 100%;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>

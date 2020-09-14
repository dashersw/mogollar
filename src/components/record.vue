<script>
import { mapState } from 'vuex'
export default {
  name: 'record',
  data() {
    return {
      dataCollapsed: this.isCollapsed,
      indent: {
        paddingLeft: this.indentLevel * 10 + 'px'
      }
    }
  },
  props: ['record', 'rootname', 'isCollapsed', 'isPadding', 'indentLevel'],
  methods: {},
  computed: {
    ...mapState(['recordList']),
    type: function() {
      let type = ''
      if (Object.prototype.toString.call(this.record) === '[object Number]') {
        type = 'Number'
      } else if (Object.prototype.toString.call(this.record) === '[object String]') {
        type = 'String'
      } else if (Object.prototype.toString.call(this.record) === '[object Date]') {
        type = 'Date'
      } else if (Array.isArray(this.record)) {
        type = 'Array'
      } else if (
        typeof this.record._id !== 'undefined' &&
        this.record._id !== null &&
        typeof this.record._id._bsontype !== 'undefined' &&
        this.record._id._bsontype === 'ObjectID'
      ) {
        type = 'ObjectID'
      } else if (typeof this.record === 'object' && this.record !== null) {
        type = 'Object'
      } else {
        type = 'Alien'
      }
      return type
    }
  }
}
</script>

<template lang="pug">
  div
    div( v-if="type ==='Object' || type ==='Array' || type ==='ObjectID'" )
      div.columns.record-row(@db)
        div.column-field(v-bind:style="indent")
          span(v-bind:class="['caret', !dataCollapsed ? 'caret-down' : '']" v-on:click.stop="dataCollapsed = !dataCollapsed") 
          span {{ rootname }}
        div.column-value {{ type === 'ObjectID'  && rootname !== 'Document' ? 'Object ID (' + record._id  + ')': '' }}
        div.column-type {{ type === 'ObjectID'  && rootname !== 'Document' ? '' : type }}  
      record(v-if="!dataCollapsed" v-for="(value, name) in record" :record="value" :rootname="name" :isCollapsed="true" :indentLevel="indentLevel + 1")
    div(v-bind:class="['record-row', 'columns']" v-if="type !=='Object' && type !=='Array' && type !=='ObjectID'") 
      div.column-field
        div(v-bind:style="indent")
          span {{ rootname }}
      div.column-value {{ record }}
      div.column-type {{type}}
</template>

<style scoped lang="scss">
.caret {
  cursor: pointer;
  user-select: none;
}

.caret::before {
  content: '\25B6';
  color: white;
  display: inline-block;
  margin-right: 6px;
}

.caret-down::before {
  transform: rotate(90deg);
}
.padding-record-left {
  padding-left: 10px;
}

.margin-record-left {
  margin-left: -10px;
}

.column-field {
  font-weight: var(--bold);
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px 10px;
  border-right: 1px solid #777;
}
.column-value {
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px 10px;
  border-right: 1px solid #777;
}

.column-type {
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px 10px;
}

.columns {
  display: grid;
  grid-template-columns: 3fr 7fr 2fr;
}

.record-row {
  padding: 0px 3px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 30px;
}
</style>

##### 1、asnyc 子组件跟父组件参数绑定，子组件值改变，父组件值也改变

```
// 父组件
<date-range :date.sync="query.dateRange"></date-range>


//子组件
<template>
  <div class="date-query">
    <el-button type="primary" size="mini" plain @click="setYesterday">昨日</el-button>
    <el-button type="primary" size="mini" plain @click="setWeek" class="mr18">本周</el-button>
    <el-date-picker
        v-model="dateRange"
        size="small"
        type="daterange"
        range-separator="至"
        start-placeholder="开始分配日期"
        end-placeholder="结束分配日期"
      />
  </div>
</template>

<script>
import { getTime, getWeek } from '@/utils/datetime'
export default {
  name: 'my-date-range',
  props: {
    date: {
      type: Array,
      default: []
    }
  },
  data () {
      return {
          dateRange: ''
      }
  },
  watch: {
    dateRange(newVal) {
      console.log(newVal, 'newval-------------')
      this.$emit('update:date', newVal)
    }
  },
  methods: {
    setYesterday() {
      this.dateRange = [getTime(-1), getTime(-1)]
    },
    setWeek() {
      this.dateRange = getWeek()
    }
  }
}
</script>
```


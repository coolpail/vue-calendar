<template> 
    <div class="wrap">
      <div class="textheader">
        <i class="iconfont textItem" @click="dispatch({type: 'preYear'})">&#xe714;</i>
        <i class="iconfont textItem" @click="dispatch({type: 'preMonth'})">&#xe667;</i>
        <p class="textItem">
          {{state.currentYear}} 年 {{state.currentMonth}} 月 {{state.currentDate}} 日
        </p>
        <i class="iconfont textItem " @click="dispatch({type: 'nextMonth'})">&#xe610;</i>
        <i class="iconfont textItem" @click="dispatch({type: 'nextYear'})">&#xe713;</i>
      </div>
      <div class="top">
        <p v-for="(el, idx) in daylist" :key='`${el}${idx}`'>{{el}}</p>
      </div>
      <div class="content">
        <p class="item" v-for="(el, index) in maxDays" :key="index">
          <span :class="['day', el.isActive ? 'isactive' : '']" @click="(e) => handleClick(el, e)"
            v-if="(index - state.currentMonthFirstDay) >= 0 
              && (state.currentMonthMaxDays + state.currentMonthFirstDay - 1) >= index">
            {{index - state.currentMonthFirstDay + 1}}
          </span>
          <span class="day rest " v-else-if="(state.currentMonthMaxDays + state.currentMonthFirstDay - 1) < index">{{index - (state.currentMonthMaxDays + state.currentMonthFirstDay - 1)}}</span>
          <span class="day rest" v-else>{{state.preMonthMaxDays - (state.currentMonthFirstDay - index - 1)}}</span>
        </p>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, computed, reactive, watch  } from "@vue/composition-api";
import { useComputedDay } from './hook/useComputedDay'
import { useReducerDate } from './hook/useReducerDay'
import { item } from '@/types/index'

const daylist = ['日', '一', '二', '三', '四', '五', '六']

export default defineComponent({
  setup(props, { root }) {
    const nowDay = new Date().toLocaleDateString().split('/').map(Number)
    const dayStr = ref<number[]>(nowDay)
    const dispatch = useReducerDate(dayStr)
    const {
      date,
      currentYear,
      currentMonth,
      currentDate,
      currentDay,
      currentMonthMaxDays,
      preMonthMaxDays,
      currentMonthFirstDay
    } = useComputedDay(dayStr);
    const maxDays = ref<item[]>([]);
    watch([currentMonthFirstDay, currentDate], () => {
      const daysArr = Array.from({length: 7 * 6 }, (el, idx) => {
        if (idx === (currentMonthFirstDay.value + currentDate.value - 1)) {
          return ({isActive: true})
        } else {
          return ({isActive: false})
        }
      });
      maxDays.value = daysArr
    })
    const handleClick = (el: item, e: Event) => {
      const val = Number((e.target as HTMLElement).innerText)
      maxDays.value.forEach((el:item) => el.isActive = false)
      el.isActive = true
      dayStr.value = [currentYear.value, currentMonth.value, val] //vue3 可以写成 dayStr.value[2] = val; 这vue-cli还是不支持proxy
    }
    const state = reactive({
      date,
      currentYear,
      currentMonth,
      currentDate,
      currentDay,
      currentMonthMaxDays,
      preMonthMaxDays,
      currentMonthFirstDay
    })
    return {
      daylist,
      maxDays,
      dayStr,
      state,
      dispatch,
      handleClick
    }
  },
})

</script>

<style lang="less">
#app {
  .wrap {
    width: 290px;
  }
  .textheader {
    display: flex;
    justify-content: space-evenly;
    line-height: 30px;
    .textItem {
      align-self: center;
      cursor: pointer;
    }
  }
  .top {
    border-top: 1px solid #d3d3d3;
    border-bottom: 1px solid #d3d3d3;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap
  }
  .content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap
  }
  .rest {
    color: #ccc
  }
  .item {
    width: 40px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    .day {
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 40px;
    }
    .isactive {
      background: #409eff;
      color: #fff;
    }
  }
}
</style>

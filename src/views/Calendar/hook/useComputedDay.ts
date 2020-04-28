import { Ref, computed } from '@vue/composition-api'

//计算当月1号是星期几
function computedFirstDay(year: number, month: number): number {
  return new Date(`${year}/${month}`).getDay()
}

export const useComputedDay = (str: Ref<number[]>) => {
    //注入了依赖
    const date = computed(() => new Date(str.value.join('/')))
    //年
    const currentYear = computed(() => date.value.getFullYear())
    //月
    const currentMonth = computed(() => date.value.getMonth() + 1)
    //日
    const currentDate = computed(() => date.value.getDate())
    //星期
    const currentDay = computed(() => date.value.getDay())
    //当月最大天数
    const currentMonthMaxDays = computed(() => new Date(currentYear.value, currentMonth.value, 0).getDate())
    //当月星期几
    const currentMonthFirstDay = computed(() => computedFirstDay(currentYear.value, currentMonth.value))
    //上一个月最大天数
    const preMonthMaxDays = computed(() => new Date(currentYear.value, currentMonth.value - 1, 0).getDate())
    return {
      date,
      currentYear,
      currentMonth,
      currentDate,
      currentDay,
      currentMonthMaxDays,
      preMonthMaxDays,
      currentMonthFirstDay
    } 
}

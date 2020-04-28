import { Ref, computed } from '@vue/composition-api'
import { DateFn } from '@/types/index.ts'; 

//计算当月1号是星期几
const computedFirstDay: DateFn<number> = (year, month) => {
  return new Date(`${year}/${month}/1`).getDay()
}

const getMonthMaxDays: DateFn<number> = (year, month) => {
  if (month - 1 < 1) {
    const _date = new Date(`${year - 1}/${12}/1`);
    _date.setDate(0)
    return _date.getDate()
  } else if (month + 1 > 12) {
    const _date = new Date(`${year + 1}/${1}/1`);
    _date.setDate(0)
    return _date.getDate()
  } else {
    const _date = new Date(`${year}/${month + 1}/1`);
    _date.setDate(0)
    // console.log(_date);
    return _date.getDate()
  }
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
    const currentMonthMaxDays = computed(() => getMonthMaxDays(currentYear.value, currentMonth.value))
    //当月星期几
    const currentMonthFirstDay = computed(() => computedFirstDay(currentYear.value, currentMonth.value))
    //上一个月最大天数
    // const preMonthMaxDays = computed(() => new Date(currentYear.value, currentMonth.value - 1, 0).getDate())
    const preMonthMaxDays = computed(() => getMonthMaxDays(currentYear.value, currentMonth.value - 1))
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

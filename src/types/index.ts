import { Ref, computed } from '@vue/composition-api'

export type data = number;
export type year = number 
export type month = number 
export type day = number 
export type date = number 
export type maxMonthDays = number
export interface allDayInfo {
    currentYear: year,
    currentMonth: month,
    currentDate: date,
    currentDay: day,
    currentMonthMaxDays: maxMonthDays
}
export type action = {
    type: string
}
export type item = {
    isActive: boolean
}
export interface DateFn<T> {
    (year: T, month: T): T;
}

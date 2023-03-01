import {  Scope } from "wcex";
import moment from "moment";

export default class extends Scope {
  useYear = 1990;
  useMonth = 1;
  beforeMonthDays = 0;
  monthDays = 0;
  todayYear = 1990;
  todayMonth = 1;
  todayDay = 1;
  afterMonthDays = 0;

  calendarArr = [] as any[];
  selectDate(date:string) {
    this.$emit("selectDate", date);
  }
  initCalendar(date:string) {
    this.calendarArr = [];
    const nowDate = moment(date);
    this.useYear = nowDate.year();
    this.useMonth = nowDate.month() + 1;
    // 计算上个月天数
    this.beforeMonthDays = moment(date).add(-1, "M").daysInMonth();
    // 计算本月天数
    this.monthDays = nowDate.daysInMonth();
    // 计算下个月天数
    this.afterMonthDays = moment(date).add(1, "M").daysInMonth();
    // 查看本月1号是周几
    const beginWeek = moment(`${this.useYear}-${this.useMonth}-1`).weekday();
    // 查看本月末是周几
    const endWeek = moment(`${this.useYear}-${this.useMonth}-1`)
      .add(1, "M")
      .add(-1, "d")
      .weekday();
    // 填充上个月底的日期
    if (beginWeek != 0) {
      const beforeMonth = moment(date).add(-1, "M");
      for (let i = beginWeek; i > 0; i--) {
        this.calendarArr.push({
          year: beforeMonth.year(),
          month: beforeMonth.month() + 1,
          day: this.beforeMonthDays - i + 1,
        });
      }
    }
    // 填充本月的日期
    for (let i = 0; i < this.monthDays; i++) {
      this.calendarArr.push({
        year: nowDate.year(),
        month: nowDate.month() + 1,
        day: i + 1,
      });
    }
    // 填充下个月的月初
    if (endWeek != 6) {
      const afterMonth = moment(date).add(1, "M");
      for (let i = 0; i < 6 - endWeek; i++) {
        this.calendarArr.push({
          year: afterMonth.year(),
          month: afterMonth.month() + 1,
          day: i + 1,
        });
      }
    }
  }
  beforeYear() {
    this.initCalendar(
      moment(`${this.useYear}-${this.useMonth}-1`)
        .add(-1, "year")
        .format("YYYY-MM-DD"),
    );
  }
  beforeMonth() {
    this.initCalendar(
      moment(`${this.useYear}-${this.useMonth}-1`)
        .add(-1, "M")
        .format("YYYY-MM-DD"),
    );
  }
  afterYear() {
    this.initCalendar(
      moment(`${this.useYear}-${this.useMonth}-1`)
        .add(1, "year")
        .format("YYYY-MM-DD"),
    );
  }
  afterMonth() {
    this.initCalendar(
      moment(`${this.useYear}-${this.useMonth}-1`)
        .add(1, "M")
        .format("YYYY-MM-DD"),
    );
  }
  onReady() {
    const today = moment();
    this.todayYear = today.year();
    this.todayMonth = today.month() + 1;
    this.todayDay = today.date();
    this.initCalendar(moment().format("YYYY-MM-DD"));
  }
}

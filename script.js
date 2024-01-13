let date = new Date();
let miniDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const getDates = (dateInput) => {
  dateInput.setDate(1);

  const lastDay = new Date(
    dateInput.getFullYear(),
    dateInput.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    dateInput.getFullYear(),
    dateInput.getMonth(),
    0
  ).getDate();

  const firstDayIndex = dateInput.getDay();

  const lastDayIndex = new Date(
    dateInput.getFullYear(),
    dateInput.getMonth() + 1,
    0
  ).getDay();

  const nextDay = 7 - lastDayIndex - 1;

  let days = [];

  for (let x = firstDayIndex; x > 0; x--) {
    days.push(`<div class="prev-date">${prevLastDay - x + 1}</div>`);
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      dateInput.getMonth() === new Date().getMonth() &&
      dateInput.getFullYear() === new Date().getFullYear()
    ) {
      days.push(`<div class="today">${i}</div>`);
    } else {
      days.push(`<div class="date">${i}</div>`);
    }
  }

  for (let j = 1; j <= nextDay; j++) {
    days.push(`<div class="next-date">${j}</div>`);
  }

  let extraDays = [];
  if (days !== 6) {
    for (let j = nextDay+1; j <= nextDay+7; j++) {
      extraDays.push(`<div class="next-date">${j}</div>`);
    }
  }
  return [days, extraDays];
};

const renderCalendar = () => {
  const monthDays = document.querySelector(".calendar");
  document.querySelector(".date p").innerHTML = months[date.getMonth()] + " " + date.getFullYear();

  let [days, extraDays] = getDates(date);
  document.querySelector(".calendar").style.gridTemplateRows = `repeat(${days.length/7}, 1fr)`;
  let daysElement = "";

  for (let i = 0; i < 7; i++) {
    daysElement += `<div class="date-box">${daysOfWeek[i] + days[i]}</div>`;
  }

  for (let i = 7; i < days.length; i++) {
    daysElement += `<div class="date-box">${days[i]}</div>`;
  }

  monthDays.innerHTML = daysElement;
  miniDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  renderMiniCalendar();

}

const renderMiniCalendar = () => {
  const monthDays = document.querySelector(".mini-calendar");
  document.querySelector(".curr-date").innerHTML = months[miniDate.getMonth()] + " " + miniDate.getFullYear();

  let [days, extraDays] = getDates(miniDate);
  if (days.length/7 !== 6) {
    days = days.concat(extraDays);
  };

  let daysElement =  `
      <div class="weekdays">S</div>
      <div class="weekdays">M</div>
      <div class="weekdays">T</div>
      <div class="weekdays">W</div>
      <div class="weekdays">T</div>
      <div class="weekdays">F</div>
      <div class="weekdays">S</div>
  `;
  for (let i = 0; i < days.length; i++) {
    daysElement += days[i];
  }
  monthDays.innerHTML = daysElement;
}

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

document.querySelector(".mini-left").addEventListener("click", () => {
  miniDate.setMonth(miniDate.getMonth() - 1);
  renderMiniCalendar();
});

document.querySelector(".mini-right").addEventListener("click", () => {
  miniDate.setMonth(miniDate.getMonth() + 1);
  renderMiniCalendar();
});

document.querySelector(".today-button").addEventListener("click", () => {
  const currDate = new Date();
  date.setFullYear(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
  renderCalendar();
});

document.getElementById("togC").addEventListener("click", () => {
  const checkBox = document.getElementById("togC");
  const arrow = document.querySelector(".collapsible-arrow");
  if (checkBox.checked) {
    arrow.classList.remove("fa-chevron-down");
    arrow.classList.add("fa-chevron-up");
  }
  else {
    arrow.classList.remove("fa-chevron-up");
    arrow.classList.add("fa-chevron-down");
  }
});

renderCalendar();
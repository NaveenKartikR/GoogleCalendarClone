const date = new Date();
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

const getDates = () => {
  date.setDate(1);

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
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
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    ) {
      days.push(`<div class="today">${i}</div>`);
    } else {
      days.push(`<div class="date">${i}</div>`);
    }
  }

  for (let j = 1; j <= nextDay; j++) {
    days.push(`<div class="next-date">${j}</div>`);
  }

  return days;
};

const renderCalendar = () => {
  const monthDays = document.querySelector(".calendar");
  document.querySelector(".date p").innerHTML = months[date.getMonth()] + " " + date.getFullYear();
  
  document.querySelector(".calendar").style.gridTemplateRows = `repeat(${monthDays%7}, 1fr)`;

  const days = getDates();
  let daysElement = "";

  for (let i = 0; i < 7; i++) {
    daysElement += `<div class="date-box">${daysOfWeek[i] + days[i]}</div>`;
  }

  for (let i = 7; i < days.length; i++) {
    daysElement += `<div class="date-box">${days[i]}</div>`;
  }

  monthDays.innerHTML = daysElement;
}

const renderMiniCalendar = () => {
  
}

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

document.querySelector(".today-button").addEventListener("click", () => {
  const currDate = new Date();
  date.setFullYear(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
  renderCalendar();
});

renderCalendar();

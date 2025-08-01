// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

let userSelectedDate = null;
let countdownInterval = null;

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startBtn.disabled = true;
  document.querySelector('input#datetime-picker').disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = userSelectedDate - now;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'Done',
        message: 'Countdown complete!',
        position: 'topRight',
      });
      document.querySelector('input#datetime-picker').disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    addLeadingZero({ days, hours, minutes, seconds });
  }, 1000);
});

function addLeadingZero({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = String(days).padStart(
    2,
    '0'
  );
  document.querySelector('[data-hours]').textContent = String(hours).padStart(
    2,
    '0'
  );
  document.querySelector('[data-minutes]').textContent = String(
    minutes
  ).padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = String(
    seconds
  ).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

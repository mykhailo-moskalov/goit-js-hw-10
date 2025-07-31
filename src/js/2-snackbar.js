// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('[type="number"]');
const radioInput = document.querySelectorAll('[type="radio"]');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = delayInput.value;
  const selectedOption = [...radioInput].find(input => input.checked)?.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedOption === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});

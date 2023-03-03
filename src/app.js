import * as yup from 'yup';
import view from './view.js';

// схема валидации. возвращает Promise
const validateUrl = (state, url) => {
  const schema = yup.string()
    .url()
    .notOneOf(state.channels);
  return schema.validate(url);
};

const runApp = (state, elements) => {
  const { form } = elements;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    // после валидации получаем Promise, если валидно
    // то меняем в state статус и пушим новый url
    validateUrl(state, url)
      .then(() => {
        state.rssForm.status = 'valid';
        state.channels.push(url);
      })
      .catch((err) => {
        state.rssForm.status = 'invalid';
        state.rssForm.errors = err;
      });
  });
};
// инициализация приложения 1 раз
const initApp = () => {
  // инициализация начального state
  const initialState = {
    channels: [],
    rssForm: {
      status: 'invalid',
      errors: [],
    },
  };
  // элементы DOM дерева
  const elements = {
    form: document.querySelector('form'),
    input: document.getElementById('url-input'),
  };

  const state = view(initialState, elements);
  // перенаправляем данные в основную ф-цию
  runApp(state, elements);
};

export default initApp;

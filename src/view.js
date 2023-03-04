import onChange from 'on-change';

const renderRssFormError = (state, elements, i18n) => {
  const { errors } = state.rssForm;
  const { feedback } = elements;
  feedback.innerHTML = i18n.t(errors.message);
  feedback.classList.add('text-danger');
  feedback.classList.remove('text-success');
};
// работа с DOM деревом
// если изменяется state.rssForm.status, то меняем class у input
// удаляем данные из input и ставим фокус
const renderRssForm = (state, elements) => {
  const { status } = state.rssForm;
  const { form, input, feedback } = elements;
  switch (status) {
    case 'invalid':
      input.classList.add('is-invalid');
      break;
    case 'valid':
      input.classList.remove('is-invalid');
      // Successfull url load
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      feedback.innerHTML = 'RSS успешно загружен'; // i18n.t(rssSuccessedLoad);
      // ^ TODO: переместить строки в блок при успешной загрузке rss
      form.reset();
      input.focus();
      break;
    default:
      throw new Error(`Unknown form render status: ${status}`);
  }
};
// ф-ция проверяет если в path попадает значение из case
// то вызывается renderRssForm
const render = (state, path, elements, i18n) => {
  switch (path) {
    case 'rssForm.status':
      renderRssForm(state, elements);
      break;
    case 'channels':
      break;
    case 'rssForm.errors':
      renderRssFormError(state, elements, i18n);
      break;
    default:
      throw new Error(`Unknown state path: ${path}`);
  }
};
// передаем стейт в onChange и передаем path в ф-цию render
// path - это путь к элементу, который изменился в объекте state
// view = Proxy объект, который формирует onChange
const view = (state, elements, i18n) => onChange(state, (path) => {
  render(state, path, elements, i18n);
});

export default view;

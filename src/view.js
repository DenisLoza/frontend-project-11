const renderRssFormError = (error, elements, i18n) => {
  const { feedback } = elements;
  feedback.innerHTML = i18n.t(error.message);
  feedback.classList.add('text-danger');
  feedback.classList.remove('text-success');
};

const renderRssForm = (status, elements) => {
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

export {
  renderRssForm,
  renderRssFormError,
};

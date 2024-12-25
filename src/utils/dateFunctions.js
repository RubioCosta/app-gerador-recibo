
// DD/YY/YYYY to YYYY-MM-DD
function convertDateFromDefault(date) {
  const [day, month, year] = date.split('/');

  const dateFormatted =`${year}-${month}-${day}`;

  if (new Date(dateFormatted) === 'Invalid Date') throw new Error('Data inválida');

  return dateFormatted;
}

// YYYY-MM-DD to DD/YY/YYYY
function convertDateFromBrazil(date) {
  const [year, month, day] = date.split('-');

  const dateFormatted =`${day}/${month}/${year}`;

  return dateFormatted;
}

module.exports = {
  convertDateFromDefault,
  convertDateFromBrazil,
};
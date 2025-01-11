function formattedValue(value) {
  if (!value) return ''
  return Number(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

module.exports = {
  formattedValue
}
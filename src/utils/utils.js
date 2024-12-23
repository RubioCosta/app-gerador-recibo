function formattedValue(value) {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

module.exports = {
  formattedValue
}
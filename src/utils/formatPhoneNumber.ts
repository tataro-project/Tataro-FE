const formatPhoneNumber = (value: string | undefined) => {
  if (!value) return '';

  const onlyNumbers = value.replace(/\D/g, '');

  if (onlyNumbers.length <= 3) return onlyNumbers;
  if (onlyNumbers.length <= 7) return onlyNumbers.replace(/(\d{3})(\d{1,4})/, '$1-$2');

  return onlyNumbers.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
};

export default formatPhoneNumber;

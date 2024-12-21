const StrLength = ({ str, strLen }) => {
  const validText = str.trim();

  const data = validText.slice(0, strLen);
  return data + "...";
};

export default StrLength;

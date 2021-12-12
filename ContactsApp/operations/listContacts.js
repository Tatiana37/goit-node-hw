const readContent = require("./readContent");

const listContacts = async () => {
  const result = await readContent();
  return result;
};

module.exports = listContacts;

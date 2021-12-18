const fs = require("fs/promises");
const path = require("path");
const readContent = require("./readContent");

const removeContact = async (contactId) => {
  try {
    const contacts = await readContent();
    const deleteContact = contacts.findIndex(
      (contact) => contactId === contact.id.toString()
    );
    if (deleteContact === -1) return;
    const updateList = contacts.splice(deleteContact, 1);
    await fs.writeFile(
      path.join(__dirname, "../db", "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return updateList;
  } catch (error) {
    console.log(process.exit);
  }
};

module.exports = removeContact;

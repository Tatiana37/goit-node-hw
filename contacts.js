const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const readContent = async () => {
  try {
    const content = await fs.readFile(
      path.join(__dirname, "db", "contacts.json"),
      "utf8"
    );
    const result = JSON.parse(content);
    return result;
  } catch (error) {
    console.log(process.exit);
  }
};
const listContacts = async () => {
  return await readContent();
};

const getContactById = async (contactId) => {
  const contacts = await readContent();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  try {
    const contact = await getContactById(contactId);
    const contacts = await readContent();
    const deleteContact = contacts.findIndex(
      (contact) => contactId === contact.id.toString()
    );
    if (deleteContact === -1) return;
    const updateList = contacts.splice(deleteContact, 1);
    await fs.writeFile(
      path.join(__dirname, "db", "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return updateList;
  } catch (error) {
    console.log(process.exit);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await readContent();
    const newContact = {
      name,
      email,
      phone,
      id: crypto.randomUUID(),
    };
    contacts.push(newContact);
    await fs.writeFile(
      path.join(__dirname, "db", "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return newContact;
  } catch (error) {
    console.log(process.exit);
  }
};
module.exports = { listContacts, getContactById, removeContact, addContact };

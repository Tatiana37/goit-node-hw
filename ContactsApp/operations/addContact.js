const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const readContent = require("./readContent");

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
      path.join(__dirname, "../db", "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return newContact;
  } catch (error) {
    console.log(process.exit);
  }
};

module.exports = addContact;

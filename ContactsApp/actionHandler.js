const { Command } = require("commander");
const chalk = require("chalk");
const {
  listContacts,
  getContact,
  addContact,
  removeContact,
} = require("./operations");

const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContact(id);
      if (contactById) {
        console.log(chalk.green("Contact found"));
        console.log(contactById);
        return;
      }
      console.log(chalk.yellow("Contact not found"));
      break;

    case "add":
      const contact = await addContact(name, email, phone);
      console.log(chalk.green("Add new contact"));
      console.log(contact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      if (deletedContact) {
        console.table(deletedContact);
        console.table(chalk.red(`Contact with id ${id} was deleted`));
        return;
      }
      console.log(chalk.red(`contact by id ${id} not found`));
      break;

    default:
      console.warn(chalk.red("Unknown action type!"));
  }
};

invokeAction(argv).then(() => console.log("Operation success"));
module.exports = invokeAction;

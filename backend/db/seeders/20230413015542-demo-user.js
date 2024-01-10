"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@aa.io",
          firstName: "Demo",
          lastName: "lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@aa.io",
          firstName: "fake1",
          lastName: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user2@aa.io",
          firstName: "fake2",
          lastName: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user3@aa.io",
          firstName: "fake3",
          lastName: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user4@aa.io",
          firstName: "fake4",
          lastName: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user5@aa.io",
          firstName: "fake5",
          lastName: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user6@aa.io",
          firstName: "fake6",
          lastName: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user7@aa.io",
          firstName: "fake7",
          lastName: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user8@aa.io",
          firstName: "fake8",
          lastName: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        email: {
          [Op.in]: [
            "demo@aa.io",
            "user1@aa.io",
            "user2@aa.io",
            "user3@aa.io",
            "user4@aa.io",
            "user5@aa.io",
            "user6@aa.io",
            "user7@aa.io",
            "user8@aa.io",
          ],
        },
      },
      {}
    );
  },
};

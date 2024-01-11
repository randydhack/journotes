'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@aa.io",
          first_name: "Demo",
          last_name: "lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@aa.io",
          first_name: "fake1",
          last_name: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user2@aa.io",
          first_name: "fake2",
          last_name: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user3@aa.io",
          first_name: "fake3",
          last_name: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user4@aa.io",
          first_name: "fake4",
          last_name: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user5@aa.io",
          first_name: "fake5",
          last_name: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user6@aa.io",
          first_name: "fake6",
          last_name: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user7@aa.io",
          first_name: "fake7",
          last_name: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user8@aa.io",
          first_name: "fake8",
          last_name: "user",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
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
  }
};

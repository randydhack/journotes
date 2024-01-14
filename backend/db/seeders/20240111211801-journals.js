'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = "Journals";
    return queryInterface.bulkInsert(
      options,
      [
        {
          title: "first post",
          description: "hello world",
          journal_image_url: "blank",
          user_id: 1,
          private: false
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Journals";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        user_id: {
          [Op.in]: [
            1,
          ],
        },
      },
      {}
    );
  }
};

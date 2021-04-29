module.exports = (sequelize, Sequelize) => {
  const Provider = sequelize.define("provider", {
    provider: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    selected: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    updatedAt: false,
    createdAt: 'date'
  });

  return Provider;
};

const { DataTypes } = require("sequelize");
const { productPriceUnits } = require("../../config");

const TaskModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  expirytime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("task", TaskModel)
  },

  createTask: (user) => {
    return this.model.create(user);
  },

  findTask: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateTask: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllTask: (query) => {
    return this.model.findAll({
      where: query
    });
  },

  deleteTask: (query) => {
    return this.model.destroy({
      where: query
    });
  }
}

const TaskModel = require("../../common/models/tasks");

module.exports = {
  getAllTask: (req, res) => {
    const { query: filters } = req;

    TaskModel.findAllTask(filters)
      .then((task) => {
        return res.status(200).json({
          status: true,
          data: task,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getTaskById: (req, res) => {
    const {
      params: { taskId },
    } = req;

    TaskModel.findTask({ id: taskId })
      .then((task) => {
        return res.status(200).json({
          status: true,
          data: task.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createTask: (req, res) => {
    const { body } = req;

    TaskModel.createTask(body)
      .then((task) => {
        return res.status(200).json({
          status: true,
          data: task.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  updateTask: (req, res) => {
    const {
      params: { taskId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the task.",
        },
      });
    }

    TaskModel.updateTask({ id: taskId }, payload)
      .then(() => {
        return TaskModel.findTask({ id: taskId });
      })
      .then((task) => {
        return res.status(200).json({
          status: true,
          data: task.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteTask: (req, res) => {
    const {
      params: { taskId },
    } = req;

    TaskModel.deleteTask({id: taskId})
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfTaskDeleted: numberOfEntriesDeleted
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};

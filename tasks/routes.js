const router = require("express").Router();

// Controller Imports
const TaskController = require("./controllers/TaskController");

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// JSON Schema Imports for payload verification
const createTaskPayload = require("./schemas/createTaskPayload");
const updateTaskPayload = require("./schemas/updateTaskPayload");
const { roles } = require("../config");

router.get(
  "/",
  [isAuthenticatedMiddleware.check],
  TaskController.getAllTask
);

router.get(
  "/:taskId",
  [isAuthenticatedMiddleware.check],
  TaskController.getTaskById
);

router.post(
  "/",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.USER),
    SchemaValidationMiddleware.verify(createTaskPayload),
  ],
  TaskController.createTask
);

router.patch(
  "/:taskId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(updateTaskPayload),
  ],
  TaskController.updateTask
);

router.delete(
  "/:taskId",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  TaskController.deleteTask
);

module.exports = router;

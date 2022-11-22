const { Router } = require("express");
const employeeController = require("./../controllers/employee");
const { checkAuthentication, setEmployee } = require("./../utils");

const router = Router();

router.get(
  "/all-employees",
  checkAuthentication,
  setEmployee,
  employeeController.getAllEmployees
);
router.get(
  "/assign-task",
  checkAuthentication,
  setEmployee,
  employeeController.getAssignTask
);
router.post("/assign-task", employeeController.assignTask);
router.post("/create-review/:id", employeeController.createReview);
router.get("/edit/:id", checkAuthentication, employeeController.getEditUser);
router.post("/edit", employeeController.editUser);
router.get(
  "/add-employee",
  checkAuthentication,
  employeeController.getAddEmployee
);
router.post("/add-employee", employeeController.addEmployee);
router.delete("/employee-delete/:id", employeeController.deleteEmployee);
router.get("/make-admin/:id", employeeController.makeAdmin);

module.exports = router;

import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addNew", isAdminAuthenticated, addNewAdmin);

router.get("/doctors", getAllDoctors);
router.post("/doctor/addNew",isAdminAuthenticated, addNewDoctor);


router.get("/patient/me",isPatientAuthenticated,getUserDetails);
router.get("/patient/logout",isPatientAuthenticated,logoutPatient);

router.get("/admin/me",isAdminAuthenticated,getUserDetails);
router.get("/admin/logout",isAdminAuthenticated,logoutAdmin);



export default router;

import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Errorhandler from "../middlewares/errorMiddleware.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    // firstName,
    // lastName,
    // email,
    // phone,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  if (
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new Errorhandler("please fill full form!"), 400);
  }

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    docDept: department,
  });

  if (isConflict.length === 0) {
    return next(
      new Errorhandler("Doctor not found!"),
      404
    );
  }
  if (isConflict.length > 1) {
    return next(
      new Errorhandler("Doctors Conflict!  Please try contacting via email"),
      400
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;

  const appointment = await Appointment.create({
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    phone: req.user.phone,
    appointment_date,
    department,
    doctor:{
        firstName:doctor_firstName,
        lastName: doctor_lastName
    },
    hasVisited,
    address,
    doctorId,
    patientId
  });
  res.status(200).json({
    success: true,
    message: "Appointment successfully Posted! Wait for the doctor's confirmation"
  })
});


export const getAllAppointments = catchAsyncErrors(async(req,res,next)=>{
  const getAppointments = await Appointment.find();
  if(getAppointments.length === 0){
    return next(new Errorhandler("Currently no appointments pending!"))
  }
  res.status(200).json({
    success: true,
    getAppointments,
  });
});

export const updateAppointmentStatus = catchAsyncErrors(async(req,res,next)=>{
  const {id} = req.params;
  let appointment = await Appointment.findById(id);
  if(!appointment){
    return next(new Errorhandler("Appointment not found",400));
  }
  appointment = await Appointment.findByIdAndUpdate(id,req.body,{
    new:true,
    runValidators:true,
    useFindandModify: false
  });
  res.status(200).json({
    success: true,
    message: `Appointment status updated to : ${appointment.status}`,
    appointment
  });
}); 

export const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{
  const {id} = req.params;
  let appointment = await Appointment.findById(id);
  if(!appointment){
    return next(new Errorhandler("Appointment not found",400));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment deleted Successfully!"
  });
});
import React from "react";
import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";

const Appointment = () => {
  return (
    <>
      <Hero
        title={
          "Want a Visit? | Fill the form below to fix an Appointment with our specialized Doctors"
        }
        imageUrl={"/signin.png"}
      />
      <AppointmentForm />
    </>
  );
};

export default Appointment;

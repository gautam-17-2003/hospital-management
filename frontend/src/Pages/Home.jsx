import React, { useContext } from "react";
import Hero from "../components/Hero.jsx";
import { Context } from "../main.jsx";
import Biography from "../components/Biography.jsx";
import Departments from "../components/Departments.jsx";
import MessageForm from "../components/MessageForm.jsx";

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, user } = useContext(Context);
  // console.log(user);
  return (
    <>
      <Hero
        userName={user.firstName}
        title={
          "Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      {/* <Biography imageUrl={"/about.png"}/> */}
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;

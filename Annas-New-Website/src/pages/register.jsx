import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Radio,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { SimpleFooter } from "@/widgets/layout";
import axios from "axios"; // Import axios

export function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === "Admin" && secretKey !== "Annal") {
      alert("Invalid Admin");
    } else {
      console.log(fname, lname, email, password);
      axios
        .post(`${import.meta.env.VITE_SERVER_BASE_URL}/register`, {
          fname,
          email,
          lname,
          password,
          userType,
        })
        .then((response) => {
          console.log(response.data, "userRegister");
          if (response.data.status === "ok") {
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((error) => {
          console.error("Error registering:", error);
          alert("Something went wrong");
        });
    }
  };

  return (
    <>
      {/* Background Image */}
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
          {/* CardHeader with Gradient Background */}
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>

          <div className="flex gap-10">
            <Radio
              id="user"
              name="type"
              label="User"
              checked={userType === "User"}
              onChange={() => setUserType("User")}
            />
            <Radio
              id="admin"
              name="type"
              label="Admin"
              checked={userType === "Admin"}
              onChange={() => setUserType("Admin")}
            />
          </div>

          <CardBody className="flex flex-col gap-4">
            <Input
              variant="standard"
              label="FName"
              size="lg"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <Input
              variant="standard"
              label="LName"
              size="lg"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
            <Input
              variant="standard"
              type="email"
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              variant="standard"
              type="password"
              label="Password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {userType === "Admin" && (
              <div className="-ml-2.5">
                <Input
                  variant="standard"
                  label="Secret Key"
                  size="lg"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                />
              </div>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default Register;

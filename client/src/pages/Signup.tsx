import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/axios";
import { AxiosError } from "axios";
import { TokenContext } from "@/context/tokenContext";
const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileImage(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("");

    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("password", formData.password);
    if (profileImage) {
      form.append("avatar", profileImage);
    }

    try {
      const response = await axios.post("/users/register", formData);

      setToken(response.data.token);
      setSubmissionStatus("Account created successfully!");
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setSubmissionStatus(error.response?.data.message);
      } else {
        setSubmissionStatus("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Card className="mx-auto max-w-sm bg-transparent">
        <CardHeader>
          <CardTitle className="text-xl text-white">Sign Up</CardTitle>
          <CardDescription className="text-white">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2 text-white">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    className="bg-transparent border-slate-500"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2 text-white">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    className="bg-transparent border-slate-500"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2 text-white">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-transparent border-slate-500"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2 text-white">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="bg-transparent border-slate-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2 text-white">
                <Label htmlFor="profileImage">Profile Image</Label>
                <Input
                  id="profileImage"
                  type="file"
                  className="bg-transparent border-slate-500"
                  onChange={handleFileChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-slate-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create an account"}
              </Button>
              <Button
                variant="outline"
                className="w-full border-[1px] border-slate-500 text-white bg-black hover:bg-[#26272b] hover:text-white"
              >
                Sign up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline">
                Sign in
              </Link>
            </div>
            {submissionStatus && (
              <div className="mt-4 text-center text-sm text-white">
                {submissionStatus}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;

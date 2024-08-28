import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const navigate=useNavigate()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("");

    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      await response.json();
      setSubmissionStatus("Login successful!");
    } catch (error) {
      if (error instanceof Error) {
        setSubmissionStatus(error.message);
      } else {
        setSubmissionStatus("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submissionStatus) {
      navigate('/')
      console.log(submissionStatus);
    }
  }, [submissionStatus]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Card className="mx-auto max-w-sm bg-transparent">
        <CardHeader>
          <CardTitle className="text-xl text-white">Login</CardTitle>
          <CardDescription className="text-white">
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
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
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-slate-200" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
              <Button variant="outline" className="w-full border-[1px] border-slate-500 text-white bg-black hover:bg-[#26272b] hover:text-white">
                Log in with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="underline">
                Sign up
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

export default Login;

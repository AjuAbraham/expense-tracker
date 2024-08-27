import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
const Signup = () => {
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
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name" className=" text-white">First name</Label>
              <Input id="first-name" className="bg-transparent border-slate-500" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name" className=" text-white">Last name</Label>
              <Input id="last-name" placeholder="Robinson" className="bg-transparent border-slate-500" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
            className="bg-transparent border-slate-500"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input id="password" className="bg-transparent border-slate-500" type="password" />
          </div>
          <Button type="submit" className="w-full bg-white text-black hover:bg-slate-200">
            Create an account
          </Button>
          <Button variant="outline" className="w-full border-[1px] border-slate-500 text-white bg-black  hover:bg-[#26272b] hover:text-white">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default Signup

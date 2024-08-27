import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = ()=> {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
        <Card className="w-full max-w-sm bg-transparent border-[1px] border-slate-500">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Login</CardTitle>
        <CardDescription className="text-white">
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input id="email" className="bg-transparent border-slate-500" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password"  className="text-white">Password</Label>
          <Input className="bg-transparent border-slate-500" id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-black bg-white hover:bg-slate-200">Sign In</Button>
      </CardFooter>
    </Card>
    </div>
  );
}

export default Login;

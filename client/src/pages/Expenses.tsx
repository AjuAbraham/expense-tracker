import React, { useState, ChangeEvent, useContext, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/axios";
import { AxiosError } from "axios";
import { TokenContext } from "@/context/tokenContext";

const Expenses: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: undefined as Date | undefined,
    description: "",
  });

  const { setToken } = useContext(TokenContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

    console.log(formData);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setFormData((prevData) => ({ ...prevData, date: newDate }));
  };
  const handleCategoryChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, category: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("");
    try {
      const response = await axios.post("/expenses", formData); // Change the API endpoint as needed
      setSubmissionStatus("Expense added successfully!");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setSubmissionStatus(error.response?.data.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Card className="mx-auto max-w-sm bg-transparent">
        <CardHeader>
          <CardTitle className="text-xl text-white">Add Expense</CardTitle>
          <CardDescription className="text-white">
            Enter details to add a new expense
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2 text-white">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Groceries"
                  className="bg-transparent border-slate-500"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2 text-white">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="e.g., 100"
                  className="bg-transparent border-slate-500"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2 text-white ">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                  
                  required
                >
                  <SelectTrigger className="text-black w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Transportation">
                        Transportation
                      </SelectItem>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="Entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Bills">Bills</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 text-white">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal bg-transparent",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      {formData.date ? (
                        format(formData.date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      className="rounded-md border"
                      onSelect={handleDateChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2 text-white">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Optional"
                  className="bg-transparent border-slate-500"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-slate-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding Expense..." : "Add Expense"}
              </Button>
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

export default Expenses;

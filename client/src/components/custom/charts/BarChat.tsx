import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "@/context/tokenContext";
import axios from "@/axios";

interface incomeInfo {
  amount: number;
  category: string;
  date: string;
  description?: string;
  title: string;
  _id: string;
}

const BarChat = () => {
  const { getToken } = useContext(TokenContext);
  const [expenses, setExpenses] = useState<[incomeInfo] | []>([]);

  useEffect(() => {
    const handleFetch = async () => {
      const token = getToken();

      const res = await axios.get("/expenses/getExpense", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(res.data.expense);
    };

    handleFetch();
  }, [getToken]);

  const chartData = [];
  const currentMonth = new Date().getMonth();

  const filteredExpenses = expenses.filter((expense) => {
    const expenseYear = new Date(expense.date).getFullYear();
    return expenseYear === 2024;
  });

  // Group expenses by month and calculate total for each month
  const monthlyExpenses = filteredExpenses.reduce(
    (acc: { [key: number]: number }, expense) => {
      const expenseMonth = new Date(expense.date).getMonth(); // 0 for January, 11 for December

      acc[expenseMonth] = (acc[expenseMonth] || 0) + expense.amount;
      return acc;
    },
    {}
  );


  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  for (let i = 0; i <= currentMonth; i++) {
    const desktopValue = monthlyExpenses[i] || 0;

    chartData.push({
      month: months[i],
      desktop: desktopValue,
    });
  }


  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-[400px] rounded-xl border-2">
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChat;

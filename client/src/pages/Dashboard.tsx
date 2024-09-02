import BarChat from "@/components/custom/charts/BarChat"
import CircleChart from "@/components/custom/charts/CircleChart"

import { useContext, useEffect, useState } from "react";
import axios from '@/axios'
import { TokenContext } from "@/context/tokenContext";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import AreasChart from "@/components/custom/charts/AreasChart";

export interface expenseInfo {
  amount: number;
  category: string;
  date: string;
  description?: string;
  title: string;
  _id: string;
}

const Dashboard = () => {
  const { getToken ,removeToken} = useContext(TokenContext);
  const [expenses, setExpenses] = useState<[expenseInfo] | []>([]);
  const [incomes, setIncomes] = useState<[expenseInfo] | []>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const handleFetch = async () => {
      const token = getToken();

      try {
        const expenseRes = await axios.get("/expenses/getExpense", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const incomeRes = await axios.get("/incomes/getIncome", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExpenses(expenseRes.data.expense);
        setIncomes(incomeRes.data.income);
      } catch (error) {
        if(error instanceof AxiosError){
          if(error.response?.data.message==="Error occured while authenticating user with token"){
              removeToken();
              return navigate("/auth/login");
          }
          
          console.log(error.response?.data.message);
        }
      }
    };

    handleFetch();
  }, [getToken, navigate, removeToken]);
  return (
    <div className="rounded-2xl flex gap-8 h-full border-2 p-4">
      <div className="flex flex-col gap-14">
      <AreasChart expenses={expenses} incomes={incomes}/>
      <BarChat expenses={expenses}/>
      </div>
      <div className="flex flex-col gap-12">
      <CircleChart expenses={expenses}/>
      <div className="border-2 rounded-xl w-[400px] h-[200px] p-6">
        Total
      </div>
      </div>


    </div>
  )
}

export default Dashboard

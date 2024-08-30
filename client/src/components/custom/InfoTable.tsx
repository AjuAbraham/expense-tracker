import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GoDash } from "react-icons/go";
import axios from "@/axios";
import  { useContext, useEffect, useState } from "react";
import { TokenContext } from "@/context/tokenContext";

interface incomeInfo {
  amount: number;
  category: string;
  date: string;
  description?: string;
  title: string;
  _id: string;
}
interface Props{
  info:string
}

const InfoTable:React.FC<Props> = ({info}) => {
  const { getToken } = useContext(TokenContext);
  const [incomes, setIncomes] = useState<[incomeInfo]|[]>([]);

  useEffect(() => {
    const handleFetch = async () => {
      const token = getToken();
      const res = await axios.get(info==="income"?"/incomes/getIncome":"/expenses/getExpense", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIncomes(info==="income"?res.data.income: res.data.expense);
    };

    handleFetch();
  }, [getToken, incomes,info]);

  return (
    <Table className="w-full border-2 ">
      <TableCaption className="text-primary">{`A list of your ${info.charAt(0).toLocaleUpperCase()+info.slice(1)}`}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead  className="text-primary">Title</TableHead>
          <TableHead  className="text-primary">Amount</TableHead>
          <TableHead  className="text-primary">Cateogry</TableHead>
          <TableHead  className="text-primary">Date</TableHead>
          <TableHead  className="text-primary">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incomes?.map((income) => (
          
          <TableRow key={income._id}>
            <TableCell className="font-medium">{income.title}</TableCell>
            <TableCell>{income.amount}</TableCell>
            <TableCell>{income.category}</TableCell>
            <TableCell>{new Date(income.date).toLocaleDateString()}</TableCell>
            <TableCell>{income.description===""?<GoDash scale={60}/>:income.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InfoTable;

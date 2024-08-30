import BarChat from "@/components/custom/charts/BarChat"
import CircleChart from "@/components/custom/charts/CircleChart"
import LChart from "@/components/custom/charts/LChart"



const Dashboard = () => {
  return (
    <div className="rounded-2xl flex gap-8 h-full border-2 p-4 ">
      <div className="flex flex-col gap-14">
      <LChart/>
      <BarChat/>
      </div>
      <div className="flex flex-col gap-12">
      <CircleChart/>
      <div className="border-2 rounded-xl w-[400px] h-[200px] p-6">
        Total
      </div>
      </div>


    </div>
  )
}

export default Dashboard

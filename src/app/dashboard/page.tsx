// Main dashboard (stats, charts, data table)
import Header from "../../components/Header/Header";

export default function Dashboard() {
    return (
      <div className="flex flex-col w-full">
        <Header title="Dashboard" />
        <h1 className="text-3xl  font-bold underline">Dashboard</h1>
      </div>
    );
}
import SimulationForm from "./components/SimulationForm"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Simulador de Investimentos
      </h1>
      <SimulationForm/>
    </main>
  )
}
"use client";

import { useState } from "react";

export default function SimulationForm() {
  const [formData, setFormData] = useState({
    investimentoInicial: "",
    aporteMensal: "",
    taxaAnual: "",
    tempoInvestimento: "",
    reajusteAnual: "",
    tipoInvestimento: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados:", formData);
    alert(`Dados: ${formData}`)
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Investimento Inicial (R$)</label>
        <input
          type="number"
          name="investimentoInicial"
          value={formData.investimentoInicial}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 text-gray-800"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Aporte Mensal (R$)</label>
        <input
          type="number"
          name="aporteMensal"
          value={formData.aporteMensal}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 text-gray-800"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Taxa Anual (%)</label>
        <input
          type="number"
          name="taxaAnual"
          value={formData.taxaAnual}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 text-gray-800"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Tempo de Investimento (anos)</label>
        <input
          type="number"
          name="tempoInvestimento"
          value={formData.tempoInvestimento}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 text-gray-800"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Reajuste Anual (%)</label>
        <input
          type="number"
          name="reajusteAnual"
          value={formData.reajusteAnual}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 text-gray-800"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Tipo de Investimento</label>
        <select
          name="tipoInvestimento"
          value={formData.tipoInvestimento}
          onChange={(e) => setFormData((prev) => ({ ...prev, tipoInvestimento: e.target.value }))}
          className="border border-gray-300 rounded-md p-2 text-gray-800"
        >
          <option value="">Selecione</option>
          <option value="CDB">CDB</option>
          <option value="LCI">LCI</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-md p-2 font-medium hover:bg-blue-700 transition-colors"
      >
        Simular
      </button>
    </form>
  );
}
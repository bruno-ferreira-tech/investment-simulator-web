"use client";

import { useState } from "react";
import SimulationChart from "./SimulationChart";

export default function SimulationForm() {
  const [resultado, setResultado] = useState<{
    montanteFinal: number;
    montanteLiquido: number;
    comparativoCDI: {
      taxa: number;
      monatanteFinal: number;
      montanteLiquido: number;
    };
    meses: Record<number, number>
  } | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/simulations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        aporteInicial: Number(formData.investimentoInicial),
        aporteMensal: Number(formData.aporteMensal),
        taxaAnual: Number(formData.taxaAnual),
        tempoInvestimento: Number(formData.tempoInvestimento),
        reajusteAnual: Number(formData.reajusteAnual),
        tipoInvestimento: formData.tipoInvestimento,
      }),
    });

    const data = await response.json();
    setResultado(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Investimento Inicial (R$)
        </label>
        <input
          type="number"
          name="investimentoInicial"
          value={formData.investimentoInicial}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 text-gray-800"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Aporte Mensal (R$)
        </label>
        <input
          type="number"
          name="aporteMensal"
          value={formData.aporteMensal}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 text-gray-800"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Taxa Anual (%)
        </label>
        <input
          type="number"
          name="taxaAnual"
          value={formData.taxaAnual}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 text-gray-800"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Tempo de Investimento (anos)
        </label>
        <input
          type="number"
          name="tempoInvestimento"
          value={formData.tempoInvestimento}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 text-gray-800"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Reajuste Anual (%)
        </label>
        <input
          type="number"
          name="reajusteAnual"
          value={formData.reajusteAnual}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 text-gray-800"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Tipo de Investimento
        </label>
        <select
          name="tipoInvestimento"
          value={formData.tipoInvestimento}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tipoInvestimento: e.target.value,
            }))
          }
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
      {resultado && (
        <div className="mt-6 p-4 bg-white rounded-md border border-gray-200 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-800">Resultado</h2>

          <p className="text-gray-700">
            Montante Bruto:{" "}
            <span className="font-bold">
              {resultado.montanteFinal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>

          <p className="text-gray-700">
            Montante Líquido:{" "}
            <span className="font-bold">
              {resultado.montanteLiquido.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>

          <hr className="my-2" />

          <p className="text-sm text-gray-500">
            Comparativo CDI ({resultado.comparativoCDI.taxa}% a.a.)
          </p>
          <p className="text-gray-700">
            Montante líquido no CDI:{" "}
            <span className="font-bold">
              {resultado.comparativoCDI.montanteLiquido.toLocaleString(
                "pt-BR",
                { style: "currency", currency: "BRL" },
              )}
            </span>
          </p>
        </div>
      )}
      {resultado && <SimulationChart meses={resultado.meses} />}
    </form>
  );
}

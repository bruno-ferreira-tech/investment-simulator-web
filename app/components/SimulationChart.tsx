"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  meses: Record<string, number>;
}

export default function SimulationChart({ meses }: Props) {
  const data = Object.entries(meses).map(([mes, valor]) => ({
    mes: `Mês ${mes}`,
    valor: Number(valor.toFixed(2)),
  }));

  return (
    <div className="mt-6 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Evolução do Investimento
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" tick={{ fontSize: 10 }} interval={11} />
          <YAxis tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            formatter={(v) => {
              if (typeof v !== "number") return "";
              return v.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });
            }}
          />{" "}
          <Legend />
          <Line
            type="monotone"
            dataKey="valor"
            stroke="#2563eb"
            name="Seu investimento"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

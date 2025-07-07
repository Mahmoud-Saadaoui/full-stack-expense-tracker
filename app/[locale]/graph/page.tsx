"use client";
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { useAppContext } from "../AppContext";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import classes from "./graph.module.css";
import { prepareChartData } from "../libs/graph";
import { Transaction } from "../types/transaction";

Chart.register(...registerables);

export default function GraphPage() {
  const globalState = useAppContext();
  const t = useTranslations("Graph");
  const transactions: Transaction[] = globalState?.transactions ?? [];
  const locale = useLocale();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    // Do nothing if there are no transactions
    if (!transactions.length) return;

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Prepare the chart data using the utility function
    const { labels, datasets } = prepareChartData(transactions, locale);

    // Destroy the previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: t("income"),
            data: datasets.incomes,
            borderColor: "#10B981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            borderWidth: 2,
            tension: 0.1,
            fill: true,
            spanGaps: true,
          },
          {
            label: t("expense"),
            data: datasets.expenses,
            borderColor: "#EF4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderWidth: 2,
            tension: 0.1,
            fill: true,
            spanGaps: true,
          },
          {
            label: t("balance"),
            data: datasets.cumulativeBalance,
            borderColor: "#3B82F6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 3,
            tension: 0.4,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          tooltip: {
            mode: "index",
            intersect: false,
          },
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
      },
    });

    // Cleanup the chart instance when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [transactions, locale, t]);

  return (
    <div className={classes["container"]}>
      <h1 className={classes["title"]}>
        <Link href={`/${locale}/home`} aria-label="Retour à l'accueil">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.57 5.92999L3.5 12L9.57 18.07"
              stroke="#4F46E5"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.5 12H3.67004"
              stroke="#4F46E5"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        {t("title")} - {globalState?.auth?.user.username}
      </h1>

      <div className={classes["canvas-container"]}>
        {transactions.length === 0 ? (
          <div className={classes["no-transactions"]}>
            {t("noTransactionsYet")}
          </div>
        ) : (
          <canvas ref={canvasRef} id="myChart"></canvas>
        )}
      </div>
    </div>
  );
}

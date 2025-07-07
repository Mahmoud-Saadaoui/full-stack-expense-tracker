import { Transaction } from "../types/transaction";

export function prepareChartData(transactions: Transaction[], locale: string) {
  // Sort transactions by date in ascending order
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  // Format dates as chart labels (e.g. "12 Jul")
  const labels = sorted.map(t => 
    new Date(t.startDate).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short'
    })
  );

  // Compute cumulative balance
  let balance = 0;
  const cumulativeBalance = sorted.map(t => {
    balance += t.amount;
    return balance;
  });

  // Separate income and expense values
  const incomes = sorted.map(t => t.amount > 0 ? t.amount : null);
  const expenses = sorted.map(t => t.amount < 0 ? t.amount : null);

  return {
    labels,
    datasets: {
      incomes,
      expenses,
      cumulativeBalance
    }
  };
}
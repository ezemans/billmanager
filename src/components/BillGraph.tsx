import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bill } from '../App';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BillGraphProps {
  bills: Bill[];
  salary: number;
}

const BillGraph: React.FC<BillGraphProps> = ({ bills, salary }) => {
  const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const remaining = Math.max(0, salary - totalBills);
  const total = Math.max(salary, totalBills);

  const data = {
    labels: [...bills.map(bill => bill.name), 'Remaining'],
    datasets: [
      {
        data: [...bills.map(bill => bill.amount), remaining],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Bill Distribution'
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default BillGraph;
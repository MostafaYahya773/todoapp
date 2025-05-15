import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// تسجيل الموديولات (لازم علشان Chart.js يشتغل)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// البيانات
const data = {
  labels: ['sat', 'sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Tasks Done',
      data: [1, 2, 3, 5, 2, 6, 4],
      backgroundColor: ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236'],
      borderRadius: 10,
      borderSkipped: false,
    },
  ],
};

// الإعدادات
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#333',
        font: { size: 14 },
      },
    },
    title: {
      display: true,
      text: 'Tasks Per Day',
      color: '#111',
      font: { size: 18 },
    },
  },
  scales: {
    x: {
      ticks: { color: '#444' },
      grid: { display: false },
    },
    y: {
      ticks: { color: '#444' },
      grid: { color: '#eee' },
    },
  },
};

export default function TaskChart() {
  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

import ApexCharts from 'apexcharts';

export const apexChartConfig = {
  chart: {
    fontFamily: 'inherit',
    foreColor: '#A9DBB5',
    toolbar: { show: false }
  },
  colors: ['#7BD08D', '#A9DBB5', '#ef4444'],
  grid: {
    borderColor: 'rgba(169, 219, 181, 0.1)',
    strokeDashArray: 4
  }
};

ApexCharts.registerTheme('custom', apexChartConfig);
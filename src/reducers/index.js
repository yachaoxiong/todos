import { combineReducers } from 'redux';
import todoReducer from './todoReducer';
import dashboardReducer from './dashboardReducer';
const statisticsReducer = () => {
  return [
    {
      series: [76, 67, 61, 90],
      options: {
        chart: {},
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 210,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              },
            },
          },
        },
        colors: ['#11999e', '#b83b5e', '#e23e57', '#283c63'],
        labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
        legend: {
          show: true,
          floating: true,
          fontSize: '16px',
          position: 'left',
          offsetX: 0,
          offsetY: 0,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0,
          },
          formatter: function (seriesName, opts) {
            return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
          },
          itemMargin: {
            vertical: 3,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                show: false,
              },
            },
          },
        ],
      },
    },
  ];
};

export default combineReducers({
  todos: todoReducer,
  dashboard: dashboardReducer,
  statisticsChart: statisticsReducer,
});

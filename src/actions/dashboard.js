import { GET_DASHBOARD } from './types';

const charts = [
  {
    key: 'g',
    title: 'Number of Tasks By Month',
    series: [
      {
        name: 'Low Priority',
        data: [28, 29, 33, 36, 32, 32, 33, 45],
      },
      {
        name: 'High Priority',
        data: [0, 11, 14, 18, 17, 13, 13, 63],
      },
    ],
    options: {
      grid: {
        padding: {
          top: 50,
          right: 20,
          bottom: 10,
          left: 20,
        },
      },
      chart: {
        with: '100%',
        redrawOnWindowResize: true,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 6,
          left: 7,
          blur: 9,
          opacity: 0.2,
        },
        toolbar: {
          offsetX: -20,
          offsetY: -35,
          tools: {
            download: true,
            selection: {
              enabled: true,
            },
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      colors: ['#02475e', '#ff8474'],
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      },
      legend: {
        show: true,
        itemMargin: {
          horizontal: 5,
          vertical: 20,
        },
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
      },
    },
  },
  {
    key: 'h',
    title: 'Number of tasks  By Month',
    series: [
      {
        name: 'Work',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: 'Home',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: 'Shopping',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      grid: {
        padding: {
          top: 50,
          right: 20,
          bottom: 10,
          left: 20,
        },
      },
      chart: {
        toolbar: {
          offsetX: -20,
          offsetY: -35,
          tools: {
            download: true,
            selection: {
              enabled: true,
            },
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
        type: 'bar',
      },

      colors: ['#02475e', '#ff8474', '#5aa897'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '11px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          colors: undefined,
        },
        background: {
          enabled: true,
        },
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
        ],
      },

      legend: {
        show: true,
        itemMargin: {
          horizontal: 5,
          vertical: 20,
        },
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    },
  },
];
const cards = [
  {
    title: 'All To-dos',
    key: 'a',
    value: 196,
    icon: 'OrderedListOutlined',
    theme: {
      background: localStorage.getItem('themeColor'),
      fontColor: 'white',
    },
  },
  {
    title: 'Today’s  To-dos',
    key: 'b',
    value: 6,
    icon: 'ProfileFilled',
    theme: {
      background: localStorage.getItem('themeColor'),
      fontColor: 'white',
    },
  },
  {
    title: 'Completed',
    key: 'c',
    value: 190,
    icon: 'CheckSquareFilled',
    theme: {
      background: localStorage.getItem('themeColor'),
      fontColor: 'white',
    },
  },
  {
    title: 'Unfinished',
    key: 'd',
    value: 0,
    icon: 'ClockCircleFilled',
    theme: {
      background: localStorage.getItem('themeColor'),
      fontColor: 'white',
    },
  },
];
export const getDashboard = () => async (dispathch) => {
  try {
    dispathch({
      type: GET_DASHBOARD,
      charts: charts,
      cards: cards,
    });
  } catch (e) {
    console.log(e);
  }
};

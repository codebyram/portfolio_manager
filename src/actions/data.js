const data = [
  {
    id: 1,
    name: 'HONGKONG TECHNOLOGY',
    volatility: '26.8%',
    mean_return: '2.96%',
    currency: 'SGD',
    constituents: [
      {
        weight: 3,
        instrument: {
          id: 1,
          name: 'CSX corp',
          type: 'Equity',
        },
      },
      {
        weight: 17,
        instrument: {
          id: 2,
          name: 'Cummins Inc',
          type: 'Equity',
        },
      },
      {
        weight: 10,
        instrument: {
          id: 3,
          name: 'Eaton Corp PLC',
          type: 'Equity',
        },
      },
      {
        weight: 10,
        instrument: {
          id: 4,
          name: 'Fedx corp',
          type: 'Equity',
        },
      },
      {
        weight: 10,
        instrument: {
          id: 5,
          name: 'Haris corp',
          type: 'Equity',
        },
      },
      {
        weight: 10,
        instrument: {
          id: 6,
          name: 'Norfolk Southern Corp',
          type: 'Bond',
        },
      },
      {
        weight: 5,
        instrument: {
          id: 7,
          name: 'General Dynamics',
          type: 'Bond',
        },
      },
      {
        weight: 15,
        instrument: {
          id: 8,
          name: 'hal',
          type: 'Bond',
        },
      },
      {
        weight: 20,
        instrument: {
          id: 9,
          name: 'USD CASH',
          type: 'CASH',
        },
      },
    ],
  },
];

export default data;

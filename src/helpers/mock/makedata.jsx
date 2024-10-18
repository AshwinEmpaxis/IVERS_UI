export const citiesList = ['San Francisco', 'Richmond', 'Riverside', 'Los Angeles', 'Blacksburg', 'New York'];
export const usStateList = ['California', 'Virginia', 'South Carolina', 'New York', 'Texas'];

// Function to generate a random state based on the city
const getRandomState = (city) => {
  const cityStateMap = {
    'San Francisco': 'California',
    Richmond: 'Virginia',
    Riverside: 'South Carolina',
    'Los Angeles': 'California',
    Blacksburg: 'Virginia',
    'New York': 'New York'
  };
  return cityStateMap[city];
};

// Function to generate a random time string for today
const today = () => {
  const now = new Date();
  const randomHour = Math.floor(Math.random() * 24);
  const randomMinute = Math.floor(Math.random() * 60);
  const randomSecond = Math.floor(Math.random() * 60);

  now.setHours(randomHour);
  now.setMinutes(randomMinute);
  now.setSeconds(randomSecond);

  return now.toISOString();
};

// Function to generate a random date between start and end dates
const getRandomDate = (start, end) => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  const date = new Date(randomTime);
  return date;
};

// Arrays of first names and last names
const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Chris', 'Jessica', 'Matt', 'Laura'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

// Function to generate random names
const getRandomName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

// Function to generate a random boolean value
const getRandomBoolean = () => Math.random() >= 0.5;

// Function to generate a random age between 20 and 60
const getRandomAge = () => Math.floor(Math.random() * 41) + 20;

// Function to generate a random salary between 30,000 and 200,000
const getRandomSalary = () => Math.floor(Math.random() * 170000) + 30000;

// Function to generate a random city from the citiesList
const getRandomCity = () => citiesList[Math.floor(Math.random() * citiesList.length)];

// Function to generate a random SecurityType
const getRandomSecurityType = () => {
  const securityTypes = ['Stock', 'Bond', 'ETF', 'Mutual Fund', 'Option', 'Futures'];
  return securityTypes[Math.floor(Math.random() * securityTypes.length)];
};

// Function to generate a random DestType
const getRandomDestType = () => {
  const destTypes = ['Internal', 'External'];
  return destTypes[Math.floor(Math.random() * destTypes.length)];
};

// Function to generate a random Description
const getRandomDescription = () => {
  const descriptions = ['Buy', 'Sell', 'Dividend', 'Interest', 'Fees', 'Charges'];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Function to generate a random Type
const getRandomType = () => {
  const types = ['Market', 'Limit', 'Stop', 'Stop-Limit'];
  return types[Math.floor(Math.random() * types.length)];
};

// Function to generate a random ID number
const getRandomIdNumber = () => {
  return `ID${Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0')}`;
};

// Number of entries
const numEntries = 5000;

// Generate random data entries
export const data = Array.from({ length: numEntries }, () => {
  const city = getRandomCity();
  const startDate = new Date(2010, 0, 1);
  const endDate = new Date();
  const hireDate = getRandomDate(startDate, endDate);
  const settleDate = getRandomDate(startDate, endDate); // Generate random SettleDate
  const originalCostDate = getRandomDate(startDate, endDate); // Generate random OriginalCostDate
  const postDate = getRandomDate(startDate, endDate); // Generate random PostDate
  const tradeDate = getRandomDate(startDate, endDate); // Generate random TradeDate

  const arrivalDateTime = new Date(hireDate); // Copy hire date
  arrivalDateTime.setHours(Math.floor(Math.random() * 24)); // Set random hour
  arrivalDateTime.setMinutes(Math.floor(Math.random() * 60)); // Set random minute
  arrivalDateTime.setSeconds(Math.floor(Math.random() * 60)); // Set random second

  // Generate random values for ISIN, CUSIP, Symbol, and Ticker
  const getRandomISIN = () => `US${Math.random().toString().substring(2, 12).toUpperCase()}`;
  const getRandomCUSIP = () => `${Math.random().toString().substring(2, 11).toUpperCase()}`;
  const getRandomSymbol = () => `SYM${Math.random().toString().substring(2, 5).toUpperCase()}`;
  const getRandomTicker = () => `TIC${Math.random().toString().substring(2, 5).toUpperCase()}`;

  return {
    PortfolioCode: `PC${Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, '0')}`,
    ISIN: getRandomISIN(),
    CUSIP: getRandomCUSIP(),
    Symbol: getRandomSymbol(),
    Ticker: getRandomTicker(),
    isActive: getRandomBoolean(),
    name: getRandomName(),
    hireDate: hireDate.toISOString().split('T')[0], // Keep only date part
    arrivalTime: arrivalDateTime.toISOString(), // Include date and time
    departureTime: today(), // Generate random departure time
    age: getRandomAge(),
    salary: getRandomSalary(),
    city,
    state: getRandomState(city),
    settleDate: settleDate.toISOString(), // Include SettleDate
    originalCostDate: originalCostDate.toISOString(), // Include OriginalCostDate
    postDate: postDate.toISOString(), // Include PostDate
    quantity: Math.floor(Math.random() * 1000), // Generate random quantity
    tradeAmount: Math.random() * 1000000, // Generate random tradeAmount
    exchangeFee: Math.random() * 10000, // Generate random exchangeFee
    commission: Math.random() * 10000, // Generate random commission
    custodianID: `CID${Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, '0')}`, // Generate random custodianID
    lotNumber: `LOT${Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, '0')}`, // Generate random lotNumber
    adjustedCost: Math.random() * 1000000, // Generate random adjustedCost
    SecurityType: getRandomSecurityType(),
    TradeDate: tradeDate.toISOString(), // Include TradeDate
    DestType: getRandomDestType(),
    DestSymbol: getRandomSymbol(),
    DivPerShare: (Math.random() * 10).toFixed(2), // Generate random DivPerShare
    Description: getRandomDescription(),
    Type: getRandomType(),
    IdNumber: getRandomIdNumber() // Include random IdNumber
  };
});

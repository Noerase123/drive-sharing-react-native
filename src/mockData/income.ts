import type { TIncomeDetails } from "../store/reducers/IncomeSlice";

const todayDate = new Date();

export const incomeData: TIncomeDetails[] = [
  {
    dateCreated: todayDate.toISOString(),
    userId: 'Carlos Mapua',
    earnings: {
      fares: 200
    },
    deductions: {
      commission: 60
    }
  },
  {
    dateCreated: todayDate.toISOString(),
    userId: 'Adrian Abad',
    earnings: {
      fares: 40
    },
    deductions: {
      commission: 60
    }
  },
  {
    dateCreated: todayDate.toISOString(),
    userId: 'Jose Santos',
    earnings: {
      fares: 120
    },
    deductions: {
      commission: 60
    }
  },
];
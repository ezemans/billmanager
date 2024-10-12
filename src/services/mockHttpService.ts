import { Bill } from '../App';

// Mock data
let mockSalary = 5000;
let mockBills: Bill[] = [
  { id: '1', name: 'Rent', amount: 1500 },
  { id: '2', name: 'Utilities', amount: 200 },
  { id: '3', name: 'Internet', amount: 80 },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockHttpService = {
  getSalary: async (): Promise<number> => {
    await delay(300); // Simulate network delay
    return mockSalary;
  },

  setSalary: async (salary: number): Promise<number> => {
    await delay(300);
    mockSalary = salary;
    return mockSalary;
  },

  getBills: async (): Promise<Bill[]> => {
    await delay(300);
    return [...mockBills];
  },

  addBill: async (bill: Omit<Bill, 'id'>): Promise<Bill> => {
    await delay(300);
    const newBill = { ...bill, id: Date.now().toString() };
    mockBills.push(newBill);
    return newBill;
  },

  updateBill: async (updatedBill: Bill): Promise<Bill> => {
    await delay(300);
    const index = mockBills.findIndex(bill => bill.id === updatedBill.id);
    if (index !== -1) {
      mockBills[index] = updatedBill;
      return updatedBill;
    }
    throw new Error('Bill not found');
  },

  deleteBill: async (id: string): Promise<void> => {
    await delay(300);
    mockBills = mockBills.filter(bill => bill.id !== id);
  },
};
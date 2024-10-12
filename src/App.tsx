import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DollarSign } from 'lucide-react';
import BillForm from './components/BillForm';
import BillList from './components/BillList';
import BillSummary from './components/BillSummary';
import BillGraph from './components/BillGraph';
import { mockHttpService } from './services/mockHttpService';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export interface Bill {
  id: string;
  name: string;
  amount: number;
}

function App() {
  const [salary, setSalary] = useState<number>(0);
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedSalary, fetchedBills] = await Promise.all([
          mockHttpService.getSalary(),
          mockHttpService.getBills(),
        ]);
        setSalary(fetchedSalary);
        setBills(fetchedBills);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addBill = async (bill: Omit<Bill, 'id'>) => {
    try {
      const newBill = await mockHttpService.addBill(bill);
      setBills([...bills, newBill]);
    } catch (error) {
      console.error('Error adding bill:', error);
    }
  };

  const removeBill = async (id: string) => {
    try {
      await mockHttpService.deleteBill(id);
      setBills(bills.filter(bill => bill.id !== id));
    } catch (error) {
      console.error('Error removing bill:', error);
    }
  };

  const updateBill = async (updatedBill: Bill) => {
    try {
      const result = await mockHttpService.updateBill(updatedBill);
      setBills(bills.map(bill => bill.id === result.id ? result : bill));
    } catch (error) {
      console.error('Error updating bill:', error);
    }
  };

  const updateSalary = async (newSalary: number) => {
    try {
      const updatedSalary = await mockHttpService.setSalary(newSalary);
      setSalary(updatedSalary);
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };

  const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const remaining = salary - totalBills;
  const percentRemaining = salary > 0 ? (remaining / salary) * 100 : 0;

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <DollarSign size={40} />
            Personal Bill Manager
          </Typography>
          <BillForm onAddBill={addBill} onSetSalary={updateSalary} salary={salary} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
            <Box sx={{ flexGrow: 1, minWidth: '300px' }}>
              <BillList bills={bills} onRemoveBill={removeBill} onUpdateBill={updateBill} />
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: '300px' }}>
              <BillSummary salary={salary} totalBills={totalBills} remaining={remaining} percentRemaining={percentRemaining} />
            </Box>
          </Box>
          <Box sx={{ mt: 4, height: '400px' }}>
            <BillGraph bills={bills} salary={salary} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
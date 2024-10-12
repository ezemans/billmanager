import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Bill } from '../App';

interface BillFormProps {
  onAddBill: (bill: Bill) => void;
  onSetSalary: (salary: number) => void;
  salary: number;
}

const BillForm: React.FC<BillFormProps> = ({ onAddBill, onSetSalary, salary }) => {
  const [billName, setBillName] = useState('');
  const [billAmount, setBillAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (billName && billAmount) {
      onAddBill({
        id: Date.now().toString(),
        name: billName,
        amount: parseFloat(billAmount),
      });
      setBillName('');
      setBillAmount('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      <TextField
        label="Salary"
        type="number"
        value={salary}
        onChange={(e) => onSetSalary(parseFloat(e.target.value))}
        sx={{ flexGrow: 1 }}
      />
      <TextField
        label="Bill Name"
        value={billName}
        onChange={(e) => setBillName(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <TextField
        label="Bill Amount"
        type="number"
        value={billAmount}
        onChange={(e) => setBillAmount(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <Button type="submit" variant="contained" sx={{ flexGrow: 1 }}>
        Add Bill
      </Button>
    </Box>
  );
};

export default BillForm;
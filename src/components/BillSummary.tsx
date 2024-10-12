import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface BillSummaryProps {
  salary: number;
  totalBills: number;
  remaining: number;
  percentRemaining: number;
}

const BillSummary: React.FC<BillSummaryProps> = ({ salary, totalBills, remaining, percentRemaining }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Salary:</Typography>
        <Typography>${salary.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Total Bills:</Typography>
        <Typography>${totalBills.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Remaining:</Typography>
        <Typography>${remaining.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>Percent Remaining:</Typography>
        <Typography>{percentRemaining.toFixed(2)}%</Typography>
      </Box>
    </Paper>
  );
};

export default BillSummary;
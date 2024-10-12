import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { Bill } from '../App';

interface BillListProps {
  bills: Bill[];
  onRemoveBill: (id: string) => void;
  onUpdateBill: (bill: Bill) => void;
}

const BillList: React.FC<BillListProps> = ({ bills, onRemoveBill, onUpdateBill }) => {
  const [editingBill, setEditingBill] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const handleEdit = (bill: Bill) => {
    setEditingBill(bill.id);
    setEditName(bill.name);
    setEditAmount(bill.amount.toString());
  };

  const handleSave = (bill: Bill) => {
    onUpdateBill({
      ...bill,
      name: editName,
      amount: parseFloat(editAmount),
    });
    setEditingBill(null);
  };

  const handleCancel = () => {
    setEditingBill(null);
  };

  return (
    <List>
      {bills.map((bill) => (
        <ListItem
          key={bill.id}
          secondaryAction={
            editingBill === bill.id ? (
              <>
                <IconButton edge="end" aria-label="save" onClick={() => handleSave(bill)}>
                  <Check />
                </IconButton>
                <IconButton edge="end" aria-label="cancel" onClick={handleCancel}>
                  <X />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(bill)}>
                  <Edit2 />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => onRemoveBill(bill.id)}>
                  <Trash2 />
                </IconButton>
              </>
            )
          }
        >
          {editingBill === bill.id ? (
            <>
              <TextField
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                sx={{ mr: 2 }}
              />
              <TextField
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                type="number"
              />
            </>
          ) : (
            <ListItemText primary={bill.name} secondary={`$${bill.amount.toFixed(2)}`} />
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default BillList;
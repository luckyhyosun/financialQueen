// AddInvestmentButton.jsx
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import {StyledInvestmentButton} from "./InvestmentButtonStyles.jsx";

export default function AddInvestmentButton({ onClick }) {
    return (
        <StyledInvestmentButton
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onClick}
        >
            Add Investment
        </StyledInvestmentButton>
    );
}
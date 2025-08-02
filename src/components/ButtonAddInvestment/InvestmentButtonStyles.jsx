import {styled} from "@mui/material/styles";
import AddInvestmentButton from "./AddInvestmentButton.jsx";
import Button from '@mui/material/Button';


export const StyledInvestmentButton = styled(Button)({
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'black',
    '&:hover': {
        backgroundColor: 'rgba(199, 41, 130, 1)',
    },
    '& .MuiButton-startIcon': {
        color: 'black',
    },

})
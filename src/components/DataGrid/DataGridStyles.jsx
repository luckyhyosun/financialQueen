import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

export const StyledDataGrid = styled(DataGrid)({
    // Add fixed height that would accommodate 5 rows
    height: '400px', // This is approximately the height needed for 5 rows
    minHeight: '400px', // Ensure minimum height is maintained

    // Your existing styles...
    box: {
        width: '100%',
    },

    backgroundColor: 'transparent',
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: 'transparent',
        borderBottom: '1px solid rgba(255,255,255,0.7)',
        whiteSpace: 'normal',
        lineHeight: '1.5',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        whiteSpace: 'normal',
        lineHeight: '1.5',
        overflow: 'visible',
    },
    '& .MuiDataGrid-columnHeader': {
        borderRight: '1px solid rgba(255,255,255,0.7)',
        padding: '8px',
        '& .MuiDataGrid-columnHeaderTitleContainer': {
            overflow: 'visible',
            lineHeight: '1.5',
            whiteSpace: 'normal',
            padding: '0 8px',
        },
    },
    '& .MuiDataGrid-cell': {
        borderRight: '1px solid rgba(255,255,255,0.7)',
        borderBottom: '1px solid rgba(255,255,255,0.7)',
        color: 'rgba(255,255,255,0.85)',
        whiteSpace: 'normal',
        lineHeight: '1.5',
        padding: '0.456rem',
    },
    '& .MuiDataGrid-footerContainer': {
        borderTop: '1px solid rgba(255,255,255,0.7)',
        backgroundColor: 'transparent',
        color: 'white',
        alignItems: 'center',
    },
    '& .MuiDataGrid-row': {
        maxHeight: 'none !important',
    },
    // Improved row hover styling that correctly changes the text color
    '& .MuiDataGrid-row:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.8) !important',
        '& .MuiDataGrid-cell': {
            color: 'black !important',
        },
        '& .MuiButtonBase-root svg': {
            color: 'black !important',
        },
        '& .MuiSvgIcon-root': {
            color: 'black !important',
        }
    },
    '& .MuiDataGrid-columnHeadersInner': {
        minHeight: 'auto !important',
    },
    '& .MuiToolbar-root': {
        //makes the 1-4 of 4 text white but not the arrows
        color: 'white',
        '& .Mui-disabled': {
            color: 'dimgrey',
        },
    },
    '& .MuiTablePagination-displayedRows': {
        marginBottom: 0,
    },

    // Cell in editing mode - make it very distinct
    '& .MuiDataGrid-cell--editing': {
        backgroundColor: 'white',  // Light background for contrast
        border: '2px solid #2196f3', // Bright blue border
        boxShadow: '0 0 10px rgba(33, 150, 243, 0.6)', // Glow effect
        padding: '0', // Remove padding to make room for the input
    },

    // Edit input styling - consistent for ALL fields
    '& .MuiDataGrid-editInputCell': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Slightly darker background for all
        padding: '8px',
        color: 'white',
        fontSize: '1rem',
        borderRadius: '4px',
        width: '100%',
        height: '100%',
    },

    // Make sure dropdowns are visible in the grid
    '& .MuiSelect-select': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Same darker background
        color: 'black',  // Changed from 'white' to 'black'
    },

    // Better focus outline
    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
        outline: 'none',
    },
    '& .MuiDataGrid-cell--editing:focus-within': {
        outline: 'none',
    },

    // Input fields - apply consistent styling
    '& .MuiInputBase-input': {
        color: 'black',  // Changed from 'white' to 'black'
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Slightly darker background
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '1rem',
        border: 'none',
        outline: 'none',
        width: '100%',
        height: '100%',
        // Mobile-specific font size to prevent zoom
        '@media (max-width: 768px)': {
            fontSize: '16px',
        }
    },

    // Dropdown select options
    '& .MuiMenuItem-root': {
        color: '#000',
    },

    // Style all editable cells to indicate they can be edited
    '& .editable-cell': {
        cursor: 'pointer',
        position: 'relative',
        // Subtle indication that cell is editable
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
    },

    // Error message styling (for amount field errors)
    '& .error-message': {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#f44336',
        color: 'white',
        padding: '4px 8px',
        fontSize: '12px',
        zIndex: 1000,
        borderRadius: '0 0 4px 4px',
    }
});
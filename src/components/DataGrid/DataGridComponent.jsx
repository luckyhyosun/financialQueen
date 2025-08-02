import React from 'react';
import Box from '@mui/material/Box';
import { StyledDataGrid } from './DataGridStyles';


export default function DataGridComponent({
                                              rows,
                                              columns,
                                              loading,
                                              processRowUpdate,
                                              onProcessRowUpdateError,
                                              isMobile,
                                              getCellClassName,
                                              cellClick,
                                          }) {
    return (
        <Box>
            <StyledDataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                getRowHeight={() => 'auto'}
                getEstimatedRowHeight={() => isMobile ? 120 : 100}
                columnHeaderHeight={isMobile ? 100 : 80}
                loading={loading}
                editMode="row"
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={onProcessRowUpdateError}
                getCellClassName={getCellClassName}
                density={isMobile ? 'comfortable' : 'standard'}
                disableColumnMenu={isMobile}
                onCellClick={cellClick}
            />
        </Box>
    );
}
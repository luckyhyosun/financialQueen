import { GridActionsCellItem, GridDeleteIcon } from "@mui/x-data-grid";
//exported this into utils because our supervisor told us to do so
// Simple render edit cell for amount field
function renderAmountEditCellCB(params) {
    function createEditCellChangeHandlerCB(params) {
        return function onChangeInputCB(event) {
            params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: event.target.value,
            });
        };
    }
    return (
        <input
            type="number"
            value={params.value || ""}
            onChange={createEditCellChangeHandlerCB(params)}
            className="MuiInputBase-input MuiDataGrid-editInputCell"
            style={{ padding: "8px", width: "100%" }}
        />
    );
}

// Factory function to create columns with delete handler
export function createColumns(deleteInvestmentHandler) {
    // Function to get row action items with access to the delete handler
    function getRowActionItemsCB(params) {
        return [
            <GridActionsCellItem
                icon={<GridDeleteIcon sx={{ color: "white" }} />}
                label="Delete"
                onClick={() => deleteInvestmentHandler(params.id)}
            />,
        ];
    }

    // Return the columns configuration
    return [
        {
            field: "name",
            headerName: "Type of Investment",
            flex: 1,
            minWidth: 110,
            sortable: true,
            editable: true,
        },
        {
            field: "amount",
            headerName: "Investment Amount ($)",
            flex: 1,
            minWidth: 110,
            type: "number",
            sortable: true,
            editable: true,
            renderEditCell: renderAmountEditCellCB,
        },
        {
            field: "riskTolerance",
            headerName: "Asset Risk",
            flex: 1,
            minWidth: 110,
            sortable: true,
            editable: true,
            type: "singleSelect",
            valueOptions: ["Low", "Medium", "High"],
        },
        {
            field: "liquidity",
            headerName: "Liquidity",
            flex: 1,
            minWidth: 110,
            sortable: true,
            editable: true,
            type: "singleSelect",
            valueOptions: ["High (Easy access)", "Medium (Some restrictions)", "Low (Money locked in)"],
        },
        {
            field: "timeHorizon",
            headerName: "Investment Timeline",
            flex: 1,
            minWidth: 110,
            sortable: true,
            editable: true,
            type: "singleSelect",
            valueOptions: ["Short-term (1-2 years)", "Medium-term (3-7 years)", "Long-term (8+ years)"],
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            flex: 0.5,
            minWidth: 90,
            getActions: getRowActionItemsCB,
        },
    ];
}

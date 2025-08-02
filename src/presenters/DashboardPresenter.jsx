import { useEffect } from "react";
import { connect } from "react-redux";
import { DashboardView } from "../views/DashboardView";
import { useMediaQuery, useTheme } from "@mui/material";
import { mapDispatchToInvestmentProps, mapStateToInvestmentProps } from "../maps/investmentMap.js";
import { createColumns } from "../utils/Dashboard/createColumnsForDasboard.jsx";
import { formatDataForPieChartCB } from "../utils/Dashboard/dataForPieChart.jsx";
import { createChartConfig } from "../utils/Dashboard/chartConfig.jsx";

export function Dashboard(props) {
    // Mobile detection
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isMobileSm = useMediaQuery(theme.breakpoints.down("sm"));

    // Use props from investmentMap
    const isLoading = props.isInvestmentsLoading;
    const error = props.investmentsError;

    // Compute chart data from Redux store
    const chartDataObj = formatDataForPieChartCB(props.investments);
    const chartData = { data: chartDataObj.data };
    const total = Number(chartDataObj.total);
    const showChart = Array.isArray(props.investments) && props.investments.length > 0;

    // Use the utility function to create chart config based on screen size
    const chartConfig = createChartConfig(isMobileSm, isMobile);

    // Handle deleting an investment
    function handleDeleteInvestmentCB(investmentId) {
        const confirmMessage = "Are you sure you want to delete this investment?";
        const userConfirmed = window.confirm(confirmMessage);

        if (userConfirmed) {
            props.deleteInvestmentACB(investmentId);
        }
    }

    // Create columns with our delete handler
    const columns = createColumns(handleDeleteInvestmentCB);

    function handleUpdateInvestmentCB(newRow, oldRow) {
        // Don't allow negative amounts
        if (newRow.amount < 0) {
            return oldRow; // Reject the change
        }

        props.updateInvestmentACB(newRow);
        return newRow;
    }

    // Handle adding a new investment
    function handleAddInvestmentCB() {
        // Dispatch to update store
        props.addInvestmentACB();
    }

    // Handle errors during row update
    function handleProcessRowUpdateErrorCB(error) {
        console.error("Error updating row:", error);
    }

    // Handle cell click - but NOT for actions
    function handleCellClickCB(params, event) {
        // Don't start edit mode for action columns
        if (params.field === "actions") return;

        // Create a synthetic double-click event
        const element = event.currentTarget;
        const dblClickEvent = new MouseEvent("dblclick", {
            bubbles: true,
            cancelable: true,
            view: window,
        });
        function dispatchDblClickEventCB(targetElement, eventObject) {
            targetElement.dispatchEvent(eventObject);
        }

        setTimeout(function timeoutCB() {
            dispatchDblClickEventCB(element, dblClickEvent);
        }, 10);
    }

    // Determine cell class name
    function getCellClassNameCB(params) {
        if (params.field === "actions") return "";
        return "editable-cell";
    }

    // FIXED: Only fetch data when user authentication state is ready
    useEffect(() => {
        // Only fetch if user state is ready (either authenticated or confirmed not authenticated)
        if (props.isUserReady) {
            props.fetchQuizResultACB();
            props.fetchInvestmentsACB();
        }
    }, [props.isUserReady]); // Dependency on user ready state

    return (
        <DashboardView
            // Pie Chart props
            chartData={chartData}
            total={total}
            showChart={showChart}
            chartConfig={chartConfig}
            // DataGrid props
            investments={props.investments}
            columns={columns}
            // Event handlers
            onAddInvestment={handleAddInvestmentCB}
            onUpdateInvestment={handleUpdateInvestmentCB}
            onProcessRowUpdateError={handleProcessRowUpdateErrorCB}
            // Mobile-specific DataGrid props
            isMobile={isMobile}
            getCellClassName={getCellClassNameCB}
            cellClick={handleCellClickCB}
            // Shared props
            loading={isLoading}
            error={error}
            // Princess description
            princessShortDesc={props.shortDesc}
            princessLongDesc={props.longDesc}
        />
    );
}

export const DashboardPage = connect(mapStateToInvestmentProps, mapDispatchToInvestmentProps)(Dashboard);

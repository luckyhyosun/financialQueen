import React from "react";
import Stack from "@mui/material/Stack";
import BasicPie from "../components/PieChart/PieChartMUIComponent.jsx";
import DataGridComponent from "../components/DataGrid/DataGridComponent.jsx";
import AddInvestmentButton from "../components/ButtonAddInvestment/AddInvestmentButton.jsx";
import { UserThumbnail } from "../components/UserThumbnail.jsx";

export function DashboardView(props) {
    // Navigation handler
    function handleNavigateToEducationACB() {
        window.location.hash = "/education";
    }

    return (
        <div className="overflow-y-auto overflow-x-hidden" style={{ maxHeight: "100vh", paddingBottom: "8rem" }}>
            {/* Header Section */}
            <div className="flex flex-row items-center ps-4">
                <div className="d-flex align-items-center pt-2">
                    <UserThumbnail />
                    <h1 className="text-white ps-2 pt-3 page-heading">Plan your financial Portfolio</h1>
                </div>
            </div>
            <div className="text-white p-4">
                {/*<p>{props.princessShortDesc}</p>*/}
                <p className="text-white-75 fs-5">{props.princessLongDesc}</p>
                <p className="text-white-75 fs-5">
                    Start building your first investment portfolio. Try adding different types of investments and see
                    how they work together. Don't worry about getting it perfect, this is your safe space to explore and
                    learn!
                </p>
            </div>

            {/* Two Column Layout - Using Bootstrap row and col system */}
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="card mb-3 bg-transparent border-0">
                            <div className="card-body text-white">
                                {/* Add Investment Button */}
                                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mb: 2 }}>
                                    <AddInvestmentButton onClick={props.onAddInvestment} />
                                </Stack>

                                {/* DataGrid Component */}
                                <DataGridComponent
                                    rows={props.investments}
                                    columns={props.columns}
                                    loading={props.loading}
                                    processRowUpdate={props.onUpdateInvestment}
                                    onProcessRowUpdateError={props.onProcessRowUpdateError}
                                    isMobile={props.isMobile}
                                    getCellClassName={props.getCellClassName}
                                    cellClick={props.cellClick}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="card mb-3 bg-transparent border-0">
                            <div className="card-body text-white">
                                <BasicPie
                                    chartData={props.chartData}
                                    total={props.total}
                                    showChart={props.showChart}
                                    chartConfig={props.chartConfig}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column flex-md-row align-items-center justify-content-center pb-sm-5 pt-4 ps-4 ps-md-0">
                    <h2 className="text-white">Not sure what all these words mean? Check out the </h2>
                    <button
                        onClick={handleNavigateToEducationACB}
                        className="btn btn-light btn-md px-4 rounded-pill fw-bold shadow ms-3 mt-4 mt-md-0"
                    >
                        Education Page
                    </button>
                </div>
            </div>

            {props.error && <div className="alert alert-danger mt-3">Error: {props.error}</div>}

            {props.loading && (
                <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
}

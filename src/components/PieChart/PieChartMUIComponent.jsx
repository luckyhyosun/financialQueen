import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import { pieChartStyles } from "./PieChartStyles";

export default function BasicPie({ chartData, total, showChart, chartConfig }) {
    // Make sure total is a number
    const numericTotal = typeof total === "number" ? total : 0;

    return (
        <Box sx={pieChartStyles.container}>
            <Typography variant="h5" className="pt-md-0 pt-5 fs-3">
                Investment Distribution
            </Typography>
            <Typography sx={pieChartStyles.totalAmount} className="fs-5">
                Total: ${numericTotal.toLocaleString()}
            </Typography>

            {showChart && chartData && chartData.data && chartData.data.length > 0 && (
                <Box sx={pieChartStyles.chartWrapper}>
                    <PieChart
                        series={[
                            {
                                data: chartData.data,
                                innerRadius: 0,
                                outerRadius: 100,
                                paddingAngle: 0,
                                cornerRadius: 0,
                                startAngle: 0,
                                endAngle: 360,
                                cx: chartConfig.width / 2,
                                cy: chartConfig.height / 2,
                            },
                        ]}
                        sx={pieChartStyles.chart}
                        width={chartConfig.width}
                        height={chartConfig.height}
                        slotProps={{
                            legend: {
                                direction: "vertical",
                                position: {
                                    vertical: "middle",
                                    horizontal: "right",
                                },
                                padding: 5,
                            },
                        }}
                    />
                </Box>
            )}

            {!showChart && (
                <Typography variant="body1" sx={pieChartStyles.noDataMessage}>
                    No investment data to display
                </Typography>
            )}
        </Box>
    );
}

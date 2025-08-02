// src/components/PieChart/PieChartStyles.js
export const pieChartStyles = {
    container: {
        flexGrow: 1,
        textAlign: 'center'
    },
    totalAmount: {
        paddingTop: 2
    },
    chartWrapper: {
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chart: {
        '& .MuiChartsLegend-label': {
            color: 'white'
        },
        // Styles for legend scrollability
        '& .MuiChartsLegend-root': {
            maxHeight: 200,
            overflowY: 'auto',
            // Add styling for scrollbar
            '&::-webkit-scrollbar': {
                width: '6px'
            },
            '&::-webkit-scrollbar-track': {
                background: 'rgba(255, 255, 255, 0.1)'
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '3px'
            }
        }
    },
    noDataMessage: {
        color: 'white',
        marginTop: 5
    }
};
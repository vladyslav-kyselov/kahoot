import * as React from 'react';
import { ChartContainer, BarPlot } from '@mui/x-charts';

const uData = [4000, 3000, 2000, 2780];
const xLabels = [
    'A',
    'B',
    'C',
    'D'
];

export default function Bars() {
    return (
        <ChartContainer
            width={500}
            height={300}
            series={[{ data: uData, label: 'uv', type: 'bar' }]}
            xAxis={[{ scaleType: 'band', data: xLabels }]}
        >
            <BarPlot />
        </ChartContainer>
    );
}

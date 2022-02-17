import React from "react";
import ReactECharts from 'echarts-for-react';

export default function EChart({options, height}) {
     return (
        <div className="flex flex-col justify-items-center w-full">
            <ReactECharts
                option={options}
                notMerge={true}
                lazyUpdate={true}
                style={{height: height}}
            />
        </div>
    );
}
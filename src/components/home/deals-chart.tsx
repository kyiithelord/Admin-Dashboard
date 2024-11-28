import { DollarOutlined } from "@ant-design/icons"
import { Card } from "antd"
import { Text } from "../text"
import { Area, AreaConfig } from "@ant-design/plots"
import { useList } from "@refinedev/core"
import { DASHBOARD_DEALS_CHART_QUERY } from "@/graphql/queries"
import React from "react"
import { mapDealsData } from "@/utilities/helpers"
import { DashboardDealsChartQuery } from "@/graphql/type"
import { GetFieldsFromList } from "@refinedev/nestjs-query"

const DealsChart = () => {
  const {data} = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    resource:'dealStages',
    filters:[
      {field:'title',operator:'in',value:['WON','LOST']}
    ],
    meta:{
      gqlQuery:DASHBOARD_DEALS_CHART_QUERY
    }
  });

  const dealData = React.useMemo(()=>{
    return mapDealsData(data?.data); 
  },[data?.data])
  const config: AreaConfig = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    isStack: false,
    seriesField: 'state',
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
      offsetY: -6,
    },
    // yAxis: {animation: true,
    //   tickCount: 4,
    //   // label: {
    //   //   formatter: (v: string) => {
    //   //     return `$${Number(v) / 1000}k`; // Formats the Y-axis labels
    //   //   },
    //   // },
    // },
    // tooltip: {
    //   formatter: (data) => {
    //     return {
    //       name: data.state, // State or category name
    //       value: `$${Number(data.value) / 1000}k`, // Correctly display value as $Xk
    //     };
    //   },
    // },
  };
  
  return (
    <Card
      style={{height:'100%'}} // Root style
      styles={{
        header: { padding:'8px 16px' },
        body: { padding: '24px 24px 0 24px'},
      }}
      title={
        <div
          style={{
            display:'flex',
            alignItems:'center',
            gap:'8px'
          }}
        >
           <DollarOutlined/>
            <Text
              size="sm" 
              style={{marginLeft:'0.5rem'}}
            >
              Deals
            </Text>
        </div>
      }
    >
      <Area {...config} height={325}/>
    </Card>
  )
}

export default DealsChart
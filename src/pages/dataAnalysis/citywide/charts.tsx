import React, { useEffect } from "react";
import echarts from "echarts";
import { EChartOption } from "echarts"
import { MapboxScene } from '@antv/l7-react';
import { CityLayer } from '@antv/l7-district';
import { Donut } from '@ant-design/charts';
import { axios } from "utils/RequestUtil";
import { inject } from "mobx-react";
import DataStore from "stores/dataStore";

export const CaseRankChart = inject("data")((props: {
    data?: DataStore
}) => {
    const divRef = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        props.data!.getStatisticsCityCaseRank()
            .then(res => {
                let tmpData = res.data;
                var myChart = echarts.init(divRef.current as HTMLDivElement);
                var option = {
                    color: ["#91DCF4", "#FFCADD", '#EBD0FE'],
                    legend: {
                        right: 80,
                        icon: "rect"
                    },
                    tooltip: {
                        trigger: 'axis' as ("none" | "axis" | "item" | undefined),
                        axisPointer: {
                            type: 'cross' as ("line" | "none" | "cross" | "shadow" | undefined),
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    xAxis: {
                        type: "category" as EChartOption.BasicComponents.CartesianAxis.Type,
                        boundaryGap: false,
                        data: tmpData.map((item: any) => item.year + "年"),
                        axisTick: { show: false }
                    },
                    yAxis: {
                        type: 'value' as EChartOption.BasicComponents.CartesianAxis.Type,
                        nameTextStyle: {
                            color: "#101010"
                        },
                        axisTick: { show: false }
                    },
                    series: [{
                        data: tmpData.map((item: any) => item.civilCase),
                        name: '民事',
                        type: 'line',
                        symbol: 'none',
                        smooth: true,
                        areaStyle: {
                            color: "#91DCF4"
                        }
                    }, {
                        data: tmpData.map((item: any) => item.criminalCase),
                        type: 'line',
                        symbol: 'none',
                        name: '刑事',
                        smooth: true,
                        areaStyle: {
                            color: "#FFCADD"
                        }
                    }, {
                        data: tmpData.map((item: any) => item.adminCase),
                        type: 'line',
                        symbol: 'none',
                        name: '行政',
                        smooth: true,
                        areaStyle: {
                            color: "#EBD0FE"
                        }
                    }]
                };

                myChart.setOption(option);
            })
    }, [divRef]);
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>案件走势统计</div>
        <div style={{
            display: "flex",
            height: "90%",
            width: '100%'
        }}>
            <div ref={divRef} style={{ width: '90%', height: "100%" }}></div>
        </div>
    </>
})


export const CaseAreaChart = inject("data")((props: {
    data?: DataStore
}) =>
    <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>案件区域分布</div>
        <div style={{ width: '100%', height: "100%", padding: "12px" }}>
            <MapboxScene
                onSceneLoaded={scene => {
                    props.data!.getStatisticsCityCaseAreaCount()
                        .then(res => {
                            new CityLayer(scene, {
                                data: res.data.map((item: any) => ({
                                    ...item,
                                    code: DataStore.DISTRICT_CODE[item.areaName],
                                    NAME_CHN: item.areaName
                                })),
                                joinBy: ['adcode', 'code'],
                                adcode: ['320000', '320200'],
                                depth: 3,
                                label: {
                                    field: 'NAME_CHN',
                                    textAllowOverlap: false
                                },
                                fill: {
                                    color: {
                                        field: 'totalCount',
                                        values: [
                                            '#C7FCF1',
                                            '#ACF4F4',
                                            '#9CE2F3',
                                            '#8BABF3',
                                            '#66BDF7',
                                            '#4084F0'
                                        ]
                                    }
                                },
                                popup: {
                                    enable: true,
                                    Html: props => {
                                        return `
                                        <div>公安报案：${props.policeCount}件</div>
                                        <div>检察公诉：${props.procuratorateCount}件</div>
                                        <div>法院判决：${props.courtCriminalCount}件刑事 ${props.courtCivilCount}件民事</div>
                                        <div>总量：<span style="color:#4084F0;">${props.totalCount}</span>件</div>
                                        <div class="case-area-pop-progress">
                                            <div><div></div></div>
                                            <div>25%</div>
                                        </div>
                                        `;
                                    }
                                }
                            });
                        })
                }}
                map={{
                    center: [116.2825, 39.9],
                    pitch: 0,
                    style: 'blank',
                    zoom: 3,
                    minZoom: 0,
                    maxZoom: 10,
                }}
                option={{
                    logoVisible: false
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
            ></MapboxScene>
        </div>
    </>)

export const CaseCategoryChart = inject("data")((props: {
    data?: DataStore
}) => {
    const [data1, setData1] = React.useState([] as any[])
    const [data2, setData2] = React.useState([] as any[])
    const [data3, setData3] = React.useState([] as any[])

    useEffect(() => {
        props.data!.getStatisticsCityCaseCategoryCount()
            .then(res => {
                setData1([{
                    type: '羁押案件',
                    value: res.data.criminalDetainCaseCount
                }, {
                    type: '非羁押案件',
                    value: (res.data.criminalCaseCount - res.data.criminalDetainCaseCount)
                }])
                setData2([{
                    type: '民事案件',
                    value: res.data.civilCaseCount
                }, {
                    type: '其他',
                    value: res.data.criminalCaseCount + res.data.adminCaseCount
                }])
                setData3([{
                    type: '行政案件',
                    value: res.data.adminCaseCount
                }, {
                    type: '其他',
                    value: res.data.civilCaseCount + res.data.criminalCaseCount
                }])
            })
    }, [true])

    const config = {
        forceFit: true,
        title: {
            visible: false,
            text: '',
        },
        legend: {
            visible: false
        },
        description: {
            visible: false,
            text: '',
        },
        radius: 0.8,
        padding: 'auto',
        data: data1,
        label: {
            visible: true,
            type: 'spider',
        },
        angleField: 'value',
        colorField: 'type',
    };
    const config1 = {
        forceFit: true,
        legend: {
            visible: false
        },
        title: {
            visible: false,
            text: '',
        },
        description: {
            visible: true,
            text: '',
        },
        radius: 0.8,
        padding: 'auto',
        data: data2,
        label: { visible: false },
        angleField: 'value',
        colorField: 'type',
    };
    const config2 = {
        legend: {
            visible: false
        },
        forceFit: true,
        label: { visible: false },
        title: {
            visible: false,
            text: '环图',
        },
        description: {
            visible: false,
            text: '',
        },
        radius: 0.8,
        padding: 'auto',
        data: data3,
        angleField: 'value',
        colorField: 'type',
    };
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>案件类型统计</div>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around' }}>
            <div>
                <div style={{ width: "260px" }}>
                    <div style={{ height: '300px' }}>
                        <Donut {...config} />
                    </div>
                    <div style={{ color: '#101010', fontSize: '16px', textAlign: 'center' }}>刑事案件</div>
                </div>
            </div>
            <div>
                <div style={{ width: '260px' }}>
                    <div style={{ height: '300px' }}>
                        <Donut {...config1} />
                    </div>
                    <div style={{ color: '#101010', fontSize: '16px', textAlign: 'center' }}>民事案件</div>
                </div>
            </div>
            <div>
                <div style={{ width: '260px' }}>
                    <div style={{ height: '300px' }}>
                        <Donut {...config2} />
                    </div>
                    <div style={{ color: '#101010', fontSize: '16px', textAlign: 'center' }}>行政案件</div>
                </div>
            </div>
        </div>
    </>
})

export const CaseReasonChart = inject("data")((props: {
    data?: DataStore
}) => {
    const divRef = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        props.data!.getStatisticsCityCaseReasonCount()
            .then(res => {
                var myChart = echarts.init(divRef.current as HTMLDivElement);
                var option = {
                    tooltip: {
                        trigger: 'item' as ("none" | "axis" | "item" | undefined),
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],
                            label: {
                                position: 'inner'
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                { value: 335, name: '直达', selected: true },
                                { value: 679, name: '营销广告' },
                                { value: 1548, name: '搜索引擎' }
                            ]
                        },
                        {
                            name: '刑事案件',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            label: {
                                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                // shadowBlur:3,
                                // shadowOffsetX: 2,
                                // shadowOffsetY: 2,
                                // shadowColor: '#999',
                                // padding: [0, 7],
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    // abg: {
                                    //     backgroundColor: '#333',
                                    //     width: '100%',
                                    //     align: 'right',
                                    //     height: 22,
                                    //     borderRadius: [4, 4, 0, 0]
                                    // },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            },
                            data: res.data.map((item: any) => ({
                                name: item.reason,
                                value: item.count
                            }))
                        }
                    ]
                };
                myChart.setOption(option);
            })
    }, [divRef]);
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>案由罪名统计</div>
        <div style={{
            display: "flex",
            height: "90%",
            width: '100%'
        }}>
            <div ref={divRef} style={{ width: '90%', height: "100%" }}></div>
        </div>
    </>
})

export const ProcuratorateJobChart = inject("data")((props: {
    data?: DataStore
}) => {

    const divRef = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        props.data!.getStatisticsCityCaseProcuratorateCount()
            .then(res => {
                let tmp: { [key: string]: number[] } = {
                    "江阴市": [0, 0, 0],
                    "宜兴市": [0, 0, 0],
                    "梁溪区": [0, 0, 0],
                    "锡山区": [0, 0, 0],
                    "新吴区": [0, 0, 0],
                    "滨湖区": [0, 0, 0]
                }
                for (let i in res.data) {
                    let item = res.data[i];
                    let tmpArray = tmp[item.areaName]
                    if (tmpArray) {
                        tmp[item.areaName] = [item.count1, item.count2, item.count3]
                    }
                }
                var myChart = echarts.init(divRef.current as HTMLDivElement);
                var option = {
                    color: ['#63A5FF', '#FFB9B9', '#75EAD3'],
                    legend: {
                        right: 80,
                        icon: 'roundRect'
                    },
                    tooltip: {},
                    dataset: {
                        source: [
                            ['地区', '审查逮捕', '审查起诉', '提起诉讼'],
                            ['江阴市', ...tmp['江阴市']],
                            ['宜兴市', ...tmp['宜兴市']],
                            ['梁溪区', ...tmp['梁溪区']],
                            ['锡山区', ...tmp['锡山区']],
                            ['新吴区', ...tmp['新吴区']],
                            ['滨湖区', ...tmp['滨湖区']],
                        ]
                    },
                    xAxis: { type: 'category' as "time" | "value" | "category" | "log" | undefined },
                    yAxis: {},
                    series: [
                        { type: 'bar' },
                        { type: 'bar' },
                        { type: 'bar' }
                    ]
                };
                myChart.setOption(option);
            })
    }, [divRef]);
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>检察机关办案统计</div>
        <div style={{
            display: "flex",
            height: "90%",
            width: '100%'
        }}>
            <div ref={divRef} style={{ width: '90%', height: "100%" }}></div>
        </div>
    </>
})

const ColorLine = (props: {
    percent: number,
    name: string,
    number: number,
}) =>
    <div style={{
        width: "100%",
        height: "45px",
        display: "flex",
        alignItems: 'center',
        justifyContent: "space-between",
        justifyItems: 'flex-start'
    }}>
        <div style={{ color: "#555555", fontSize: "14px", cursor: 'pointer', paddingRight: "10px", width: '60px' }}>
            <span>{props.name}</span>
        </div>
        <div style={{ flex: 1 }}>
            <div style={{
                height: "12px",
                backgroundColor: '#255CB5',
                width: `${props.percent}%`,
                position: "relative",
                boxShadow: `1px 2px 4px #255CB5`
            }}>
                <div style={{
                    color: '#255CB5',
                    fontSize: "16px",
                    position: "absolute",
                    right: "-32px",
                    top: "-6px"
                }}>{props.number}</div>
            </div>
        </div>
    </div >




export const ProcuratorJobChart = inject("data")((props: {
    data?: DataStore
}) => {

    const [list, setList] = React.useState([] as any[])

    useEffect(() => {
        props.data!.getStatisticsCityProsecutorCaseCount()
            .then(res => {
                setList(res.data)
            })

    }, [true])

    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>检察官办案统计</div>
        <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            height: "100%",
            width: '100%',
            padding: '50px 20px 20px 20px'
        }}>
            {
                list.slice(0, 7).map((item, index) =>
                    <ColorLine key={index} percent={(100 - (index + 1) * 10)} name={item.prosecutorName} number={item.prosecutorCount}></ColorLine>
                )
            }
        </div>
    </>
}
)

const TrialProcedure = (props: {
    color: string,
    name: string,
    count: number,
    direction?: 'left' | 'right'
}) =>
    <div style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        position: "relative",
        justifyContent: 'space-between'
    }}>
        <div style={{ textAlign: "center", position: 'relative' }}>
            {props.name}
            <div style={{
                width: "100px",
                textAlign: "left", position: 'absolute', color: '#255CB5', fontSize: '16px', bottom: "-20px", left: "0px"
            }}>{props.count}件</div>
        </div>
        <div style={{ flex: 0.5, width: "40px", height: "14px", borderRadius: "10px", backgroundColor: props.color, margin: '0 10px' }}></div>
        <div style={{ color: "#101010 100%", fontSize: "20px", flex: 1 }}>{props.count}件</div>
    </div>

export const TrialProcedureChart = () => {
    const [data, setData] = React.useState([] as any[])

    useEffect(() => {
        axios.get("/api/statistics/national/procedure")
            .then(res => {
                let tmp = res.data;
                let data = [{
                    type: '一审',
                    value: tmp.yishen
                }, {
                    type: '二审',
                    value: tmp.ershen
                }, {
                    type: '再审',
                    value: tmp.zaishen
                }, {
                    type: '执行',
                    value: tmp.zhixing
                }, {
                    type: '其他',
                    value: tmp.other
                }]
                setData(data)
            })
    }, [true])

    const config = {
        forceFit: true,
        title: {
            visible: false,
            text: '',
        },
        description: {
            visible: false,
            text: '',
        },
        radius: 0.8,
        padding: 'auto',
        data,
        angleField: 'value',
        colorField: 'type',
        legend: {
            visible: false
        }
    };
    return <>

        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px", display: "relative", width: "calc(100% - 50px)" }}>
            审理程序
            <div className="case-rank-items">
                <div>刑事</div>
                <div>民事</div>
            </div>
        </div>
        <div style={{
            display: "flex"
        }}>
            <div style={{
                flex: 1,
                paddingLeft: '22px'
            }}>
                <div style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    padding: '112px 0',
                    width: "100%",
                    margin: "0 auto"
                }}>
                    <TrialProcedure color="#35A8E0" name="一审" count={data.length > 0 ? data.filter(item => item.type === "一审")[0].value : 0}></TrialProcedure>
                    <TrialProcedure color="#6C469D" name="二审" count={data.length > 0 ? data.filter(item => item.type === "二审")[0].value : 0}></TrialProcedure>
                    <TrialProcedure color="#3C5A98" name="再审" count={data.length > 0 ? data.filter(item => item.type === "再审")[0].value : 0}></TrialProcedure>
                </div>
            </div>
            <div style={{
                flex: 1
            }}>
                <Donut {...config} />
            </div>
            <div style={{
                flex: 1
            }}>
                <div style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    padding: '112px 0',
                    width: "100%",
                    margin: "0 auto"
                }}>
                    <TrialProcedure color="#E1524A" name="执行" count={data.length > 0 ? data.filter(item => item.type === "执行")[0].value : 0}></TrialProcedure>
                    <TrialProcedure color="#4EB260" name="其他" count={data.length > 0 ? data.filter(item => item.type === "其他")[0].value : 0}></TrialProcedure>
                    <div></div>
                </div>
            </div>
        </div>
    </>
}

export const TrialDurationChart = inject("data")((props: {
    data?: DataStore
}) => {
    const [category, setCategory] = React.useState("刑事")
    const divRef = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        props.data!.getStatisticsCityCaseTrialDuration(category)
            .then(res => {
                let tmp = res.data;
                var myChart = echarts.init(divRef.current as HTMLDivElement);
                var option = {
                    xAxis: {
                        data: ['30天以内', '31-60天', '61-90天', '91-180天', '181-365天', '365天'],
                        axisTick: { show: false },
                        axisLine: { show: false },
                        axisLabel: {
                            color: '#101010'
                        }
                    },
                    yAxis: {
                        splitLine: { show: false },
                        axisTick: { show: false },
                        axisLine: { show: false },
                        axisLabel: { show: false }
                    },
                    color: ['#45F2FF'],
                    series: [{
                        name: 'hill',
                        type: 'pictorialBar',
                        barCategoryGap: '-130%',
                        // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
                        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                        itemStyle: {
                            opacity: 0.8
                        },
                        emphasis: {
                            itemStyle: {
                                opacity: 1
                            }
                        },
                        data: [tmp.count1, tmp.count2, tmp.count3, tmp.count4, tmp.count5, tmp.count6],
                        z: 10
                    }, {
                        name: 'glyph',
                        type: 'pictorialBar',
                        barGap: '-100%',
                        symbol: 'none',
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}件',
                            fontSize: 16,
                            color: '#101010'
                        },
                        symbolOffset: [0, '50%'],
                        data: [{
                            value: tmp.count1,
                            symbolSize: [60, 60]
                        }, {
                            value: tmp.count2,
                            symbolSize: [50, 60]
                        }, {
                            value: tmp.count3,
                            symbolSize: [65, 35]
                        }, {
                            value: tmp.count4,
                            symbolSize: [50, 30]
                        }, {
                            value: tmp.count5,
                            symbolSize: [50, 35]
                        }, {
                            value: tmp.count6,
                            symbolSize: [40, 30]
                        }]
                    }]
                };

                myChart.setOption(option);
            })
    }, [category]);
    return <>
        <div id="caseRankChart" style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px", display: "relative", width: "calc(100% - 50px)" }}>
            审理期限
            <div className="case-rank-items">
                <div onClick={() => setCategory('刑事')} className={category === '刑事' ? 'active' : ''}>刑事</div>
                <div onClick={() => setCategory('民事')} className={category === '民事' ? 'active' : ''}>民事</div>
            </div>
        </div>
        <div style={{ width: "100%", height: "80%" }}>
            <div ref={divRef} style={{ width: "80%", height: "100%", margin: '0 auto' }}>

            </div>
        </div>
    </>
})
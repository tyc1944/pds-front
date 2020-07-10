import React, { useEffect } from "react";
import echarts from "echarts";
import { MapboxScene } from '@antv/l7-react';
import { CityLayer } from '@antv/l7-district';

export const ClueRankChart = () => {
    const divRef = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        var myChart = echarts.init(divRef.current as HTMLDivElement);
        var option = {
            xAxis: {
                type: 'category' as "time" | "category" | "value" | "log" | undefined,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value' as "time" | "category" | "value" | "log" | undefined
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };
        myChart.setOption(option);
    }, [divRef]);
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>本院线索走势图</div>
        <div style={{
            display: "flex",
            height: "90%",
            width: '100%'
        }}>
            <div ref={divRef} style={{ width: '90%', height: "100%" }}></div>
        </div>
    </>
}


export const CaseRankChart = () => {
    const divRef = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        var myChart = echarts.init(divRef.current as HTMLDivElement);
        var option = {
            xAxis: {
                type: 'category' as "time" | "category" | "value" | "log" | undefined,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value' as "time" | "category" | "value" | "log" | undefined
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                lineStyle: {
                    color: '#5760FD',
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10,
                    shadowOffsetY: 8,
                    width: 4
                },
                smooth: true
            }]
        };
        myChart.setOption(option);
    }, [divRef]);
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px", display: "relative", width: "calc(100% - 50px)" }}>
            案件监督走势统计
            <div className="case-rank-items">
                <div>侦查活动监督</div>
                <div>刑事诉讼监督</div>
                <div>民事诉讼监督</div>
                <div>行政执法监督</div>
            </div>
        </div>
        <div style={{
            display: "flex",
            height: "90%",
            width: '100%'
        }}>
            <div ref={divRef} style={{ width: '90%', height: "100%" }}></div>
        </div>
    </>
}

export const AreaRankChart = () => {
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>无锡线索来源高并发统计</div>
        <div style={{ width: '100%', height: "100%", padding: "12px" }}>
            <MapboxScene
                onSceneLoaded={scene => {
                    new CityLayer(scene, {
                        data: [{
                            code: '320201',
                            name: 'test',
                            pop: 1222
                        }],
                        joinBy: ['adcode', 'code'],
                        adcode: ['320000', '320200'],
                        depth: 3,
                        label: {
                            field: 'NAME_CHN',
                            textAllowOverlap: false
                        },
                        bubble: {
                            enable: true,
                            style: {
                                opacity: 0.5,
                                stroke: "#feedde",
                                strokeWidth: 10
                            }
                            // size: {
                            //     field: 'pop',
                            //     values: [3, 2000]
                            // }
                        },
                        fill: {
                            color: {
                                field: 'pop',
                                values: [
                                    '#feedde',
                                    '#fdd0a2',
                                    '#fdae6b',
                                    '#fd8d3c',
                                    '#e6550d',
                                    '#a63603'
                                ]
                            }
                        },
                        popup: {
                            enable: true,
                            Html: props => {
                                return `<span>${props.NAME_CHN}:</span><span>${props.pop}</span>`;
                            }
                        }
                    });
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
    </>
}

export const SuperviseRankChart = () => {
    const divRef = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        var myChart = echarts.init(divRef.current as HTMLDivElement);
        var option = {
            tooltip: {
                trigger: 'item' as "none" | "item" | "axis" | undefined,
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
                {
                    name: '姓名',
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '50%'],
                    data: [{
                        name: '刑事诉讼监督',
                        value: 205
                    }, {
                        name: '民事诉讼监督',
                        value: 181
                    }, {
                        name: '侦查活动监督',
                        value: 352
                    }, {
                        name: '行政执法监督',
                        value: 86
                    }],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }, [divRef]);
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>案件监督数量占比</div>
        <div style={{
            display: "flex",
            height: "90%",
            width: '100%'
        }}>
            <div ref={divRef} style={{ width: '90%', height: "100%" }}></div>
        </div>
    </>
}

export const ClueSourceRankChart = () => {
    const divRef = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        var myChart = echarts.init(divRef.current as HTMLDivElement);
        var option = {
            tooltip: {
                trigger: 'item' as "none" | "item" | "axis" | undefined,
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical' as "vertical" | "horizontal" | undefined,
                left: 10,
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1548, name: '搜索引擎' }
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }, [divRef]);
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>线索来源统计</div>
        <div style={{
            display: "flex",
            height: "90%",
            width: '100%'
        }}>
            <div ref={divRef} style={{ width: '90%', height: "100%" }}></div>
        </div>
    </>
}

export const CaseExceptionRankChart = () =>
    <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>案件异常类型统计</div>
    </>

export const ClueCategoryChart = () =>
    <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>线索类别统计</div>
    </>

export const ClueSuperviseChart = () =>
    <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>线索转监督案件统计</div>
    </>

export const ClueRateRankChart = () =>
    <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", right: "21px" }}>线索评级统计</div>
    </>

export const ProcessedDurationChart = () =>
    <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>线索研判及案件监督平均处理时效统计</div>
    </>

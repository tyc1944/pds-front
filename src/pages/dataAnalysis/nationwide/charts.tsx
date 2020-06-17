import React, { useEffect } from "react";
import { Line } from '@ant-design/charts';
import { Scene, PolygonLayer, LineLayer, PointLayer } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
import { Donut, Area, Rose, Pie } from '@ant-design/charts';
import { Progress } from "antd";

export const CaseRankChart = () => {

    const data = [
        {
            year: '1991',
            value: 3,
        },
        {
            year: '1992',
            value: 4,
        },
        {
            year: '1993',
            value: 3.5,
        },
        {
            year: '1994',
            value: 5,
        },
        {
            year: '1995',
            value: 4.9,
        },
        {
            year: '1996',
            value: 6,
        },
        {
            year: '1997',
            value: 7,
        },
        {
            year: '1998',
            value: 9,
        },
        {
            year: '1999',
            value: 13,
        },
    ];
    const config = {
        title: {
            visible: false,
            text: '',
        },
        description: {
            visible: false,
            text: '',
        },
        padding: 'auto',
        forceFit: true,
        data,
        xField: 'year',
        yField: 'value',
        smooth: true,
        height: 350,
    };

    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>全国知识产权案例走势统计</div>
        <Line {...config} />
    </>
}


export const CaseAreaChart = (props: {}) => {
    const divRef = React.useRef(document.createElement('div'))

    useEffect(() => {
        const scene = new Scene({
            id: divRef.current as HTMLDivElement,
            map: new Mapbox({
                pitch: 0,
                style: 'blank',
                center: [116.368652, 39.93866],
                zoom: 10.07
            })
        });
        scene.on('loaded', () => {
            fetch(
                'https://gw.alipayobjects.com/os/bmw-prod/d6da7ac1-8b4f-4a55-93ea-e81aa08f0cf3.json'
            )
                .then(res => res.json())
                .then(data => {
                    const chinaPolygonLayer = new PolygonLayer({
                        autoFit: true
                    })
                        .source(data)
                        .color(
                            'name',
                            [
                                'rgb(239,243,255)',
                                'rgb(189,215,231)',
                                'rgb(107,174,214)',
                                'rgb(49,130,189)',
                                'rgb(8,81,156)'
                            ]
                        )
                        .shape('fill')
                        .style({
                            opacity: 1
                        });
                    //  图层边界
                    const layer2 = new LineLayer({
                        zIndex: 2
                    })
                        .source(data)
                        .color('rgb(93,112,146)')
                        .size(0.6)
                        .style({
                            opacity: 1
                        });

                    scene.addLayer(chinaPolygonLayer);
                    scene.addLayer(layer2);
                });
            fetch(
                'https://gw.alipayobjects.com/os/bmw-prod/c4a6aa9d-8923-4193-a695-455fd8f6638c.json' //  标注数据
            ).then(res => res.json())
                .then(data => {
                    const labelLayer = new PointLayer({
                        zIndex: 5
                    })
                        .source(data, {
                            parser: {
                                type: 'json',
                                coordinates: 'center'
                            }
                        })
                        .color('#fff')
                        .shape('name', 'text')
                        .size(12)
                        .style({
                            opacity: 1,
                            stroke: '#fff',
                            strokeWidth: 0,
                            padding: [5, 5],
                            textAllowOverlap: false
                        });

                    scene.addLayer(labelLayer);
                });
        });
    }, [divRef])

    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>案件区域分布</div>
        <div style={{ width: '100%', height: "100%", padding: "12px" }} ref={divRef}></div>
    </>
}

export const CaseCategoryChart = () => {
    const data = [
        {
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其它',
            value: 5,
        },
    ];
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
    };
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>案件类型统计</div>
        <Donut {...config} />
    </>
}


export const IndustryStatisticsChart = () =>
    <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>行业统计</div>
    </>

export const ProvinceCaseRankChart = () =>
    <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>地市案例统计</div>
        <div style={{
            height: "336px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "90%",
            margin: "0 auto"
        }}>
            <div>
                <div style={{ color: "#101010" }}>北京市</div>
                <Progress percent={30} />
            </div>
            <div>
                <div style={{ color: "#101010" }}>北京市</div>
                <Progress percent={30} />
            </div>
            <div>
                <div style={{ color: "#101010" }}>北京市</div>
                <Progress percent={30} />
            </div>
            <div>
                <div style={{ color: "#101010" }}>北京市</div>
                <Progress percent={30} />
            </div>
            <div>
                <div style={{ color: "#101010" }}>北京市</div>
                <Progress percent={30} />
            </div>
        </div>
    </>

export const ProcuratorationCaseRankChart = () =>
    <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>法院统计</div>
        <div style={{
            height: "336px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "90%",
            margin: "0 auto"
        }}>
            <div>
                <div style={{ color: "#101010" }}>北京市</div>
                <Progress percent={30} />
            </div>
            <div>
                <div style={{ color: "#101010" }}>北京市</div>
                <Progress percent={30} />
            </div>
            <div>
                <div style={{ color: "#101010" }}>北京市</div>
                <Progress percent={30} />
            </div>
            <div>
                <div style={{ color: "#101010" }}>北京市</div>
                <Progress percent={30} />
            </div>
            <div>
                <div style={{ color: "#101010" }}>北京市</div>
                <Progress percent={30} />
            </div>
        </div>
    </>

export const TrialProcedureChart = () => {
    const data = [
        {
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其它',
            value: 5,
        },
    ];
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
    };
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>审理程序</div>
        <Donut {...config} />
    </>
}

export const TrialDurationChart = () => {
    const [data, setData] = React.useState([]);
    useEffect(() => {
        asyncFetch();
    }, []);
    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/YdLK%24VvSkW/fireworks-sales.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        title: {
            visible: false,
            text: '基础面积图',
        },
        data,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            tickCount: 5,
        },
    };
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>审理期限</div>
        <Area {...config} />
    </>
}

export const YiShenChart = () => {
    const data = [
        {
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其它',
            value: 5,
        },
    ];
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
        data,
        radiusField: 'value',
        categoryField: 'type',
        colorField: 'type',
        label: {
            visible: true,
            type: 'outer',
            content: (text: any) => text.value,
        },
    };
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>一审裁判结果</div>
        <Rose {...config} />
    </>
}

export const ErShenChart = () => {
    const data = [
        {
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其它',
            value: 5,
        },
    ];
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
        data,
        angleField: 'value',
        colorField: 'type',
        label: {
            visible: true,
            type: 'outer',
            offset: 20,
        },
    };
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>二审裁判结果</div>
        <Pie {...config} />
    </>
}

export const SubstantiveLawChart = () =>
    <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", right: "21px" }}>实体法条</div>
    </>

export const ProceduralLawChart = () =>
    <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>程序法条</div>
    </>

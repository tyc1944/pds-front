import React, { useEffect } from "react";
import { Line } from '@ant-design/charts';
import { MapboxScene } from '@antv/l7-react';
import { CountryLayer } from '@antv/l7-district';
import { Donut, Area, Rose, Pie } from '@ant-design/charts';
import { Progress } from "antd";
import { axios } from "utils/RequestUtil";

export const CaseRankChart = () => {

    const [category, setCategory] = React.useState('刑事案件')
    const [data, setData] = React.useState([] as any[])
    const config = {
        title: {
            visible: false,
            text: '',
        },
        description: {
            visible: true,
            text: '单位：万件',
        },
        padding: 'auto',
        forceFit: true,
        data,
        xField: 'year',
        yField: 'value',
        meta: {
            year: {
                alias: '年份',
                formatter: (v: number) => { return `${v}年` }
            },
            value: {
                alias: '数量'
            }
        },
        smooth: true,
        height: 350,
    };


    useEffect(() => {
        let params = (category === '' ? null : {
            category
        })
        axios.get("/api/statistics/national/ip", { params })
            .then(res => {
                let tmp = res.data;
                let tmpData = [] as any[];
                for (let i = 4; i < 10; i++) {
                    tmpData.push({
                        year: '201' + i,
                        value: tmp["count201" + i] / 10000
                    })
                }
                setData(tmpData);
            })
    }, [category])

    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px", display: "relative", width: "calc(100% - 50px)" }}>
            全国知识产权案例走势统计
            <div className="case-rank-items">
                <div onClick={() => setCategory('刑事案件')} className={category === '刑事案件' ? 'active' : ''}>刑事</div>
                <div onClick={() => setCategory('民事案件')} className={category === '民事案件' ? 'active' : ''}>民事</div>
                <div onClick={() => setCategory('行政案件')} className={category === '行政案件' ? 'active' : ''}>行政</div>
                <div onClick={() => setCategory('')} className={category === '' ? 'active' : ''}>其他</div>
            </div>
        </div>
        <Line {...config} />
    </>
}


export class CaseAreaChart extends React.Component {

    divRef = React.createRef<HTMLDivElement>()

    componentDidMount() {
    }

    render() {
        return <>
            <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>案件区域分布</div>
            <div style={{ width: '100%', height: "100%", padding: "12px" }}>
                <MapboxScene
                    onSceneLoaded={scene => {
                        axios.get("/api/statistics/national/area")
                            .then(res => {
                                let tmp = res.data;
                                let data = [{
                                    name: '云南省',
                                    code: 530000,
                                    value: tmp.yunnan
                                },
                                {
                                    name: '黑龙江省',
                                    code: 230000,
                                    value: tmp.heilongjiang
                                },
                                {
                                    name: '贵州省',
                                    code: 520000,
                                    value: tmp.guizhou
                                },
                                {
                                    name: '北京市',
                                    code: 110000,
                                    value: tmp.beijing
                                },
                                {
                                    name: '河北省',
                                    code: 130000,
                                    value: tmp.hebei
                                },
                                {
                                    name: '山西省',
                                    code: 140000,
                                    value: tmp.shanxi
                                },
                                {
                                    name: '吉林省',
                                    code: 220000,
                                    value: tmp.jilin
                                },
                                {
                                    name: '宁夏回族自治区',
                                    code: 640000,
                                    value: tmp.ningxia
                                },
                                {
                                    name: '辽宁省',
                                    code: 210000,
                                    value: tmp.liaoning
                                },
                                {
                                    name: '海南省',
                                    code: 460000,
                                    value: tmp.hainan
                                },
                                {
                                    name: '内蒙古自治区',
                                    code: 150000,
                                    value: tmp.neimeng
                                },
                                {
                                    name: '天津市',
                                    code: 120000,
                                    value: tmp.tianjin
                                },
                                {
                                    name: '新疆维吾尔自治区',
                                    code: 650000,
                                    value: tmp.xinjiang
                                },
                                {
                                    name: '上海市',
                                    code: 310000,
                                    value: tmp.shanghai
                                },
                                {
                                    name: '陕西省',
                                    code: 610000,
                                    value: tmp.shanxi
                                },
                                {
                                    name: '甘肃省',
                                    code: 620000,
                                    value: tmp.ganshu
                                },
                                {
                                    name: '安徽省',
                                    code: 340000,
                                    value: tmp.anhui
                                },
                                {
                                    name: '香港特别行政区',
                                    code: 810000,
                                    value: tmp.xianggang
                                },
                                {
                                    name: '广东省',
                                    code: 440000,
                                    value: tmp.guangdong
                                },
                                {
                                    name: '河南省',
                                    code: 410000,
                                    value: tmp.henan
                                },
                                {
                                    name: '湖南省',
                                    code: 430000,
                                    value: tmp.hunan
                                },
                                {
                                    name: '江西省',
                                    code: 360000,
                                    value: tmp.jiangxi
                                },
                                {
                                    name: '四川省',
                                    code: 510000,
                                    value: tmp.sichuan
                                },
                                {
                                    name: '广西壮族自治区',
                                    code: 450000,
                                    value: tmp.guangxi
                                },
                                {
                                    name: '江苏省',
                                    code: 320000,
                                    value: tmp.jiangsu
                                },
                                {
                                    name: '澳门特别行政区',
                                    code: 820000,
                                    value: 0
                                },
                                {
                                    name: '浙江省',
                                    code: 330000,
                                    value: tmp.zhejiang
                                },
                                {
                                    name: '山东省',
                                    code: 370000,
                                    value: tmp.shandong
                                },
                                {
                                    name: '青海省',
                                    code: 630000,
                                    value: tmp.qinghai
                                },
                                {
                                    name: '重庆市',
                                    code: 500000,
                                    value: tmp.chongqing
                                },
                                {
                                    name: '福建省',
                                    code: 350000,
                                    value: tmp.fujian
                                },
                                {
                                    name: '湖北省',
                                    code: 420000,
                                    value: tmp.hubei
                                },
                                {
                                    name: '西藏自治区',
                                    code: 540000,
                                    value: tmp.xizang
                                },
                                {
                                    name: '台湾省',
                                    code: 710000,
                                    value: 0
                                }
                                ];
                                new CountryLayer(scene, {
                                    data,
                                    joinBy: ['NAME_CHN', 'name'],
                                    depth: 1,
                                    provinceStroke: '#783D2D',
                                    cityStroke: '#EBCCB4',
                                    cityStrokeWidth: 1,
                                    fill: {
                                        color: {
                                            field: 'value',
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
                                            return `<div>
                                        <div>${props.NAME_CHN}</div>
                                        <div>案例总量：${props.value}件</div>
                                    </div>`;
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
                        maxZoom: 10
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

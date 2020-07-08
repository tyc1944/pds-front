import React, { useEffect } from "react";
import { Line } from '@ant-design/charts';
import { MapboxScene } from '@antv/l7-react';
import { CountryLayer } from '@antv/l7-district';
import { Donut, Area, Rose, Pie } from '@ant-design/charts';
import { Progress, Tooltip } from "antd";
import { axios } from "utils/RequestUtil";
import _ from "lodash";

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
        <div id="caseRankChart" style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px", display: "relative", width: "calc(100% - 50px)" }}>
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

}

export const CaseCategoryChart = () => {

    const [data, setData] = React.useState([] as any[]);
    const [tmpData, setTmpData] = React.useState({} as any);

    useEffect(() => {
        axios.get("/api/statistics/national/category")
            .then(res => {
                let tmp = res.data;
                setTmpData(tmp);
                setData([
                    {
                        type: '民事',
                        value: tmp.civilCaseCount,
                    },
                    {
                        type: '刑事',
                        value: tmp.criminalCaseCount,
                    },
                    {
                        type: '行政',
                        value: tmp.adminCaseCount,
                    },
                    {
                        type: '执行',
                        value: tmp.executionCaseCount,
                    },
                    {
                        type: '其他',
                        value: tmp.othersCaseCount
                    }
                ])
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
        statistic: {
            visible: true
        },
        label: {
            visible: true,
            formatter: (text: string | number | undefined | null, item: any, idx: number) => {
                return Math.round(item.percent * 1000) / 10 + "%";
            }
        },
        radius: 0.8,
        padding: 'auto',
        data,
        angleField: 'value',
        colorField: 'type',
        legend: {
            text: {
                style: {
                    fontSize: 18,
                    color: '#101010'
                },
                formatter: (text: string, cfg: any) => {
                    switch (text) {
                        case '民事':
                            return `${text}   ${tmpData.civilCaseCount}`
                        case '刑事':
                            return `${text}   ${tmpData.criminalCaseCount}`
                        case '行政':
                            return `${text}   ${tmpData.adminCaseCount}`
                        case '执行':
                            return `${text}   ${tmpData.executionCaseCount}`
                        default:
                            return `${text}   ${tmpData.othersCaseCount}`
                    }
                }
            }
        }
    };
    return <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>案件类型统计</div>
        <Donut {...config} />
    </>
}


export const IndustryStatisticsChart = () =>
    <>
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>行业统计</div>
        <div style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "100%",
            height: "100%",
            display: 'relative'
        }}>
            <div style={{
                backgroundColor: "#85B4FF",
                color: "#FFFFFF",
                width: "215px",
                height: '215px',
                fontSize: "28px",
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                borderRadius: "50%",
                position: "absolute",
                top: "100px",
                left: "calc(50% - 99px)"
            }}>制造业</div>
            <div style={{
                backgroundColor: "#65E3DA",
                color: "#FFFFFF",
                width: "170px",
                height: '170px',
                fontSize: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                borderRadius: "50%",
                position: "absolute",
                top: "26px",
                right: "20px"
            }}>批发和零售业</div>
            <div style={{
                backgroundColor: "#C29FFD",
                color: "#FFFFFF",
                width: "92px",
                height: '92px',
                fontSize: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                borderRadius: "50%",
                position: "absolute",
                top: "26px",
                left: "calc(50% - 60px)"
            }}>制造业</div>
            <div style={{
                backgroundColor: "#57C88C",
                color: "#FFFFFF",
                width: "136px",
                height: '136px',
                fontSize: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                borderRadius: "50%",
                position: "absolute",
                bottom: "50px",
                right: "0px"
            }}>信息传输、软件和信息技术服务业</div>
            <div style={{
                backgroundColor: "#FFAD56",
                color: "#FFFFFF",
                width: "92px",
                height: '92px',
                fontSize: "14px",
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                borderRadius: "50%",
                position: "absolute",
                bottom: "8px",
                right: "90px"
            }}>租赁和商务服务业</div>
            <div style={{
                backgroundColor: "#85E5FF",
                color: "#FFFFFF",
                width: "157px",
                height: '157px',
                fontSize: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                borderRadius: "50%",
                position: "absolute",
                bottom: "8px",
                left: "65px"
            }}>科学研究和技术服务业</div>
            <div style={{
                backgroundColor: "#FF76A5",
                color: "#FFFFFF",
                width: "70px",
                height: '70px',
                fontSize: "14px",
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                borderRadius: "50%",
                position: "absolute",
                left: "90px",
                top: "65px"
            }}>其他行业</div>
        </div>
    </>

export const ProvinceCaseRankChart = () => {
    const [provinceList, setProvinceList] = React.useState([] as any[])
    const [totalCount, setTotalCount] = React.useState(0)
    useEffect(() => {
        axios.get("/api/statistics/national/area")
            .then(res => {
                let tmp = res.data;
                let data = [{
                    name: '云南省',
                    value: tmp.yunnan
                },
                {
                    name: '黑龙江省',
                    value: tmp.heilongjiang
                },
                {
                    name: '贵州省',
                    value: tmp.guizhou
                },
                {
                    name: '北京市',
                    value: tmp.beijing
                },
                {
                    name: '河北省',
                    value: tmp.hebei
                },
                {
                    name: '山西省',
                    value: tmp.shanxi
                },
                {
                    name: '吉林省',
                    value: tmp.jilin
                },
                {
                    name: '宁夏回族自治区',
                    value: tmp.ningxia
                },
                {
                    name: '辽宁省',
                    value: tmp.liaoning
                },
                {
                    name: '海南省',
                    value: tmp.hainan
                },
                {
                    name: '内蒙古自治区',
                    value: tmp.neimeng
                },
                {
                    name: '天津市',
                    value: tmp.tianjin
                },
                {
                    name: '新疆维吾尔自治区',
                    value: tmp.xinjiang
                },
                {
                    name: '上海市',
                    value: tmp.shanghai
                },
                {
                    name: '陕西省',
                    value: tmp.shanxi
                },
                {
                    name: '甘肃省',
                    value: tmp.ganshu
                },
                {
                    name: '安徽省',
                    value: tmp.anhui
                },
                {
                    name: '香港特别行政区',
                    value: tmp.xianggang
                },
                {
                    name: '广东省',
                    value: tmp.guangdong
                },
                {
                    name: '河南省',
                    value: tmp.henan
                },
                {
                    name: '湖南省',
                    value: tmp.hunan
                },
                {
                    name: '江西省',
                    value: tmp.jiangxi
                },
                {
                    name: '四川省',
                    value: tmp.sichuan
                },
                {
                    name: '广西壮族自治区',
                    value: tmp.guangxi
                },
                {
                    name: '江苏省',
                    value: tmp.jiangsu
                },
                {
                    name: '澳门特别行政区',
                    value: 0
                },
                {
                    name: '浙江省',
                    value: tmp.zhejiang
                },
                {
                    name: '山东省',
                    value: tmp.shandong
                },
                {
                    name: '青海省',
                    value: tmp.qinghai
                },
                {
                    name: '重庆市',
                    value: tmp.chongqing
                },
                {
                    name: '福建省',
                    value: tmp.fujian
                },
                {
                    name: '湖北省',
                    value: tmp.hubei
                },
                {
                    name: '西藏自治区',
                    value: tmp.xizang
                },
                {
                    name: '台湾省',
                    value: 0
                }
                ];
                data = data.filter(item => item.value)
                data = _.orderBy(data, 'value', 'desc').slice(0, 5)
                setProvinceList(data)
                setTotalCount(data.map(item => item.value).reduce((p, c) => p + c))
            })
    }, [true])
    return <div id="provinceCaseRankChart">
        <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "0px", left: "32px" }}>地市案例统计</div>
        <div style={{
            height: "336px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "90%",
            margin: "0 auto"
        }}>
            {
                provinceList.map((item, index) =>
                    <div key={index}>
                        <div style={{ color: "#101010" }}>{item.name}</div>
                        <Progress strokeColor="#59D06E" percent={Math.round((item.value / totalCount) * 1000) / 10} />
                    </div>
                )
            }
        </div>
    </div>
}

export const ProcuratorationCaseRankChart = () => {

    const [courtList, setCourtList] = React.useState([] as any[])
    const [totalCount, setTotalCount] = React.useState(0)
    useEffect(() => {
        axios.get("/api/statistics/national/court")
            .then(res => {
                let tmp = res.data as any[];
                setCourtList(tmp)
                setTotalCount(tmp.map(item => item.ipCount).reduce((p, c) => p + c))
            })
    }, [true])
    return <> <div style={{ fontSize: '16px', color: "#101010", position: "absolute", top: "23px", left: "32px" }}>法院统计</div>
        <div style={{
            height: "336px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "90%",
            margin: "0 auto"
        }}>
            {
                courtList.map((item, index) =>
                    <div key={index}>
                        <div style={{ color: "#101010" }}>{item.courtName}</div>
                        <Progress percent={Math.floor((item.ipCount / totalCount) * 1000) / 10} />
                    </div>
                )
            }
        </div>
    </>
}

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
                    type: '二审',
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

const ColorLine = (props: {
    color: string,
    percent: number,
    title: string,
    number: number,
    numberColor: string,
    direction: 'left' | 'right'
}) =>
    <div style={{
        width: "100%",
        height: "45px",
        display: "flex",
        flexDirection: "column",
        alignItems: props.direction === "left" ? 'flex-start' : "flex-end",
        justifyContent: "center"
    }}>
        <div style={{ color: "#555555", fontSize: "14px", cursor: 'pointer' }}>
            <Tooltip placement="bottom" title={props.title} color="green">
                <span>{props.title}</span>
            </Tooltip>
        </div>
        <div style={{
            height: "12px",
            backgroundColor: props.color,
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            width: `${props.percent}%`,
            position: "relative",
            boxShadow: `1px 2px 4px ${props.color}`
        }}>
            <span style={{
                ...(props.direction === "left" ? {
                    right: "-38px",
                } : {
                        left: "-38px",
                    }),
                color: props.numberColor,
                position: "absolute",
                top: "-7px",
                fontSize: "16px"
            }}>{props.number}</span>
        </div>
    </div>


export const SubstantiveLawChart = () =>
    <div style={{
        position: "relative",
        display: "flex",
        height: "100%",
        flexDirection: 'column',
        alignItems: "flex-end",
        padding: '28px 10px',
        justifyContent: "space-between"
    }}>
        <div style={{ fontSize: '16px', color: "#101010" }}>实体法条</div>
        <ColorLine number={3210} numberColor="#1200AA" color="#ADA3FF" percent={80} title="著作权法（2010修正）第四十九条" direction="right"></ColorLine>
        <ColorLine number={2356} numberColor="#1200AA" color="#ADA3FF" percent={70} title="著作权法（2010修正）第四十八条第一项" direction="right"></ColorLine>
        <ColorLine number={1987} numberColor="#1200AA" color="#ADA3FF" percent={50} title="关于审理著作权民事纠纷案件适用法律上若干问题的解释第二十六条" direction="right"></ColorLine>
        <ColorLine number={1590} numberColor="#1200AA" color="#ADA3FF" percent={40} title="关于审理著作权民事纠纷案件适用法律若干问题的解释第七条" direction="right"></ColorLine>
        <ColorLine number={985} numberColor="#1200AA" color="#ADA3FF" percent={30} title="关于审理著作权民事纠纷案件适用法律若干问题的解释第二十五条第七项" direction="right"></ColorLine>
    </div>

export const ProceduralLawChart = () =>
    <div style={{
        position: "relative",
        display: "flex",
        height: "100%",
        flexDirection: 'column',
        alignItems: "flex-start",
        padding: '28px 10px',
        justifyContent: "space-between"
    }}>
        <div style={{ fontSize: '16px', color: "#101010" }}>程序法条</div>
        <ColorLine number={3210} numberColor="#276C68" color="#4FDAD2" percent={80} title="民事诉讼法（2017修正）第二百五十三条" direction="left"></ColorLine>
        <ColorLine number={2356} numberColor="#276C68" color="#4FDAD2" percent={70} title="民事诉讼法（2012修正）第二百五十三条" direction="left"></ColorLine>
        <ColorLine number={1987} numberColor="#276C68" color="#4FDAD2" percent={50} title="民事诉讼法（2017修正）第一百七十条第一款第一项" direction="left"></ColorLine>
        <ColorLine number={1590} numberColor="#276C68" color="#4FDAD2" percent={40} title="民事诉讼法（2012修正）第一百七十条第一款第一项" direction="left"></ColorLine>
        <ColorLine number={985} numberColor="#276C68" color="#4FDAD2" percent={30} title="行政诉讼法（2017修正）第六十九条" direction="left"></ColorLine>
    </div>

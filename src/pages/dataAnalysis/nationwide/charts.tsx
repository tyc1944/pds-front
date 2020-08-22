import React, { useEffect } from "react";
import { Line } from "@ant-design/charts";
import { MapboxScene } from "@antv/l7-react";
import { CountryLayer } from "antv-l7-district";
import { Donut, Pie } from "@ant-design/charts";
import { Progress, Tooltip } from "antd";
import { axios } from "utils/RequestUtil";
import _ from "lodash";
import echarts from "echarts";

export const CaseRankChart = () => {
  const [category, setCategory] = React.useState("刑事案件");
  const [data, setData] = React.useState([] as any[]);
  const config = {
    title: {
      visible: false,
      text: ""
    },
    description: {
      visible: true,
      text: "单位：万件"
    },
    padding: "auto",
    forceFit: true,
    data,
    xField: "year",
    yField: "value",
    yAxis: {
      max: 4
    },
    meta: {
      year: {
        alias: "年份",
        formatter: (v: number) => {
          return `${v}年`;
        }
      },
      value: {
        alias: "数量"
      }
    },
    smooth: true,
    height: 350
  };

  useEffect(() => {
    let params =
      category === ""
        ? null
        : {
            category
          };
    axios.get("/api/statistics/national/ip", { params }).then(res => {
      let tmp = res.data;
      let tmpData = [] as any[];
      for (let i = 4; i < 10; i++) {
        tmpData.push({
          year: "201" + i,
          value: tmp["count201" + i] / 10000
        });
      }
      setData(tmpData);
    });
  }, [category]);

  return (
    <>
      <div
        id="caseRankChart"
        style={{
          fontSize: "16px",
          color: "#101010",
          position: "absolute",
          top: "23px",
          left: "32px",
          display: "relative",
          width: "calc(100% - 50px)"
        }}
      >
        全国知识产权案例走势统计
        <div className="case-rank-items">
          <div
            onClick={() => setCategory("刑事案件")}
            className={category === "刑事案件" ? "active" : ""}
          >
            刑事
          </div>
          <div
            onClick={() => setCategory("民事案件")}
            className={category === "民事案件" ? "active" : ""}
          >
            民事
          </div>
          <div
            onClick={() => setCategory("行政案件")}
            className={category === "行政案件" ? "active" : ""}
          >
            行政
          </div>
          <div
            onClick={() => setCategory("")}
            className={category === "" ? "active" : ""}
          >
            其他
          </div>
        </div>
      </div>
      <Line {...config} />
    </>
  );
};

export class CaseAreaChart extends React.Component {
  divRef = React.createRef<HTMLDivElement>();

  componentDidMount() {}

  render() {
    return (
      <>
        <div
          style={{
            fontSize: "16px",
            color: "#101010",
            position: "absolute",
            top: "23px",
            left: "32px"
          }}
        >
          案件区域分布
        </div>
        <div style={{ width: "100%", height: "100%", padding: "12px" }}>
          <MapboxScene
            onSceneLoaded={scene => {
              axios.get("/api/statistics/national/area").then(res => {
                let tmp = res.data;
                let data = [
                  {
                    name: "云南省",
                    code: 530000,
                    value: tmp.yunnan
                  },
                  {
                    name: "黑龙江省",
                    code: 230000,
                    value: tmp.heilongjiang
                  },
                  {
                    name: "贵州省",
                    code: 520000,
                    value: tmp.guizhou
                  },
                  {
                    name: "北京市",
                    code: 110000,
                    value: tmp.beijing
                  },
                  {
                    name: "河北省",
                    code: 130000,
                    value: tmp.hebei
                  },
                  {
                    name: "山西省",
                    code: 140000,
                    value: tmp.shanxi
                  },
                  {
                    name: "吉林省",
                    code: 220000,
                    value: tmp.jilin
                  },
                  {
                    name: "宁夏回族自治区",
                    code: 640000,
                    value: tmp.ningxia
                  },
                  {
                    name: "辽宁省",
                    code: 210000,
                    value: tmp.liaoning
                  },
                  {
                    name: "海南省",
                    code: 460000,
                    value: tmp.hainan
                  },
                  {
                    name: "内蒙古自治区",
                    code: 150000,
                    value: tmp.neimeng
                  },
                  {
                    name: "天津市",
                    code: 120000,
                    value: tmp.tianjin
                  },
                  {
                    name: "新疆维吾尔自治区",
                    code: 650000,
                    value: tmp.xinjiang
                  },
                  {
                    name: "上海市",
                    code: 310000,
                    value: tmp.shanghai
                  },
                  {
                    name: "陕西省",
                    code: 610000,
                    value: tmp.shanxi
                  },
                  {
                    name: "甘肃省",
                    code: 620000,
                    value: tmp.ganshu
                  },
                  {
                    name: "安徽省",
                    code: 340000,
                    value: tmp.anhui
                  },
                  {
                    name: "香港特别行政区",
                    code: 810000,
                    value: tmp.xianggang
                  },
                  {
                    name: "广东省",
                    code: 440000,
                    value: tmp.guangdong
                  },
                  {
                    name: "河南省",
                    code: 410000,
                    value: tmp.henan
                  },
                  {
                    name: "湖南省",
                    code: 430000,
                    value: tmp.hunan
                  },
                  {
                    name: "江西省",
                    code: 360000,
                    value: tmp.jiangxi
                  },
                  {
                    name: "四川省",
                    code: 510000,
                    value: tmp.sichuan
                  },
                  {
                    name: "广西壮族自治区",
                    code: 450000,
                    value: tmp.guangxi
                  },
                  {
                    name: "江苏省",
                    code: 320000,
                    value: tmp.jiangsu
                  },
                  {
                    name: "澳门特别行政区",
                    code: 820000,
                    value: 0
                  },
                  {
                    name: "浙江省",
                    code: 330000,
                    value: tmp.zhejiang
                  },
                  {
                    name: "山东省",
                    code: 370000,
                    value: tmp.shandong
                  },
                  {
                    name: "青海省",
                    code: 630000,
                    value: tmp.qinghai
                  },
                  {
                    name: "重庆市",
                    code: 500000,
                    value: tmp.chongqing
                  },
                  {
                    name: "福建省",
                    code: 350000,
                    value: tmp.fujian
                  },
                  {
                    name: "湖北省",
                    code: 420000,
                    value: tmp.hubei
                  },
                  {
                    name: "西藏自治区",
                    code: 540000,
                    value: tmp.xizang
                  },
                  {
                    name: "台湾省",
                    code: 710000,
                    value: 0
                  }
                ];
                new CountryLayer(scene, {
                  data,
                  joinBy: ["NAME_CHN", "name"],
                  depth: 1,
                  provinceStroke: "#783D2D",
                  cityStroke: "#EBCCB4",
                  cityStrokeWidth: 1,
                  fill: {
                    color: {
                      field: "value",
                      values: [
                        "#feedde",
                        "#fdd0a2",
                        "#fdae6b",
                        "#fd8d3c",
                        "#e6550d",
                        "#a63603"
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
              });
            }}
            map={{
              center: [116.2825, 39.9],
              pitch: 0,
              style: "blank",
              zoom: 3,
              minZoom: 0,
              maxZoom: 10
            }}
            option={{
              logoVisible: false
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          ></MapboxScene>
        </div>
      </>
    );
  }
}

export const CaseCategoryChart = () => {
  const [data, setData] = React.useState([] as any[]);
  const [tmpData, setTmpData] = React.useState({} as any);

  useEffect(() => {
    axios.get("/api/statistics/national/category").then(res => {
      let tmp = res.data;
      setTmpData(tmp);
      setData([
        {
          type: "民事",
          value: tmp.civilCaseCount
        },
        {
          type: "刑事",
          value: tmp.criminalCaseCount
        },
        {
          type: "行政",
          value: tmp.adminCaseCount
        },
        {
          type: "执行",
          value: tmp.executionCaseCount
        },
        {
          type: "其他",
          value: tmp.othersCaseCount
        }
      ]);
    });
  }, [true]);
  const config = {
    forceFit: true,
    title: {
      visible: false,
      text: ""
    },
    description: {
      visible: false,
      text: ""
    },
    statistic: {
      visible: true
    },
    label: {
      visible: true,
      formatter: (
        text: string | number | undefined | null,
        item: any,
        idx: number
      ) => {
        return Math.round(item.percent * 1000) / 10 + "%";
      }
    },
    radius: 0.8,
    padding: "auto",
    data,
    angleField: "value",
    colorField: "type",
    legend: {
      text: {
        style: {
          fontSize: 18,
          color: "#101010"
        },
        formatter: (text: string, cfg: any) => {
          switch (text) {
            case "民事":
              return `${text}   ${tmpData.civilCaseCount}`;
            case "刑事":
              return `${text}   ${tmpData.criminalCaseCount}`;
            case "行政":
              return `${text}   ${tmpData.adminCaseCount}`;
            case "执行":
              return `${text}   ${tmpData.executionCaseCount}`;
            default:
              return `${text}   ${tmpData.othersCaseCount}`;
          }
        }
      }
    }
  };
  return (
    <>
      <div
        style={{
          fontSize: "16px",
          color: "#101010",
          position: "absolute",
          top: "23px",
          left: "32px"
        }}
      >
        案件类型统计
      </div>
      <Donut {...config} />
    </>
  );
};

export const IndustryStatisticsChart = () => (
  <>
    <div
      style={{
        fontSize: "16px",
        color: "#101010",
        position: "absolute",
        top: "23px",
        left: "32px"
      }}
    >
      行业统计
    </div>
    <div
      style={{
        width: "100%",
        height: "100%"
      }}
    >
      <div
        style={{
          position: "relative",
          width: "500px",
          height: "100%",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            backgroundColor: "#85B4FF",
            color: "#FFFFFF",
            width: "215px",
            height: "215px",
            fontSize: "28px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            position: "absolute",
            top: "100px",
            left: "calc(50% - 99px)"
          }}
        >
          制造业
        </div>
        <div
          style={{
            backgroundColor: "#65E3DA",
            color: "#FFFFFF",
            width: "170px",
            height: "170px",
            fontSize: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            position: "absolute",
            top: "26px",
            right: "20px"
          }}
        >
          批发和零售业
        </div>
        {/* <div
          style={{
            backgroundColor: "#C29FFD",
            color: "#FFFFFF",
            width: "92px",
            height: "92px",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            position: "absolute",
            top: "26px",
            left: "calc(50% - 60px)"
          }}
        >
          制造业
        </div> */}
        <div
          style={{
            backgroundColor: "#57C88C",
            color: "#FFFFFF",
            width: "136px",
            height: "136px",
            fontSize: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            position: "absolute",
            bottom: "50px",
            right: "0px",
            flexDirection: "column"
          }}
        >
          <div>信息传输、软件和</div>
          <div>信息技术服务业</div>
        </div>
        <div
          style={{
            backgroundColor: "#FFAD56",
            color: "#FFFFFF",
            width: "92px",
            height: "92px",
            fontSize: "14px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            position: "absolute",
            bottom: "8px",
            right: "90px",
            flexDirection: "column"
          }}
        >
          <div>租赁和商务</div> <div>服务业</div>
        </div>
        <div
          style={{
            backgroundColor: "#85E5FF",
            color: "#FFFFFF",
            width: "157px",
            height: "157px",
            fontSize: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            position: "absolute",
            bottom: "8px",
            left: "65px",
            flexDirection: "column"
          }}
        >
          <div>科学研究和技术</div>
          <div>服务业</div>
        </div>
        <div
          style={{
            backgroundColor: "#FF76A5",
            color: "#FFFFFF",
            width: "70px",
            height: "70px",
            fontSize: "14px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            position: "absolute",
            left: "90px",
            top: "65px"
          }}
        >
          其他行业
        </div>
      </div>
    </div>
  </>
);

export const ProvinceCaseRankChart = () => {
  const [provinceList, setProvinceList] = React.useState([] as any[]);
  const [totalCount, setTotalCount] = React.useState(0);
  useEffect(() => {
    axios.get("/api/statistics/national/area").then(res => {
      let tmp = res.data;
      let data = [
        {
          name: "云南省",
          value: tmp.yunnan
        },
        {
          name: "黑龙江省",
          value: tmp.heilongjiang
        },
        {
          name: "贵州省",
          value: tmp.guizhou
        },
        {
          name: "北京市",
          value: tmp.beijing
        },
        {
          name: "河北省",
          value: tmp.hebei
        },
        {
          name: "山西省",
          value: tmp.shanxi
        },
        {
          name: "吉林省",
          value: tmp.jilin
        },
        {
          name: "宁夏回族自治区",
          value: tmp.ningxia
        },
        {
          name: "辽宁省",
          value: tmp.liaoning
        },
        {
          name: "海南省",
          value: tmp.hainan
        },
        {
          name: "内蒙古自治区",
          value: tmp.neimeng
        },
        {
          name: "天津市",
          value: tmp.tianjin
        },
        {
          name: "新疆维吾尔自治区",
          value: tmp.xinjiang
        },
        {
          name: "上海市",
          value: tmp.shanghai
        },
        {
          name: "陕西省",
          value: tmp.shanxi
        },
        {
          name: "甘肃省",
          value: tmp.ganshu
        },
        {
          name: "安徽省",
          value: tmp.anhui
        },
        {
          name: "香港特别行政区",
          value: tmp.xianggang
        },
        {
          name: "广东省",
          value: tmp.guangdong
        },
        {
          name: "河南省",
          value: tmp.henan
        },
        {
          name: "湖南省",
          value: tmp.hunan
        },
        {
          name: "江西省",
          value: tmp.jiangxi
        },
        {
          name: "四川省",
          value: tmp.sichuan
        },
        {
          name: "广西壮族自治区",
          value: tmp.guangxi
        },
        {
          name: "江苏省",
          value: tmp.jiangsu
        },
        {
          name: "澳门特别行政区",
          value: 0
        },
        {
          name: "浙江省",
          value: tmp.zhejiang
        },
        {
          name: "山东省",
          value: tmp.shandong
        },
        {
          name: "青海省",
          value: tmp.qinghai
        },
        {
          name: "重庆市",
          value: tmp.chongqing
        },
        {
          name: "福建省",
          value: tmp.fujian
        },
        {
          name: "湖北省",
          value: tmp.hubei
        },
        {
          name: "西藏自治区",
          value: tmp.xizang
        },
        {
          name: "台湾省",
          value: 0
        }
      ];
      data = data.filter(item => item.value);
      data = _.orderBy(data, "value", "desc").slice(0, 5);
      setProvinceList(data);
      setTotalCount(data.map(item => item.value).reduce((p, c) => p + c));
    });
  }, [true]);
  return (
    <div id="provinceCaseRankChart">
      <div
        style={{
          fontSize: "16px",
          color: "#101010",
          position: "absolute",
          top: "0px",
          left: "32px"
        }}
      >
        省市案例统计
      </div>
      <div
        style={{
          height: "336px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "90%",
          margin: "0 auto"
        }}
      >
        {provinceList.map((item, index) => (
          <div key={index}>
            <div style={{ color: "#101010" }}>{item.name}</div>
            <Progress
              strokeColor="#59D06E"
              percent={Math.round((item.value / totalCount) * 1000) / 10}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProcuratorationCaseRankChart = () => {
  const [courtList, setCourtList] = React.useState([] as any[]);
  const [totalCount, setTotalCount] = React.useState(0);
  useEffect(() => {
    axios.get("/api/statistics/national/court").then(res => {
      let tmp = res.data as any[];
      setCourtList(tmp);
      setTotalCount(tmp.map(item => item.ipCount).reduce((p, c) => p + c));
    });
  }, [true]);
  return (
    <>
      {" "}
      <div
        style={{
          fontSize: "16px",
          color: "#101010",
          position: "absolute",
          top: "23px",
          left: "32px"
        }}
      >
        法院统计
      </div>
      <div
        style={{
          height: "336px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "90%",
          margin: "0 auto"
        }}
      >
        {courtList.map((item, index) => (
          <div key={index}>
            <div style={{ color: "#101010" }}>{item.courtName}</div>
            <Progress
              percent={Math.floor((item.ipCount / totalCount) * 1000) / 10}
            />
          </div>
        ))}
      </div>
    </>
  );
};

const TrialProcedure = (props: {
  color: string;
  name: string;
  count: number;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%"
    }}
  >
    <div
      style={{ width: "20px", height: "20px", backgroundColor: props.color }}
    ></div>
    <div style={{ flex: 0.5, textAlign: "center" }}>{props.name}</div>
    <div style={{ color: "#1E1E1E", fontSize: "18px", flex: 1 }}>
      {props.count}件
    </div>
  </div>
);

export const TrialProcedureChart = () => {
  const [data, setData] = React.useState([] as any[]);

  useEffect(() => {
    axios.get("/api/statistics/national/procedure").then(res => {
      let tmp = res.data;
      let data = [
        {
          type: "一审",
          value: tmp.yishen
        },
        {
          type: "二审",
          value: tmp.ershen
        },
        {
          type: "再审",
          value: tmp.zaishen
        },
        {
          type: "执行",
          value: tmp.zhixing
        },
        {
          type: "其他",
          value: tmp.other
        }
      ];
      setData(data);
    });
  }, [true]);

  const config = {
    forceFit: true,
    title: {
      visible: false,
      text: ""
    },
    description: {
      visible: false,
      text: ""
    },
    radius: 0.8,
    padding: "auto",
    data,
    angleField: "value",
    colorField: "type",
    legend: {
      visible: false
    }
  };
  return (
    <>
      <div
        style={{
          fontSize: "16px",
          color: "#101010",
          position: "absolute",
          top: "23px",
          left: "32px"
        }}
      >
        审理程序
      </div>
      <div
        style={{
          display: "flex"
        }}
      >
        <div
          style={{
            flex: 1
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "60px 0",
              width: "160px",
              margin: "0 auto"
            }}
          >
            <TrialProcedure
              color="#35A8E0"
              name="一审"
              count={
                data.length > 0
                  ? data.filter(item => item.type === "一审")[0].value
                  : 0
              }
            ></TrialProcedure>
            <TrialProcedure
              color="#6C469D"
              name="二审"
              count={
                data.length > 0
                  ? data.filter(item => item.type === "二审")[0].value
                  : 0
              }
            ></TrialProcedure>
            <TrialProcedure
              color="#3C5A98"
              name="再审"
              count={
                data.length > 0
                  ? data.filter(item => item.type === "再审")[0].value
                  : 0
              }
            ></TrialProcedure>
            <TrialProcedure
              color="#E1524A"
              name="执行"
              count={
                data.length > 0
                  ? data.filter(item => item.type === "执行")[0].value
                  : 0
              }
            ></TrialProcedure>
            <TrialProcedure
              color="#4EB260"
              name="其他"
              count={
                data.length > 0
                  ? data.filter(item => item.type === "其他")[0].value
                  : 0
              }
            ></TrialProcedure>
          </div>
        </div>
        <div
          style={{
            flex: 1
          }}
        >
          <Donut {...config} />
        </div>
      </div>
    </>
  );
};

export const TrialDurationChart = () => {
  const [data, setData] = React.useState([]);
  const divRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    var myChart = echarts.init(divRef.current as HTMLDivElement);

    var option = {
      xAxis: {
        data: [
          "30天以内",
          "31-60天",
          "61-90天",
          "91-180天",
          "181-365天",
          "365天"
        ],
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          color: "#101010"
        }
      },
      yAxis: {
        splitLine: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: { show: false }
      },
      color: ["#45F2FF"],
      series: [
        {
          name: "hill",
          type: "pictorialBar",
          barCategoryGap: "-130%",
          // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
          symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
          itemStyle: {
            opacity: 0.8
          },
          emphasis: {
            itemStyle: {
              opacity: 1
            }
          },
          data: [987, 2343, 3423, 1407, 2187, 102],
          z: 10
        },
        {
          name: "glyph",
          type: "pictorialBar",
          barGap: "-100%",
          symbol: "none",
          label: {
            show: true,
            position: "top",
            formatter: "{c}件",
            fontSize: 16,
            color: "#101010"
          },
          symbolOffset: [0, "50%"],
          data: [
            {
              value: 987,
              symbolSize: [60, 60]
            },
            {
              value: 2343,
              symbolSize: [50, 60]
            },
            {
              value: 3423,
              symbolSize: [65, 35]
            },
            {
              value: 1407,
              symbolSize: [50, 30]
            },
            {
              value: 2187,
              symbolSize: [50, 35]
            },
            {
              value: 102,
              symbolSize: [40, 30]
            }
          ]
        }
      ]
    };

    myChart.setOption(option);
  }, [divRef]);
  return (
    <>
      <div
        style={{
          fontSize: "16px",
          color: "#101010",
          position: "absolute",
          top: "23px",
          left: "32px"
        }}
      >
        审理期限
      </div>
      <div style={{ width: "100%", height: "80%" }}>
        <div
          ref={divRef}
          style={{ width: "80%", height: "100%", margin: "0 auto" }}
        ></div>
      </div>
    </>
  );
};

const YiShen = (props: {
  data: {
    value: number;
    name: string;
    color: string;
  }[];
}) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      height: "70px",
      alignItems: "center",
      justifyContent: "space-between"
    }}
  >
    {props.data.map((item, index) => (
      <div
        key={index}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ color: item.color, fontSize: "20px" }}>{item.value}</div>
        <div
          style={{ width: "60px", height: "4px", backgroundColor: item.color }}
        ></div>
        <div>{item.name}</div>
      </div>
    ))}
  </div>
);

export const YiShenChart = () => {
  const [data, setData] = React.useState([
    {
      value: 103010,
      name: "全部/部分支持",
      color: "#0090E9"
    },
    {
      value: 37358,
      name: "全部驳回",
      color: "#26C6DA"
    },
    {
      value: 26554,
      name: "撤回起诉",
      color: "#D4E157"
    },
    {
      value: 12733,
      name: "其他",
      color: "#FFCA28"
    },
    {
      value: 8194,
      name: "驳回起诉",
      color: "#FF6F44"
    },
    {
      value: 417,
      name: "不予受理",
      color: "#AB47BC"
    }
  ]);
  const divRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    var myChart = echarts.init(divRef.current as HTMLDivElement);
    var option = {
      series: [
        {
          name: "半径模式",
          type: "pie",
          radius: [20, 110],
          center: ["50%", "50%"],
          roseType: "radius",
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true
            }
          },
          data: data.map(item => ({
            ...item,
            itemStyle: {
              color: item.color
            }
          }))
        }
      ]
    };
    myChart.setOption(option);
  }, [divRef]);
  return (
    <>
      <div
        style={{
          fontSize: "16px",
          color: "#101010",
          position: "absolute",
          top: "23px",
          left: "32px"
        }}
      >
        一审裁判结果
      </div>
      <div
        style={{
          display: "flex",
          height: "90%",
          width: "100%"
        }}
      >
        <div style={{ flex: 0.8 }} ref={divRef}></div>
        <div
          style={{
            flex: 1,
            padding: "60px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <YiShen data={data.slice(0, 3)}></YiShen>
          <YiShen data={data.slice(3, 6)}></YiShen>
        </div>
      </div>
    </>
  );
};

export const ErShenChart = () => {
  const data = [
    {
      type: "其他",
      value: 4148
    },
    {
      type: "撤回上诉",
      value: 5059
    },
    {
      type: "发回重审",
      value: 368
    },
    {
      type: "改判",
      value: 9679
    },
    {
      type: "维持原判",
      value: 67340
    }
  ];
  const config = {
    forceFit: true,
    title: {
      visible: false,
      text: ""
    },
    description: {
      visible: false,
      text: ""
    },
    radius: 0.8,
    data,
    angleField: "value",
    colorField: "type",
    label: {
      visible: true,
      type: "outer",
      offset: 20,
      formatter: (text: any, item: any) => {
        return `${item._origin.type}\n${item._origin.value}`;
      },
      style: {
        fontSize: 14
      }
    },
    legend: {
      visible: false
    }
  };
  return (
    <>
      <div
        style={{
          fontSize: "16px",
          color: "#101010",
          position: "absolute",
          top: "23px",
          left: "32px"
        }}
      >
        二审裁判结果
      </div>
      <Pie {...config} />
    </>
  );
};

export const ColorLine = (props: {
  color: string;
  percent: number;
  title: string;
  number: number;
  numberColor: string;
  content?: string;
  direction: "left" | "right";
}) => (
  <div
    style={{
      width: "100%",
      height: "45px",
      display: "flex",
      flexDirection: "column",
      alignItems: props.direction === "left" ? "flex-start" : "flex-end",
      justifyContent: "center"
    }}
  >
    <div style={{ color: "#555555", fontSize: "14px", cursor: "pointer" }}>
      <Tooltip
        placement="bottom"
        title={props.content ? props.content : props.title}
        color="green"
      >
        <span>{props.title}</span>
      </Tooltip>
    </div>
    <div
      style={{
        ...(props.direction === "right"
          ? {
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px"
            }
          : {
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px"
            }),
        height: "12px",
        backgroundColor: props.color,
        width: `${props.percent}%`,
        position: "relative",
        boxShadow: `1px 2px 4px ${props.color}`
      }}
    >
      <span
        style={{
          ...(props.direction === "left"
            ? {
                right: "-38px"
              }
            : {
                left: "-38px"
              }),
          color: props.numberColor,
          position: "absolute",
          top: "-7px",
          fontSize: "16px"
        }}
      >
        {props.number}
      </span>
    </div>
  </div>
);

export const SubstantiveLawChart = () => (
  <div
    style={{
      position: "relative",
      display: "flex",
      height: "100%",
      flexDirection: "column",
      alignItems: "flex-end",
      padding: "28px 10px",
      justifyContent: "space-between"
    }}
  >
    <div style={{ fontSize: "16px", color: "#101010" }}>实体法条</div>
    <ColorLine
      number={3210}
      numberColor="#1200AA"
      color="#ADA3FF"
      percent={80}
      content={`侵犯著作权或者与著作权有关的权利的，侵权人应当按照权利人的实际损失给予赔偿；实际损失难以计算的，可以按照侵权人的违法所得给予赔偿。赔偿数额还应当包括权利人为制止侵权行为所支付的合理开支。\n
      权利人的实际损失或者侵权人的违法所得不能确定的，由人民法院根据侵权行为的情节，判决给予五十万元以下的赔偿。`}
      title="著作权法（2010修正）第四十九条"
      direction="right"
    ></ColorLine>
    <ColorLine
      number={2356}
      numberColor="#1200AA"
      color="#ADA3FF"
      percent={70}
      content={`未经著作权人许可，复制、发行、表演、放映、广播、汇编、通过信息网络向公众传播其作品的，本法另有规定的除外`}
      title="著作权法（2010修正）第四十八条第一项"
      direction="right"
    ></ColorLine>
    <ColorLine
      number={1987}
      numberColor="#1200AA"
      color="#ADA3FF"
      percent={50}
      content={`著作权法第四十八条第一款规定的制止侵权行为所支付的合理开支，包括权利人或者委托代理人对侵权行为进行调查、取证的合理费用。\n
      人民法院根据当事人的诉讼请求和具体案情，可以将符合国家有关部门规定的律师费用计算在赔偿范围内。`}
      title="关于审理著作权民事纠纷案件适用法律上若干问题的解释第二十六条"
      direction="right"
    ></ColorLine>
    <ColorLine
      number={1590}
      numberColor="#1200AA"
      color="#ADA3FF"
      percent={40}
      content={`当事人提供的涉及著作权的底稿、原件、合法出版物、著作权登记证书、认证机构出具的证明、取得权利的合同等，可以作为证据。\n
      在作品或者制品上署名的自然人、法人或者其他组织视为著作权、与著作权有关权益的权利人，但有相反证明的除外。`}
      title="关于审理著作权民事纠纷案件适用法律若干问题的解释第七条"
      direction="right"
    ></ColorLine>
    <ColorLine
      number={985}
      numberColor="#1200AA"
      color="#ADA3FF"
      percent={30}
      content={`权利人的实际损失或者侵权人的违法所得无法确定的，人民法院根据当事人的请求或者依职权适用著作权法第四十八条第二款的规定确定赔偿数额。\n
      人民法院在确定赔偿数额时，应当考虑作品类型、合理使用费、侵权行为性质、后果等情节综合确定。\n
      当事人按照本条第一款的规定就赔偿数额达成协议的，应当准许。`}
      title="关于审理著作权民事纠纷案件适用法律若干问题的解释第二十五条第七项"
      direction="right"
    ></ColorLine>
  </div>
);

export const ProceduralLawChart = () => (
  <div
    style={{
      position: "relative",
      display: "flex",
      height: "100%",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "28px 10px",
      justifyContent: "space-between"
    }}
  >
    <div style={{ fontSize: "16px", color: "#101010" }}>程序法条</div>
    <ColorLine
      number={3210}
      numberColor="#276C68"
      color="#4FDAD2"
      percent={80}
      content={`被执行人未按判决、裁定和其他法律文书指定的期间履行给付金钱义务的，应当加倍支付迟延履行期间的债务利息。\n 被执行人未按判决、裁定和其他法律文书指定的期间履行其他义务的，应当支付迟延履行金`}
      title="民事诉讼法（2017修正）第二百五十三条"
      direction="left"
    ></ColorLine>
    <ColorLine
      number={2356}
      numberColor="#276C68"
      color="#4FDAD2"
      percent={70}
      content={
        "被执行人未按判决、裁定和其他法律文书指定的期间履行给付金钱义务的，应当加倍支付迟延履行期间的债务利息。被执行人未按判决、裁定和其他法律文书指定的期间履行其他义务的，应当支付迟延履行金"
      }
      title="民事诉讼法（2012修正）第二百五十三条"
      direction="left"
    ></ColorLine>
    <ColorLine
      number={1987}
      numberColor="#276C68"
      color="#4FDAD2"
      percent={50}
      content={
        "原判决、裁定认定事实清楚，适用法律正确的，以判决、裁定方式驳回上诉，维持原判决、裁定"
      }
      title="民事诉讼法（2017修正）第一百七十条第一款第一项"
      direction="left"
    ></ColorLine>
    <ColorLine
      number={1590}
      numberColor="#276C68"
      color="#4FDAD2"
      percent={40}
      content={
        "原判决、裁定认定事实清楚，适用法律正确的，以判决、裁定方式驳回上诉，维持原判决、裁定"
      }
      title="民事诉讼法（2012修正）第一百七十条第一款第一项"
      direction="left"
    ></ColorLine>
    <ColorLine
      number={985}
      numberColor="#276C68"
      color="#4FDAD2"
      percent={30}
      content="行政行为证据确凿，适用法律、法规正确，符合法定程序的，或者原告申请被告履行法定职责或者给付义务理由不成立的，人民法院判决驳回原告的诉讼请求"
      title="行政诉讼法（2017修正）第六十九条"
      direction="left"
    ></ColorLine>
  </div>
);

import React, { useEffect, useState } from "react";
import echarts from "echarts";
import { MapboxScene } from "@antv/l7-react";
import { CityLayer } from "antv-l7-district";
import { inject } from "mobx-react";
import DataStore from "stores/dataStore";
import _ from "lodash";
import { CLUE_SOURCE, CLUE_SOURCE_NAME_MAP } from "common";

export const ClueRankChart = inject("data")((props: { data?: DataStore }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    props.data!.getStatisticsDistrictClueCount().then(res => {
      let tmp = _.reverse(res.data);
      var myChart = echarts.init(divRef.current as HTMLDivElement);
      var option = {
        xAxis: {
          type: "category" as "time" | "category" | "value" | "log" | undefined,
          data: tmp.map((item: any) => item.year)
        },
        yAxis: {
          type: "value" as "time" | "category" | "value" | "log" | undefined
        },
        series: [
          {
            data: tmp.map((item: any) => item.clueCount),
            type: "line",
            lineStyle: {
              color: "#6691EA"
            }
          }
        ]
      };
      myChart.setOption(option);
    });
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
        本院线索走势图
      </div>
      <div
        style={{
          display: "flex",
          height: "90%",
          width: "100%"
        }}
      >
        <div ref={divRef} style={{ width: "90%", height: "100%" }}></div>
      </div>
    </>
  );
});

export const CaseRankChart = inject("data")((props: { data?: DataStore }) => {
  const [category, setCategory] = useState("");
  const [groupData, setGroupData] = useState([] as any[]);

  const divRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (category !== "") {
      let tmpData = groupData.filter(item => item.category === category)[0]
        .dataCountList;
      var myChart = echarts.init(divRef.current as HTMLDivElement);
      var option = {
        xAxis: {
          type: "category" as "time" | "category" | "value" | "log" | undefined,
          data: tmpData.map((item: any) => item.year)
        },
        yAxis: {
          type: "value" as "time" | "category" | "value" | "log" | undefined
        },
        series: [
          {
            data: tmpData.map((item: any) => item.count),
            type: "line",
            lineStyle: {
              color: "#5760FD",
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowBlur: 10,
              shadowOffsetY: 8,
              width: 4
            },
            smooth: true
          }
        ]
      };
      myChart.setOption(option);
    }
  }, [category]);
  useEffect(() => {
    props.data!.getStatisticsDistrictSuperviseDataRank().then(res => {
      for (let i in res.data) {
        res.data[i].dataCountList.reverse();
      }
      setGroupData(res.data);
      setCategory("侦查活动监督");
    });
  }, [divRef]);
  return (
    <>
      <div
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
        案件监督走势统计
        <div className="case-rank-items-underline">
          <div
            onClick={() => setCategory("侦查活动监督")}
            className={category === "侦查活动监督" ? "active" : ""}
          >
            侦查活动监督
          </div>
          <div
            onClick={() => setCategory("刑事诉讼监督")}
            className={category === "刑事诉讼监督" ? "active" : ""}
          >
            刑事诉讼监督
          </div>
          <div
            onClick={() => setCategory("民事诉讼监督")}
            className={category === "民事诉讼监督" ? "active" : ""}
          >
            民事诉讼监督
          </div>
          <div
            onClick={() => setCategory("行政执法监督")}
            className={category === "行政执法监督" ? "active" : ""}
          >
            行政执法监督
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          height: "90%",
          width: "100%"
        }}
      >
        <div ref={divRef} style={{ width: "90%", height: "100%" }}></div>
      </div>
    </>
  );
});

export const AreaRankChart = inject("data")((props: { data?: DataStore }) => {
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
        无锡线索来源高并发统计
      </div>
      <div style={{ width: "100%", height: "100%", padding: "12px" }}>
        <MapboxScene
          onSceneLoaded={scene => {
            props.data!.getStatisticsDistrictClueAreaCount().then(res => {
              new CityLayer(scene, {
                data: res.data.map((item: any) => ({
                  code: DataStore.DISTRICT_CODE[item.areaName],
                  name: item.areaName,
                  pop: item.areaCount
                })),
                joinBy: ["adcode", "code"],
                adcode: ["320000", "320200"],
                depth: 3,
                label: {
                  field: "NAME_CHN",
                  textAllowOverlap: false
                },
                bubble: {
                  enable: true,
                  style: {
                    opacity: 0.5,
                    stroke: "#feedde",
                    strokeWidth: 1
                  },
                  color: {
                    field: "pop",
                    values: ["#FFCA28", "#FF9800", "#FF6F44", "#E51C23"]
                  },
                  size: {
                    field: "pop",
                    values: [20, 40]
                  }
                },
                fill: {
                  color: {
                    field: "pop",
                    values: [
                      "#C7FCF1",
                      "#ACF4F4",
                      "#9CE2F3",
                      "#8BABF3",
                      "#66BDF7",
                      "#4084F0"
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
});

export const SuperviseRankChart = inject("data")(
  (props: { data?: DataStore }) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
      props.data!.getStatisticsDistrictSuperviseCategoryCount().then(res => {
        var myChart = echarts.init(divRef.current as HTMLDivElement);
        var option = {
          color: ["#3BD7AE", "#8949E4", "#3192C9", "#DD69CB"],
          tooltip: {
            trigger: "item" as "none" | "item" | "axis" | undefined,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          label: {
            formatter: "{b} {c}",
            fontSize: 18
          },
          series: [
            {
              name: "案件数量",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: [
                {
                  name: "刑事诉讼监督",
                  value: res.data.filter(
                    (item: any) => item.category === "刑事诉讼监督"
                  )[0].categoryCount
                },
                {
                  name: "民事诉讼监督",
                  value: res.data.filter(
                    (item: any) => item.category === "民事诉讼监督"
                  )[0].categoryCount
                },
                {
                  name: "侦查活动监督",
                  value: res.data.filter(
                    (item: any) => item.category === "侦查活动监督"
                  )[0].categoryCount
                },
                {
                  name: "行政执法监督",
                  value: res.data.filter(
                    (item: any) => item.category === "行政执法监督"
                  )[0].categoryCount
                }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      });
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
          案件监督数量占比
        </div>
        <div
          style={{
            display: "flex",
            height: "90%",
            width: "100%"
          }}
        >
          <div ref={divRef} style={{ width: "90%", height: "100%" }}></div>
        </div>
      </>
    );
  }
);

const getSourceCount = (tmpData: any[], sourceType: string) =>
  tmpData.filter((item: any) => item.clueSource === sourceType).length === 1
    ? tmpData.filter((item: any) => item.clueSource === sourceType)[0].clueCount
    : 0;
export const ClueSourceRankChart = inject("data")(
  (props: { data?: DataStore }) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
      props.data!.getStatisticsDistrictClueSourceCount().then(res => {
        let tmpData = res.data;
        var myChart = echarts.init(divRef.current as HTMLDivElement);
        var option = {
          color: [
            "#5277D6",
            "#6B55DC",
            "#49AF84",
            "#388B9F",
            "#EA534A",
            "#F98441",
            "#DDD330"
          ],
          tooltip: {
            trigger: "item" as "none" | "item" | "axis" | undefined,
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical" as "vertical" | "horizontal" | undefined,
            top: 15,
            right: 0,
            itemGap: 30,
            icon: "circle",
            formatter: (name: string) =>
              `${name} ${getSourceCount(tmpData, CLUE_SOURCE_NAME_MAP[name])}`,
            data: [
              "报案举报",
              "公安线索",
              "法院线索",
              "舆情线索",
              "自行发现",
              "网格化线索",
              "行政线索"
            ]
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "30",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: [
                {
                  value: getSourceCount(tmpData, "INTERNET_REPORT"),
                  name: "报案举报"
                },
                {
                  value: getSourceCount(tmpData, "POLICE_CLUE"),
                  name: "公安线索"
                },
                {
                  value: getSourceCount(tmpData, "COURT_CLUE"),
                  name: "法院线索"
                },
                {
                  value: getSourceCount(tmpData, "SOCIAL_CLUE"),
                  name: "舆情线索"
                },
                {
                  value: getSourceCount(tmpData, "SELF_FIND"),
                  name: "自行发现"
                },
                {
                  value: getSourceCount(tmpData, "MESH_CLUE"),
                  name: "网格化线索"
                },
                {
                  value: getSourceCount(tmpData, "HOTLINE"),
                  name: "行政线索"
                }
              ]
            }
          ]
        };
        myChart.setOption(option);
      });
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
          线索来源统计
        </div>
        <div
          style={{
            display: "flex",
            height: "90%",
            width: "100%"
          }}
        >
          <div ref={divRef} style={{ width: "90%", height: "100%" }}></div>
        </div>
      </>
    );
  }
);

const ColorLine = (props: {
  percent: number;
  name: string;
  number: number;
}) => (
  <div
    style={{
      width: "100%",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      justifyItems: "flex-start"
    }}
  >
    <div
      style={{
        color: "#555555",
        fontSize: "14px",
        cursor: "pointer",
        paddingRight: "10px",
        width: "200px",
        textAlign: "center"
      }}
    >
      <span>{props.name}</span>
    </div>
    <div style={{ flex: 1 }}>
      <div
        style={{
          height: "12px",
          backgroundColor: "#3BD7AE",
          width: `${props.percent}%`,
          position: "relative",
          boxShadow: `1px 2px 4px #3BD7AE`
        }}
      >
        <div
          style={{
            color: "#255CB5",
            fontSize: "16px",
            position: "absolute",
            right: "-32px",
            top: "-6px"
          }}
        >
          {props.number}
        </div>
      </div>
    </div>
    <div style={{ width: "80px" }}></div>
  </div>
);

export const CaseExceptionRankChart = inject("data")(
  (props: { data?: DataStore }) => {
    const [exceptions, setExceptions] = React.useState(
      {} as { [key: string]: number }
    );
    const [maxCount, setMaxCount] = React.useState(100);

    useEffect(() => {
      props.data!.getStatisticsDistrictExceptionCount().then(res => {
        let tmpCount = [];
        for (let k in res.data) {
          tmpCount.push(res.data[k]);
        }
        setExceptions(res.data);
        setMaxCount(_.max(tmpCount));
      });
    }, [true]);

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
          案件异常类型统计
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "flex-start",
            height: "100%",
            width: "100%",
            padding: "50px 20px 20px 20px"
          }}
        >
          <ColorLine
            percent={(exceptions.count1 / maxCount) * 100}
            name={"情节不一致"}
            number={exceptions.count1}
          ></ColorLine>
          <ColorLine
            percent={(exceptions.count2 / maxCount) * 100}
            name={"量刑不一致"}
            number={exceptions.count2}
          ></ColorLine>
          <ColorLine
            percent={(exceptions.count3 / maxCount) * 100}
            name={"罪名不一致"}
            number={exceptions.count3}
          ></ColorLine>
          <ColorLine
            percent={(exceptions.count4 / maxCount) * 100}
            name={"判陪结果异常"}
            number={exceptions.count4}
          ></ColorLine>
          <ColorLine
            percent={(exceptions.count5 / maxCount) * 100}
            name={"未采取强制措施"}
            number={exceptions.count5}
          ></ColorLine>
          <ColorLine
            percent={(exceptions.count6 / maxCount) * 100}
            name={"未移交审查起诉"}
            number={exceptions.count6}
          ></ColorLine>
          <ColorLine
            percent={(exceptions.count7 / maxCount) * 100}
            name={"刑事应立未立"}
            number={exceptions.count7}
          ></ColorLine>
          <ColorLine
            percent={(exceptions.count8 / maxCount) * 100}
            name={"无立案/结案时间"}
            number={exceptions.count8}
          ></ColorLine>
          <ColorLine
            percent={(exceptions.count9 / maxCount) * 100}
            name={"案件处理超期"}
            number={exceptions.count9}
          ></ColorLine>
        </div>
      </>
    );
  }
);

const getCategoryCount = (tmpData: any[], category: string) =>
  tmpData.filter((item: any) => item.category === category).length === 1
    ? tmpData.filter((item: any) => item.category === category)[0].categoryCount
    : 0;

export const ClueCategoryChart = inject("data")(
  (props: { data?: DataStore }) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
      props.data!.getStatisticsDistrictClueCategoryCount().then(res => {
        var myChart = echarts.init(divRef.current as HTMLDivElement);
        var option = {
          color: ["#0194FA", "#56BD59", "#F3B322", "#E44A4B"],
          tooltip: {
            trigger: "item" as "none" | "item" | "axis" | undefined,
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
            {
              name: "线索类别",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              emphasis: {
                label: {
                  show: true,
                  fontSize: "30",
                  fontWeight: "bold"
                }
              },
              data: [
                {
                  value: getCategoryCount(res.data, "BRAND"),
                  name: "商标"
                },
                {
                  value: getCategoryCount(res.data, "PATENT"),
                  name: "专利"
                },
                {
                  value: getCategoryCount(res.data, "COPYRIGHT"),
                  name: "版权"
                },
                {
                  value: getCategoryCount(res.data, "OTHERS"),
                  name: "其他"
                }
              ].filter(item => item.value !== 0)
            }
          ]
        };
        myChart.setOption(option);
      });
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
          线索类别统计
        </div>
        <div
          style={{
            display: "flex",
            height: "90%",
            width: "100%"
          }}
        >
          <div ref={divRef} style={{ width: "90%", height: "100%" }}></div>
        </div>
      </>
    );
  }
);

export const ClueSuperviseChart = inject("data")(
  (props: { data?: DataStore }) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
      props.data!.getStatisticsDistrictClueToSuperviseCount().then(res => {
        var myChart = echarts.init(divRef.current as HTMLDivElement);
        var option = {
          xAxis: {
            show: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            type: "category" as
              | "time"
              | "category"
              | "value"
              | "log"
              | undefined,
            data: res.data.map((item: any) => item.monthDate).reverse()
          },
          yAxis: {
            show: false,
            type: "value" as "time" | "category" | "value" | "log" | undefined
          },

          series: [
            {
              data: res.data.map((item: any) => item.count).reverse(),
              type: "bar",
              color: "#817CD6",
              showBackground: true,
              backgroundStyle: {
                color: "#EDEDED"
              }
            }
          ]
        };

        myChart.setOption(option);
      });
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
          线索转监督案件统计
        </div>
        <div
          style={{
            display: "flex",
            height: "90%",
            width: "100%"
          }}
        >
          <div ref={divRef} style={{ width: "90%", height: "100%" }}></div>
        </div>
      </>
    );
  }
);

export const ClueRateRankChart = inject("data")(
  (props: { data?: DataStore }) => {
    const divRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      props.data!.getStatisticsDistrictClueRateCount().then(res => {
        var myChart = echarts.init(divRef.current as HTMLDivElement);
        var option = {
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: "#FF9800"
              }
            },
            indicator: [
              { name: "一星" },
              { name: "二星" },
              { name: "三星" },
              { name: "四星" },
              { name: "五星" }
            ]
          },
          series: [
            {
              name: "预算 vs 开销（Budget vs spending）",
              type: "radar",
              lineStyle: {
                color: "#8594ED"
              },
              areaStyle: { color: "#8594ED" },
              data: [
                {
                  value: [1, 2, 3, 4, 5].map(item => {
                    for (let i in res.data) {
                      if (res.data[i].rate === item) {
                        return res.data[i].rateCount;
                      }
                    }
                    return 0;
                  }),
                  name: "数量"
                }
              ]
            }
          ]
        };

        myChart.setOption(option);
      });
    }, [divRef]);
    return (
      <>
        <div
          style={{
            fontSize: "16px",
            color: "#101010",
            position: "absolute",
            top: "23px",
            left: "21px"
          }}
        >
          线索评级统计
        </div>
        <div
          style={{
            display: "flex",
            height: "90%",
            width: "100%"
          }}
        >
          <div ref={divRef} style={{ width: "90%", height: "100%" }}></div>
        </div>
      </>
    );
  }
);

export const ProcessedDurationChart = inject("data")(
  (props: { data?: DataStore }) => {
    const divRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      props.data!.getStatisticsDistrictProcessDurationYears().then(res => {
        let data1 = res.data.filter(
          (item: any) => item.category === "线索处理用时"
        )[0].years;
        let data2 = res.data.filter(
          (item: any) => item.category === "监督处理用时"
        )[0].years;
        var myChart = echarts.init(divRef.current as HTMLDivElement);
        var option = {
          color: ["#FF960F", "#2076EF"],
          xAxis: {
            type: "category" as
              | "time"
              | "category"
              | "value"
              | "log"
              | undefined,
            data: data1.map((item: any) => item.year).reverse()
          },
          yAxis: {
            type: "value" as "time" | "category" | "value" | "log" | undefined
          },
          legend: {
            top: 0,
            right: 0,
            icon: "circle"
          },
          series: [
            {
              name: "线索处理用时",
              data: data1.map((item: any) => item.duration).reverse(),
              type: "line",
              lineStyle: {
                shadowColor: "rgba(0, 0, 0, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 8,
                width: 4
              },
              smooth: true
            },
            {
              name: "监督处理用时",
              data: data2.map((item: any) => item.duration).reverse(),
              type: "line",
              lineStyle: {
                shadowColor: "rgba(0, 0, 0, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 8,
                width: 4
              },
              smooth: true
            }
          ]
        };
        myChart.setOption(option);
      });
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
          线索研判及案件监督平均处理时效统计
        </div>
        <div
          style={{
            display: "flex",
            height: "90%",
            width: "100%"
          }}
        >
          <div ref={divRef} style={{ width: "90%", height: "100%" }}></div>
        </div>
      </>
    );
  }
);

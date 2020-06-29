import React, { useContext, useEffect } from "react";
import { Input, DatePicker, Select, Cascader, InputNumber, Checkbox } from "antd";
import { isArray, isUndefined } from "util";
import Search from "antd/lib/input/Search";
import { RangeValue } from "rc-picker/lib/interface";
import { TableListOpsContext } from "./tableListOpsContext";
import { getDayStartDate, getDayEndDate, getMonthStartDate, getMonthEndDate, getLastMonthStartDate, getLastMonthEndDate, getYearStartDate, getYearEndDate, formatTimeYMD, formatTimeYMDHMS } from "utils/TimeUtil";
import moment from "moment";
import { SettingOutlined } from "@ant-design/icons";
import { CascaderValueType } from "antd/lib/cascader";
import { InputProps } from "antd/lib/input";
import "./tableListOpsComponents.less";

const { RangePicker } = DatePicker;
const { Option } = Select;

const DATE_FORMAT = ["YYYY-MM-DD", "YYYY年MM月DD日"];

const DATETIME_FORMAT = ["YYYY-MM-DD HH:mm:ss", "YYYY年MM月DD日 HH时mm分ss秒"];

export type TableListOpsValueType = {
  name: string;
  value: string | number | Date | string[] | undefined;
};

export type TableListOpsSelectItemsType = {
  title: string;
  value: string | number;
};

export type TableListOpsChange = (
  changed: TableListOpsValueType[] | TableListOpsValueType
) => void;

export interface TableListOpsProps {
  name?: string | string[];
  title?: string;
  selectItems?: any[];
  defaultValue?: string | undefined;
  defaultNumberValue?: number | undefined;
  defaultValues?: any[];
  addonAfter?: React.ReactNode;
  style?: any;
  dropdownMatchSelectWidth?: boolean;
}

/**
 * 把table list 查询参数转换成Map
 * @param opsValues
 */
export const getObjectFromOpsValue = (opsValues: TableListOpsValueType[]) => {
  return opsValues.reduce<{
    [key: string]: string | number | Date | string[] | undefined;
  }>((map, item) => {
    map[item.name] = item.value;
    return map;
  }, {});
};

/**
 *
 * 把查询参数填入目的对象
 *
 * @param oriObject
 * @param opsValues
 * @param keys 可以指定需要的字段，为空时，使用全部
 */
export const fillObjectFromOpsValue = (
  oriObject: { [key: string]: any },
  opsValues: TableListOpsValueType[] | undefined,
  keys?: string[]
) => {
  if (!opsValues) {
    return oriObject;
  }
  if (keys && keys.length !== 0) {
    for (let i in opsValues) {
      for (let ii in keys) {
        if (opsValues[parseInt(i)].name === keys[ii]) {
          oriObject[keys[ii]] = opsValues[parseInt(i)].value;
          break;
        }
      }
    }
  } else {
    for (let i in opsValues) {
      oriObject[opsValues[parseInt(i)].name] = opsValues[parseInt(i)].value;
    }
  }
  return oriObject;
};

/**
 *
 * 合并 table list 查询参数
 * @param changed
 * @param oriValue
 */
export const mergeOpsValue = (
  changed: TableListOpsValueType[] | TableListOpsValueType,
  oriValue: TableListOpsValueType[]
): TableListOpsValueType[] => {
  let tmpObject = oriValue.reduce<{
    [key: string]: string | Date | number | string[] | undefined;
  }>((map, item) => {
    map[item.name] = item.value;
    return map;
  }, {});

  if (isArray(changed)) {
    tmpObject = Object.assign(
      tmpObject,
      changed.reduce<{
        [key: string]: string | Date | number | string[] | undefined;
      }>((map, item) => {
        map[item.name] = item.value;
        return map;
      }, {})
    );
  } else {
    tmpObject[changed.name] = changed.value;
  }
  let finalArray: TableListOpsValueType[] = [];
  for (let name in tmpObject) {
    if (!isUndefined(tmpObject[name])) {
      finalArray.push({
        name,
        value: tmpObject[name]
      });
    }
  }
  return finalArray;
};

/**
 * 双日期选择控件
 *
 */
export const DateRangePicker = ({
  name = ["startDate", "endDate"],
  title,
  style = {}
}: TableListOpsProps) => {
  const { updateChange, getChange } = useContext(TableListOpsContext);
  return (
    <div>
      <span style={{ padding: "0 10px", color: style.color }}>{title}</span>
      <RangePicker
        value={
          getChange()
            .filter(data => name.indexOf(data.name) !== -1)
            .map(data => moment(data.value)) as RangeValue<moment.Moment>
        }
        allowClear
        onChange={date => {
          let changedVal: Array<TableListOpsValueType> = [];
          if (date) {
            if (date[0]) {
              changedVal.push({
                name: name[0],
                value: getDayStartDate(date[0].valueOf())
              });
            } else {
              changedVal.push({
                name: name[0],
                value: undefined
              });
            }
            if (date[1]) {
              changedVal.push({
                name: name[1],
                value: getDayEndDate(date[1].valueOf())
              });
            } else {
              changedVal.push({
                name: name[1],
                value: undefined
              });
            }
          } else {
            changedVal.push({
              name: name[0],
              value: undefined
            });
            changedVal.push({
              name: name[1],
              value: undefined
            });
          }
          updateChange(changedVal);
        }}
      />
    </div>
  );
};

export const SingleDatePicker = ({
  name = "",
  title,
  style = {}
}: TableListOpsProps) => {
  let format = "";
  const { updateChange, getChange } = useContext(TableListOpsContext);
  const vals = getChange()
    .filter(data => name.indexOf(data.name) !== -1)
    .map(data => {
      for (let i in DATE_FORMAT) {
        let tempMoment = moment(data.value, DATE_FORMAT[i]);
        if (tempMoment.isValid()) {
          format = DATE_FORMAT[i];
          return tempMoment;
        }
      }
      return null;
    }) as RangeValue<moment.Moment>;
  return (
    <div>
      {title && (
        <span style={{ padding: "0 10px", color: style.color }}>{title}</span>
      )}
      <DatePicker
        format={format}
        value={vals!.length > 0 ? vals![0] : null}
        onChange={(date, dateStr) => {
          let changedVal: Array<TableListOpsValueType> = [];
          if (date) {
            changedVal.push({
              name: name as string,
              value: dateStr
            });
          } else {
            changedVal.push({
              name: name as string,
              value: undefined
            });
          }
          updateChange(changedVal);
        }}
      />
    </div>
  );
};

export const SingleDateTimePicker = ({
  name = "",
  title,
  style = {}
}: TableListOpsProps) => {
  let format = "";
  const { updateChange, getChange } = useContext(TableListOpsContext);
  const vals = getChange()
    .filter(data => name.indexOf(data.name) !== -1)
    .map(data => {
      for (let i in DATETIME_FORMAT) {
        let tempMoment = moment(data.value, DATETIME_FORMAT[i]);
        if (tempMoment.isValid()) {
          format = DATETIME_FORMAT[i];
          return tempMoment;
        }
      }
      return null;
    }) as RangeValue<moment.Moment>;
  return (
    <div>
      {title && (
        <span style={{ padding: "0 10px", color: style.color }}>{title}</span>
      )}
      <DatePicker
        style={{ width: "295px" }}
        format={format}
        showTime
        value={vals!.length > 0 ? vals![0] : null}
        onChange={(date, dateStr) => {
          let changedVal: Array<TableListOpsValueType> = [];
          if (date) {
            changedVal.push({
              name: name as string,
              value: dateStr
            });
          } else {
            changedVal.push({
              name: name as string,
              value: undefined
            });
          }
          updateChange(changedVal);
        }}
      />
    </div>
  );
};

export const SingleYearPicker = ({
  name = "",
  title,
  style = {}
}: TableListOpsProps) => {
  const { updateChange, getChange } = useContext(TableListOpsContext);
  const vals = getChange()
    .filter(data => name.indexOf(data.name) !== -1)
    .map(data => moment(data.value)) as RangeValue<moment.Moment>;
  return (
    <div>
      {title && (
        <span style={{ padding: "0 10px", color: style.color }}>{title}</span>
      )}
      <DatePicker
        picker="year"
        value={vals!.length > 0 ? vals![0] : null}
        onChange={(date, dateStr) => {
          let changedVal: Array<TableListOpsValueType> = [];
          if (date) {
            changedVal.push({
              name: name as string,
              value: dateStr
            });
          } else {
            changedVal.push({
              name: name as string,
              value: undefined
            });
          }
          updateChange(changedVal);
        }}
      />
    </div>
  );
};

/**
 *
 */
export const SingleSelector = ({
  defaultValue = "",
  selectItems = [],
  name = "",
  title,
  style = {},
  dropdownMatchSelectWidth = true
}: TableListOpsProps) => {
  const { updateChange, getChange } = useContext(TableListOpsContext);
  let initValue = "";
  if (getChange().filter(data => data.name === name).length === 1) {
    initValue = getChange().filter(data => data.name === name)[0]
      .value as string;
  }
  return (
    <div>
      {title && (
        <span style={{ padding: "0 10px", color: style.color }}>{title}</span>
      )}
      <Select
        allowClear
        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
        value={initValue}
        defaultValue={defaultValue}
        style={{ width: style.width || "120px" }}
        onChange={(value: string) =>
          updateChange({
            name,
            value
          } as TableListOpsValueType)
        }
      >
        {selectItems.map((item, index) => (
          <Option value={item.value} key={index}>
            {item.title}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export const CascaderSelector = ({
  defaultValues = [],
  selectItems = [],
  name = "",
  title,
  style = {}
}: TableListOpsProps) => {
  const { updateChange, getChange } = useContext(TableListOpsContext);
  let initValue = [] as any[];
  if (getChange().filter(data => data.name === name).length === 1) {
    initValue = getChange().filter(data => data.name === name)[0]
      .value as string[];
  }
  return (
    <div>
      <span style={{ padding: "0 10px", color: style.color }}>{title}</span>
      <Cascader
        allowClear
        value={initValue}
        defaultValue={defaultValues}
        style={{ width: style.width || "160px" }}
        options={selectItems}
        onChange={(value: CascaderValueType) =>
          updateChange({
            name,
            value
          } as TableListOpsValueType)
        }
      />
    </div>
  );
};

/**
 *
 */
export const InputWithRightIcon = ({
  addonAfter = <SettingOutlined translate />,
  name = "",
  title,
  defaultValue = ""
}: TableListOpsProps) => {
  const { updateChange, getChange } = useContext(TableListOpsContext);
  let initValue = "";
  if (getChange().filter(data => data.name === name).length === 1) {
    initValue = getChange().filter(data => data.name === name)[0]
      .value as string;
  }
  return (
    <div>
      <span style={{ padding: "0 10px" }}>{title}</span>
      <Input
        allowClear
        addonAfter={addonAfter}
        defaultValue={initValue === "" ? defaultValue : initValue}
        onChange={e => {
          updateChange({
            name,
            value: e.currentTarget.value
          } as TableListOpsValueType);
        }}
      />
    </div>
  );
};

export const InputWithoutIcon = ({
  name = "",
  title,
  defaultValue = "",
  style = {},
  placeholder
}: TableListOpsProps & InputProps) => {
  const { updateChange, getChange } = useContext(TableListOpsContext);
  let initValue = "";
  if (getChange().filter(data => data.name === name).length === 1) {
    initValue = getChange().filter(data => data.name === name)[0]
      .value as string;
  }
  return (
    <div style={title ? {} : { paddingLeft: "10px" }}>
      {title && <span style={{ padding: "0 10px" }}>{title}</span>}
      <Input
        placeholder={placeholder}
        style={style}
        defaultValue={initValue === "" ? defaultValue : initValue}
        onChange={e => {
          updateChange({
            name,
            value: e.currentTarget.value
          } as TableListOpsValueType);
        }}
      />
    </div>
  );
};

export const InputNumberWithoutIcon = ({
  name = "",
  title,
  defaultNumberValue
}: TableListOpsProps) => {
  const { updateChange, getChange } = useContext(TableListOpsContext);
  let initValue = "";
  if (getChange().filter(data => data.name === name).length === 1) {
    initValue = getChange().filter(data => data.name === name)[0]
      .value as string;
  }
  return (
    <div>
      {title && <span style={{ padding: "0 10px" }}>{title}</span>}
      <InputNumber
        defaultValue={
          initValue === "" ? defaultNumberValue : parseInt(initValue)
        }
        onChange={value => {
          updateChange({
            name,
            value
          } as TableListOpsValueType);
        }}
      />
    </div>
  );
};

export const InputSearch = ({
  name = "",
  title,
  defaultValue = "",
  style = {}
}: TableListOpsProps) => {
  const { updateChange, getChange } = useContext(TableListOpsContext);
  let initValue = "";
  if (getChange().filter(data => data.name === name).length === 1) {
    initValue = getChange().filter(data => data.name === name)[0]
      .value as string;
  }
  return (
    <div>
      <span style={{ padding: "0 10px" }}>{title}</span>
      <Search
        placeholder="请输入查询关键字"
        style={{ width: style.width || "200px" }}
        defaultValue={initValue === "" ? defaultValue : initValue}
        onChange={e => {
          updateChange({
            name: name as string,
            value:
              e.currentTarget.value && e.currentTarget.value !== ""
                ? e.currentTarget.value
                : undefined
          });
        }}
        onSearch={value => {
          updateChange({
            name: name as string,
            value
          });
        }}
      ></Search>
    </div>
  );
};


/**
 *
 */
export const SingleSelectionGroup = ({
  name = "",
  title,
  defaultValue = "",
  selectItems = []
}: TableListOpsProps) => {
  const { updateChange, getChange } = useContext(TableListOpsContext);
  let initValue = "";
  if (getChange().filter(data => data.name === name).length === 1) {
    initValue = getChange().filter(data => data.name === name)[0]
      .value as string;
  }
  if (!initValue || initValue === "") {
    initValue = defaultValue;
  }
  return (
    <div>
      {
        title && <span style={{ padding: "0 10px" }}>{title}</span>
      }

      <div style={{
        display: 'flex',
        justifyContent: "flex-start"
      }}>
        {
          selectItems.map((selectItem, index) =>
            <div
              key={index}
              className={`selectOption ${selectItem === initValue ? 'selected' : ''}`}
              onClick={() => updateChange({
                name: name as string,
                value: selectItem
              })}>{selectItem}</div>
          )
        }
      </div>
    </div>
  );
};

export const MultiSelectionGroup = ({
  name = "",
  title,
  defaultValues = [],
  selectItems = []
}: TableListOpsProps) => {
  const { updateChange, getChange } = useContext(TableListOpsContext);
  let initValue = "";
  if (getChange().filter(data => data.name === name).length === 1) {
    initValue = getChange().filter(data => data.name === name)[0]
      .value as string;
  }
  return (
    <div>
      {
        title && <span style={{ padding: "0 10px" }}>{title}</span>
      }

      <div style={{
        display: 'flex',
        justifyContent: "flex-start"
      }}>
        <div
          onClick={() => updateChange({
            name: name as string,
            value: ""
          })
          }
          className={`selectOption ${initValue === "" ? 'selected' : ''}`} >
          不限
        </div>
        <Checkbox.Group
          options={selectItems}
          defaultValue={defaultValues}
          value={initValue.split(",")}
          onChange={checkedValues => updateChange({
            name: name as string,
            value: checkedValues.join(",")
          })} />
      </div>
    </div>
  );
};

export const OptionsDateRangePicker = ({
  name = ["startDate", "endDate"],
  title,
  style = {},
  supportUnlimited = true
}: {
  supportUnlimited?: boolean
} & TableListOpsProps) => {
  const { updateChange, getChange } = useContext(TableListOpsContext);
  const currentMounthDate = [formatTimeYMDHMS(getMonthStartDate()), formatTimeYMDHMS(getMonthEndDate())]
  const lastMonthDate = [formatTimeYMDHMS(getLastMonthStartDate()), formatTimeYMDHMS(getLastMonthEndDate())]
  const currentYearDate = [formatTimeYMDHMS(getYearStartDate()), formatTimeYMDHMS(getYearEndDate())]

  let initValue =
    getChange()
      .filter(data => name.indexOf(data.name) !== -1)
      .map(data => moment(data.value)) as RangeValue<moment.Moment>

  useEffect(() => {
    if (!supportUnlimited) {
      updateChange([{
        name: name[0],
        value: currentMounthDate[0]
      }, {
        name: name[1],
        value: currentMounthDate[1]
      }], '本月')
    }
  }, [supportUnlimited])

  return (
    <div>
      {
        title && <span style={{ padding: "0 10px", color: style.color }}>{title}</span>
      }
      <div style={{
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: 'center'
      }}>
        {
          supportUnlimited &&
          <div
            onClick={() => updateChange([{
              name: name[0],
              value: undefined
            }, {
              name: name[1],
              value: undefined
            }])}
            className={`selectOption ${!initValue || initValue.length !== 2 || !initValue[0] ? 'selected' : ''}`} >
            不限
        </div>
        }

        <div
          onClick={() => updateChange([{
            name: name[0],
            value: currentMounthDate[0]
          }, {
            name: name[1],
            value: currentMounthDate[1]
          }], '本月')}
          className={`selectOption ${initValue && initValue.length === 2 && formatTimeYMDHMS(initValue[0]) === currentMounthDate[0] ? 'selected' : ''}`} >
          本月
        </div>

        <div
          onClick={() => updateChange([{
            name: name[0],
            value: lastMonthDate[0]
          }, {
            name: name[1],
            value: lastMonthDate[1]
          }], '上个月')}
          className={`selectOption ${initValue && initValue.length === 2 && formatTimeYMDHMS(initValue[0]) === lastMonthDate[0] ? 'selected' : ''}`} >
          上个月
        </div>

        <div
          onClick={() => updateChange([{
            name: name[0],
            value: currentYearDate[0]
          }, {
            name: name[1],
            value: currentYearDate[1]
          }], '近一年')}
          className={`selectOption ${initValue && initValue.length === 2 && formatTimeYMDHMS(initValue[0]) === currentYearDate[0] ? 'selected' : ''}`} >
          近一年
        </div>
        <div>
          <RangePicker
            value={initValue}
            allowClear
            onChange={date => {
              let changedVal: Array<TableListOpsValueType> = [];
              if (date) {
                if (date[0]) {
                  changedVal.push({
                    name: name[0],
                    value: getDayStartDate(date[0].valueOf())
                  });
                } else {
                  changedVal.push({
                    name: name[0],
                    value: undefined
                  });
                }
                if (date[1]) {
                  changedVal.push({
                    name: name[1],
                    value: getDayEndDate(date[1].valueOf())
                  });
                } else {
                  changedVal.push({
                    name: name[1],
                    value: undefined
                  });
                }
              } else {

                if (!supportUnlimited) {
                  changedVal.push({
                    name: name[0],
                    value: currentMounthDate[0]
                  })
                  changedVal.push({
                    name: name[1],
                    value: currentMounthDate[1]
                  })
                } else {
                  changedVal.push({
                    name: name[0],
                    value: undefined
                  });
                  changedVal.push({
                    name: name[1],
                    value: undefined
                  });
                }
              }
              updateChange(changedVal);
            }}
          />
        </div>
      </div>
    </div >
  );
};

export default {
  InputWithRightIcon,
  SingleSelector,
  CascaderSelector,
  DateRangePicker,
  InputSearch,
  mergeOpsValue,
  fillObjectFromOpsValue,
  getObjectFromOpsValue
};

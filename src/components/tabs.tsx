import React from "react";
import "./tabs.less";

export const TableNameWithNumber = (props: {
    name: string,
    count: number
}) =>
    <div className="tableNameWithNumber">{props.name}{props.count ? <div>{props.count}</div> : ''}</div>
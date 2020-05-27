import React from "react";

export const TableCommand = (props: {
  totalCount: number;
  selectionCount: number;
  tableCommandOps?: React.ReactNode;
}) => {
  return (
    <div
      style={{
        display: "flex",
        borderTop: "1px solid #D4DBEA",
        borderBottom: "1px solid #D4DBEA",
        padding: "15px",
        backgroundColor: "white"
      }}
    >
      <div style={{ width: "185px" }}>
        已选： {props.selectionCount} / {props.totalCount}
      </div>
      <div
        style={{
          flex: 1
        }}
      >
        {props.tableCommandOps ? props.tableCommandOps : null}
      </div>
    </div>
  );
};

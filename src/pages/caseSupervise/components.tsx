import React from "react";

export const CaseStatus = (props: {
    status: string
}) =>
    <div style={{
        backgroundColor: "#E3EAF4", border: "1px solid #BDCBDF",
        color: '#5A749B', width: '54px',
        height: "24px",
        borderRadius: '4px',
        justifyContent: 'center',
        display: 'flex', alignItems: "center"
    }}>{props.status}</div>
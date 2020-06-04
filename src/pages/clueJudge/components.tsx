import React from "react";

export const RateField = (props: {
    rate: number
}) =>
    <span style={{
        color: props.rate < 4 ? '#191919' : (props.rate < 5 ? '#FF9800' : '#FF3F11')
    }}>{props.rate}级</span>
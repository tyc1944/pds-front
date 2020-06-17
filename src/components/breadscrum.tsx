import React from "react";

interface BreadscrumProps {
  data: React.ReactNode[];
}

/**
 * 面包屑显示
 */
export default class Breadscrum extends React.Component<BreadscrumProps> {
  render() {
    return (
      <div
        style={{
          fontSize: "14px",
          padding: "10px 0px 10px 25px",
          backgroundColor: '#F6F7F9',
          height: "39px",
          width: "100%",
          borderBottom: "1px solid #D6DDE3",
          display: 'flex',
          alignItems: 'center'
        }}
      >
        当前位置：
        {this.props.data.map((item, index, arr) => (
          <span key={index}>{item}{
            index !== arr.length - 1 ? " > " : ""
            }</span>
        ))}
      </div>
    );
  }
}

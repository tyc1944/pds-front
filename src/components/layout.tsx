import React from "react";

interface BoxContainerProps {
  children: React.ReactNode;
  noPadding?: boolean
}

interface BoxContainerInnerProps {
  children: React.ReactNode;
  flex?: number
  noPadding?: boolean
}

export class BoxContainer extends React.Component<BoxContainerProps> {
  render() {
    return (
      <div
        style={{
          padding: this.props.noPadding ? "0px" : "16px 15px 0px 15px",
          width: "100%",
          minHeight: "0",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          flex: 'auto',
          backgroundColor: "#EDEFF2"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export class BoxContainerInner extends React.Component<BoxContainerInnerProps> {
  render() {
    return (
      <div
        style={{
          padding: this.props.noPadding ? "0px" : "0px 12px 12px 12px",
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          marginBottom: "15px",
          border: "1px solid #D6DDE3",
          flex: this.props.flex ? this.props.flex : 'auto'
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

interface BorderedBoxProps {
  children: React.ReactNode;
}

export class BorderedBox extends React.Component<BorderedBoxProps> {
  render() {
    return (
      <div
        style={{
          padding: "14px",
          width: "100%",
          flex: 1,
          height: "100%",
          backgroundColor: "#FFFFFF",
          border: "1px solid #D6DBE6",
          minHeight: "0px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export class BorderedBox2 extends React.Component<BorderedBoxProps> {
  render() {
    return (
      <div
        style={{
          padding: "14px",
          width: "100%",
          height: "100%",
          backgroundColor: "#F6F9FC",
          border: "1px solid #D6DBE6",
          minHeight: "0px"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

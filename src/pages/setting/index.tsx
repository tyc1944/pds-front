import React from "react";
import Breadscrum from "components/breadscrum";
import { BoxContainer, BoxContainerInner } from "components/layout";

class Setting extends React.Component {
    render() {
        return <div style={{
            display: "flex",
            height: "100%",
            flexDirection: 'column'
        }}>
            <Breadscrum data={["系统设置"]}></Breadscrum>
            <BoxContainer>
                <BoxContainerInner flex={0.6}>

                </BoxContainerInner>
                <BoxContainerInner flex={1}>

                </BoxContainerInner>
            </BoxContainer>
        </div>
    }
}

export default Setting;
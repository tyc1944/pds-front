import React from "react";
import { MyModal } from "components/modal";

export const AddressMapModal = (props: {
    visiable: boolean;
    onCancel: () => void;
    title: string;
    address: string;
}) => {

    return (
        <MyModal
            visiable={props.visiable}
            onCancel={props.onCancel}
            title={"案发地址"}
            width={900}
        >
            <div style={{
                width: '900px',
                height: "600px",
                backgroundSize: "100% 100%",
                marginTop: "-24px",
                background: `url(${`http://api.map.baidu.com/staticimage/v2?ak=3O86isE6vrVZsQRep5mhFIpjolGYFg8P&mcode=666666&center=${props.address}&width=900&height=600&markers=${props.address}`}) no-repeat`
            }}></div>
        </MyModal>
    )
};
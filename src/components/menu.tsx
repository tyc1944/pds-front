import React from "react";
import "./menu.less"
import { RightOutlined, DownOutlined } from "@ant-design/icons";

interface SubItem {
    name: string;
    count: number;
}

export const MenuItem = ({ subItems, name, icon }: {
    name: string,
    icon: React.ReactNode,
    subItems?: SubItem[]
}) => {

    const [showSubItems, setShowSubItems] = React.useState(false)

    return <div>
        <div className="MenuItem" onClick={() => setShowSubItems(!showSubItems)}>
            <div style={{
                flex: 0.4,
                textAlign: "center"
            }}>{icon}</div>
            <div style={{
                flex: 1
            }}>{name}</div>
            {
                subItems && subItems.length > 0 ? <div style={{
                    flex: 0.2,
                }}>
                    {
                        !showSubItems &&
                        <RightOutlined translate="true" />
                    }
                    {
                        showSubItems &&
                        <DownOutlined translate="true" />
                    }
                </div> : <div style={{
                    flex: 0.2
                }}></div>
            }
        </div>
        {
            showSubItems && subItems && <>
                {
                    subItems.map(item =>
                        <div className="SubMenuItem" key={item.name} style={{}}>
                            {item.name}
                            {
                                item.count ? ` (${item.count})` : ''
                            }
                        </div>
                    )
                }
            </>
        }
    </div>
}
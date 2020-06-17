import React, { useEffect } from "react";
import "./menu.less"
import { RightOutlined, DownOutlined } from "@ant-design/icons";

interface SubItem {
    name: string;
    count?: number;
    activeUrl: string;
    onClick?: () => void;
}

export const MenuItem = ({ onClick, subItems, name, icon, activeUrl }: {
    name: string,
    icon: React.ReactNode,
    subItems?: SubItem[] | (() => Promise<SubItem[]>),
    activeUrl?: string;
    onClick?: () => void
}) => {

    const [showSubItems, setShowSubItems] = React.useState(false)
    const [subItemsInner, setsubItemsInner] = React.useState([] as SubItem[])
    const href = window.location.href;

    useEffect(() => {
        if (subItemsInner && subItemsInner.length > 0) {
            for (let i in subItemsInner) {
                if (href.lastIndexOf(subItemsInner[i].activeUrl) !== -1) {
                    setShowSubItems(true)
                    break;
                }
            }
        }
    }, [subItemsInner, href])

    useEffect(() => {
        if (typeof subItems === "function") {
            (subItems as () => Promise<SubItem[]>)().then(res => {
                setsubItemsInner(res)
            })
        } else {
            setsubItemsInner(subItems as SubItem[])
        }
    }, [subItems])

    return <div>
        <div className={`MenuItem`} onClick={() => {
            if (subItemsInner && subItemsInner.length > 0) {
                setShowSubItems(!showSubItems)
            } else {
                onClick ? onClick() : (() => {
                    if (activeUrl) {
                        window.location.href = activeUrl;
                    }
                })();
            }
        }}>
            <div style={{
                flex: 0.4,
                textAlign: "center"
            }}>{icon}</div>
            <div style={{
                flex: 1
            }}>{name}</div>
            {
                subItemsInner && subItemsInner.length > 0 ? <div style={{
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
            showSubItems && <>
                {
                    subItemsInner.map(item =>
                        <div className={`SubMenuItem ${href.lastIndexOf(item.activeUrl) !== -1 ? 'active' : ''}`} key={item.name} onClick={() => {
                            if (item.onClick) {
                                item.onClick()
                            } else {
                                window.location.href = item.activeUrl;
                            }
                        }}>
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
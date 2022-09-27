import React, { useEffect } from "react";
import ActionCable from "actioncable";

interface GatewayContextObject {
    consumer: ActionCable.Cable | undefined;
    gateway: ActionCable.Channel & {
        connected: () => void;
        disconnected: () => void;
        received: (data: any) => void;
    }
}
export const GatewayContext = React.createContext<GatewayContextObject>(null!);

export function GatewayProvider(props: { children: React.ReactNode }) {
    // ActionCable
    const consumer = React.useMemo(() => {
        return ActionCable.createConsumer(`ws://${window.location.host}/api/v1/gateway`);
    }, []);
    const gateway = React.useMemo(() => {
        return consumer?.subscriptions.create("GatewayChannel", {
            connected: () => {
                console.log("connected");
            },
            disconnected: () => {
                console.log("disconnected");
            },
            received: (data: any) => {
                console.log(data);
            }
        });
    }, [consumer]);

    // コンテキストを作成
    const contextValue = React.useMemo(() => ({
        gateway,
        consumer
    }), [gateway, consumer]);

    return (
        <GatewayContext.Provider value={contextValue} children={props.children} />
    )
}
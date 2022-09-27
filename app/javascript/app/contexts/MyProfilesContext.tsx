import React, { useEffect } from "react";
import { IProfileOwn } from "../interface/IProfileOwn";

interface MyProfilesContextObject {
    profiles: Array<IProfileOwn> | undefined;
}
export const MyProfilesContext = React.createContext<MyProfilesContextObject>(null!);

export function MyProfilesProvider(props: { children: React.ReactNode }) {
    // プロフィールリスト
    const [profiles, setProfiles] = React.useState<IProfileOwn[]>([]);


    function fetchProfiles() {
        fetch('/api/v1/profiles')
            .then((response) => response.json())
            .then((data) => {
                setProfiles(data);
            });
    }

    useEffect(() => {
        fetchProfiles();
    }, []);

    // コンテキストを作成
    const contextValue = React.useMemo(() => ({
        profiles
    }), [profiles]);

    return (
        <MyProfilesContext.Provider value={contextValue}>
            {props.children}
        </MyProfilesContext.Provider>
    );
}
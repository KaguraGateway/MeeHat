import React from "react";
import { IProfile } from "../interface/IProfile";
import { IProfileOwn } from "../interface/IProfileOwn";
import { CurrentWorkspaceContext } from "./CurrentWorkspaceContext";
import { MyProfilesContext } from "./MyProfilesContext";

interface CurrentProfileContextObject {
    currentProfile: IProfile | undefined;
}
export const CurrentProfileContext = React.createContext<CurrentProfileContextObject>(null!);

export function CurrentProfileProvider(props: { children: React.ReactNode }) {
    // プロフィールリスト
    const {profiles} = React.useContext(MyProfilesContext);
    // 現在のワークスペース
    const {currentWorkspace} = React.useContext(CurrentWorkspaceContext);

    // プロフィール
    const currentProfile = React.useMemo(() => {
        return profiles?.find((profile) => profile.association_workspace_ids.find(workspace_id => workspace_id === currentWorkspace?.workspace_id));
    }, [profiles, currentWorkspace]);

    // コンテキストを作成
    const contextValue = React.useMemo(() => ({
        currentProfile
    }), [currentProfile]);

    return (
        <CurrentProfileContext.Provider value={contextValue}>
            {props.children}
        </CurrentProfileContext.Provider>
    );
}
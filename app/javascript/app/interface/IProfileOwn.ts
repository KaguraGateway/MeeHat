import { IProfile } from "./IProfile";

export interface IProfileOwn extends IProfile {
    user_id: number;
    is_display_email: boolean;
    /** 関連付けされたワークスペースリスト */
    association_workspace_ids: Array<number>;
}
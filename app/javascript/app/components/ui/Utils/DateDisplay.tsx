import { format } from "date-fns";
import { formatDistanceToNow } from "date-fns/esm";
import { ja } from "date-fns/locale";
import React, { useCallback, useEffect, useMemo } from "react";

export interface DateDisplayProps {
    date: Date;
    /** 末尾にテキストを追記する */
    endText?: string;
}
export function DateDisplay(props: DateDisplayProps) {
    const getDateText = useCallback(() => {
        // 現在からの経過分を取得
        const elapsedMinutes = Math.floor((new Date().getTime() - props.date.getTime()) / 60000);
        // 1分未満の場合は「たった今」と表示
        if(elapsedMinutes < 1) {
            return "たった今";
        }
        // 24時間未満の場合は「今日 HH:mm:ss」と表示
        else if(elapsedMinutes  < 1440) {
            return `今日 ${format(props.date, "HH:mm")}`
        }
        // 48時間未満の場合は「昨日 HH:mm」と表示
        else if(elapsedMinutes  < 2880) {
            return `昨日 ${format(props.date, "HH:mm")}`
        }

        return format(props.date, "yyyy/MM/dd HH:mm");
    }, [props.date]);

    const [dateText, setDateText] = React.useState<string>(getDateText());

    /** 初回レンダリング時に実行 */
    useEffect(() => {
        setInterval(() => {
            setDateText(getDateText());
        }, 60000);
    }, [setDateText, getDateText]);

    return <span>{props.endText != null ? `${dateText} ${props.endText}` : dateText}</span>
}
import { useGetActivesList } from "@/entities/actives/api/hooks/use-get-actives-list"
import ActivesListItem from "./active-list-item"
import { IActiveResponseDN2 } from "@/entities/actives";
import { useEffect, useState } from "react";
import { QueryObserverResult } from "@tanstack/react-query";

interface ActivesListProps {
    activelist: IActiveResponseDN2 | undefined;
    isSuccess: boolean;
    onDelete: () => Promise<QueryObserverResult<IActiveResponseDN2, Error>>
}

const ActivesList = ({activelist, isSuccess, onDelete}: ActivesListProps) => {
    // const { data: activelist, isLoading, isSuccess } = useGetActivesList({})

    // Вызываю все активы
    return (
        <div className="relative flex flex-col gap-8 ">
            {isSuccess && activelist &&  activelist.data.length > 0 ? (
                activelist.data.map((item) => (
                    <ActivesListItem 
                    data={item}
                    onDelete={onDelete}
                    />
                ))
            ) : (
                <div>Нет активов</div>
            )}

        </div>
    )
}

export default ActivesList

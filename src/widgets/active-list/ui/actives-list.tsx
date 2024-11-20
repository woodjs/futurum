import { useGetActivesList } from "@/entities/actives/api/hooks/use-get-actives-list"
import ActivesListItem from "./active-list-item"
import { IActiveResponseDN2 } from "@/entities/actives";

interface ActivesListProps {
    activelist: IActiveResponseDN2 | undefined;
    isSuccess: boolean;
}

const ActivesList = ({activelist, isSuccess}: ActivesListProps) => {
    // const { data: activelist, isLoading, isSuccess } = useGetActivesList({})

    // Вызываю все активы
    return (
        <div className="flex flex-col gap-8 ">
            {isSuccess && activelist &&  activelist.data.length > 0 ? (
                activelist.data.map((item) => (
                    <ActivesListItem 
                    data={item}
                    />
                ))
            ) : (
                <div>Нет активов</div>
            )}

        </div>
    )
}

export default ActivesList

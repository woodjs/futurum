import { useGetActivesList } from "@/entities/actives/api/hooks/use-get-actives-list"
import ActivesListItem from "./active-list-item"


const ActivesList = () => {
    const { data: activelist, isLoading, isSuccess } = useGetActivesList({})

    // Вызываю все активы
    return (
        <div className="flex flex-col gap-8 ">
            {isSuccess && activelist.data.length > 0 ? (
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

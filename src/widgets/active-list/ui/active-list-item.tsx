'use client'
import { IActiveList, IActiveListDocLink, IActiveListGaleryImageLink, IActiveListTag } from "@/entities/actives";
import ActiveItemLeftSide from "./active-item-left-side";
import ActiveItemMain from "./active-item-main-side";
import { IActiveData, ItemActiveProps } from "../types";


const ActivesListItem: React.FC<IActiveData> = ({ data }) => {
    

    return (
        <div className="flex p-4 w-[736px]">
            <ActiveItemLeftSide data={data}/>
            <ActiveItemMain data={data}/>
        </div>
    )
}

export default ActivesListItem;
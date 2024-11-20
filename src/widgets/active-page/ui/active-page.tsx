'use client'
import { IActiveIdDocumentId } from "@/entities/actives";
import { useGetActiveById } from "@/entities/actives/api/hooks/use-get-active-by-id";
import { API_URL_FILE } from "@/shared/api/config";
import { GradientTypography } from "@/shared/ui";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import ActivePageLeftSide from "./active-page-left";
import ActivePageMainSide from "./active-page-main";
import ActivePageBottom from "./active-page-bottom";
import ActiveData from "@/widgets/active-list/ui/active-item-props";

interface ActiveHeaderProps {
    uuid: string
}

const MyActivePage: FC<ActiveHeaderProps> = ({ uuid }) => {

    const { data: activepage, isLoading, isSuccess } = useGetActiveById(uuid as string)
    console.log(activepage)

    if (!activepage) {
        console.log("No active page")
        return <p>Данные не найдены</p>;
    }

    // const { id, activeName, cathegory, description, documents, endingDate, galeryImages,
    //     headline, minContribution, nft, organization, purposeCollection, tags, collection } = activepage;

    // console.log(id)


    return (
        <>
            <div className="flex max-w-[1070px] flex-col">
                <GradientTypography variant="h2" className="text-[42px] mt-[62px] mb-[24px]">          
                    {activepage.activeName.charAt(0).toUpperCase() + activepage.activeName.slice(1)}
                </GradientTypography>
                <div className="flex mt-[10px]">
                    <ActivePageLeftSide data={activepage}/>
                    <ActivePageMainSide data={activepage}/>
                </div>
                <ActivePageBottom data={activepage}/>
            </div>


        </>
    );
}

export default MyActivePage;
'use client'
import { IActiveDN2, IActiveResponse2, IActiveResponseDN2 } from "@/entities/actives";
import ActiveItemLeftSide from "./active-item-left-side";
import ActiveItemMain from "./active-item-main-side";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { ActivesEndpoints } from "@/entities/actives/api/config";
import { protectedAPI } from "@/shared/api";
import { QueryObserverResult } from "@tanstack/react-query";

interface Props {
    data: IActiveResponse2;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onDelete: () => Promise<QueryObserverResult<IActiveResponseDN2, Error>>
}

const Dialog: FC<Props> = ({ isOpen, setIsOpen, data, onDelete }) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    const handleDeleteActive = async (uuid: string) => {
        try {
            const response = await protectedAPI.delete(`${ActivesEndpoints.ACTIVES}?id=${uuid}`);
            onDelete();
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;

    return (
        <div
            ref={dialogRef}
            className="absolute top-6 right-3 bg-white border border-[#A0AEC0E5] rounded-[12px] p-[8px] w-[260px] z-10 hover:text-[#046EB5] cursor-pointer"
        >
            <p onClick={() => handleDeleteActive(data.id)}>Удалить</p>
        </div>
    );
};

interface ActivesListItemProps {
    data: IActiveResponse2,
    onDelete: () => Promise<QueryObserverResult<IActiveResponseDN2, Error>>
}

  const ActivesListItem: React.FC<ActivesListItemProps> = ({ data, onDelete }) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    return (
        <div className="flex p-4 w-[736px] relative"> 
            <ActiveItemLeftSide data={data} />
            <ActiveItemMain data={data} setIsOpen={setIsDialogOpen} isOpen={isDialogOpen} />
            
            {isDialogOpen && ( 
                <div className="absolute top-6 right-0">
                    <Dialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} data={data} onDelete={onDelete} />
                </div>
            )}
        </div>
    );
};

export default ActivesListItem;
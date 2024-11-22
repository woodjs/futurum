'use client'

import { GradientTypography } from "@/shared/ui";
import { Icon } from "@radix-ui/react-select";
import { IActiveData } from "../types";

import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale'; // Локализация для русского языка
import { IActiveDN2, IActiveResponse2 } from "@/entities/actives";
import ViewsIcon from "@/shared/icons/ViewsIcon";
import UserIcon from "@/shared/icons/UserIcon";
import LikeIcon from "@/shared/icons/LikeIcon";
import CommentIcon from "@/shared/icons/CommentIcon";
import MainMenuIcon from "@/shared/icons/MainMenuIcon";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";

interface Props {
  data: IActiveResponse2;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ActiveItemMain: React.FC<Props> = ({data, isOpen, setIsOpen}) => {
  const date = parseISO(data.endingDate);
  const formattedDate = format(date, "d MMMM yyyy", { locale: ru });

  console.log(data)

  return (
    <div className="flex w-[520px] ml-4 flex-col">
      <div className="flex h-4 w-full text-sm text-slate-400 justify-between items-center">
        <div>{formattedDate}</div>
        <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
          <MainMenuIcon />
        </div>
      </div>
      <div className="flex h-[40px] mt-6">
        <GradientTypography variant="h3" className="text-lg">
          {data.activeName.charAt(0).toUpperCase() + data.activeName.slice(1)}
        </GradientTypography>
      </div>
      <div
        className="custom-content text-base leading-tight font-light mt-2"
        dangerouslySetInnerHTML={{
          __html:
            data.description.length > 280
              ? data.description.slice(0, 280) + '...'
              : data.description,
        }}
      ></div>
      <div className="flex mt-[22px] flex-col">
        <div className="flex items-center mb-6">
          <div className="flex rounded-full mr-1 text-white justify-center items-center text-sm w-4 h-4 bg-blue-500">i</div>
          <span className="font-medium mr-3">На модерации</span>
        </div>
        <div className="flex gap-6">
          <div className="flex text-slate-400 items-center">
            <ViewsIcon />
            <span className="text-gray-300">4334</span>
          </div>
          <div className="flex text-slate-400 items-center">
            <UserIcon />
            <span className="text-gray-300">13</span>
          </div>
          <div className="flex text-slate-400 items-center">
            <LikeIcon />
            <span>233</span>
          </div>
          <div className="flex text-slate-400 items-center">
            <CommentIcon />
            <span>2342</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveItemMain;

import { GradientTypography } from "@/shared/ui";
import { Icon } from "@radix-ui/react-select";
import { IActiveData } from "../types";

import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale'; // Локализация для русского языка

const ActiveItemMain: React.FC<IActiveData> = (data) => {

  const date = parseISO(data.data.endingDate);
  const formattedDate = format(date, "d MMMM yyyy", { locale: ru });
  return (
    <div className="flex w-[520px] ml-4 flex-col">
      <div className="flex h-4 w-full text-sm text-slate-400 justify-between">
        <div>{formattedDate}</div>
        <div className="mainmenu">...</div>
      </div>
      <div className="flex mt-6">
        <GradientTypography variant="h3" className="text-lg">
          {data.data.activeName}
        </GradientTypography>
      </div>
      <div className="flex text-base leading-tight font-light mt-2">
        <p>
          {data.data.description}
        </p>
      </div>
      <div className="flex mt-6 flex-col">
        <div className="flex items-center mb-6">
          <div className="flex rounded-full mr-3 text-white justify-center items-center text-sm w-4 h-4 bg-blue-500">i</div>
          <span className="font-medium mr-3">В архиве</span>
        </div>
        <div className="flex gap-6">
          <div className="flex text-slate-400 items-center">
            <div className="flex bg-slate-400 w-5 h-5 rounded-full mr-1"></div>
            <span className="text-gray-300">4334</span>
          </div>
          <div className="flex text-slate-400 items-center">
            <div className="flex bg-slate-400 w-5 h-5 rounded-full mr-1"></div>
            <span className="text-gray-300">13</span>
          </div>
          <div className="flex text-slate-400 items-center">
            <div className="flex bg-slate-400 w-5 h-5 rounded-full mr-1"></div>
            <span>233</span>
          </div>
          <div className="flex text-slate-400 items-center">
            <div className="flex bg-slate-400 w-5 h-5 rounded-full mr-1"></div>
            <span>2342</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveItemMain;

// ** Import Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { toggleInfoChannel } from "../../recoil/toggle";

// ** Import Models
import { IResChannel } from "../../models/channel";

// ** Import Other
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  channel_info: IResChannel | undefined;
};

const HeadChannel = ({ channel_info }: Props) => {
  // Recoil State
  const [infoChannel, setInfoChannel] = useRecoilState(toggleInfoChannel);

  const handleInfoUser = () => {
    setInfoChannel(!infoChannel);
  };

  return (
    <div className="flex justify-between items-center">
      <div className=" flex items-center gap-3">
        <img
          src={channel_info?.image}
          alt={channel_info?.name}
          className="rounded-full w-[43px] h-[43px] object-cover"
        />

        <div className=" text-sm font-semibold">
          <h1>{channel_info?.name}</h1>

          <p className="text-white/60">
            {infoChannel
              ? channel_info?.description.substring(0, 52)
              : channel_info?.description.substring(0, 75)}

            {channel_info!.description.length >= 75 && "..."}
          </p>
        </div>
      </div>

      <div onClick={handleInfoUser}>
        {infoChannel ? (
          <ChevronRightIcon className="h-7 w-7 cursor-pointer" />
        ) : (
          <EllipsisVerticalIcon className="h-7 w-7 cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default HeadChannel;

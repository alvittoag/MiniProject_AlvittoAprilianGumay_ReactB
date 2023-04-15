// ** Import Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { navigation } from "../../recoil/navigation";
import { toggleSideBar } from "../../recoil/toggle";
import { searchChannel } from "../../recoil/search-channel";

// ** Import Models
import { IResApi } from "../../models/ResApi";

// ** Import Service
import { getChannel } from "../../service/api/GetChannel";

// ** Import Other
import { useSubscription } from "@apollo/client";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import LoadingChannel from "../../global/LoadingChannel";
import { capitalize } from "../../helpers/convert-capitalize";
import NotFoundChannel from "./notfound-channel/NotFoundChannel";

const Channel = () => {
  // ** Recoil State
  const [navigationId, setNavigationId] = useRecoilState(navigation);
  const isSidebarClose = useRecoilValue(toggleSideBar);
  const search = useRecoilValue(searchChannel);

  const { data, loading } = useSubscription<IResApi>(getChannel, {
    variables: { value: `%${capitalize(search)}%` },
  });

  const handleNavigation = (data: number) => {
    setNavigationId(data);
  };

  return (
    <div className="space-y-10">
      {data?.channels.length === 0 && <NotFoundChannel />}

      {loading && (
        <div className="px-9 flex flex-col gap-8">
          <LoadingChannel
            count={3}
            widthTitle="w-64"
            widthSubtitle="w-16"
            widthImage="w-[3rem]"
            heightImage="h-[3rem]"
          />
        </div>
      )}

      {data?.channels.map((data) => (
        <Link
          to={`channel/${data.id}`}
          onClick={() => handleNavigation(data.id)}
          className="flex items-center gap-4 cursor-pointer px-2"
          key={data.id}
        >
          <div className="flex items-center gap-3">
            {navigationId === data.id ? (
              <ChevronRightIcon className="h-4 w-4 font-bold" />
            ) : (
              <div className="w-[1rem]"></div>
            )}

            <img
              src={data.image}
              className="rounded-full w-[3rem] h-[3rem] object-cover"
            />
          </div>

          {!isSidebarClose && (
            <div>
              <h1 className={`font-[600] text-white/90`}>{data.name}</h1>

              <p className="text-sm font-medium text-white/80">
                {data.messages_info.length} Chats
              </p>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Channel;
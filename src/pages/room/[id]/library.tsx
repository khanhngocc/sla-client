import RoomLayout from "../../../components/layout/RoomLayout";
import Link from "next/link";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../../utils/TypeScript";
import router from "next/router";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import folder from "../../[username]/library/folders";
import { FolderShared } from "@material-ui/icons";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { useRouter } from "next/router";
import React from "react";
import { getAPI } from "../../../utils/FetchData";
import { ALERT } from "../../../redux/types/alertType";
import { PARAMS } from "../../../common/params";
import { INewRoom } from "../../../utils/TypeScript";
import { IFolder } from "../../../utils/TypeScript";
import { IStudySet } from "../../../utils/TypeScript";
import { deleteAPI } from "../../../utils/FetchData";
//cai fake nay call nhieu api
const defaultRoom = {
  room_id: 0,
  name: "",
  description: "",
  createdDate: "",
  ownerName: "",
  setNumbers: 0,
  folderNumbers: 0
}

const defaultStudySets: IStudySet[] = [];
const library = () => {
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const dispatch = useDispatch();
  const { auth, alert, user } = useSelector((state: RootStore) => state);

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError]: [string, (error: string) => void] =
    React.useState("not found");

  const [room, setRoom] = React.useState<INewRoom>(defaultRoom);
  const [folders, setFolders] = React.useState<IFolder[]>([]);
  const [sets, setSets]: [
    IStudySet[],
    (sets: IStudySet[]) => void
  ] = React.useState(defaultStudySets);

  const [isShowRemoveFolderModal, setIsShowRemoveFolderModal] = React.useState(false);
  const [idRemoveFolder, setIdRemoveFolder] = React.useState<number>(0);
  React.useEffect(() => {
    // load detail data of room
    setIsSuccess(false);
    async function excute() {
      try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const res = await getAPI(`${PARAMS.ENDPOINT}room/getRoom/${id}`);
        setRoom(res.data);

        dispatch({ type: ALERT, payload: { loading: false } });


      } catch (err) {
        dispatch({ type: ALERT, payload: { loading: false } });
        setError(err);
      }
    }

    excute();
  }, [id, isSuccess]);

  React.useEffect(() => {
    setIsSuccess(false);
    // list all folders in room
    async function excute() {
      try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const res = await getAPI(
          `${PARAMS.ENDPOINT}room/listFoldersOfRoom/${id}`
        );

        dispatch({ type: ALERT, payload: { loading: false } });
        setFolders(res.data);


      } catch (err) {
        dispatch({ type: ALERT, payload: { loading: false } });
      }
    }
    excute();
  }, [id, isSuccess, alert.success]);

  React.useEffect(() => {
    // list SS already in folder
    setIsSuccess(false);
    async function excute() {
      try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const res = await getAPI(
          `${PARAMS.ENDPOINT}room/listStudySetsOfRoom/${id}`
        );
        dispatch({ type: ALERT, payload: { loading: false } });
        setSets(res.data);

      } catch (err) {
        dispatch({ type: ALERT, payload: { loading: false } });
        setError(err);
      }
    }

    excute();
  }, [id, isSuccess]);

  // remove folder from room
  async function removeFolder() {
    dispatch({ type: ALERT, payload: { loading: true } });
    try {
      const res = await deleteAPI(
        `${PARAMS.ENDPOINT}room/deleteFolderFromRoom/${id}/${idRemoveFolder}`
      );
     
      dispatch({ type: ALERT, payload: { loading: false } });
      setIsSuccess(true);

    } catch (err) {
      dispatch({ type: ALERT, payload: { loading: false } });

      setIsSuccess(false);
    }

    setIsShowRemoveFolderModal(!isShowRemoveFolderModal);
  }

  const handleRemoveFolder = (folder_id: number) => {
    setIsShowRemoveFolderModal(!isShowRemoveFolderModal);
    setIdRemoveFolder(folder_id);
  };

  const closeRemoveFolderModal = () => {
    setIsShowRemoveFolderModal(!isShowRemoveFolderModal);
  };
  return (
    <RoomLayout>
      <div className="mt-6">
        {room.setNumbers === 0 ? (
          <div className="col-span-2 text-center mx-auto">
            <p className="text-3xl font-semibold text-gray-700">
              This room doesn't have any sets yet
            </p>

            {auth.userResponse?.username === room.ownerName ? (
              <>
                <p className="text-md text-gray-600">
                  Add an existing set or create a new one to share.
                </p>
                <div className="mt-4 text-center">
                  <Link
                    href={{
                      pathname: "/set/add",
                    }}
                  >
                    <button
                      type="button"
                      className="w-40 text-md rounded-md px-4 mx-2 py-2
            text-md font-bold bg-green-500 hover:bg-green-600 
         text-white focus:outline-none"
                    >
                      Create a new set
                    </button>
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        ) : (
          <div>
            {/* sets */}
            <div className="mb-4">
              <p className="text-lg font-bold text-gray-500">{room.setNumbers} Sets</p>
              <hr />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {sets.map((set, index) => {
                return (
                  <div className="col-span-1">
                    <div
                      key={index}
                      className="grid grid-rows-5 shadow-lg flex-row rounded-md p-2 h-36 my-4 bg-white dark:bg-gray-800"
                    >
                      <div className="row-span-1 w-full flex mb-2">
                        <div className="w-full">
                          <p className="text-gray-800 dark:text-white text-xl flex flex-wrap font-medium leading-non">
                            <a
                              href={`/set/${set.studySet_id}`}
                              className="hover:underline"
                            >
                              {set.title.length <= 15
                                ? set.title
                                : set.title.substring(0, 15) + "..."}{" "}
                            </a>
                            {set.color ? (
                              <FiberManualRecordIcon
                                className={`text-${set.color?.toLowerCase()}-400`}
                              />
                            ) : (
                              <FiberManualRecordIcon className={`text-white`} />
                            )}
                            {"  "}
                            <a href={`/${set.creatorName}/library/sets`}>
                              <span className="text-gray-500 text-sm hover:underline">
                                {set.creatorName.length <= 10
                                  ? set.creatorName
                                  : set.creatorName.substring(0, 10) + "..."}
                              </span>
                            </a>
                          </p>
                        </div>
                        {room.ownerName === auth.userResponse?.username ? (
                          <div>
                            <button
                              // onClick={() => handleRemoveStudySet(set.studySet_id)}
                              className="tooltip flex items-center focus:outline-none"
                            >
                              <HighlightOffIcon className="hover:text-yellow-500 text-gray-700" />
                              <span className="tooltiptext w-32">
                                remove this set
                              </span>
                            </button>
                          </div>
                        ) : null}
                      </div>
                      <div className="row-span-3 mb-12">
                        {set.description.length <= 50 ? (
                          <p className="text-gray-500">{set.description}</p>
                        ) : (
                          <p className="text-gray-500">
                            {set.description.substring(0, 50)}...
                          </p>
                        )}
                      </div>

                      <div className="row-span-1 mt-2">
                        <p>{set.numberOfCards} cards</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* folders */}
            <div className="mt-8 mb-4">
              <p className="text-lg font-bold text-gray-500">{room.folderNumbers} Folders</p>
              <hr />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {folders.map((item) => {
                return (
                  <div
                    className="col-span-2 bg-white dark:bg-gray-800 mt-6 border-b-2  
             hover:border-gray-300 hover:shadow-lg rounded-lg shadow-md flex justify-between"
                    key={item.folder_id}
                  >
                    <div className="w-full">
                      <Link
                        href={{
                          pathname: "/folder/[id]",
                          query: { id: item.folder_id },
                        }}
                      >
                        <div className="cursor-pointer flex flex-1 items-center p-4">
                          <div className="flex-1 pl-1 mr-16">
                            <div className="font-medium dark:text-white flex">
                              {room.ownerName ===
                                auth.userResponse?.username ? (
                                item.color ? (
                                  <FolderOpenRoundedIcon
                                    className={`mr-2 text-${item.color?.toLocaleLowerCase()}-400`}
                                  />
                                ) : (
                                  <FolderOpenRoundedIcon className={`mr-2`} />
                                )
                              ) : (
                                <FolderOpenRoundedIcon className={`mr-2`} />
                              )}

                              <p>{item.title}</p>
                            </div>
                            <div className="text-gray-600 dark:text-gray-200 text-sm">
                              {item.numberOfSets <= 1
                                ? item.numberOfSets + " set"
                                : item.numberOfSets + " set"}
                            </div>
                          </div>
                          <div className="text-gray-600 dark:text-gray-200 text-xs">
                            {item.createdDate}
                          </div>
                        </div>
                      </Link>
                    </div>

                    {room.ownerName === auth.userResponse?.username ? (
                      <div className="my-auto px-4">
                        <button
                          onClick={() => handleRemoveFolder(item.folder_id)}
                          className="text-right flex justify-end focus:outline-none"
                        >
                          <DeleteOutlinedIcon className="hover:text-yellow-500 text-gray-700 " />
                        </button>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {isShowRemoveFolderModal ? (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 backdrop-filter backdrop-brightness-50 -mt-12">
            <div className=" w-full absolute flex items-center justify-center bg-modal">
              <div className="bg-white rounded shadow p-6 m-4 max-w-xs max-h-full text-center">
                <div className="mb-8">
                  <p className="text-xl font-semibold">
                    Are you sure want to delete this folder?
                  </p>
                  <small>
                    All sets in this folder will not be remove from the library
                  </small>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={removeFolder}
                    className="text-white w-32 rounded mx-4 bg-yellow-500 hover:bg-yellow-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={closeRemoveFolderModal}
                    className=" text-white w-32 py-1 mx-4 rounded bg-green-500 hover:bg-green-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </RoomLayout>
  );
};

export default library;

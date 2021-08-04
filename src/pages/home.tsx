import Link from "next/link";
import SimpleLevelsCard from "../components/card/SimpleLevelsCard";
import AppLayout2 from "../components/layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  IStudySetInfo2,
  IStudySetLearning,
  RootStore,
} from "../utils/TypeScript";
import { useEffect } from "react";
import { ALERT } from "../redux/types/alertType";
import { PARAMS } from "../common/params";
import { getAPI } from "../utils/FetchData";
import { useState } from "react";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TasksList from "../components/data/TaskList";

import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const home = () => {
  const dispatch = useDispatch();
  const { auth, alert } = useSelector((state: RootStore) => state);

  //get event today
  //get 6 study set learning
  //get 6 study set own

  const [list4StudySetLeaning, setList4StudySetLearning] = useState<
    IStudySetLearning[]
  >([]);
  const [list4StudySetCreated, setList4StudySetCreated] = useState<
    IStudySetInfo2[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      //list ss created
      try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const listSSCreatedRes = await getAPI(
          `${PARAMS.ENDPOINT}home/SSCreated`
        );
        dispatch({ type: ALERT, payload: { loading: false } });
        setList4StudySetCreated(listSSCreatedRes.data);

        console.log(JSON.stringify(listSSCreatedRes.data));
      } catch (err) {
        console.log(err);
        dispatch({ type: ALERT, payload: { loading: false } });
      }

      //list studyset learning
      try {
        dispatch({ type: ALERT, payload: { loading: true } });
        const listSSLearningRes = await getAPI(
          `${PARAMS.ENDPOINT}home/SSLearning`
        );
        dispatch({ type: ALERT, payload: { loading: false } });
        setList4StudySetLearning(listSSLearningRes.data);

        console.log(JSON.stringify(listSSLearningRes.data));
      } catch (err) {
        console.log(err);
        dispatch({ type: ALERT, payload: { loading: false } });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AppLayout2 title="home" desc="home">
        <div className="pt-4 pb-24 items-center mx-auto w-5/6 mb-44">
          <div className="grid lg:grid-cols-7 grid-cols-1 mt-12">
            <div className="col-span-2 px-2 ">
              <div className="flex flex-col">
                <div className="relative w-44 h-2 bg-blue-600 mb-2"></div>
                <p className="text-lg font-bold text-blue-600">
                  Today Task
                </p>{" "}
              </div>
              <div className="mb-6">
                <TasksList />
              </div>
            </div>
            <div className="col-span-5 px-2">
              <div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <div className="relative w-44 h-2 bg-blue-600 mb-2"></div>
                    <p className="text-lg font-bold text-blue-600">
                      Created
                    </p>{" "}
                  </div>
                  <div className="flex flex-col">
                    <Link
                      href={{
                        pathname: "/[username]/library/sets",
                        query: { username: auth.userResponse?.username },
                      }}
                    >
                      <p className="text-sm text-gray-600 hover:underline cursor-pointer hover:text-gray-800">
                        Show more <ChevronRightIcon fontSize="small" />
                      </p>
                    </Link>{" "}
                  </div>
                </div>
                <div className=" grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                  {list4StudySetLeaning.map((set, index) => {
                    return (
                      <div className="col-span-1 ">
                        <div
                          key={index}
                          className="grid grid-rows-5 flex-col col-span-1 rounded-md p-2 h-40 my-4 bg-white 
                          hover:border-gray-300 hover:shadow-lg cursor-pointer shadow-md border-b-2 border-gray-200"
                        >
                          <div className="row-span-1 w-full flex flex-row mb-2">
                            <div className="w-full">
                              <p className="text-gray-800 dark:text-white text-xl font-medium leading-none">
                                <a
                                  href={`/set/${set.studySetId}`}
                                  className="hover:underline"
                                >
                                  {set.studySetName.length <= 6
                                    ? set.studySetName
                                    : set.studySetName.substring(0, 6) +
                                      "..."}{" "}
                                </a>
                                {set.color ? (
                                  <FiberManualRecordIcon
                                    className={`text-${set.color?.toLowerCase()}-400`}
                                  />
                                ) : null}
                                <FiberManualRecordIcon
                                  className={`text-yellow-50-400`}
                                />
                                {"  "}
                                <a href={`/${set.owner}/library/sets`}>
                                  <span className="text-gray-500 text-sm hover:underline">
                                    {set.owner}
                                  </span>
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="row-span-3 mb-12">
                            {set.ssDescription.length <= 50 ? (
                              <p className="text-gray-500">
                                {set.ssDescription}
                              </p>
                            ) : (
                              <p className="text-gray-500">
                                {set.ssDescription.substring(0, 60)}...
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Progress: {set.progress * 100}%
                            </p>
                          </div>

                          <div className="row-span-1 mt-1">
                            <p>{set.numberOfCards} cards</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <hr />
              {/* ss created */}
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <div className="flex flex-col">
                    <div className="relative w-44 h-2 bg-blue-600 mb-2"></div>
                    <p className="text-lg font-bold text-blue-600">
                      Created
                    </p>{" "}
                  </div>
                </div>
                <div className=" grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                  {list4StudySetCreated.map((set, index) => {
                    return (
                      <div className=" col-span-1" key={index}>
                        <div
                          className="grid grid-rows-5 flex-row col-span-1 rounded-md p-2 h-40 my-4 bg-white dark:bg-gray-800 
                        hover:border-gray-300 hover:shadow-lg cursor-pointer shadow-md border-b-2 border-gray-200"
                        >
                          <div className="row-span-1 w-full mb-2">
                            <div className="w-full">
                              <p className="text-gray-800 dark:text-white text-xl font-medium ">
                                <a
                                  href={`/set/${set.id}`}
                                  className="hover:underline"
                                >
                                  {set.title.length <= 6
                                    ? set.title
                                    : set.title.substring(0, 6) + "..."}{" "}
                                </a>
                                <a href={`/${set.creator}/library/sets`}>
                                  <span className="text-gray-500 text-sm hover:underline">
                                    {set.creator}
                                  </span>
                                </a>
                              </p>
                            </div>
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
              </div>
            </div>
          </div>
        </div>
      </AppLayout2>
    </div>
  );
};

export default home;

import React, { useEffect } from "react";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

export default function CalendarDatePicker() {
  const [state, setState] = useState({
    selection1: {
      startDate: addDays(new Date(), 0),
      endDate: addDays(new Date(), 7),
      key: "selection1",
      dateDivide: [],
    },
  });

  const [showCalender, setShowCalender] = useState(false);

  function handleCalendarChange(item) {
    item &&
      setState({
        ...state,
        selection1: {
          startDate: item?.selection1?.startDate,
          endDate: addDays(item?.selection1?.startDate, 7),
          dateDivide: [
            [0, 1, 2, 3, 4, 5, 6].map((data) => {
              const date = addDays(item?.selection1?.startDate, data)
                .toString()
                .split(" ");
              return {
                date: date[2],
                day: date[0],
                month: date[1],
                year: date[3],
              };
            }),
          ],
          key: "selection1",
        },
      });
  }

  function todayChange() {
    const date = new Date();
    const dateDivide = new Date().toString().split(" ");
    setState({
      selection1: {
        startDate: addDays(date, 0),
        endDate: addDays(date, 0),
        key: "selection1",
        dateDivide: [
          {
            date: dateDivide[2],
            day: dateDivide[0],
            month: dateDivide[1],
            year: dateDivide[3],
          },
        ],
      },
    });
  }

  function weekMoveChange(direction) {
    const moveTo = direction === "left" ? -7 : 7;

    setState((prevState) => {
      return {
        ...prevState,
        selection1: {
          startDate: addDays(prevState.selection1?.startDate, moveTo),
          endDate: addDays(prevState.selection1?.startDate, moveTo + 7),
          dateDivide: [
            [0, 1, 2, 3, 4, 5, 6].map((data) => {
              const date = addDays(
                addDays(prevState.selection1?.startDate, moveTo),
                data
              )
                .toString()
                .split(" ");
              return {
                date: date[2],
                day: date[0],
                month: date[1],
                year: date[3],
              };
            }),
          ],
        },
      };
    });
  }

  const [displayDate, setDisplayDate] = useState();
  useEffect(() => {
    const dateDivideStart = state?.selection1?.startDate?.toString().split(" ");
    const dateDivideEnd = state?.selection1?.endDate?.toString().split(" ");
    dateDivideStart &&
      dateDivideEnd &&
      setDisplayDate(
        `${dateDivideStart[2]} ${dateDivideStart[1]} - ${dateDivideEnd[2]}`
      );
  }, [state]);

  console.log(state.selection1.dateDivide);

  return (
    <div>
      <div className="flex flex-row justify-center my-10">
        <button
          className="bg-[#ef3b62] text-white font-semibold rounded-lg text-xs py-1 px-4 "
          onClick={todayChange}
        >
          Today
        </button>
        <div className="flex flex-row justify-between">
          <button
            className="bg-[#ef3b62] text-white font-semibold rounded-lg text-xs py-1 px-4 mx-2 "
            onClick={() => weekMoveChange("left")}
          >
            <BsFillCaretLeftFill />
          </button>
          <button
            className="bg-[#ef3b62] text-white font-semibold rounded-lg text-xs py-1 px-4 mx-2"
            onClick={() => setShowCalender((prevState) => !prevState)}
          >
            {displayDate}
          </button>
          <button
            className="bg-[#ef3b62] text-white font-semibold rounded-lg text-xs py-1 px-4 mx-2"
            onClick={() => weekMoveChange("right")}
          >
            <BsFillCaretRightFill />
          </button>
        </div>
      </div>
      {showCalender && (
        <DateRangePicker
          onChange={(item) => {
            handleCalendarChange(item);
            console.log("i", item);
          }}
          moveRangeOnFirstSelection={true}
          ranges={[state.selection1]}
          rangeColors={["#ef3b62"]}
        />
      )}
    </div>
  );
}

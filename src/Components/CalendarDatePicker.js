import React from "react";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";

export default function CalendarDatePicker() {
  const [state, setState] = useState({
    selection1: {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 7),
      key: "selection1",
    },
  });

  console.log(state);

  return (
    <div>
      <DateRangePicker
        onChange={(item) => {
          setState({
            ...state,
            selection1: {
              startDate: item.selection1?.startDate,
              endDate: addDays(item.selection1?.startDate, 7),
            },
          });
          console.log("i", item);
        }}
        ranges={[state.selection1]}
      />
    </div>
  );
}

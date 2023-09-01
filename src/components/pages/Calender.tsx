import React, { useState } from "react";
import CalenderHeader from "../calenderHeader";
import Popup from "../popup";
import { useLocation } from "react-router-dom";

export default function Calender() {
  const DayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [trigger, setTrigger] = useState(false);
  const [clicked_date, setClickedDate] = useState("");
  const location = useLocation();
  const email_id = location.state.email;
  // const myUrl = "http://localhost:5000";

  let Day_data = DayNames.map((item) => {
    return <div className={"Card--button"}>{item}</div>;
  });
  let today: Date = new Date();

  const monthName: any = {
    0: "JAN",
    1: "FEB",
    2: "MAR",
    3: "APR",
    4: "MAY",
    5: "JUN",
    6: "JUL",
    7: "AUG",
    8: "SEP",
    9: "OCT",
    10: "NOV",
    11: "DEC",
  };
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  let today_month = today.getMonth();
  let [month, Setmonth] = useState(monthName[today_month]);
  let [year, Setyear] = useState(today.getFullYear());

  let date: Date = new Date(month + " 1 " + year);
  let a = Array(date.getDay()).fill(0);
  function checkLeapYear(year: number) {
    if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
      let temp: any = {
        jan: 31,
        feb: 29,
        mar: 31,
        apr: 30,
        may: 31,
        jun: 30,
        july: 31,
        aug: 31,
        sep: 30,
        oct: 31,
        nov: 30,
        dec: 31,
      };
      return temp;
    } else {
      let temp: any = {
        jan: 31,
        feb: 28,
        mar: 31,
        apr: 30,
        may: 31,
        jun: 30,
        july: 31,
        aug: 31,
        sep: 30,
        oct: 31,
        nov: 30,
        dec: 31,
      };
      return temp;
    }
  }

  let next_30_years = Array.from(
    { length: 30 },
    (_, index) => today.getFullYear() + index
  );
  let month_days = checkLeapYear(year);
  let newArray = Array.from(
    { length: month_days[month.toLowerCase()] },
    (_, index) => index + 1
  );

  async function bringPopup(e: any) {
    setClickedDate(e.target.value);
    setTrigger(true);
  }

  newArray = a.concat(newArray);
  let date_data = newArray.map((item) => {
    if (!item) {
      return (
        <button
          onClick={() => {
            setTrigger(false);
          }}
          className="ignore"
        ></button>
      );
    } else if (
      today.getMonth() > monthNames.indexOf(month) &&
      year == today.getFullYear()
    ) {
      return (
        <button
          onClick={() => {
            setTrigger(false);
          }}
          className="no-access"
        >
          {item}
        </button>
      );
    } else if (
      today.getMonth() == monthNames.indexOf(month) &&
      item < today.getDate() &&
      year == today.getFullYear()
    ) {
      return (
        <button
          onClick={() => {
            setTrigger(false);
          }}
          className="no-access"
        >
          {item}
        </button>
      );
    }
    return (
      <button
        onClick={bringPopup}
        value={item + "-" + month + "-" + year}
        className="Date--button"
      >
        {item}
      </button>
    );
  });

  let months = Object.keys(month_days).map((item) => {
    return (
      <option className="monthName-options" value={item.toUpperCase()}>
        {item.toUpperCase()}
      </option>
    );
  });

  let years = next_30_years.map((item) => {
    return (
      <option className="monthName-options" value={item}>
        {item.toString()}
      </option>
    );
  });

  function handleMonth(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    month = e.target.value;
    Setmonth(e.target.value);
  }

  function handleYear(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    Setyear(parseInt(e.target.value));
    year = parseInt(e.target.value);
  }
  return (
    <div>
      <CalenderHeader email={email_id} />
      <div className="calender">
        <div className="month-indicator">
          <select
            onClick={() => {
              setTrigger(false);
            }}
            value={month}
            onChange={handleMonth}
            className="select--month"
          >
            {months}
          </select>
          <select
            onClick={() => {
              setTrigger(false);
            }}
            value={year}
            onChange={handleYear}
            className="select--year"
          >
            {years}
          </select>
        </div>
        <main>
          <Popup
            trigger={trigger}
            state={setTrigger}
            date={clicked_date}
            email={email_id}
          />
        </main>

        <div
          onClick={() => {
            setTrigger(false);
          }}
          className="day-of-Week"
        >
          {Day_data}
        </div>
        <div className="date-grid">{date_data}</div>
      </div>
    </div>
  );
}

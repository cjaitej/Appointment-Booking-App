interface popup {
  trigger: boolean;
  state: any;
  date: any;
  email: String;
}

export default function Popup(props: popup) {
  const myUrl = "http://localhost:5000";

  const timings = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 AM",
    "12:00 AM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
  ];
  const allready_booked = {
    "9:00 AM - 10:00 AM": 0,
    "10:00 AM - 11:00 AM": 0,
    "11:00 AM - 12:00 AM": 0,
    "12:00 AM - 1:00 PM": 1,
    "1:00 PM - 2:00 PM": 0,
    "2:00 PM - 3:00 PM": 1,
    "3:00 PM - 4:00 PM": 0,
    "4:00 PM - 5:00 PM": 2,
    "5:00 PM - 6:00 PM": 0,
  };

  const timings_button = timings.map((items: string) => {
    if (allready_booked[items] == 1) {
      return (
        <div className="single-timings">
          <button className="booked-inside--popup">{items}</button>
        </div>
      );
    } else if (allready_booked[items] == 2) {
      return (
        <div className="single-timings">
          <button className="booked-inside--popup">{items}</button>
          <button className="popup-buttons--cancel">Cancel</button>
        </div>
      );
    }
    return (
      <div className="single-timings">
        <button className="inside--popup">{items}</button>
        <button className="popup-buttons--book">Book</button>
      </div>
    );
  });

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-top">
          <h1 className="date">Date: {props.date}</h1>

          <button
            onClick={() => {
              props.state(false);
            }}
            className="cls-button"
          >
            close
          </button>
        </div>
        <div className="allTimings">{timings_button}</div>
      </div>
    </div>
  ) : (
    ""
  );
}

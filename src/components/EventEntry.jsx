import moment from "moment";

const EventEntry = ({ event }) => {
  const { datetime_local, url, venue } = event;

  const positiveMessages = ["Yessir!", "Yup!", "Yeah!"];
  const pickedMessage =
    positiveMessages[Math.floor(Math.random() * positiveMessages.length)];

  return (
    <div>
      <h1>{pickedMessage}</h1>
      <p>
        They're playing {moment(datetime_local).fromNow()} at {venue.name}{" "}
      </p>
      <a href={url}>tickets</a>
    </div>
  );
};

export default EventEntry;

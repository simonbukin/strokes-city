import { useEffect, useState } from "react";
import testConcert from "../test-event.json";
import { useGeolocation } from "./useGeolocation";
import { formatDistance } from "date-fns";
import { parseEvent } from "../utils";

const getEvents = async (
  artistSlug: string,
  coords: GeolocationCoordinates,
  clientId: string,
  clientSecret: string
): Promise<any> => {
  const AUTH = `&client_id=${clientId}&client_secret=${clientSecret}&range=${"100mi"}`;
  const GEOIP = `&lat=${coords.latitude}&lon=${coords.longitude}`;

  const SEATGEEK_ENDPOINT = `https://api.seatgeek.com/2/events?performers.slug=${artistSlug}`;
  const API_CALL = SEATGEEK_ENDPOINT + AUTH + GEOIP;

  try {
    const data = await fetch(API_CALL);
    const events = await data.json();
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export function EventLookup({
  clientId,
  clientSecret,
}: {
  clientId: string;
  clientSecret: string;
}) {
  const [lookup, setLookup] = useState(false);
  const [events, setEvents] = useState<any[]>(() => {
    if (testConcert) {
      return [testConcert];
    } else {
      return [];
    }
  }); // TODO type this as SeatGeekEvent[]
  const [error, setError] = useState<string | null>(null);
  // const coords = useGeolocation();
  const coords = {
    latitude: 36.97,
    longitude: -121.99,
  } as GeolocationCoordinates;

  if (error) {
    return <div>{error}</div>;
  }

  if (events.length === 0 && lookup) {
    return (
      <div>
        <h1>Nope, they're not playing...</h1>
      </div>
    );
  }

  const parsedEvents = events.map(parseEvent);

  return lookup ? (
    <div>
      <h1 className="text-4xl font-bold">oh hell yeah, they are!</h1>
      <ul>
        {parsedEvents.map((event) => {
          return (
            <li key={event.id}>
              <p>
                {event.title} are performing at {event.name} in {event.state},{" "}
                {event.country} in {formatDistance(event.date, new Date())}
              </p>
              <a href={event.url} target="_blank" rel="noreferrer">
                Go get tickets!
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <button onClick={() => setLookup(true)} className="border-2">
      Oh man oh boy
    </button>
  );
}

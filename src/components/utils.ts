export const parseEvent = (event: any) => {
  const { id, datetime_utc, short_title, venue, url } = event;
  const { state, name, address, country } = venue;
  return {
    id,
    date: datetime_utc,
    title: short_title,
    state,
    name,
    address,
    country,
    url,
  };
};

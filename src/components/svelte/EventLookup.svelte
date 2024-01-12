<script lang="ts">
    import { onMount } from "svelte";
    import testEvent from '../test-event.json'
    import { parseEvent } from '../utils'
    import { formatDistance } from 'date-fns'

    export let clientId: string;
    export let clientSecret: string;
    let startedLookup = false;
    let coords = {
        latitude: 36.97,
        longitude: -121.99,
    } as GeolocationCoordinates
    let events = [];

    onMount(() => {
        const navigator = window.navigator;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                coords = position.coords;
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    });

    onMount(() => {
        if (!testEvent) {
            getEvents('the-strokes', coords, clientId, clientSecret);
        } else {
            events = [testEvent];
        }
    })

    async function getEvents(
        artistSlug: string,
        coords: GeolocationCoordinates,
        clientId: string,
        clientSecret: string
    ) {
        const AUTH = `&client_id=${clientId}&client_secret=${clientSecret}&range=${"100mi"}`;
        const GEOIP = `&lat=${coords.latitude}&lon=${coords.longitude}`;

        const SEATGEEK_ENDPOINT = `https://api.seatgeek.com/2/events?performers.slug=${artistSlug}`;
        const API_CALL = SEATGEEK_ENDPOINT + AUTH + GEOIP;

        try {
            const data = await fetch(API_CALL);
            events = await data.json();
        } catch (error) {
            events = []
        }
    }
</script>

<div>
    <button on:click={() => startedLookup = true}>Oh man oh boy</button>
</div>

{#if startedLookup}
    <ul>
        {#each events.map(parseEvent) as event (event.id)}
        <li>
            <p>
              {event.title} are performing at {event.name} in {event.state},{" "}
              {event.country} in {formatDistance(event.date, new Date())}
            </p>
            <a href={event.url} target="_blank" rel="noreferrer">
              Go get tickets!
            </a>
        </li>
        {/each}
    </ul>
{/if}
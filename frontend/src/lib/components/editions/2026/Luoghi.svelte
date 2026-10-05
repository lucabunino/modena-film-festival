<script>
    import Title from '$lib/components/Title.svelte';
    import { onMount } from 'svelte';
    import 'leaflet/dist/leaflet.css';

    // current: rendered as the current-edition /luoghi (no year in the title)
    let { current = false } = $props();

    const locations = [
        {
            id: "1",
            title: "Cortile del Leccio e Sala del Leccio",
            address: "via Francesco Selmi 67, 41121 Modena",
            adressHref: "https://maps.app.goo.gl/Ek6N28bWAR6xFGXF6",
            info: "Saremo presenti seguenti giorni e orari: <ul><li>– Martedì 14, mercoledì 15 e giovedì 16 aprile dalle 15 alle 20:30</li><li>– Venerdì 17 e sabato 18 aprile dalle 10 alle 20:30</li><li>– Domenica 19 aprile dalle 10 alle 18</li></ul><br>Qui troverai:<br>✳ Info point, biglietteria<br>✳ Mostra Elevation Tales di Manitou Italia<br>✳ Controllo dell'udito di Ti Ascolto<br>✳ SPOT point",
            position: { lat: 44.64301, lng: 10.92497 }
        },
        {
            id: "2",
            title: "Cinema Astra",
            address: "via Francesco Rismondo 21, 41121 Modena",
            adressHref: "https://maps.app.goo.gl/MZffUFhNX3Lc68oF6",
            info: "✳ Sala Rubino — 145 posti<br>✳ Sala Smeraldo — 173 posti<br>✳ Sala Turchese — 484 posti<br><br>Acquisto in loco e riscatto biglietti (per titolari di abbonamento) a partire da 60 minuti prima della proiezione, con servizio bar offerto da Juta.",
            position: { lat: 44.64751, lng: 10.92581 }
        },
        {
            id: "3",
            title: "Sala Truffaut — 128 posti",
            address: "via degli Adelardi 4, 41121 Modena",
            adressHref: "https://maps.app.goo.gl/aY9Hc8X2cK2BQLyM9",
            info: "Acquisto in loco e riscatto biglietti (per titolari di abbonamento) a partire da 60 minuti prima della proiezione.",
            position: { lat: 44.64561, lng: 10.92163 }
        },
        {
            id: "4",
            title: "Acetaia Giusti",
            address: "Strada delle Quattro Ville 52, 41123 Modena",
            adressHref: "https://maps.app.goo.gl/uLDi2ErcU1NTXQ3B8",
            position: { lat: 44.69044, lng: 10.90069 }
        }
    ];


    // Leaflet + OpenStreetMap tiles (free, no API key; attribution required by the OSM tile usage policy)
    let mapElement;
    let map;
    let markers = {};

    onMount(() => {
        let cancelled = false;
        import('leaflet').then(({ default: L }) => {
            if (cancelled) return;
            map = L.map(mapElement, {
                center: [44.6436, 10.9252],
                zoom: 14,
                scrollWheelZoom: false, // don't hijack page scrolling (like Google's cooperative gestures)
            });
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19,
            }).addTo(map);
            map.attributionControl.setPrefix(false); // drop the "Leaflet" + flag prefix; the OSM credit is the required part

            locations.forEach((loc) => {
                const marker = L.marker([loc.position.lat, loc.position.lng], {
                    icon: L.divIcon({ className: 'map-marker', html: loc.id, iconSize: [36, 36] }),
                    title: loc.title.replace(/<[^>]+>/g, ''),
                }).addTo(map);
                marker.bindPopup(`
                    <div class="map-popup">
                        <p class="wb-21">${loc.title}</p>
                        <a class="wb-12 btn-m bg-linen hover-bg-black" href="${loc.adressHref}" target="_blank" rel="noopener noreferrer">
                            Google Maps ↗
                        </a>
                    </div>
                `, { minWidth: 200, maxWidth: 300, closeButton: false });
                marker.on('click', () => focusLocation(loc));
                markers[loc.id] = marker;
            });
        });
        return () => {
            cancelled = true;
            map?.remove();
        };
    });

    function focusLocation(loc) {
        if (map && markers[loc.id]) {
            map.setView([loc.position.lat, loc.position.lng], 16);
            markers[loc.id].openPopup();
        }
    }
</script>


<main class="bg-pink">
    <Title title={current ? 'I luoghi del Modena <br>Film Festival' : 'I luoghi del Modena <br>Film Festival 2026'} size="m" />
    
    <section id="locations" class="wb-21">
        <div class="locations">
            {#each locations as loc (loc.title)}
                <div class="location wb-18 max-w-500">
                    <h3 class="title wb-28"
                        onclick={() => focusLocation(loc)}
                        role="button"
                        tabindex="0"
                        onkeydown={(e) => e.key === 'Enter' && focusLocation(loc)}
                    >
                        {loc.id}. {@html loc.title}
                    </h3>
                    
                    <h4 class="adress">
                        <a href={loc.adressHref} target="_blank" rel="noopener noreferrer" class="hover-underline">
                            {@html loc.address} ↗
                        </a>
                    </h4>

                    {#if loc.info}
                        <div class="info">{@html loc.info}</div>
                    {/if}
                </div>
            {/each}
        </div>

        <div class="map-container">
            <div class="map rounded-m" bind:this={mapElement}></div>
        </div>
    </section>
</main>

<style lang="scss">
@use '$lib/scss/breakpoints.module' as *;
main {
    row-gap: 0;
    
    #locations {
        grid-column: 1 / span 8;
        padding-top: var(--sp-96);
        display: flex;
        column-gap: var(--margin);

        @media (width <= #{$lg}) {
            padding-top: var(--sp-24);
            flex-direction: column-reverse;
            row-gap: var(--sp-48);
        }

        .locations {
            width: 100%;
        
            .location {
                margin-bottom: var(--sp-30);

                .title {
                    cursor: zoom-in;
                    transition: opacity 0.2s;
                    width: fit-content;
                    &:hover {
                        opacity: 0.6;
                    }
                }
                .adress {
                    margin-top: .3em;
                    a {
                        text-decoration: none;
                        color: inherit;
                        font-weight: normal;
                    }
                }
                .info {
                    margin-top: 1em;
                }
            }
        }

        .map-container {
            width: 100%;
            position: sticky;
            top: var(--margin);
            height: fit-content;

			@media (width <= #{$lg}) {
				position: relative;
			}

            .map {
                width: 100%;
                aspect-ratio: 1;
                background-color: #ddd;
                // keep Leaflet's internal z-indexes (400+) from rising above sidebar, menu, cookie banner
                position: relative;
                z-index: 0;
                isolation: isolate;

                // popups styled like the previous Google info windows (undo Leaflet defaults)
                // .map itself becomes .leaflet-container, so match on it, not inside it
                &:global(.leaflet-container) {
                    font: inherit;
                }
                :global(.leaflet-popup-content-wrapper) {
                    padding: 0;
                    border-radius: 8px;
                }
                :global(.leaflet-popup-content) {
                    margin: 0;
                    font: inherit;
                    line-height: inherit;
                }
                :global(.map-popup) {
                    padding: var(--sp-12) var(--gutter);
                }
                :global(.map-popup p) {
                    margin: 0 0 var(--sp-12);
                }
                :global(a.btn-m) {
                    color: var(--black);
                }
                :global(a.btn-m:hover) {
                    color: var(--white);
                }
                // OSM credit (required by their tile policy): kept, but small and in site type
                :global(.leaflet-control-attribution) {
                    font-size: 1rem; // wb-14
                    letter-spacing: .01em;
                    line-height: 1.2;
                    padding: var(--sp-2) var(--sp-6);
                }
                :global(.leaflet-control-attribution a) {
                    color: var(--black);
                }
                // numbered black circles, like the previous Google markers
                :global(.map-marker) {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background-color: var(--black);
                    color: var(--white);
                    font-size: 16px;
                }

				@media (width <= #{$lg}) {
					max-height: 50vh;
				}
            }
        }
    }
}
</style>
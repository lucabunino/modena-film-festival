<script>
    import HeadSingle from '$lib/components/HeadSingle.svelte';
    import Title from '$lib/components/Title.svelte';
    import { onMount } from 'svelte';
    import { PUBLIC_GOOGLE_API_KEY } from "$env/static/public";

    let { data } = $props();

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

    const seoSingle = { seoTitle: 'Luoghi' };

    let mapElement;
    let map;
    let markers = {};
    let infoWindow;

    onMount(async () => {
        const loader = new Promise((resolve) => {
            if (window.google) return resolve();
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${PUBLIC_GOOGLE_API_KEY}`;
            script.async = true;
            script.onload = resolve;
            document.head.appendChild(script);
        });

        await loader;

        map = new google.maps.Map(mapElement, {
            center: { lat: 44.6436, lng: 10.9252 },
            zoom: 14,
            disableDefaultUI: false
        });

        infoWindow = new google.maps.InfoWindow();

		map.addListener("click", () => {
			infoWindow.close();
		});

        locations.forEach((loc) => {
            const marker = new google.maps.Marker({
                position: loc.position,
                map: map,
                label: {
                    text: loc.id,
                    color: "white",
                    fontFamily: "inherit",
                    fontSize: "16px",
                },
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 18,
                    fillColor: "black",
                    fillOpacity: 1,
                    strokeWeight: 0
                }
            });

            markers[loc.id] = marker;

            marker.addListener("click", () => {
                focusLocation(loc);
            });
        });
    });

    function focusLocation(loc) {
        if (map && markers[loc.id]) {
            map.panTo(loc.position);
            map.setZoom(16);
            
            const content = `
                <div style="padding: 2rem 1rem 1rem; min-width:200px; max-width:300px">
                    <p class="wb-21" style="display:block; margin-bottom: 1em;">${loc.title}</p>
                    <a class="wb-12 btn-m bg-linen hover-bg-black" href="${loc.adressHref}" target="_blank" rel="noopener noreferrer">
                        Google Maps ↗
                    </a>
                </div>
            `;
            infoWindow.setContent(content);
            infoWindow.open(map, markers[loc.id]);
        }
    }
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-pink">
    <Title title='I luoghi del Modena <br>Film Festival 2026' size={'m'} />
    
    <section id="locations" class="wb-21">
        <div class="locations">
            {#each locations as loc}
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
                        <p class="info">{@html loc.info}</p>
                    {/if}
                </div>
            {/each}
        </div>

        <div class="map-container">
            <div class="map rounded-m" bind:this={mapElement}></div>
        </div>
    </section>
</main>

<style>
main {
    row-gap: 0;
    
    #locations {
        grid-column: 1 / span 8;
        padding-top: var(--spacing-m);
        display: flex;
        column-gap: var(--margin);

        @media screen and (max-width: 1080px) {
            padding-top: var(--spacing-xs);
            flex-direction: column-reverse;
            row-gap: var(--spacing-s);
        }

        .locations {
            width: 100%;
        
            .location {
                margin-bottom: 2.5rem;

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

			@media screen and (max-width: 1080px) {
				position: relative;
			}

            .map {
                width: 100%;
                aspect-ratio: 1;
                background-color: #ddd;

				@media screen and (max-width: 1080px) {
					max-height: 50vh;
				}
            }
        }
    }
	:global(.gm-style-iw-chr) {
		display: none !important;
	}
}
</style>
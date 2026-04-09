<script>
  import { onMount } from 'svelte';
  import { PUBLIC_GOOGLE_API_KEY } from "$env/static/public";

  let mapElement;
  let map;

  // Destructure locations from props
  let { locations } = $props();

  onMount(async () => {
    // Load Google Maps API if not already present
    const loader = new Promise((resolve) => {
      if (window.google) return resolve();
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${PUBLIC_GOOGLE_API_KEY}`;
      script.async = true;
      script.onload = resolve;
      document.head.appendChild(script);
    });

    await loader;

    // Initialize Map
    map = new google.maps.Map(mapElement, {
      center: { lat: 44.6436, lng: 10.9252 },
      zoom: 15,
      // Optional: Add styles here to hide default UI if needed
      disableDefaultUI: false 
    });

    // Add only the 4 black circles
    locations.forEach((loc) => {
      new google.maps.Marker({
        position: loc.position,
        map: map,
        label: {
            text: loc.id,
            color: "white",
            fontFamily: "'Waldenburg', 'Helvetica Neue', Arial, sans-serif",
            fontSize: "18px",
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 20,
          fillColor: "black",
          fillOpacity: 1,
          strokeWeight: 0
        }
      });
    });
  });
</script>

<div class="map rounded-m" bind:this={mapElement}></div>

<style>
    .map {
        width: 100%;
        aspect-ratio: 1;
    }
</style>
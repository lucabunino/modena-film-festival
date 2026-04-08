<script>
  import { onMount } from 'svelte';
  import { PUBLIC_GOOGLE_API_KEY } from "$env/static/public";

  let mapElement;
  let map;
  let indicators = [];

  let { locations } = $props();

  function updateEdgeIndicators() {
    const bounds = map.getBounds();
    const projection = map.getProjection();
    if (!bounds || !projection) return;

    indicators.forEach(i => i.setMap(null));
    indicators = [];

    // Define the margin in pixels
    const PADDING = 100;

    // Get the pixel coordinates of the current map corners
    const topRight = projection.fromLatLngToPoint(bounds.getNorthEast());
    const bottomLeft = projection.fromLatLngToPoint(bounds.getSouthWest());
    const scale = Math.pow(2, map.getZoom());

    locations.forEach((loc) => {
      if (!bounds.contains(loc.position)) {
        // Find the target's pixel position
        const targetPoint = projection.fromLatLngToPoint(new google.maps.LatLng(loc.position.lat, loc.position.lng));
        
        // Calculate the "Inner Bounds" in pixels
        const innerMinX = bottomLeft.x + (PADDING / scale);
        const innerMaxX = topRight.x - (PADDING / scale);
        const innerMinY = topRight.y + (PADDING / scale);
        const innerMaxY = bottomLeft.y - (PADDING / scale);

        // Clamp the target position to this inner box
        let edgeX = Math.max(innerMinX, Math.min(innerMaxX, targetPoint.x));
        let edgeY = Math.max(innerMinY, Math.min(innerMaxY, targetPoint.y));

        const edgePoint = projection.fromPointToLatLng(new google.maps.Point(edgeX, edgeY));

        const edgeMarker = new google.maps.Marker({
          position: edgePoint,
          map: map,
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: "#000",
            fillOpacity: 1,
            // Added rotation here
            rotation: getAngle(map.getCenter(), loc.position)
          },
        });
        
        indicators.push(edgeMarker);
      }
    });
  }

  function getEdgePoint(bounds, targetPos) {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    
    let lat = Math.max(sw.lat(), Math.min(ne.lat(), targetPos.lat));
    let lng = Math.max(sw.lng(), Math.min(ne.lng(), targetPos.lng));
    
    return { lat, lng };
  }

  function getAngle(from, to) {
    const dy = to.lat - from.lat();
    const dx = to.lng - from.lng();
    return (Math.atan2(dx, dy) * 180) / Math.PI;
  }

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
      zoom: 15,
    });

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

    map.addListener("bounds_changed", updateEdgeIndicators);
  });
</script>

<div class="map rounded-m" bind:this={mapElement}></div>

<style>
    .map {
        width: 100%;
        aspect-ratio: 1;
    }
</style>
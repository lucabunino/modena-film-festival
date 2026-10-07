// Height of the page's Navigator panel (desktop), for the Alert that stacks below it.
// During a page transition the old and the new page are both mounted: each Navigator keeps its own entry,
// removes only that one when it unmounts, and the newest one wins.
let panels = $state([]);

export function getNavigator() {
	return {
		/** current panel height in px, 0 without a Navigator */
		get height() {
			return panels.at(-1)?.height ?? 0;
		},
		/** attachment for the panel element: keeps its height up to date while mounted */
		track(node) {
			const entry = panels[panels.push({ height: node.offsetHeight }) - 1];
			const ro = new ResizeObserver(() => (entry.height = node.offsetHeight));
			ro.observe(node);
			return () => {
				ro.disconnect();
				panels = panels.filter((panel) => panel !== entry);
			};
		}
	};
}

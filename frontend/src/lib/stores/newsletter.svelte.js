let open = $state(false)

export function getNewsletter() {
	return {
		get open() { return open },
		setOpen(v) { open = v },
	}
}

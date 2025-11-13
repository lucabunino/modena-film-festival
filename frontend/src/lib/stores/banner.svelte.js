let show = $state(false);

export function getBanner() {
	function setShow(b) {
		show = b
	}
	return {
		get show() {
			return show;
		},
		setShow,
	};
}
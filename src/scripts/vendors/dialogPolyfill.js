if (window.HTMLDialogElement === undefined) {
	const dialogs = document.querySelectorAll('dialog');

	dialogs.forEach(async (dialog) => {
		const { default: polyfill } = await import('dialog-polyfill');
		polyfill.registerDialog(dialog);
	});
}

import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useRef } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = (props) => {
	let config = {};
	if (props.fps) config.fps = props.fps;
	if (props.qrbox) config.qrbox = props.qrbox;
	if (props.aspectRatio) config.aspectRatio = props.aspectRatio;
	if (props.disableFlip !== undefined) config.disableFlip = props.disableFlip;
	return config;
};

const Html5QrcodePlugin = (props) => {
	const scannerRef = useRef(null);

	// Initialize the scanner once on mount.
	useEffect(() => {
		const config = createConfig(props);
		if (!props.qrCodeSuccessCallback) {
			throw "qrCodeSuccessCallback is required callback.";
		}
		// Store instance in ref.
		scannerRef.current = new Html5QrcodeScanner(qrcodeRegionId, config, props.verbose);
		scannerRef.current.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

		return () => {
			scannerRef.current.clear().catch(error => {
				console.error("Failed to clear html5QrcodeScanner. ", error);
			});
		};
	}, []);

	// Watch for changes in props.pause to pause/resume scanning.
	useEffect(() => {
		if (scannerRef.current) {
			if (props.pause) {
				scannerRef.current.pause(props.pause);
			} else if (scannerRef.current.getState() === 3) {
				scannerRef.current.resume();
			}
		}
	}, [props.pause, props.qrCodeSuccessCallback, props.qrCodeErrorCallback]);

	return (
		<div id={qrcodeRegionId} />
	);
};

export default Html5QrcodePlugin;

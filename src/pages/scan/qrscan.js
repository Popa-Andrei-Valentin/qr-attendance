import './qrscan.css';
import { useState } from "react";
import Html5QrcodePlugin from "@/components/Html5QrcodeScannerPlugin";
import axios from "axios";

export default function QRScan() {
	// Declare ignoreList.
	const [ignoreList, setIgnoreList] = useState([]);

	// Scan QR code and make endpoint request.
	const onNewScanResult = (decodedText) => {
		console.log(decodedText);
	}

	return <div className='scanner-page'>
		<h1>Scan</h1>
		<div className='scanner-container'>
			<Html5QrcodePlugin
				fps={30}
				qrbox={250}
				disableFlip={false}
				qrCodeSuccessCallback={onNewScanResult}
			/>
		</div>
	</div>
}

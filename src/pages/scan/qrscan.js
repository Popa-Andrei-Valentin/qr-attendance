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

	return <div className='scanner'>
		<Html5QrcodePlugin
			fps={10}
			qrbox={250}
			disableFlip={false}
			qrCodeSuccessCallback={onNewScanResult}
		/>
	</div>
}

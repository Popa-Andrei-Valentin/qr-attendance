import './qrscan.css';
import { useState } from "react";
import Html5QrcodePlugin from "@/components/Html5QrcodeScannerPlugin";
import axios from "axios";

export default function QRScan() {
	// Declare checkedInList.
	const [checkedInList, setCheckedInList] = useState([]);

	// Scan QR code and make endpoint request.
	const onNewScanResult = async (decodedText) => {
		const { row, name } = JSON.parse(decodedText);

		if (row) {
			try {
				// Check if code is already scanned.
				// TODO: Show text with code already scanned
				if (checkedInList.includes((obj) => obj.row === row)) return;

				// Make endpoint request.
				await axios.post('/api/scan', { row });

				// Add row to ignore list.
				setCheckedInList([...checkedInList, { row, name }]);
			} catch (e) {
				console.error(e);
			}
		}
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
			<ul>
				{ checkedInList.map(({ row, name }) => <li key={row}>{name || "Name not found"}: <span>Checked in</span></li>) }
			</ul>
		</div>
	</div>
}

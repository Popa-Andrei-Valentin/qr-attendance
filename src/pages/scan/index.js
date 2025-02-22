import './qrscan.css';
import '../../app/globals.css'
import { useState, useRef, useEffect } from "react";
import Html5QrcodePlugin from "@/components/Html5QrcodeScannerPlugin";
import axios from "axios";

export default function QRScan() {
	// Declare checkedInList.
	const [checkedInList, setCheckedInList] = useState([]);
	const checkedInListRef = useRef(checkedInList);

	useEffect(() => {
		/* Use ref to access the latest version of state in the onNewScanResult callback. */
		checkedInListRef.current = checkedInList;
	}, [checkedInList]);

	// Scan QR code and make endpoint request.
	const onNewScanResult = async (decodedText) => {
		const { row, name } = JSON.parse(decodedText);

		if (row) {
			try {
				// Check if code is already scanned.
				if (checkedInListRef.current.some((obj) => obj.row === row)) {
					throw(`Attendee ${name || `with row: ${row}`} QR code was already scanned !`)
				};

				// Make endpoint request.
				await axios.post('/api/scan', { row });

				// Add row to ignore list.
				setCheckedInList((prevList) => [{ row, name }, ...prevList]);
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
			<ul className='checkedin-list'>
				{ checkedInList.map(({ row, name }) => <li key={row}>{ name || "Name not found" }: <span>Checked in</span></li>) }
			</ul>
		</div>
	</div>
}

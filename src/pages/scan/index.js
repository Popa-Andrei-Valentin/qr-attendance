'use client'
import './qrscan.css';
import '../../app/globals.css'
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Html5QrcodePlugin from "@/components/Html5QrcodeScannerPlugin";
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress';

export default function QRScan() {
	// Declare checkedInList.
	const [checkedInList, setCheckedInList] = useState([]);
	const checkedInListRef = useRef(checkedInList);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		/* Use ref to access the latest version of state in the onNewScanResult callback. */
		checkedInListRef.current = checkedInList;
	}, [checkedInList]);

	// Scan QR code and make endpoint request.
	const onNewScanResult = async (decodedText) => {
			try {
				setIsLoading(true);
				const { row, name } = JSON.parse(decodedText);

				if (row) {
						// Check if code is already scanned.
						if (checkedInListRef.current.some((obj) => obj.row === row)) {
							throw(`Attendee ${name || `with row: ${row}`} QR code was already scanned !`)
						};

						// Make endpoint request.
						await axios.post('/api/scan', { row });

						// Add row to ignore list.
						setCheckedInList((prevList) => [{ row, name }, ...prevList]);

						setIsLoading(false);
				}
		} catch (e) {
			setIsLoading(false);
			console.error(e);
	}}

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
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			open={isLoading}
			autoHideDuration={6000}
			onClose={() => setIsLoading(false)}
			key={'bottom' + 'center'}
		>
			<div className="progress-container">
				<span>Processing QR data...</span>
				<LinearProgress className="progress-bar" color="info"/>
			</div>
		</Snackbar>
	</div>
}

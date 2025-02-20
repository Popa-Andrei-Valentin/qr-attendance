import { useEffect } from "react";
import axios from "axios";

export default function QRScan() {
	useEffect(() => {
		axios.post('/api/scan',{
			row: 3
		})
	}, [])

	return <div>
		<h1>Test</h1>
		<div>test</div>
	</div>
}

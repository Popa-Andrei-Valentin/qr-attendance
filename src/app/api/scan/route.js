import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req, res) {
	try {
		const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets']});

		const sheets = google.sheets({ version: 'v4', auth });
		if (!auth || !sheets) res.status(500).json({ message: 'Authentication failed !' });

		const data = await req.json();
		const range = `Main!C${data.row}`;

		await sheets.spreadsheets.values.update({
			spreadsheetId: process.env.SHEET_ID,
			range,
			valueInputOption: 'USER_ENTERED',
			resource: {
				values: [['Checked-in']]
			}
		});

		return NextResponse.json({
			 message: 'Operation successful'
		})
	} catch (e) {
		return NextResponse.json({
			error: 'Operation failed'
		},
			{ status: 500 })
	}

}

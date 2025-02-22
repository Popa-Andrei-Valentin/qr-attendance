import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req, res) {
	try {
		/**
		 * Create a GoogleAuth client with credentials from environment variables
		 * for easier setup when deploying.
		 */
		const auth = new google.auth.GoogleAuth({
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
			credentials: {
				client_email: process.env.GOOGLE_CLIENT_EMAIL,
				// Replace literal "\n" with actual newlines if necessary
				private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
			},
		});

		// Get the authenticated client
		const client = await auth.getClient();

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

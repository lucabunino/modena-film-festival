import { fail } from '@sveltejs/kit';
import { EMAIL } from "$env/static/private";
import transporter from '$lib/utils/emailSetup.server.js';

// Helper to send email using your existing transporter
async function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) reject(err);
            else resolve(info);
        });
    });
}

export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();
            const name = formData.get('name');
            const surname = formData.get('surname');
            const email = formData.get('email');

            // 1. Basic Validation
            if (!name || !surname || !email) {
                return fail(400, { error: 'Tutti i campi sono obbligatori.' });
            }

            const PRESS_KIT_URL = "https://drive.google.com/drive/folders/1dZekO5ptpjUPTPSF17bFQzhGs8t1_HoR?usp=drive_link";

            const mailToUser = {
                from: EMAIL,
                to: email,
                subject: `MFF2026 | Press Kit`,
                html: `
                    <p>Ciao ${name},</p>
                    <p>Grazie per l'interesse verso il Modena Film Festival 2026.</p>
                    <p>Puoi scaricare il materiale stampa aggiornato al seguente link:<br>
                    <a href="${PRESS_KIT_URL}">${PRESS_KIT_URL}</a></p>
					<p>Per informazioni, non esitare a contattarci! Scrivi una mail a <a href="mailto:info@nevent.it">info@nevent.it</a> o <a href="mailto:info@modenafilmfestival.it">info@modenafilmfestival.it</a></p>
                    <p>A presto,<br>Il team MFF</p>
                `
            };

            const mailInternal = {
                from: EMAIL,
                to: EMAIL,
				cc: ["info@modenafilmfestival.it", "info@nevent.it"],
                subject: `MFF2026 | Nuovo accesso Press Kit: ${name} ${surname}`,
                html: `<p><b>${name} ${surname}</b> (${email}) ha richiesto l'accesso al press kit del Modena Film Festival 2026.</p>`
            };

            await Promise.all([
                sendEmail(mailToUser),
                sendEmail(mailInternal)
            ]);

            // 5. Return the URL so the frontend can redirect
            return { success: true, url: PRESS_KIT_URL };

        } catch (error) {
            console.error('Email action error:', error);
            return fail(500, { error: 'Errore durante l\'invio. Riprova più tardi.' });
        }
    }
};
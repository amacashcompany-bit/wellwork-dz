import { o as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { t as require_nodemailer } from "../_libs/nodemailer.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mailer-DHLAj5Wd.js
var import_nodemailer = /* @__PURE__ */ __toESM(require_nodemailer());
var sendAccessTokenEmail_createServerFn_handler = createServerRpc({
	id: "70743b5a81bdb43c5c6d916e58432ad6e3f0267aed24d3d4d3d51e03d3924267",
	name: "sendAccessTokenEmail",
	filename: "src/lib/mailer.ts"
}, (opts) => sendAccessTokenEmail.__executeServer(opts));
var sendAccessTokenEmail = createServerFn({ method: "POST" }).validator((data) => data).handler(sendAccessTokenEmail_createServerFn_handler, async ({ data }) => {
	const { email, companyName, token } = data;
	const user = process.env.VITE_GMAIL_USER || process.env.GMAIL_USER;
	const pass = process.env.VITE_GMAIL_PASS || process.env.GMAIL_PASS;
	if (!user || !pass) throw new Error("Gmail credentials are not configured in environment variables.");
	const transporter = import_nodemailer.default.createTransport({
		service: "gmail",
		auth: {
			user,
			pass
		}
	});
	const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #10B981;">Bienvenue sur WellWork</h1>
        </div>
        
        <p>Bonjour l'équipe <strong>${companyName}</strong>,</p>
        <p>Nous sommes ravis de vous accueillir ! Votre demande de démo a été approuvée par notre équipe.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
          <p style="margin-top: 0; color: #6b7280; font-size: 14px;">Voici votre code d'accès unique :</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #111827; margin: 10px 0;">
            ${token}
          </p>
        </div>

        <p>Pour commencer, veuillez utiliser ce code d'accès lors de la création de votre compte sur notre plateforme.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://wellwork.site/auth" style="background-color: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Accéder à la plateforme
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          Ceci est un message automatique de WellWork. Veuillez ne pas répondre à cet email.<br />
          Si vous avez des questions, contactez notre support technique.
        </p>
      </div>
    `;
	const textBody = `
Bonjour l'équipe ${companyName},

Nous sommes ravis de vous accueillir ! Votre demande de démo a été approuvée par notre équipe.
Voici votre code d'accès unique : ${token}

Veuillez utiliser ce code lors de la création de votre compte sur notre plateforme.

Ceci est un message automatique de WellWork.
`;
	try {
		await transporter.sendMail({
			from: "\"Equipe WellWork\" <" + user + ">",
			to: email,
			replyTo: user,
			subject: "Vos identifiants d'accès WellWork",
			text: textBody,
			html: htmlBody
		});
		return { success: true };
	} catch (error) {
		console.error("Error sending email:", error);
		throw new Error("Failed to send email");
	}
});
//#endregion
export { sendAccessTokenEmail_createServerFn_handler };

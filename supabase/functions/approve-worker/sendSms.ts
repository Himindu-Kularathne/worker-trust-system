export async function sendApprovalSms(phone: string, name: string) {
  const body = new URLSearchParams({
    From: Deno.env.get("TWILIO_PHONE")!,
    To: phone,
    Body: `✅ Hi ${name}, your Worker Trust account has been approved.
Please open the app and log in using your phone number.
Tap here to log in:
workertrust://login?approved=true`,
  });

  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${Deno.env.get("TWILIO_ACCOUNT_SID")}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${Deno.env.get("TWILIO_ACCOUNT_SID")}:${Deno.env.get("TWILIO_AUTH_TOKEN")}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
}

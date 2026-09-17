const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
}

function json(data: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return json({ message: 'Method not allowed' }, 405);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    console.error('Contact endpoint is missing email configuration.');
    return json({ message: 'Contact service is not configured.' }, 500);
  }

  let payload: ContactPayload;
  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return json({ message: 'Invalid request body.' }, 400);
  }

  // Silently accept honeypot submissions without sending mail.
  if (typeof payload.website === 'string' && payload.website.trim()) {
    return json({ success: true });
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const subject = typeof payload.subject === 'string' ? payload.subject.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || !email || !message || !emailPattern.test(email)) {
    return json({ message: 'Please provide a valid name, email, and message.' }, 400);
  }

  if (name.length > 120 || email.length > 254 || subject.length > 200 || message.length > 5000) {
    return json({ message: 'One or more fields are too long.' }, 400);
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: email,
      subject: subject || `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!resendResponse.ok) {
    console.error('Resend rejected contact email:', await resendResponse.text());
    return json({ message: 'Unable to send your message right now.' }, 502);
  }

  return json({ success: true });
}
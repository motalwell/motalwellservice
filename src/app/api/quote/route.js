import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const MAX_FIELD_LENGTHS = {
  name: 120,
  phone: 40,
  email: 254,
  location: 200,
  service: 160,
  message: 5000,
};

function cleanText(value, maxLength) {
  return String(value ?? '').trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizePhone(value) {
  let digits = String(value ?? '').replace(/\D/g, '');

  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }

  if (digits.length !== 10) {
    return null;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function displayValue(value) {
  return value || 'Not provided';
}

function buildHtmlEmail(fields) {
  const rows = [
    ['Name', fields.name],
    ['Phone', fields.phone],
    ['Email', fields.email],
    ['Property Location', fields.location],
    ['Service Needed', fields.service],
    ['Project Details', fields.message],
  ];

  const rowHtml = rows
    .map(([label, value]) => `
      <tr>
        <td style="padding:12px 14px;border-bottom:1px solid #e3e8ed;width:170px;font-weight:700;color:#0b2b43;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:12px 14px;border-bottom:1px solid #e3e8ed;color:#273746;white-space:pre-wrap;">${escapeHtml(displayValue(value))}</td>
      </tr>`)
    .join('');

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#273746;">
    <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #dfe5ea;">
      <div style="padding:22px 24px;background:#0b2b43;color:#ffffff;border-bottom:4px solid #df6415;">
        <div style="font-size:22px;font-weight:700;letter-spacing:.5px;">New Quote Request</div>
        <div style="margin-top:5px;font-size:14px;opacity:.9;">Motal Well Services website</div>
      </div>
      <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;">
        ${rowHtml}
      </table>
      <div style="padding:16px 24px;font-size:12px;color:#6d7b86;">
        This request was submitted through the Motal Well Services website.
      </div>
    </div>
  </body>
</html>`;
}

function buildTextEmail(fields) {
  return [
    'NEW QUOTE REQUEST',
    '',
    `Name: ${displayValue(fields.name)}`,
    `Phone: ${displayValue(fields.phone)}`,
    `Email: ${displayValue(fields.email)}`,
    `Property Location: ${displayValue(fields.location)}`,
    `Service Needed: ${displayValue(fields.service)}`,
    '',
    'Project Details:',
    displayValue(fields.message),
  ].join('\n');
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot: legitimate visitors never see or fill this field.
    if (cleanText(body.website, 200)) {
      return Response.json({ success: true });
    }

    const fields = {
      name: cleanText(body.name, MAX_FIELD_LENGTHS.name),
      phone: cleanText(body.phone, MAX_FIELD_LENGTHS.phone),
      email: cleanText(body.email, MAX_FIELD_LENGTHS.email),
      location: cleanText(body.location, MAX_FIELD_LENGTHS.location),
      service: cleanText(body.service, MAX_FIELD_LENGTHS.service),
      message: cleanText(body.message, MAX_FIELD_LENGTHS.message),
    };

    if (!fields.name || !fields.phone) {
      return Response.json(
        { error: 'Name and phone number are required.' },
        { status: 400 }
      );
    }

    const formattedPhone = normalizePhone(fields.phone);
    if (!formattedPhone) {
      return Response.json(
        { error: 'Please enter a valid 10-digit phone number.' },
        { status: 400 }
      );
    }
    fields.phone = formattedPhone;

    if (fields.email && !isValidEmail(fields.email)) {
      return Response.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const quoteRecipient = process.env.QUOTE_RECIPIENT;

    if (!smtpHost || !smtpUser || !smtpPassword || !quoteRecipient) {
      console.error('Quote email configuration is incomplete.');
      return Response.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 30000,
    });

    await transporter.sendMail({
      from: `Motal Well Services <${smtpUser}>`,
      to: quoteRecipient,
      replyTo: fields.email || undefined,
      subject: `New quote request from ${fields.name}`,
      text: buildTextEmail(fields),
      html: buildHtmlEmail(fields),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Quote email error:', error);
    return Response.json(
      { error: 'Unable to send the quote request.' },
      { status: 500 }
    );
  }
}

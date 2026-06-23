import emailConfig from '@/config/email.json';

interface SendEmailParams {
  from_name: string;
  from_email: string;
  message: string;
}

interface SendEmailResult {
  success: boolean;
  error?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const endpoint = emailConfig.formspreeEndpoint;

  if (!endpoint) {
    return { success: false, error: 'Email service not configured.' };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: params.from_name,
        email: params.from_email,
        message: params.message,
      }),
    });

    if (response.ok) {
      return { success: true };
    }

    const data = await response.json();
    return { success: false, error: data?.error || `Server responded with ${response.status}` };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error sending email';
    return { success: false, error: message };
  }
}

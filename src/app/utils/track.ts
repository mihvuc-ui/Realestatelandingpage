import { projectId, publicAnonKey } from '@/utils/supabase/info';

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-091aad8a`;

async function post(path: string, body: unknown): Promise<void> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`Track POST ${path} nije uspeo: ${res.status} ${await res.text()}`);
    }
  } catch (err) {
    // Fire-and-forget: ne prekidaj UI ako beleženje ne uspe
    console.error(`Greška pri slanju ${path} na server: ${err}`);
  }
}

// Statistika korišćenja
export function trackEvent(event: string, extra?: Record<string, unknown>): void {
  void post('/analytics/track', { event, ...extra });
}

// Ostavljen kontakt (lead)
export function reportLead(lead: Record<string, unknown>): void {
  void post('/leads', lead);
}

// Rezervacija gledanja
export function reportBooking(booking: Record<string, unknown>): void {
  void post('/bookings', booking);
}

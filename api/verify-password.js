export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const password = body && body.password;
  const correctPassword = process.env.BOSS_TIMER_PASSWORD;

  if (!correctPassword) {
    // ENV missing
    res.status(500).json({ ok: false, error: 'Server misconfigured' });
    return;
  }

  if (typeof password === 'string' && password === correctPassword) {
    res.status(200).json({ ok: true });
  } else {
    res.status(401).json({ ok: false, error: 'Wrong password' });
  }
}

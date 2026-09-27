export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ 
      success: false, 
      error: "Missing query parameter. Use: ?query=7045096058" 
    });
  }

  try {
    // Old API call
    const oldUrl = `https://tg-to-info.asurpapa.workers.dev/api?key=1&query=${encodeURIComponent(query)}`;
    const response = await fetch(oldUrl);
    let data = await response.json();

    // 🔥 SIRF BRANDING CHANGE — baaki sab same
    data.credit = {
      name: "NITIN DEVELOPER",
      developer: "@FizzaGirl",
      contact: "https://t.me/BUILDAPIS",
      footer: "Powered by FizzaGirl"
    };

    // Agar kahin aur bhi branding ho toh
    if (data.developer) data.developer = "@FizzaGirl";
    if (data.credits) data.credits = "@FizzaGirl";

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: "Upstream API failed" 
    });
  }
         }

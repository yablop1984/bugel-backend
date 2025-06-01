export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");  // <- Esta línea es clave
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') {
    return res.status(200).end();  // Respuesta al preflight
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Solo se permiten solicitudes POST');
  }

  try {
    const respuesta = await fetch("https://script.google.com/macros/s/AKfycbx5AxtL_....", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const texto = await respuesta.text();
    res.status(200).send(texto);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al reenviar al Apps Script');
  }
}

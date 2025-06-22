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
    const respuesta = await fetch("https://script.google.com/macros/s/AKfycbx5AxtL_nSmCZjs2bQXTA_bHj9mF9pN2OAjc5cFBL5qhJWg1fCPyJYo4ba5cmrvsXy9qA/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: req.body.nombre,
        proyecto: req.body.proyecto,
        producto: req.body.producto,
        parte: req.body.parte,
        ruta: req.body.ruta,
        maquina: req.body.maquina,
        proceso: req.body.proceso,
        piezas: req.body.piezas,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin
      }),
    });

    const texto = await respuesta.text();
    res.status(200).send(texto);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al reenviar al Apps Script');
  }
}

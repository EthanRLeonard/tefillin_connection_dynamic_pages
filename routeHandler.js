const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/tefillin/:id', (req, res) => {
    // In a real application, you would fetch these parameters from a database using req.params.id
    const data = {
        tefillinId: req.params.id,
        sofer: {
            name: "Yehuda F.",
            location: "Beit Shemesh, Israel",
            description: "Yehuda is an experienced sofer with 15 years in the field...",
            image: "https://tefillinconnection.org/wp-content/uploads/2026/02/יהודה-פינקלשטיין-150x150.png"
        },
        info: {
            lastChecked: "1/19/2026",
            ktav: "Arizal",
            hand: "Left",
            battim: "Gassos"
        },
        materials: {
            klaf: { company: "Neparstack", hechsher: "Bedatz Eida HaChradus" },
            battim: { company: "Fedder", hechsher: "Rabbi Klein" },
            retzuos: { company: "Malchut Dovid", hechsher: "Bedatz Beis Yosef & European Kosher" },
            giddim: { hechsher: "Bedatz Eida HaChradus" }
        },
        timeline: [
            { date: "January 19, 2026", event: "Final Check, Close & Seal" },
            { date: "January 8, 2026", event: "" },
            { date: "December 25, 2025", event: "Writing Complete" }
        ]
    };

    let headContent = '';
    try {
        headContent = fs.readFileSync(path.join(__dirname, '../head.txt'), 'utf8');
    } catch (e) {
        console.error("Could not read head.txt");
    }

    // Return the HTML with dynamic parameters
    const html = `
<!DOCTYPE html>
<html lang="en">
${headContent}
<body class="wp-singular page-template-default page page-id-822 wp-embed-responsive wp-theme-spectra-one give-test-mode give-page">
    <div class="wp-site-blocks">
        <header class="wp-block-template-part">
            <!-- Header content... -->
        </header>
        
        <div class="wp-block-group swt-block-page-banner-group...">
            <h1 style="...">Tefillin ID: ${data.tefillinId}</h1>
        </div>
        
        <div class="sofer-info">
            <h3>Your Sofer</h3>
            <img src="${data.sofer.image}" alt="${data.sofer.name}">
            <h4>${data.sofer.name}</h4>
            <span>${data.sofer.location}</span>
            <p>${data.sofer.description}</p>
        </div>

        <div class="basic-info">
            <p>Last Checked: <strong>${data.info.lastChecked}</strong><br>
            Ktav: <strong>${data.info.ktav}</strong><br>
            Hand: <strong>${data.info.hand}</strong><br>
            Battim: <strong>${data.info.battim}</strong></p>
        </div>
        
        <footer class="wp-block-template-part">
            <!-- Footer content... -->
        </footer>
    </div>
</body>
</html>
    `;
    
    // NOTE: This should ideally use a templating engine like EJS, Pug, or Handlebars for the full HTML
    res.send(html);
});

module.exports = router;

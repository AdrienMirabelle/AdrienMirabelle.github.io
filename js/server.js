const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route pour le formulaire
app.post('/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Configurer Nodemailer pour envoyer un email
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Utilise le service de ton choix (ex: Outlook)
        auth: {
            user: 'tonemail@gmail.com', // Remplace par ton email
            pass: 'tonpassword'         // Mot de passe ou App Password
        }
    });

    const mailOptions = {
        from: email,
        to: 'tonemail@gmail.com',
        subject: 'Nouveau message depuis le formulaire',
        text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur : message non envoyé.');
        } else {
            console.log('Message envoyé : ' + info.response);
            res.status(200).send('Merci pour votre message, je vous répondrai bientôt !');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});

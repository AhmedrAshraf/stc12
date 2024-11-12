import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, body, text } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: { user: "bbanksmit@gmail.com", pass: "" },
    });

    let mailDetail = { from: "bbanksmit@gmail.com", to, body, text };

    try{

      await transporter.sendMail(mailDetail);
      res.status(200).json({message: 'Email sent successfully'})
    } catch (error) {
      res.status(500).json({message: 'Error sending email:' + error.message})
    }
  } else {
    res.setHeader('Allow' , ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
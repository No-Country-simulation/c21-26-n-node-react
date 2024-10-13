import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Usar el host SMTP adecuado
      port: 465,
      secure: true, // true para 465, false para otros puertos
      auth: {
        user: process.env.ADMIN_EMAIL, // tu correo electrónico
        pass: process.env.ADMIN_PASS, // tu contraseña o app password
      },
    });
  }

  async sendRecoveryEmail(to: string, code: string) {
    const mailOptions = {
      from: '"Nombre del Remitente" <tu_correo@gmail.com>',
      to,
      subject: 'Recuperación de contraseña',
      text: `Tu código de recuperación es: ${code}`,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configuração do transportador de e-mail (Gmail)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Definido como 'false' porque vamos usar STARTTLS
  auth: {
    user: process.env.GMAIL_USER, // E-mail do Gmail
    pass: process.env.GMAIL_PASS, // Senha de Aplicativo
  },
  logger: true, // Habilita logs
  debug: true, // Habilita debug
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, nome, celular, cidade, mensagem } = body;

    // Configuração do e-mail
    const EmailProjeto = {
      from: `"Projeto Mais Vida" <${process.env.GMAIL_USER}>`, // Nome e e-mail do remetente (deve ser o GMAIL_USER)
      to: process.env.GMAIL_USER, // E-mail do destinatário (administrador), deve ser o GMAIL_USER ou outro e-mail configurado
      subject: `Um novo Contato`, // Assunto do e-mail
      text: `Recebemos um novo contato de ${nome} em nosso site.

        ---------------------------------------------------------
        Nome: ${nome}
        Celular de Contato: ${celular}
        E-mail: ${email}
        Cidade: ${cidade}
        Mensagem: ${mensagem}
        
        ---------------------------------------------------------
        
        📅 **Data e Hora do novo Contato:** ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}  
        
        Atenciosamente,
        Equipe Projeto Mais Vida`,
    };

    // Enviar o e-mail
    await transporter.sendMail(EmailProjeto);

    return NextResponse.json({ message: "Formulário enviado com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao processar contato:", error);
    return NextResponse.json({ message: "Erro ao processar contato." }, { status: 500 });
  }
}

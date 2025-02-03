// app/api/Acampa1ServosCarnaval2025/route.ts

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.HOSTINGER_USER,
    pass: process.env.HOSTINGER_PASS,
  },
  logger: true,
  debug: true,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      comprovante,
      nomeCompleto,
      dataNascimento,
      telefoneContato,
      contatoEmergencia,
      telefoneContatoEmergencia,
      rg,
      cpf,
      paroquia,
      conhecido,
      portadorDoenca,
      doencas,
      aptidoAtividades,
      alergias,
      alergiasDetalhe,
      medicacao,
      medicamentos,
      restricaoAlimentar,
      restricaoAlimentarDetalhe,
      planoSaude,
      operadoraPlano,
      numeroInscricaoPlano,
      responsabilidade,
      autorizacaoImagem,
    } = body;

    const NovaInscricao = await prisma.acampa1ServosCarnaval2025.create({
      data: body,
    });

      // Enviar e-mail para notificar o pedido de inscrição
      const EmailProjeto = {
        from: `"Projeto Mais Vida" <${process.env.HOSTINGER_USER}>`, // Nome e e-mail do remetente
        to: process.env.HOSTINGER_USER, // E-mail do destinatário (pode ser o mesmo ou um administrador)
        subject: `Nova Inscrição de um servo ${NovaInscricao.id}`, // Assunto do e-mail
        text: `Recebemos uma nova inscrição de ${nomeCompleto} em nosso site.
  
          ---------------------------------------------------------
          ID do Pedido: ${NovaInscricao.id}
          Nome: ${nomeCompleto}
          Telefone de Contato: ${telefoneContato}
          E-mail: ${email}
          Comprovante: ${comprovante}
          RG: ${rg}
          CPF: ${cpf}
          Paróquia: ${paroquia}
          Conhecido: ${conhecido}
          Portador de Doença: ${portadorDoenca}
          Doenças: ${doencas}
          Aptidão para Atividades: ${aptidoAtividades}
          Alergias: ${alergias}
          Detalhes de Alergias: ${alergiasDetalhe}
          Medicação: ${medicacao}
          Medicamentos: ${medicamentos}
          Restrição Alimentar: ${restricaoAlimentar}
          Detalhes da Restrição Alimentar: ${restricaoAlimentarDetalhe}
          Plano de Saúde: ${planoSaude}
          Operadora do Plano: ${operadoraPlano}
          Número de Inscrição do Plano: ${numeroInscricaoPlano}
          Responsabilidade: ${responsabilidade}
          Autorização de Imagem: ${autorizacaoImagem}
          ---------------------------------------------------------
          
          📅 **Data e Hora da Inscrição:** ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}  

          
          Atenciosamente,
          Equipe Projeto Mais Vida`,
      };

      // Enviar o e-mail
      await transporter.sendMail(EmailProjeto);

      const EmailProjetoRetorno = {
        from: `"Projeto Mais Vida" <${process.env.HOSTINGER_USER}>`, // Nome e e-mail do remetente
        to: email, // E-mail do destinatário
        subject: `Ficha de Inscrição Servo - Carnaval 2025 | 1 à 4/03/25`, // Assunto do e-mail
        text: `Bem vindo ao Projeto Mais Vida!
      
      Sua inscrição para o Acampamento de Carnaval foi recebida!

      Em breve você receberá em seu WhatsApp a confirmação da sua inscrição.

      Durante o acampamento, você participará de dinâmicas e atividades enriquecedoras, e para isso, pedimos atenção às **instruções gerais**:

      Caso tenha alguma dúvida entrar em contato com a Renata pelo WhatsApp do Projeto Mais Vida 44 99137-2331

      É muito importane que você salve o nosso número em seu celular, pois enviaremos algumas informações via lista de transmissão.
            
      📅 **Datas Importantes**
      - *Início:* 01 de março de 2025 (Sábado)  
      - *Retorno:* 04 de março de 2025 (Terça-feira)  
      - *Local de saída:* Estacionamento dos fundos da Catedral 
      
      🧳 **Materiais Necessários**  
      - Bíblia Sagrada  
      - Lanterna  
      - Repelente  
      - Protetor solar  
      - Materiais de higiene pessoal  
      - Roupa de cama, travesseiro e cobertor  
      - Capa de chuva  
      - Garrafinha d'água  
      - Boné  
      - Sacos plásticos  
      - Sapatos confortáveis e fechados (tênis, bota, galocha...)  
      - Roupas de frio e roupas discretas  
      - Roupas de guerra (para atividades intensas)  
      - Protetor auricular (à venda em lojas de equipamentos de proteção individual)  
      
      ---
      
      📝 **Informações da Inscrição**  
      - Nome Completo: ${nomeCompleto}  
      - Data de Nascimento: ${new Date(dataNascimento).toLocaleDateString("pt-BR")}  
      - Paróquia: ${paroquia}  
      - Conhecido: ${conhecido}  
      
      📞 **Contato**  
      - Telefone: ${telefoneContato}  
      - E-mail: ${email}  
      
      👨‍⚕️ **Emergência**  
      - Contato: ${contatoEmergencia}  
      - Telefone: ${telefoneContatoEmergencia}  
      
      🔍 **Saúde**  
      - Portador de Doença: ${portadorDoenca}  
      - Doenças: ${doencas}
      - Alergias: ${alergias}  
      - Detalhes: ${alergiasDetalhe}  
      - Medicação: ${medicacao}  
      - Medicamentos: ${medicamentos}
      - Restrição Alimentar: ${restricaoAlimentar}  
      - Detalhes Restrição: ${restricaoAlimentarDetalhe}  
      - Plano de Saúde: ${planoSaude}  
      - Operadora: ${operadoraPlano}
      - Nº do Plano: ${numeroInscricaoPlano}
      - Responsabilidade: ${responsabilidade}
      - Autorização de Imagem: ${autorizacaoImagem}
      
      ---
      
  📅 **Data e Hora da Inscrição:** ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}  
      
      Sua inscrição será confirmada pelo e-mail ou WhatsApp em poucos dias. Caso tenha alguma dúvida, entre em contato conosco pelo telefone *(44) 99137-2331*.

      Agradecemos por sua inscrição!  
      
      Atenciosamente,  
      Equipe Projeto Mais Vida`,
      };

      // Enviar o e-mail
      await transporter.sendMail(EmailProjetoRetorno);

    return NextResponse.json(NovaInscricao, { status: 200 });
  } catch (error) {
    console.error("Erro ao processar inscrição:", error);
    return NextResponse.json({ message: "Erro ao processar inscrição." }, { status: 500 });
  }
}

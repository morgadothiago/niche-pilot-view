import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-contact-email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, subject, message }: ContactRequest = await req.json();

    console.log("Received contact form submission:", { name, email, company, subject });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios não preenchidos" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send notification email to the team
    const notificationResponse = await resend.emails.send({
      from: "AgentChat <onboarding@resend.dev>",
      to: ["contato@agentchat.com"], // Replace with your actual email
      reply_to: email,
      subject: `[Contato] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Nova mensagem de contato</h2>
          
          <div style="background-color: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ""}
            <p><strong>Assunto:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; border: 1px solid #e4e4e7; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0;">Mensagem:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #71717a; font-size: 12px; margin-top: 20px;">
            Este email foi enviado através do formulário de contato do AgentChat.
          </p>
        </div>
      `,
    });

    console.log("Notification email sent:", notificationResponse);

    // Send confirmation email to the user
    const confirmationResponse = await resend.emails.send({
      from: "AgentChat <onboarding@resend.dev>",
      to: [email],
      subject: "Recebemos sua mensagem - AgentChat",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 30px 0;">
            <h1 style="color: #6366f1; margin: 0;">AgentChat</h1>
            <p style="color: #71717a;">Plataforma de Agentes de IA</p>
          </div>
          
          <h2>Olá, ${name}!</h2>
          
          <p>Obrigado por entrar em contato conosco. Recebemos sua mensagem e nossa equipe irá analisá-la em breve.</p>
          
          <div style="background-color: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Assunto:</strong> ${subject}</p>
          </div>
          
          <p>Normalmente respondemos em até 24 horas úteis. Se sua solicitação for urgente, você pode nos contatar diretamente pelo telefone +55 (11) 99999-9999.</p>
          
          <p>Atenciosamente,<br><strong>Equipe AgentChat</strong></p>
          
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 30px 0;">
          
          <p style="color: #71717a; font-size: 12px;">
            Este é um email automático. Por favor, não responda diretamente a esta mensagem.
          </p>
        </div>
      `,
    });

    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails enviados com sucesso" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erro ao enviar email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

import {
   Body,
   Button,
   Container,
   Head,
   Html,
   Img,
   Link,
   Preview,
   Section,
   Text,
} from "@react-email/components";
import * as React from "react";

interface Props {
   name?: string;
   otpCode: string;
}

const baseUrl = process.env.NEXT_PUBLIC_URL
   ? `https://${process.env.NEXT_PUBLIC_URL}`
   : "";

export const ResetPasswordEmail = ({ name, otpCode, }: Props) => {
   return (
      <Html>
         <Head />
         <Preview>Dropbox resetar a tua palavra-passe</Preview>
         <Body style={main}>
            <Container style={container}>
               <Img
                  src={`${baseUrl}/static/dropbox-logo.png`}
                  width="40"
                  height="33"
                  alt="Dropbox"
               />
               <Section>
                  <Text style={text}>Hi {name},</Text>
                  <Text style={text}>
                     Alguém solicitou recentemente uma alteração de senha para sua conta Dropbox
                     . Se foi você, você pode definir uma nova senha:
                     copia o codigo:
                  </Text>
                  <Text style={code}>{otpCode}</Text>
                  <Button style={button} href={`${baseUrl}/login?recover`}>
                     Resetar a palavra-passe
                  </Button>
                  <Text style={text}>
                     Se você não quiser alterar sua senha ou não
                     solicitou isso, simplesmente ignore e apague esta mensagem.
                  </Text>
                  <Text style={text}>
                     Para manter sua conta segura, não encaminhe este e-mail
                     para ninguém. Veja nossa Central de Ajuda para{" "}
                     <Link style={anchor} href="https://dropbox.com">
                        mais dicas de segurança.
                     </Link>
                  </Text>
                  <Text style={text}>Feliz Comprar!</Text>
               </Section>
            </Container>
         </Body>
      </Html>
   );
};

ResetPasswordEmail.PreviewProps = {
   user: "Alan",
   otpCode: "",
} as Props;

export default ResetPasswordEmail;

const main = {
   backgroundColor: "#f6f9fc",
   padding: "10px 0",
};

const container = {
   backgroundColor: "#ffffff",
   border: "1px solid #f0f0f0",
   padding: "45px",
};

const text = {
   fontSize: "16px",
   fontFamily:
      "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
   fontWeight: "300",
   color: "#404040",
   lineHeight: "26px",
};

const code = {
   fontSize: "24px",
   fontWeight: "bold",
   color: "#007ee6",
   lineHeight: "26px",
   marginBottom: "20px",
   marginTop: "20px",
   textAlign: "center" as const,
   display: "block",
}

const button = {
   backgroundColor: "#007ee6",
   borderRadius: "4px",
   color: "#fff",
   fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
   fontSize: "15px",
   textDecoration: "none",
   textAlign: "center" as const,
   display: "block",
   width: "210px",
   padding: "14px 7px",
};

const anchor = {
   textDecoration: "underline",
};

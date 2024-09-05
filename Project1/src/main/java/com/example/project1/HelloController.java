package com.example.project1;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import net.synedra.validatorfx.Validator;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Objects;
import java.util.Properties;

public class HelloController {
    @FXML
    public TextField Text;
    @FXML
    private Label welcomeText;

    @FXML
    protected void onHelloButtonClick() {

        welcomeText.setText("Welcome to JavaFX Application!");
        Validator validator = new Validator();
        validator.createCheck()
                .dependsOn("input",Text.textProperty())
                .withMethod(c -> {
                    String input = c.get("input");
                    if (input == null || input.trim().isEmpty()){
                        c.error("Field Empty");
                    }
                })
                .decorates(Text)
                .immediate();
        sendMail("6251071045@st.utc2.edu.vn","Test Project01 Send Email","Test: " + Text.getText());
        welcomeText.setText("Send Mail Successfully");
    }
    private static void sendMail(String email, String header, String body){
        Properties prop = new Properties();
        prop.put("mail.smtp.auth","true");
        prop.put("mail.smtp.starttls.enable","true");
        prop.put("mail.smtp.host","smtp.gmail.com");
        prop.put("mail.smtp.port","587");

        String Sender = "giakhang111103@gmail.com";
        String pass_sender = "bpcj jgdy ffrl qmfj";

        Session session = Session.getInstance(prop, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(Sender, pass_sender);
            }
        });
        try{
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(Sender));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
            message.setSubject(header);
            message.setText(body);
            Transport.send(message);

        }catch (MessagingException e){
            throw new RuntimeException(e);
        }
    }
}
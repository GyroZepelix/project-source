package hr.dgjalic.service.tables.messagesByChat;

import hr.dgjalic.service.services.AuthTokenConverter;
import hr.dgjalic.service.user_defined_types.UserKey;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class MessagesServices {

    private final MessagesRepository messagesRepository;
    private final AuthTokenConverter authTokenConverter;

    public Iterable<Message> getAllMessagesByChatId(String chatId) {
        return messagesRepository.findAllByChatId(chatId);
    }

    public Iterable<Message> getAllMessages() {
        return messagesRepository.findAll();
    }

    public Message createMessages(String messageContent, String chatId, String authToken) {
        String senderEmail = authTokenConverter.getEmailFromToken(authToken);
        Message message = Message.builder()
                .content(messageContent)
                .messageTime(new Timestamp(System.currentTimeMillis()))
                .chatId(chatId)
                .senderEmail(senderEmail)
                .senderIconPath("https://static.posters.cz/image/1300/platno-the-witcher-stare-i115629.jpg")
                .senderUserKey(UserKey.builder()
                        .username(senderEmail.split("@")[0])
                        .tag(3125)
                        .build())
                .build();

        messagesRepository.save(message);
        return message;
    }

    public void purgeMessages(String chatId) {
        messagesRepository.deleteAllByChatId(chatId);
    }
}

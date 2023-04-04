package hr.dgjalic.service.tables.messagesByChat;

import hr.dgjalic.service.services.AuthTokenConverter;
import hr.dgjalic.service.tables.userByEmail.User;
import hr.dgjalic.service.tables.userByEmail.UserService;
import hr.dgjalic.service.user_defined_types.UserKey;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class MessagesServices {

    private final MessagesRepository messagesRepository;
    private final UserService userService;
    private final AuthTokenConverter authTokenConverter;

    public Iterable<Message> getAllMessagesByChatId(String chatId) {
        return messagesRepository.findAllByChatId(chatId);
    }

    public Iterable<Message> getAllMessages() {
        return messagesRepository.findAll();
    }

    public Message createMessages(String messageContent, String chatId, String authToken) {
        User sender = userService.getUser(authToken).orElseThrow(() -> new RuntimeException("User not found"));
        Message message = Message.builder()
                .content(messageContent)
                .messageTime(new Timestamp(System.currentTimeMillis()))
                .chatId(chatId)
                .senderEmail(sender.getEmail())
                .senderIconPath(sender.getImagePath())
                .senderUserKey(sender.getUserKey())
                .build();

        messagesRepository.save(message);
        return message;
    }

    public void purgeMessages(String chatId) {
        messagesRepository.deleteAllByChatId(chatId);
    }
}

package hr.dgjalic.service.tables.messagesByChat;

import hr.dgjalic.service.services.AuthTokenConverter;
import hr.dgjalic.service.tables.userByEmail.User;
import hr.dgjalic.service.tables.userByEmail.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessagesServices {

    private final MessagesRepository messagesRepository;
    private final UserService userService;

    public ArrayList<MessageJointWithUser> getAllMessagesJointWithUserByChatId(UUID chatId) {
        ArrayList<MessageJointWithUser> messages = new ArrayList<>();
        messagesRepository.findAllByChatId(chatId).forEach(message -> {
                    User sender = userService.getUserByEmail(message.getSenderEmail()).orElseThrow(
                            () -> new RuntimeException("User not found"));
                    MessageJointWithUser messageJointWithUser = MessageJointWithUser.builder()
                            .message(message)
                            .sender(sender)
                            .build();
                    messages.add(messageJointWithUser);
                }
        );
        return messages;
    }

    public Iterable<Message> getAllMessages() {
        return messagesRepository.findAll();
    }

    public MessageJointWithUser createMessages(String messageContent, UUID chatId, String authToken) {
        User sender = userService.getUser(authToken).orElseThrow(() -> new RuntimeException("User not found"));
        Message message = Message.builder()
                .content(messageContent)
                .messageTime(new Timestamp(System.currentTimeMillis()))
                .chatId(chatId)
                .senderEmail(sender.getEmail())
                .build();
        MessageJointWithUser messageJointWithUser = MessageJointWithUser.builder()
                .message(message)
                .sender(sender)
                .build();

        messagesRepository.save(message);
        return messageJointWithUser;
    }
}

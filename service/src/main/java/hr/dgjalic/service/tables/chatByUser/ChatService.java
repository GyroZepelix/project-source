package hr.dgjalic.service.tables.chatByUser;

import hr.dgjalic.service.services.AuthTokenConverter;
import hr.dgjalic.service.tables.UnreadPrivateMessage.UnreadPrivateMessageService;
import hr.dgjalic.service.tables.userByEmail.UserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserService userService;
    private final UnreadPrivateMessageService unreadPrivateMessageService;
    private final AuthTokenConverter authTokenConverter;

    public ArrayList<ChatJointWithReceiver> getChatsByToken(@NonNull String token) {
        String email = authTokenConverter.getEmailFromToken(token);
        return this.getChatsByEmail(email);
    }

    public ArrayList<ChatByUser> findAllByEmailSortByTime(String email) {
        ArrayList<ChatByUser> chats = chatRepository.findAllByEmail(email);
        chats.sort((o1, o2) -> o2.getLastMessageTime().compareTo(o1.getLastMessageTime()));
        return chats;
    }

    public ArrayList<ChatJointWithReceiver> getChatsByEmail(String email) {
        ArrayList<ChatJointWithReceiver> chatsToReturn = new ArrayList<>();
        this.findAllByEmailSortByTime(email).forEach(chatByUser -> {
            ChatJointWithReceiver chatJointWithReceiver = new ChatJointWithReceiver(chatByUser,
                    userService.getUserByEmail(chatByUser.getReceiverEmail())
                            .orElseThrow(),
                    unreadPrivateMessageService.getUnreadMessageByChannel(chatByUser)
            );
            chatsToReturn.add(chatJointWithReceiver);
        });
        return chatsToReturn;
    }


    public ChatByUser createForBothUsers(@NonNull String token, @NonNull String recieverEmail) {
        String senderEmail = authTokenConverter.getEmailFromToken(token);
        if (senderEmail.equals(recieverEmail)) {
            throw new RuntimeException("You can't chat with yourself");
        } else if (!userService.existsByEmail(recieverEmail)) {
            throw new RuntimeException("User with email " + recieverEmail + " doesn't exist");
        }

        UUID uniqueChatId = UUID.randomUUID();
        ChatByUser yourChat = ChatByUser.builder()
                .email(senderEmail)
                .chatId(uniqueChatId)
                .lastMessageTime(new Timestamp(System.currentTimeMillis()))
                .receiverEmail(recieverEmail)
                .build();
        ChatByUser receiverChat = ChatByUser.builder()
                .email(recieverEmail)
                .chatId(uniqueChatId)
                .lastMessageTime(new Timestamp(System.currentTimeMillis()))
                .receiverEmail(senderEmail)
                .build();
        chatRepository.save(receiverChat);
        return chatRepository.save(yourChat);
    }
    public ChatByUser save(@NonNull ChatByUser chatByUser) {
        return chatRepository.save(chatByUser);
    }


    public void handleUpdateLastMessageTime(String authToken, String receiverEmail) {
        String senderEmail = authTokenConverter.getEmailFromToken(authToken);
        chatRepository.updateChatTime(new Timestamp(System.currentTimeMillis()), senderEmail, receiverEmail);
        chatRepository.updateChatTime(new Timestamp(System.currentTimeMillis()), receiverEmail, senderEmail);
    }
}

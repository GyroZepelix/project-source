package hr.dgjalic.service.tables.chatByUser;

import hr.dgjalic.service.services.AuthTokenConverter;
import hr.dgjalic.service.services.EmailValidator;
import hr.dgjalic.service.tables.UnreadPrivateMessage.UnreadPrivateMessageService;
import hr.dgjalic.service.tables.userByEmail.UserService;
import hr.dgjalic.service.user_defined_types.UserKey;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping("/api/chatByUser")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final AuthTokenConverter authTokenConverter;
    private final UnreadPrivateMessageService unreadPrivateMessageService;
    private final EmailValidator emailValidator;
    private final UserService userService;

    @MessageMapping("/chats")
    public void getAllChatsSocket(@Header("Authorization") String token) {
        String email = authTokenConverter.getEmailFromToken(token);
        getAllChatsToUser(email);
    }


    @MessageMapping("chats/{secondUser}")
    public ResponseEntity<ChatByUser> createChatSocket(@DestinationVariable String secondUser, @Header("Authorization") String token) {
        ChatByUser createdChatByUser;
        try {
            createdChatByUser = chatService.createForBothUsers(token, secondUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(createdChatByUser);
    }


    public void getAllChatsToUser(String email) {
        ArrayList<ChatJointWithReceiver> chats = chatService.getChatsByEmail(email);
        simpMessagingTemplate.convertAndSend("/channel/chats/" + email, chats);
    }
    public void updateChatsWhenMessageSent(String authToken, String receiverEmail, UUID chatId) {
        chatService.handleUpdateLastMessageTime(authToken, receiverEmail);
        String userEmail = authTokenConverter.getEmailFromToken(authToken);

        unreadPrivateMessageService.incrementUnreadMessage(receiverEmail, chatId);

        getAllChatsToUser(userEmail);
        getAllChatsToUser(receiverEmail);
    }

    @GetMapping()
    public ResponseEntity<ArrayList<ChatJointWithReceiver>> getAllChats(@RequestHeader("Authorization") String token) {
        ArrayList<ChatJointWithReceiver> chats = chatService.getChatsByToken(token);
        return ResponseEntity.ok(chats);
    }

    @PostMapping("/{reciever}")
    public ResponseEntity<ChatByUser> createChat(@RequestHeader("Authorization") String token, @PathVariable String reciever) {
        String email = authTokenConverter.getEmailFromToken(token);
        ChatByUser createdChatByUser;
        AtomicReference<String> posterEmail = new AtomicReference<>("");
        if (emailValidator.isValid(reciever)) {
            posterEmail.set(authTokenConverter.getEmailFromToken(token));
        } else {
            userService.getUserByUserKey(new UserKey(reciever)).map(user -> {
                posterEmail.set(user.getEmail());
                return user;
            }).orElseGet(() -> {
                posterEmail.set("");
                return null;
            });
        }
        try {
            createdChatByUser = chatService.createForBothUsers(token, posterEmail.get());
            getAllChatsToUser(posterEmail.get());
            getAllChatsToUser(email);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(createdChatByUser);

    }
}

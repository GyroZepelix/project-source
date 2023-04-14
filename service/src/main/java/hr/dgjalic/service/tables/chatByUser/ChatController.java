package hr.dgjalic.service.tables.chatByUser;

import hr.dgjalic.service.services.AuthTokenConverter;
import hr.dgjalic.service.tables.UnreadPrivateMessage.UnreadPrivateMessage;
import hr.dgjalic.service.tables.UnreadPrivateMessage.UnreadPrivateMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("/api/chatByUser")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final AuthTokenConverter authTokenConverter;
    private final UnreadPrivateMessageService unreadPrivateMessageService;


    @MessageMapping("/chats/{userEmail}")
    public void getAllChatsSocket(@DestinationVariable String userEmail, @Header("Authorization") String token) {
        ArrayList<ChatJointWithReceiver> chats = chatService.getChatsByToken(token);
        simpMessagingTemplate.convertAndSend("/channel/chats/" + userEmail, chats);
    }

    public void updateChatsWhenMessageSent(String authToken, String receiverEmail, UUID chatId) {
        chatService.handleUpdateLastMessageTime(authToken, receiverEmail);
        String userEmail = authTokenConverter.getEmailFromToken(authToken);

        unreadPrivateMessageService.incrementUnreadMessage(receiverEmail, chatId);

        ArrayList<ChatJointWithReceiver> userChats = chatService.getChatsByEmail(userEmail);
        ArrayList<ChatJointWithReceiver> receiverChats = chatService.getChatsByEmail(receiverEmail);
        simpMessagingTemplate.convertAndSend("/channel/chats/" + userEmail, userChats);
        simpMessagingTemplate.convertAndSend("/channel/chats/" + receiverEmail, receiverChats);
    }

    @GetMapping()
    public ResponseEntity<ArrayList<ChatJointWithReceiver>> getAllChats(@RequestHeader("Authorization") String token) {
        ArrayList<ChatJointWithReceiver> chats = chatService.getChatsByToken(token);
        return ResponseEntity.ok(chats);
    }

    @PostMapping("/{email}")
    public ResponseEntity<ChatByUser> createChat(@RequestHeader("Authorization") String token, @PathVariable String email ) {
        ChatByUser createdChatByUser;
        try {
            createdChatByUser = chatService.createForBothUsers(token, email);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(createdChatByUser);
    }
}

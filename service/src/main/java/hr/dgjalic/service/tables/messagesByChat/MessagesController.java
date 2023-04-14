package hr.dgjalic.service.tables.messagesByChat;


import hr.dgjalic.service.services.AuthTokenConverter;
import hr.dgjalic.service.tables.UnreadPrivateMessage.UnreadPrivateMessage;
import hr.dgjalic.service.tables.UnreadPrivateMessage.UnreadPrivateMessageService;
import hr.dgjalic.service.tables.chatByUser.ChatController;
import hr.dgjalic.service.tables.chatByUser.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class MessagesController {

    private final MessagesServices messagesServices;
    private final ChatController chatController;
    private final UnreadPrivateMessageService unreadPrivateMessageService;
    private final AuthTokenConverter authTokenConverter;
    private final SimpMessagingTemplate simpMessagingTemplates;

    @MessageMapping("/chat/{chatId}")
    private void receiveAndDistributeMessage(@Payload String content, @DestinationVariable UUID chatId, @Header("Authorization") String authToken, @Header("Receiver-Email") String receiverEmail) {
        if (authToken == null) return;
        chatController.updateChatsWhenMessageSent(authToken, receiverEmail, chatId);
        MessageJointWithUser returnedMessage = messagesServices.createMessages(content, chatId, authToken);
        simpMessagingTemplates.convertAndSend("/channel/chat/" + chatId, returnedMessage );

    }

    @MessageMapping("/chat/{chatId}/get")
    private void getMessages(@DestinationVariable UUID chatId, @Header("Authorization") String authToken) {
        String email = authTokenConverter.getEmailFromToken(authToken);
        simpMessagingTemplates.convertAndSend("/channel/chat/" + chatId,
                messagesServices.getAllMessagesJointWithUserByChatId(chatId));
        unreadPrivateMessageService.decrementUnreadMessageToZero(email, chatId);
        chatController.getAllChatsSocket(email, authToken);
    }

}

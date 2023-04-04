package hr.dgjalic.service.tables.messagesByChat;


import hr.dgjalic.service.user_defined_types.UserKey;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
public class MessagesController {

    private final MessagesServices messagesServices;
    private final SimpMessagingTemplate simpMessagingTemplates;

    @MessageMapping("/chat/{chatId}")
    private void receiveAndDistributeMessage(@Payload String content, @DestinationVariable String chatId, @Header("Authorization") String authToken) {
        if (authToken == null) {
            return;
        }
        Message returnedMessage = messagesServices.createMessages(content, chatId, authToken);

        simpMessagingTemplates.convertAndSend("/channel/chat/" + chatId, returnedMessage );
    }

    @MessageMapping("/chat/{chatId}/get")
    private void getMessages(@DestinationVariable String chatId) {
        simpMessagingTemplates.convertAndSend("/channel/chat/" + chatId, messagesServices.getAllMessagesByChatId(chatId));
    }

    @MessageMapping("/chat/{chatId}/purge")
    private void purgeMessages(@DestinationVariable String chatId) {
        messagesServices.purgeMessages(chatId);
        System.out.println("Purged messages from chat: " + chatId);
    }



}

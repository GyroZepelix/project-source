package hr.dgjalic.service.tables.messagesByChat;


import hr.dgjalic.service.user_defined_types.UserKey;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
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
    private void receiveAndDistributeMessage(@Payload String recievedMessage, @DestinationVariable String chatId) {
        Message message = Message.builder()
                .content(recievedMessage)
                .messageTime(new Timestamp(System.currentTimeMillis()))
                .chatId(chatId)
                .senderEmail("Gyro@test.com")
                .senderIconPath("test/test.jpg")
                .senderUserKey(UserKey.builder()
                        .username("Gyro")
                        .tag(3125)
                        .build())
                .build();
        messagesServices.createMessages(message);
        ArrayList<Message> messageToSend = new ArrayList<>();
        messageToSend.add(message);

        simpMessagingTemplates.convertAndSend("/channel/chat/" + chatId, messageToSend );
    }

    @MessageMapping("/chat/{chatId}/get")
    private void getMessages(@DestinationVariable String chatId) {
        simpMessagingTemplates.convertAndSend("/channel/chat/" + chatId, messagesServices.getAllMessages());
    }

    @MessageMapping("/chat/{chatId}/purge")
    private void purgeMessages(@DestinationVariable String chatId) {
        messagesServices.purgeMessages(chatId);
        System.out.println("Purged messages from chat: " + chatId);
    }



}

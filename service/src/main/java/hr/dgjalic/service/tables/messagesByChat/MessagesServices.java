package hr.dgjalic.service.tables.messagesByChat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessagesServices {

    private final MessagesRepository messagesRepository;

    public Message getMessages(String chatId) {
        return messagesRepository.findByChatId(chatId);
    }

    public Iterable<Message> getAllMessages() {
        return messagesRepository.findAll();
    }

    public Message createMessages(Message message) {
        return messagesRepository.save(message);
    }

    public void purgeMessages(String chatId) {
        messagesRepository.deleteAllByChatId(chatId);
    }
}

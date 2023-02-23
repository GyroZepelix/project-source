package hr.dgjalic.service.tables.messagesByChat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessagesServices {

    @Autowired
    private MessagesRepository messagesRepository;

    public Messages getMessages(String chatId) {
        return messagesRepository.findByChatId(chatId);
    }

    public Iterable<Messages> getAllMessages() {
        return messagesRepository.findAll();
    }

    public Messages createMessages(Messages messages) {
        return messagesRepository.save(messages);
    }
}

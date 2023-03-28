package hr.dgjalic.service.tables.chatByUser;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    public Iterable<Chat> findByEmail(@NonNull String email) {
        return chatRepository.findByEmail(email);
    }

    public Iterable<Chat> findAll() {
        return chatRepository.findAll();
    }

    public Chat save(@NonNull Chat chat) {
        return chatRepository.save(chat);
    }


}

package hr.dgjalic.service.tables.chatByUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatByUser")
public class ChatController {

    @Autowired
    private ChatRepository chatRepository;

    @GetMapping("/{email}")
    public ResponseEntity<Chat> getChat(@PathVariable String email) {
        Chat chat = chatRepository.findByEmail(email);
        return ResponseEntity.ok(chat);
    }

    @GetMapping()
    public ResponseEntity<Iterable<Chat>> getAllChats() {
        Iterable<Chat> chats = chatRepository.findAll();
        return ResponseEntity.ok(chats);
    }

    @PostMapping()
    public ResponseEntity<Chat> createChat(@RequestBody Chat chat) {
        Chat createdChat = chatRepository.save(chat);
        return ResponseEntity.ok(createdChat);
    }
}

package hr.dgjalic.service.tables.chatByUser;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatByUser")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/{email}")
    public ResponseEntity<Iterable<Chat>> getChat(@PathVariable String email) {
        Iterable<Chat> chat = chatService.findByEmail(email);
        return ResponseEntity.ok(chat);
    }

    @GetMapping()
    public ResponseEntity<Iterable<Chat>> getAllChats() {
        Iterable<Chat> chats = chatService.findAll();
        return ResponseEntity.ok(chats);
    }

    @PostMapping()
    public ResponseEntity<Chat> createChat(@RequestBody Chat chat) {
        Chat createdChat = chatService.save(chat);
        return ResponseEntity.ok(createdChat);
    }
}

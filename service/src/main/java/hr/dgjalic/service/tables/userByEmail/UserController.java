package hr.dgjalic.service.tables.userByEmail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/userByEmail")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{email}")
    public ResponseEntity<User> getUser(@PathVariable String email) {
        User user = userRepository.findByEmail(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping()
    public ResponseEntity<Iterable<User>> getAllUsers() {
        Iterable<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userRepository.save(user);
        return ResponseEntity.ok(createdUser);
    }

}

package hr.dgjalic.service.tables.userByEmail;

import hr.dgjalic.service.services.AuthTokenConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    public final UserRepository userRepository;
    public final AuthTokenConverter authTokenConverter;

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
    public Optional<User> getUser(String authToken) {
        String email = authTokenConverter.getEmailFromToken(authToken);
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    public Optional<User> getUserByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public Optional<User> createUser(User user, String authToken) {
        String email = authTokenConverter.getEmailFromToken(authToken);
        if (userRepository.existsByEmail(email)) {
            return Optional.empty();
        }
        user.setEmail(email);
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return Optional.of(userRepository.save(user));
    }
}

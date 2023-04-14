package hr.dgjalic.service.tables.messagesByChat;

import hr.dgjalic.service.tables.userByEmail.User;
import lombok.*;

@Builder
@RequiredArgsConstructor
@Data
public class MessageJointWithUser{
    private final User sender;
    private final Message message;
}

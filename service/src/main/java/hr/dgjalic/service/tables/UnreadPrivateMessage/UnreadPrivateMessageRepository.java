package hr.dgjalic.service.tables.UnreadPrivateMessage;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UnreadPrivateMessageRepository extends CassandraRepository<UnreadPrivateMessage, String> {

    Optional<UnreadPrivateMessage> findByEmailAndChatId(String email, UUID chatId);
    Iterable<UnreadPrivateMessage> findAllByEmail(String email);

    @Query("UPDATE unread_private_message_by_email_and_chat_id SET unread_messages = unread_messages + ?0 WHERE email = ?1 AND chat_id = ?2")
    void incrementCounter( long incrementBy, String email, UUID chatId);

    @Query("UPDATE unread_private_message_by_email_and_chat_id SET unread_messages = unread_messages - ?0 WHERE email = ?1 AND chat_id = ?2")
    void decrementCounter(long decrementBy, String email, UUID chatId);
}

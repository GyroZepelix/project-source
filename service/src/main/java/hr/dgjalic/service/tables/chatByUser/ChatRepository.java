package hr.dgjalic.service.tables.chatByUser;

import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.UUID;

public interface ChatRepository extends CassandraRepository<ChatByUser, String> {
    ArrayList<ChatByUser> findAllByEmail(String email);

    @Query("UPDATE chat_by_user SET last_message_time = ?0 WHERE email = ?1 AND receiver_email = ?2")
    ChatByUser updateChatTime(Timestamp lastMessageTime, String email, String receiverEmail);

    @AllowFiltering
    Iterable<ChatByUser> findAllByChatId(UUID chatId);

}

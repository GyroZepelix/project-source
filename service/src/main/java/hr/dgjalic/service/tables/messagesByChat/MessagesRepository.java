package hr.dgjalic.service.tables.messagesByChat;

import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.UUID;

public interface MessagesRepository extends CassandraRepository<Message, String> {
    Iterable<Message> findAllByChatId(UUID chatId);

    void deleteAllByChatId(UUID chatId);
}

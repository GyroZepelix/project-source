package hr.dgjalic.service.tables.messagesByChat;

import org.springframework.data.cassandra.repository.CassandraRepository;

public interface MessagesRepository extends CassandraRepository<Messages, String> {
    Messages findByChatId(String chatId);
}

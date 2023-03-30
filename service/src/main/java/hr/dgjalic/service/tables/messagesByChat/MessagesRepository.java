package hr.dgjalic.service.tables.messagesByChat;

import org.springframework.data.cassandra.repository.CassandraRepository;

public interface MessagesRepository extends CassandraRepository<Message, String> {
    Iterable<Message> findAllByChatId(String chatId);

    void deleteAllByChatId(String chatId);
}

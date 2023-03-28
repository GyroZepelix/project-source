package hr.dgjalic.service.tables.chatByUser;

import org.springframework.data.cassandra.repository.CassandraRepository;

public interface ChatRepository extends CassandraRepository<Chat, String> {
    Iterable<Chat> findByEmail(String email);
}

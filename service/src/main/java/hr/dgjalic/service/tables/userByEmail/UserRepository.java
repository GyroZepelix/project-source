package hr.dgjalic.service.tables.userByEmail;

import org.springframework.data.cassandra.repository.CassandraRepository;
public interface UserRepository extends CassandraRepository<User, String> {
    User findByEmail(String email);

}

package hr.dgjalic.service.tables.userByEmail;

import hr.dgjalic.service.user_defined_types.UserKey;
import org.springframework.data.cassandra.repository.AllowFiltering;
import org.springframework.data.cassandra.repository.CassandraRepository;
public interface UserRepository extends CassandraRepository<User, String> {
    User findByEmail(String email);

    Boolean existsByEmail(String email);

    @AllowFiltering
    User findByUserKey(UserKey userKey);

}

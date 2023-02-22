package hr.dgjalic.service.tables.userByEmail;


import hr.dgjalic.service.user_defined_types.UserKey;
import lombok.*;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.sql.Timestamp;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table("user_by_email")
public class User {

    @PrimaryKey
    private String email;


    private UserKey user_key;

    private String image_path;

    @CassandraType(type = CassandraType.Name.TIMESTAMP)
    private Timestamp created_at;


}

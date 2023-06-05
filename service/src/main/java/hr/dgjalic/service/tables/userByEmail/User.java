package hr.dgjalic.service.tables.userByEmail;


import hr.dgjalic.service.user_defined_types.UserKey;
import lombok.*;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.*;

import java.sql.Timestamp;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table("user_by_email")
public class User {

    @PrimaryKeyColumn(name = "email", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    private String email;

    @Column("user_key")
    private UserKey userKey;

    @Column("image_path")
    private String imagePath;

    @Column("created_at")
    @CassandraType(type = CassandraType.Name.TIMESTAMP)
    private Timestamp createdAt;


}

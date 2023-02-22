package hr.dgjalic.service.user_defined_types;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.UserDefinedType;

@UserDefinedType("user_key")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserKey {
    private String username;

    @CassandraType(type = CassandraType.Name.SMALLINT)
    private int tag;
}

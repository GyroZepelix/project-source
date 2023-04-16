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

    public UserKey(String usernameAndTag) {
        String[] split = usernameAndTag.split("#");
        this.username = split[0];
        this.tag = Integer.parseInt(split[1]);
    }

    private String username;

    @CassandraType(type = CassandraType.Name.SMALLINT)
    private int tag;
}

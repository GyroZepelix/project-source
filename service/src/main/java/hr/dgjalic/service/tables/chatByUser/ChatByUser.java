package hr.dgjalic.service.tables.chatByUser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("chat_by_user")
public class ChatByUser {

    @PrimaryKeyColumn(name = "email", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    private String email;

    @PrimaryKeyColumn(name = "receiver_email", ordinal = 1, type = PrimaryKeyType.CLUSTERED)
    private String receiverEmail;

    @Column("last_message_time")
    private Timestamp lastMessageTime;

    @Column("chat_id")
    private UUID chatId;

}

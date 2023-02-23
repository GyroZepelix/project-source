package hr.dgjalic.service.tables.messagesByChat;

import hr.dgjalic.service.user_defined_types.UserKey;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table("messages_by_chat")
public class Messages {

    @PrimaryKeyColumn(name = "chat_id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    private String chatId;

    @PrimaryKeyColumn(name = "message_time", ordinal = 1, type = PrimaryKeyType.CLUSTERED)
    private Timestamp messageTime;

    @Column("content")
    private String content;

    @Column("sender_email")
    private String senderEmail;

    @Column("sender_icon_path")
    private String senderIconPath;

    @Column("sender_name")
    private UserKey senderUserKey;
}

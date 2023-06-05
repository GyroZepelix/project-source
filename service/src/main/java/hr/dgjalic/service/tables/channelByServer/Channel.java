package hr.dgjalic.service.tables.channelByServer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import java.sql.Timestamp;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
//@Table("channel_by_server")
public class Channel {

    @PrimaryKeyColumn(name = "server_id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    private String serverId;

    @PrimaryKeyColumn(name = "last_message_time", ordinal = 1, type = PrimaryKeyType.CLUSTERED)
    private Timestamp lastMessageTime;

    @Column("chat_id")
    private UUID chatId;

    @Column("icon_path")
    private String iconPath;

    @Column("name")
    private String name;

}

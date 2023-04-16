package hr.dgjalic.service.tables.UnreadPrivateMessage;

import hr.dgjalic.service.tables.chatByUser.ChatByUser;
import hr.dgjalic.service.tables.chatByUser.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UnreadPrivateMessageService {

        private final UnreadPrivateMessageRepository unreadPrivateMessageRepository;

        public long getUnreadMessageByChannel(ChatByUser chatByUser) {
                return unreadPrivateMessageRepository.findByEmailAndChatId(chatByUser.getEmail(), chatByUser.getChatId())
                        .map(UnreadPrivateMessage::getUnreadMessages)
                        .orElse(0L);
        }

        public void incrementUnreadMessage(String email, UUID chatId) {
                unreadPrivateMessageRepository.incrementCounter(1L, email, chatId);
        }

        public void decrementUnreadMessage(String email, UUID chatId, long decrementBy) {
                unreadPrivateMessageRepository.decrementCounter(1L, email, chatId);
        }

        public void decrementUnreadMessageToZero(String email, UUID chatId) {
                long unreadMessages = unreadPrivateMessageRepository.findByEmailAndChatId(email, chatId)
                        .map(UnreadPrivateMessage::getUnreadMessages)
                        .orElseThrow(IllegalStateException::new);
                if (unreadMessages > 0) {
                        unreadPrivateMessageRepository.decrementCounter(unreadMessages, email, chatId);
                } else {
                        unreadPrivateMessageRepository.incrementCounter(-unreadMessages, email, chatId);
                }

        }
}

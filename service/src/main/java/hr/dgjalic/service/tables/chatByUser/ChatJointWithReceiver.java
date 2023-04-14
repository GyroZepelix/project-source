package hr.dgjalic.service.tables.chatByUser;

import hr.dgjalic.service.tables.userByEmail.User;

public record ChatJointWithReceiver(ChatByUser chat, User receiver, long unreadMessages) {}

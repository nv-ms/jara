CREATE TABLE `messages` (
  `message_id` varchar(200) NOT NULL,
  `sender_id` varchar(200) NOT NULL,
  `reciever_id` varchar(200) NOT NULL,
  `message_subject` varchar(200) NOT NULL,
  `message_content` varchar(200) NOT NULL,
  `message_timestamp` date NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `userfk_idx` (`sender_id`,`reciever_id`),
  KEY `recieverfk_idx` (`reciever_id`),
  CONSTRAINT `recieverfk` FOREIGN KEY (`reciever_id`) REFERENCES `jobs` (`employer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `senderfk` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

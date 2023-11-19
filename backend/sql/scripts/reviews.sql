CREATE TABLE `reviews` (
  `review_id` varchar(200) NOT NULL,
  `user_id` varchar(200) NOT NULL,
  `job_id` varchar(200) NOT NULL,
  `rating` varchar(200) NOT NULL,
  `message` varchar(200) DEFAULT NULL,
  `posted_date` date NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `user_idx` (`user_id`),
  KEY `jobfk_idx` (`job_id`),
  CONSTRAINT `jobfk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userfk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

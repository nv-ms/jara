CREATE TABLE `users` (
  `user_id` varchar(200) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `phone_number` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password_hash` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `applications` (
  `application_id` varchar(200) NOT NULL,
  `job_id` varchar(200) NOT NULL,
  `applicant_id` varchar(200) NOT NULL,
  `application_status` varchar(200) NOT NULL,
  `application_date` varchar(200) NOT NULL,
  PRIMARY KEY (`application_id`),
  KEY `job_id_idx` (`job_id`),
  KEY `userfk_idx` (`applicant_id`),
  CONSTRAINT `appfk` FOREIGN KEY (`applicant_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `jobidfk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

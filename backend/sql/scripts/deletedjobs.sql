CREATE TABLE `deletedjobs` (
  `job_id` varchar(200) NOT NULL,
  `job_title` varchar(200) DEFAULT NULL,
  `job_type` varchar(200) DEFAULT NULL,
  `job_category` varchar(200) DEFAULT NULL,
  `specialization` varchar(200) DEFAULT NULL,
  `job_location` varchar(200) DEFAULT NULL,
  `min_qualification` varchar(200) DEFAULT NULL,
  `min_experience` varchar(200) DEFAULT NULL,
  `min_salary` varchar(200) DEFAULT NULL,
  `max_salary` varchar(200) DEFAULT NULL,
  `dead_line` varchar(200) DEFAULT NULL,
  `posted_date` date DEFAULT NULL,
  `job_description` varchar(1500) DEFAULT NULL,
  `deleted_date` date DEFAULT NULL,
  `employer_id` varchar(200) DEFAULT NULL,
  `derectRequests` int DEFAULT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

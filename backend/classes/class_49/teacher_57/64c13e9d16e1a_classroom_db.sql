-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2023 at 02:58 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `classroom_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `class_id`, `user_id`) VALUES
(11, 29, 45),
(12, 30, 45),
(13, 31, 45),
(14, 32, 45),
(15, 33, 45),
(16, 34, 45),
(17, 35, 45),
(18, 36, 45),
(19, 37, 45),
(20, 38, 45),
(21, 39, 46),
(22, 40, 46),
(23, 41, 46),
(24, 42, 48),
(25, 43, 49),
(26, 44, 50),
(27, 45, 50),
(28, 46, 52),
(29, 47, 52),
(30, 48, 52),
(31, 49, 57);

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `class_id`, `teacher_id`, `message`) VALUES
(7, 45, 45, 'stadsad'),
(13, 45, 45, 'asdasds'),
(14, 45, 45, 'asdadasd12312312c12312c3123c123c123c123c123c123c'),
(15, 45, 45, '12312312312321'),
(16, 45, 45, '4124124124'),
(17, 45, 45, '12414'),
(18, 45, 45, '123123123'),
(27, 45, 45, 'sadasdasd'),
(28, 45, 45, '123123213'),
(29, 45, 45, '123123'),
(30, 45, 45, '123123213'),
(31, 45, 45, '123213123'),
(32, 45, 45, '141414'),
(33, 45, 45, '14124124'),
(34, 45, 45, '124124124'),
(35, 45, 45, '124124124'),
(36, 45, 45, '124124124'),
(37, 45, 45, '12412414'),
(46, 46, 46, 'trying post'),
(50, 46, 46, '123123123'),
(51, 46, 46, '123141414141'),
(52, 46, 46, '124124124124'),
(53, 46, 46, '214124124124124'),
(54, 46, 46, 'tekrami ya zeina\r\n'),
(55, 46, 46, 'fasdfsd'),
(56, 49, 49, '123');

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `instructions` varchar(255) NOT NULL,
  `class_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `points` varchar(255) NOT NULL,
  `due` date NOT NULL,
  `topic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`id`, `title`, `instructions`, `class_id`, `teacher_id`, `points`, `due`, `topic`) VALUES
(4, 'asdasdasd', 'asdasdasdadasdasdasdasd', 46, 46, '', '2023-07-26', ''),
(19, '14124', '', 46, 46, '', '1970-01-01', ''),
(20, '14124', '', 46, 46, '', '1970-01-01', ''),
(21, '14124', '', 46, 46, '', '1970-01-01', ''),
(22, '1241241212412421421414214', '4141241241241241241241241412412421412412412412412412412421', 46, 46, '', '2023-06-30', ''),
(23, '123', '123', 49, 49, '', '2023-07-10', ''),
(24, '1241241', '123', 49, 49, '', '1970-01-01', '');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `section` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `room` varchar(255) NOT NULL,
  `class_code` varchar(10) NOT NULL,
  `class_coverpic` text NOT NULL,
  `class_profilepic` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `section`, `subject`, `room`, `class_code`, `class_coverpic`, `class_profilepic`) VALUES
(29, '', '', '', '', 'OQfzDv', '', ''),
(30, '', '', '', '', 'MYuQ0F', '', ''),
(31, 'Alaa Attaya', '', '', '', '6SQ1Ed', '', ''),
(32, '', '', '', '', 'AmfUYD', '', ''),
(33, '', '', '', '', 'YeGuLz', '', ''),
(34, '', '', '', '', 'rPwKzi', '', ''),
(35, '', '', '', '', 'RQJkSc', '', ''),
(36, '', '', '', '', 'rVghd9', '', ''),
(37, '', '', '', '', 'bsWzET', '', ''),
(38, '', '', '', '', 'epNYci', '', ''),
(39, '', '', '', '', 'sDpvoW', '', ''),
(40, '', '', '', '', 'KN2UPC', '', ''),
(41, '', '', '', '', '1gxPND', '', ''),
(42, '', '', '', '', 'K8z3qw', '', ''),
(43, '', '', '', '', 'pnxRx7', '', ''),
(44, '', '', '', '', 'xZa6eY', '', ''),
(45, '12312', '3123123', '123123123', '123123123213', 'gyOcG7', '', ''),
(46, '', '', '', '', 'H66IsE', '', ''),
(47, '123', '1231', '23123', '123132131', 'YqdNjt', '', ''),
(48, 'test class', '1', '23', '23123', 'g55GCG', '', ''),
(49, '123', '123', '123', '123', 'tDUIJ0', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `grades_id` int(11) NOT NULL,
  `file_path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `files_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `class_id`, `user_id`) VALUES
(7, 45, 51),
(8, 46, 53);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `class_id`, `user_id`) VALUES
(29, 29, 45),
(30, 30, 45),
(31, 31, 45),
(32, 32, 45),
(33, 33, 45),
(34, 34, 45),
(35, 35, 45),
(36, 36, 45),
(37, 37, 45),
(38, 38, 45),
(39, 39, 46),
(40, 40, 46),
(41, 41, 46),
(42, 42, 48),
(43, 43, 49),
(44, 44, 50),
(45, 45, 50),
(46, 46, 52),
(47, 47, 52),
(48, 48, 52),
(49, 49, 57);

-- --------------------------------------------------------

--
-- Table structure for table `teacher_files`
--

CREATE TABLE `teacher_files` (
  `id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `file_path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_pic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `profile_pic`) VALUES
(45, '123', '123', '123123@gmail.com', '$2y$10$diVdUY.E/W9A5yAQKG3G/.X1AZHbGaBexw0cwV43oTOqsq.ZKE8hG', ''),
(46, '123', '123', '11234141@gmail.com', '$2y$10$8wjMeNmcsqMqf7FRWbxgiOvh0VC5ukYfKgoWBJ3yoLA.SQcMmLrA.', ''),
(47, '123', '123', '123123123123@gmail.com', '$2y$10$Ik8eJa9YiFXY.yvtEku3t.QOlxm0xQ.MaLq0P4k8be1N6bi..IKaC', ''),
(48, '1234', '1234', '1234@gmail.com', '$2y$10$3du1n.3vro51igShR0XeceM45LC84Leok3H/xgwzkxVKTrD.DKONW', 'user_48/64c020b5e30d3_Empty White.ico'),
(49, '123', '123', 'attayaalaa@gmail.com', '$2y$10$3YZs5KXPkMB898SwsdDxEOn6d/4ZJSQICXtpQDH3JGF/kWbTKKK.e', ''),
(50, '123', '123', '123123_123123@gmail.com', '$2y$10$I.pZoCLtYNpP6adU35w81ORoTLtZxIV4pH0eAjGF74yjXM6pOBZoi', ''),
(51, '123', '123', '11234141231231@gmail.com', '1', ''),
(52, '1234', '1234', '123123_121233123@gmail.com', '$2y$10$yvhC/t6Gl4yZ2Cja.d7AZeESln88kpab8YWmPMo0M18ZiY4ouMd/e', 'user_52/64c0936881173_Empty White.ico'),
(53, '4444', '4444', '444@gmail.com', '$2y$10$QKmvtARof4cm1Z1O/RlW..W2Et7HfbNtDK9bdjpuaq6IwPH2PKvQ6', ''),
(54, '123', '123', '1231234@gmail.com', '$2y$10$v9XIaMGw3BLAjA1UNZAY4uww6Hpob4uCm/tgtBIwFmzJ9lJ40HN5K', ''),
(55, '123', '123', '123123444@gmail.com', '$2y$10$JlBNwonMQ1wi5r8qOsB1SeXEtCVe.kC2eJk9/nYb/54YStNglUCOC', ''),
(56, '123', '123', '123@gmail.com', '$2y$10$WUQjvn1lq2ruO9jSkkxTQurhHdmzAPT4dG49zyGlqB7E81/D1fDxK', ''),
(57, '12344', '12344', '12344414@gmail.com', '$2y$10$Yhk66kpQn6Cbny68M1LsG.kDpeY7OJJWPqzJJyw66T7ieUdnFEKQu', 'user_57/64c097ed24d45_Cover.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `announcements_class_id` (`class_id`),
  ADD KEY `announcements_teacher_id` (`teacher_id`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignmnet_class_id` (`class_id`),
  ADD KEY `assignments_teacher_id` (`teacher_id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `files_assignment_id` (`assignment_id`),
  ADD KEY `files_grades_id` (`grades_id`),
  ADD KEY `files_student_id` (`student_id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grades_assignment_id` (`assignment_id`),
  ADD KEY `grades_files_id` (`files_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `students_class_id` (`class_id`),
  ADD KEY `students_user_id` (`user_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teachers_classid` (`class_id`),
  ADD KEY `teachers_user_id` (`user_id`);

--
-- Indexes for table `teacher_files`
--
ALTER TABLE `teacher_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_files_assignment_id` (`assignment_id`),
  ADD KEY `teacher_files_teacher_id` (`teacher_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `teacher_files`
--
ALTER TABLE `teacher_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `announcements_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignmnets_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_assignment_id` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `files_grades_id` FOREIGN KEY (`grades_id`) REFERENCES `grades` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `files_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_assignment_id` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grades_files_id` FOREIGN KEY (`files_id`) REFERENCES `files` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teachers_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacher_files`
--
ALTER TABLE `teacher_files`
  ADD CONSTRAINT `teacher_files_assignment_id` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_files_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

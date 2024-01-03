-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2024 at 07:40 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `management`
--

-- --------------------------------------------------------

--
-- Table structure for table `leave_requests`
--

CREATE TABLE `leave_requests` (
  `leave_requests_id` int(10) NOT NULL,
  `user_id` int(10) DEFAULT NULL,
  `leave_type` tinyint(1) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 2,
  `deleted` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `leave_requests`
--

INSERT INTO `leave_requests` (`leave_requests_id`, `user_id`, `leave_type`, `description`, `start_date`, `end_date`, `status`, `deleted`) VALUES
(6, 3, 2, 'travel', '2023-12-16', '2023-12-17', 3, 1),
(8, 3, 1, 'sick', '2023-12-23', '2023-12-26', 1, 1),
(9, 4, 2, '123', '2023-12-27', '2023-12-27', 1, 1),
(10, 3, 2, '555', '2024-01-02', '2024-01-05', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE `office` (
  `office_id` int(10) NOT NULL,
  `company` varchar(50) DEFAULT NULL,
  `start` time DEFAULT NULL,
  `end` time DEFAULT NULL,
  `latitude` varchar(50) NOT NULL DEFAULT '13.765280063022878',
  `longitude` varchar(50) NOT NULL DEFAULT '100.5383781917591'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`office_id`, `company`, `start`, `end`, `latitude`, `longitude`) VALUES
(1, 'Avionics 411', '08:00:00', '22:30:00', '18.77469718878088', '98.97099932558713');

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `position_id` int(10) NOT NULL,
  `position` varchar(50) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`position_id`, `position`, `deleted`) VALUES
(1, 'ช่างอิเล็กทรอนิกส์', 1),
(2, 'ช่างวิทยุประจำเครื่อง', 1),
(3, 'หกดกหด', 0);

-- --------------------------------------------------------

--
-- Table structure for table `rank`
--

CREATE TABLE `rank` (
  `rank_id` int(10) NOT NULL,
  `rank` varchar(50) DEFAULT NULL,
  `rank_s` varchar(50) DEFAULT NULL,
  `level` int(3) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rank`
--

INSERT INTO `rank` (`rank_id`, `rank`, `rank_s`, `level`, `deleted`) VALUES
(1, 'พันจ่าอากาศเอก', 'พ.อ.อ.', 10, 1),
(2, 'พันจ่าอากาศโท', 'พ.อ.ท.', 11, 1),
(3, 'พันจ่าอากาศตรี', 'พ.อ.ต.', 12, 1),
(4, 'จ่าอากาศเอก', 'จ.อ.', 13, 1),
(5, 'จ่าอากาศโท', 'จ.ท.', 14, 1),
(6, 'จ่าอากาศตรี', 'จ.ต.', 15, 1),
(7, 'ผู้ดูแลระบบ', 'ผู้ดูแลระบบ', 1, 1),
(8, 'เรืออากาศเอก', 'ร.อ.', 7, 1),
(9, 'เรืออากาศโท', 'ร.ท.', 8, 1),
(10, 'เรืออากาศตรี', 'ร.ต.', 9, 1),
(11, 'นาวาอากาศตรี', 'น.ต.', 6, 1),
(12, 'นาวาอากาศโท', 'น.ท.', 5, 1),
(13, 'นาวาอากาศเอก', 'น.อ.', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `responsible`
--

CREATE TABLE `responsible` (
  `responsible_id` int(10) NOT NULL,
  `task_id` int(10) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0=disable, 1=enable',
  `deleted` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `responsible`
--

INSERT INTO `responsible` (`responsible_id`, `task_id`, `user_id`, `status`, `deleted`) VALUES
(5, 1, 3, 0, 0),
(6, 1, 4, 0, 0),
(7, 2, 3, 0, 0),
(8, 1, 3, 0, 1),
(9, 1, 6, 1, 1),
(10, 2, 6, 1, 1),
(11, 4, 4, 0, 0),
(12, 4, 3, 0, 0),
(13, 4, 3, 0, 1),
(14, 4, 6, 0, 0),
(15, 4, 4, 0, 0),
(16, 5, 3, 0, 1),
(17, 6, 3, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(10) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `schedule` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `deleted` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `title`, `description`, `schedule`, `status`, `deleted`) VALUES
(1, 'งานเลี้ยงพบปะนักบิน', 'ฝ่ายสื่อสารอิเล็กทรอนิกส์ + นักบิน', '2023-12-07 12:00:00', 1, 1),
(2, 'กินเลี้ยงฝูงบิน411', 'เชิญทุกคน', '2023-12-26 17:00:00', 1, 1),
(3, '', '', '2023-12-06 18:26:00', 1, 0),
(4, 'ปีใหม่', '2567', '2023-12-31 09:00:00', 1, 1),
(5, 'ตัดหญ้า', 'รอรับ ผบ.', '2024-01-03 23:27:27', 1, 1),
(6, 'กินข้าว', 'เที่ยง', '2024-01-03 23:30:27', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `timeclock`
--

CREATE TABLE `timeclock` (
  `timeclock_id` int(10) NOT NULL,
  `user_id` int(10) DEFAULT NULL,
  `clock_in` datetime DEFAULT NULL,
  `clock_out` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timeclock`
--

INSERT INTO `timeclock` (`timeclock_id`, `user_id`, `clock_in`, `clock_out`, `deleted`) VALUES
(1, 3, '2023-12-19 07:01:04', '2023-12-19 20:24:06', 1),
(5, 3, '2023-12-20 19:11:41', '2023-12-20 22:58:54', 1),
(6, 3, '2023-12-21 18:12:37', '2023-12-21 18:23:09', 1),
(7, 3, '2023-12-22 20:32:28', '2023-12-22 20:32:31', 1),
(11, 3, '2023-12-27 03:10:39', '2023-12-27 03:12:18', 1),
(12, 3, '2024-01-03 01:55:50', '2024-01-03 01:55:56', 1),
(15, 3, '2024-01-04 01:14:23', '2024-01-04 01:16:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(10) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `rank` int(4) DEFAULT NULL,
  `position` int(4) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `password_view` varchar(50) DEFAULT NULL,
  `code_verify` varchar(10) DEFAULT NULL,
  `role` tinyint(1) DEFAULT 3,
  `status` tinyint(1) DEFAULT 1,
  `img_path` text DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `firstname`, `lastname`, `rank`, `position`, `email`, `tel`, `password`, `password_view`, `code_verify`, `role`, `status`, `img_path`, `deleted`) VALUES
(2, 'John', 'Doe', 7, 1, 'admin@gmail.com', '1234567890', '$2b$10$zxWC4bbNhQILDECr9FjoROUROdvCR/8wpW8VWRM9ie.FgPZ1IMQme', '123456', NULL, 1, 1, '1', 1),
(3, 'ณัฐวัตร', 'ทุ่งเย็น', 3, 1, 'nattawat@gmail.com', '0979434960', '$2b$10$W5aV912tirA39ZKi.6KLuOnYcPyhWjs7iuLYqbd/9Cz2MU02wAwJy', '123456', '957455', 3, 1, '1', 1),
(4, 'ปริญญา', 'เรืองจันทร์', 1, 2, 'parinya@gmail.com', '1234567890', '$2b$10$edOBey1v0nlz0PGANywzSOPqUadAjijK.5kdKbxn3YsEHtRnAx/9W', '123456', '123456', 3, 1, '1', 1),
(5, 'trdsf', 'dsfdsfa', 1, 1, 'dsfas', 'sdaf', '$2b$10$o7rJdviTxayh31HZXOODhODz4zsBSABhsREV.5BxooSJmf/kPgUfa', 'dsaf', '957836', 2, 1, '1', 0),
(6, 'อธิพงศ์', 'พิลาทอง', 9, 1, 'atipong@gmail.com', '099999999', '$2b$10$rZqP8KR0zq9DfwzciH5iWOJQLtLQop8kvBO4Jshy0OlA34LnD6FJi', '123456', '123456', 2, 1, '1', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD PRIMARY KEY (`leave_requests_id`);

--
-- Indexes for table `office`
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`office_id`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`position_id`);

--
-- Indexes for table `rank`
--
ALTER TABLE `rank`
  ADD PRIMARY KEY (`rank_id`);

--
-- Indexes for table `responsible`
--
ALTER TABLE `responsible`
  ADD PRIMARY KEY (`responsible_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`);

--
-- Indexes for table `timeclock`
--
ALTER TABLE `timeclock`
  ADD PRIMARY KEY (`timeclock_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `leave_requests`
--
ALTER TABLE `leave_requests`
  MODIFY `leave_requests_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
  MODIFY `office_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `position_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rank`
--
ALTER TABLE `rank`
  MODIFY `rank_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `responsible`
--
ALTER TABLE `responsible`
  MODIFY `responsible_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `timeclock`
--
ALTER TABLE `timeclock`
  MODIFY `timeclock_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

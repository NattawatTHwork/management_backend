-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2024 at 08:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
-- Table structure for table `borrow`
--

CREATE TABLE `borrow` (
  `borrow_id` int(10) NOT NULL,
  `user_id` int(10) DEFAULT NULL,
  `equipment_id` int(10) DEFAULT NULL,
  `borrow_date` datetime DEFAULT NULL,
  `return_date` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrow`
--

INSERT INTO `borrow` (`borrow_id`, `user_id`, `equipment_id`, `borrow_date`, `return_date`, `deleted`) VALUES
(1, 3, 2, '2024-03-04 00:25:58', '2024-03-04 00:31:39', 1),
(2, 3, 2, '2024-03-04 00:35:10', NULL, 1),
(4, 4, 3, '2024-03-04 02:04:01', '2024-03-04 02:16:38', 1);

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `equipment_id` int(10) NOT NULL,
  `equipment` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=enable, 0=disable',
  `deleted` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`equipment_id`, `equipment`, `status`, `deleted`) VALUES
(1, 'ค้อน', 0, 1),
(2, 'ไขขวง', 1, 1),
(3, 'คีม', 1, 1),
(4, 'ใบเลื่อย', 1, 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leave_requests`
--

INSERT INTO `leave_requests` (`leave_requests_id`, `user_id`, `leave_type`, `description`, `start_date`, `end_date`, `status`, `deleted`) VALUES
(1, 3, 1, 'ไข้', '2024-03-02', '2024-03-02', 2, 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`position_id`, `position`, `deleted`) VALUES
(1, 'ช่างอิเล็กทรอนิกส์', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rank`
--

INSERT INTO `rank` (`rank_id`, `rank`, `rank_s`, `level`, `deleted`) VALUES
(1, 'พันจ่าอากาศตรี', 'พ.อ.ต.', 2, 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `responsible`
--

INSERT INTO `responsible` (`responsible_id`, `task_id`, `user_id`, `status`, `deleted`) VALUES
(1, 1, 3, 0, 1),
(2, 1, 0, 0, 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `title`, `description`, `schedule`, `status`, `deleted`) VALUES
(1, 'เดินป่า', 'เดินป่า', '2024-03-03 06:30:00', 1, 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `firstname`, `lastname`, `rank`, `position`, `email`, `tel`, `password`, `password_view`, `code_verify`, `role`, `status`, `img_path`, `deleted`) VALUES
(2, 'John', 'Doe', 7, 1, 'admin@gmail.com', '1234567890', '$2b$10$zxWC4bbNhQILDECr9FjoROUROdvCR/8wpW8VWRM9ie.FgPZ1IMQme', '123456', NULL, 1, 1, '1', 1),
(3, 'ณัฐวัตร', 'ทุ่งเย็น', 1, 1, 'nattawat@gmail.com', '1234567890', '$2b$10$sPAyiu05mLSPphEq7BZXO.6PjyGG6FNpUfPpGBNoDdHN19KvQoW3e', '123456', '502296', 3, 1, '1', 1),
(4, 'ปริญญา', 'เรืองจันทร์', 1, 1, 'parinya@gmail.com', '1234567890', '$2b$10$ui3kO/u.vpkFx7glOUDhL.ParfC5pXOjn6GJ79fNoM2LyCGmZrdua', '123456', '844196', 3, 1, '1', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `borrow`
--
ALTER TABLE `borrow`
  ADD PRIMARY KEY (`borrow_id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`equipment_id`);

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
-- AUTO_INCREMENT for table `borrow`
--
ALTER TABLE `borrow`
  MODIFY `borrow_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `equipment_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `leave_requests`
--
ALTER TABLE `leave_requests`
  MODIFY `leave_requests_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
  MODIFY `office_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `position_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rank`
--
ALTER TABLE `rank`
  MODIFY `rank_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `responsible`
--
ALTER TABLE `responsible`
  MODIFY `responsible_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `timeclock`
--
ALTER TABLE `timeclock`
  MODIFY `timeclock_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

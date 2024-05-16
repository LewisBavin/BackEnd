-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2024 at 11:27 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tradenice`
--

-- --------------------------------------------------------

--
-- Table structure for table `disputes`
--

CREATE TABLE `disputes` (
  `id` int(11) NOT NULL,
  `trade_id` int(11) NOT NULL,
  `dispute_user_id` int(11) NOT NULL,
  `dispute_counter_id` int(11) NOT NULL,
  `comment` varchar(128) NOT NULL,
  `user_agreed` tinyint(1) NOT NULL DEFAULT 0,
  `counter_agreed` tinyint(1) NOT NULL DEFAULT 0,
  `counter_rejected` tinyint(1) NOT NULL DEFAULT 0,
  `reject_comment` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `disputes`
--

INSERT INTO `disputes` (`id`, `trade_id`, `dispute_user_id`, `dispute_counter_id`, `comment`, `user_agreed`, `counter_agreed`, `counter_rejected`, `reject_comment`) VALUES
(10, 127, 44, 30, 'I indented to Sell to you, not Buy', 1, 0, 1, 'Sorry, we have already made financial descisions on the back of this trade');

-- --------------------------------------------------------

--
-- Table structure for table `nominations`
--

CREATE TABLE `nominations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `transput` varchar(1) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `volume` int(11) NOT NULL,
  `total_volume` int(11) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nominations`
--

INSERT INTO `nominations` (`id`, `user_id`, `transput`, `start_date`, `end_date`, `volume`, `total_volume`, `timestamp`) VALUES
(72, 44, 'I', '2024-05-16', '2024-06-30', 100000, 4600000, '2024-05-16 09:27:34'),
(73, 44, 'O', '2024-05-16', '2024-06-30', 25000, 1150000, '2024-05-16 09:27:35');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `counter_id` int(11) NOT NULL,
  `direction` varchar(1) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `volume` int(9) NOT NULL,
  `total_volume` int(9) NOT NULL,
  `price` decimal(9,2) NOT NULL,
  `pending` tinyint(1) NOT NULL DEFAULT 1,
  `rejected` tinyint(1) NOT NULL DEFAULT 0,
  `accepted` tinyint(1) NOT NULL DEFAULT 0,
  `timeout` tinyint(1) NOT NULL DEFAULT 0,
  `dispute` tinyint(1) NOT NULL DEFAULT 0,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `user_id`, `counter_id`, `direction`, `start_date`, `end_date`, `volume`, `total_volume`, `price`, `pending`, `rejected`, `accepted`, `timeout`, `dispute`, `timestamp`) VALUES
(124, 44, 30, 'S', '2024-05-16', '2024-05-31', 20000, 320000, 20.00, 1, 0, 0, 0, 0, '2024-05-16 09:29:48'),
(125, 44, 31, 'S', '2024-05-16', '2024-05-31', 80000, 1280000, 30.00, 1, 0, 0, 0, 0, '2024-05-16 09:29:48'),
(126, 44, 32, 'B', '2024-05-16', '2024-05-31', 20000, 320000, 25.00, 1, 0, 0, 0, 0, '2024-05-16 09:29:48'),
(127, 44, 30, 'B', '2024-05-16', '2024-05-31', 50000, 800000, 40.00, 0, 0, 1, 0, 0, '2024-05-16 09:37:49'),
(128, 44, 31, 'S', '2024-05-17', '2024-05-19', 15000, 45000, 50.00, 1, 0, 0, 0, 0, '2024-05-16 09:59:00');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(128) NOT NULL,
  `entry_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `token`, `entry_date`) VALUES
(113, 32, 'NH3DXWBS43kUJvmPsL7p', '2024-05-06 07:10:17'),
(125, 35, 'ZJj2KPzg1FLh2OberDoR', '2024-05-15 18:19:11'),
(127, 37, 'pl7X6o3wup2gStIKdZmN', '2024-05-15 18:20:23'),
(128, 38, 'F8tjB3eTmMTWsZefVbW7', '2024-05-15 18:23:32'),
(129, 39, '7SfJWvOcMB2ivfp37Emq', '2024-05-15 18:24:21'),
(130, 40, 'K18BV13J49I9E7I4lj0b', '2024-05-15 18:25:22'),
(131, 41, '5TISqJmvpwD1nyFXAxW2', '2024-05-15 18:26:41'),
(132, 42, 'tiXNBw63TlkhQCdH64eZ', '2024-05-15 18:27:22'),
(133, 43, 'f3lilrLE9NFoCA1opXKl', '2024-05-15 18:27:36'),
(135, 44, 'nlJkAhmIdvmSw7yvVkhT', '2024-05-16 08:23:15'),
(141, 44, '4J232JlFdu2kqJk6xRzc', '2024-05-16 08:43:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(30, 'TestSmith', 'test@smith.com', 'e236ca6438c923581ffd3c7bb172485f37ff388deb4ad9155af3f777e38f3134'),
(31, 'TestJones', 'test@jones.com', 'e236ca6438c923581ffd3c7bb172485f37ff388deb4ad9155af3f777e38f3134'),
(32, 'TestBrown', 'test@brown.com', 'e236ca6438c923581ffd3c7bb172485f37ff388deb4ad9155af3f777e38f3134'),
(44, 'TheJump', 'jump@jump.com', 'e236ca6438c923581ffd3c7bb172485f37ff388deb4ad9155af3f777e38f3134');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `disputes`
--
ALTER TABLE `disputes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `user_id` (`dispute_user_id`),
  ADD KEY `counter_id` (`dispute_counter_id`),
  ADD KEY `id_2` (`id`),
  ADD KEY `comment` (`comment`),
  ADD KEY `trade_dispute` (`trade_id`);

--
-- Indexes for table `nominations`
--
ALTER TABLE `nominations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `counter_id` (`counter_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `disputes`
--
ALTER TABLE `disputes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `nominations`
--
ALTER TABLE `nominations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `disputes`
--
ALTER TABLE `disputes`
  ADD CONSTRAINT `counter_dispute` FOREIGN KEY (`dispute_counter_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `trade_dispute` FOREIGN KEY (`trade_id`) REFERENCES `requests` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_dispute` FOREIGN KEY (`dispute_user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `nominations`
--
ALTER TABLE `nominations`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `counter_reqs` FOREIGN KEY (`counter_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_reqs` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `user_sessions` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

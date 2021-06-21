-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2021 at 11:16 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `minimaline`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_info`
--

CREATE TABLE `account_info` (
  `id` int(11) NOT NULL,
  `username` varchar(30) CHARACTER SET utf8mb4 NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text CHARACTER SET utf8mb4 NOT NULL,
  `role` varchar(7) CHARACTER SET utf8mb4 NOT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `store_name` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `manager_name` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `account_info`
--

INSERT INTO `account_info` (`id`, `username`, `email`, `password`, `role`, `manager_id`, `store_name`, `manager_name`, `location`, `logo`) VALUES
(5, 'miraboo', 'mohammira@gmail.com', '$2b$10$sL48jo5YoxbINCFuaQjxBe0j6z8sSvTeaAXzT6dl/e2K3GZ/b3qfe', 'manager', NULL, 'mira\'s store', 'mira', 'cebu', 'https://minimaline.s3.us-east-2.amazonaws.com/1155fa34f5c87ee0a20272762fc77dd9'),
(15, 'kjsdshjh', 'jdnsdjh@gmail.com', '$2b$10$807nIccbEWLa7kRmdceXHuAmY6PtVKQNXVN2aYpKaKo5d2IwJE5HG', 'manager', NULL, 'njdasnjdnjd', 'njdsnfhjsnd', 'njkdnsjn', ''),
(25, 'mohammira', 'mira@gmail.com', '$2b$10$AziYp0d.hBxqYu8AMx/m..LLkLXcxmxF0prvgZ5pUjANgbZ6LcFZ.', 'manager', NULL, 'store', 'manager', 'branch', ''),
(35, 'seth', 'slnemeno@up.edu.ph', '$2b$10$4noQa0g91UpIQ69IvlFrsu1t39f18Kw6TmWu8faszL2GE2JoPO5ju', 'manager', NULL, 'BedBugs', 'Seth', 'Babag', '');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `store_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `store_id`) VALUES
(5, 'Korean', 5),
(15, 'Chinese', 5),
(25, 'Japanese', 5);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `priority_type` char(10) CHARACTER SET utf8mb4 NOT NULL DEFAULT 'REGULAR',
  `dine_in` tinyint(1) NOT NULL,
  `queue_no` int(11) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'PENDING',
  `total_price` decimal(6,0) NOT NULL,
  `date` date NOT NULL,
  `store_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customer_order_list`
--

CREATE TABLE `customer_order_list` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `menu_info`
--

CREATE TABLE `menu_info` (
  `id` int(11) NOT NULL,
  `product` varchar(30) CHARACTER SET utf8mb4 NOT NULL,
  `price` decimal(6,0) NOT NULL,
  `category_id` int(11) NOT NULL,
  `availability` tinyint(1) NOT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `store_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `menu_info`
--

INSERT INTO `menu_info` (`id`, `product`, `price`, `category_id`, `availability`, `photo`, `store_id`) VALUES
(5, 'Mandu', '150', 5, 1, 'https://minimaline.s3.us-east-2.amazonaws.com/fca754fcb7763d38e247d078bb7f8f91', 5),
(15, 'Dolsot Bibimbap', '250', 5, 1, 'https://minimaline.s3.us-east-2.amazonaws.com/e77b923f17f02dad633af5ebecb56897', 5),
(25, 'Char Siu Wanton Noodles', '250', 15, 1, 'https://minimaline.s3.us-east-2.amazonaws.com/e9cb5d9e600e8c4f25acb1bb6c8453ae', 5),
(35, 'Buchi', '50', 15, 1, 'https://minimaline.s3.us-east-2.amazonaws.com/6c2b778818af00c26d44bfff67c95b22', 5),
(45, 'Xiao Long Bao', '300', 15, 1, 'https://minimaline.s3.us-east-2.amazonaws.com/e5c789e2af111aae522bf2c1085631d0', 5),
(55, '豚骨ラーメン', '400', 25, 1, 'https://minimaline.s3.us-east-2.amazonaws.com/30d45450c4606d476aac69c046ef88e9', 5),
(65, 'Gyoza', '200', 25, 0, 'https://minimaline.s3.us-east-2.amazonaws.com/e1fbe00ed36cc838721eafd7ea51ada4', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_info`
--
ALTER TABLE `account_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_order_list`
--
ALTER TABLE `customer_order_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_info`
--
ALTER TABLE `menu_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_info`
--
ALTER TABLE `account_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_order_list`
--
ALTER TABLE `customer_order_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu_info`
--
ALTER TABLE `menu_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

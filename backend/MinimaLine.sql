-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 08, 2021 at 06:45 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `MinimaLine`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_info`
--

CREATE TABLE `account_info` (
  `id` int(11) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `role` varchar(7) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `store_name` varchar(30) DEFAULT NULL,
  `manager_name` varchar(30) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `logo` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account_info`
--

INSERT INTO `account_info` (`id`, `username`, `email`, `password`, `role`, `store_id`, `store_name`, `manager_name`, `location`, `logo`) VALUES
(1, 'daisy', 'daisy@gmail.com', 'daisy1234', 'manager', NULL, '', '', '', ''),
(2, 'toti', 'toti@gmail.com', 'toti123', 'manager', NULL, '', '', '', ''),
(3, 'ren_amores', 'ren@gmail.com', 'ren1234', 'manager', NULL, '', '', '', ''),
(4, 'seth', 'seth@gmail.com', 'seth1234', 'manager', NULL, '', '', '', ''),
(5, 'mira', 'mira@gmail.com', 'mira1234', 'manager', NULL, '', '', '', ''),
(6, 'miraboo', 'mohammira@gmail.com', 'mira1234', 'manager', NULL, '', '', '', ''),
(7, 'daisyjane', 'dsbolivar@gmail.com', '123456', 'manager', NULL, '', '', '', ''),
(8, 'kelvinyong', 'kyong@gmail.com', 'kyyong', 'manager', NULL, '', '', '', ''),
(9, 'kelvinold', 'toti1234@gmail.com', 'toti12345', 'manager', NULL, '', '', '', ''),
(12, 'kelvinyong1', 'kelvinyong1@gmail.com', 'kelvinyong1', 'manager', NULL, NULL, NULL, NULL, NULL),
(14, 'kelvinyong2', 'kelvinyong2@gmail.com', 'kelvinyong2', 'manager', NULL, NULL, NULL, NULL, NULL),
(15, 'kelvinyong3', 'kelvinyong3@gmail.com', 'kelvinyong3', 'manager', NULL, NULL, NULL, NULL, NULL),
(17, 'miraboooo', 'mmohammad@up.edu.ph', 'berikyuu1234', 'manager', NULL, 'mystore', 'manager', 'mybranch', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `all_orders`
--

CREATE TABLE `all_orders` (
  `id` int(11) NOT NULL,
  `customer_num` int(11) DEFAULT NULL,
  `queue` int(11) DEFAULT NULL,
  `status` char(10) NOT NULL DEFAULT 'PENDING',
  `store_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cancelled_orders`
--

CREATE TABLE `cancelled_orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `store_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `store_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `store_id`) VALUES
(1, 'Dessert', NULL),
(2, 'Drinks', NULL),
(3, 'Mains', NULL),
(4, 'Appetizers', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `priority_type` char(10) NOT NULL DEFAULT 'REGULAR',
  `dine_in` tinyint(1) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customer_order`
--

CREATE TABLE `customer_order` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `queue_no` int(11) DEFAULT NULL,
  `status` char(10) NOT NULL DEFAULT 'PENDING',
  `total_price` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customer_order_list`
--

CREATE TABLE `customer_order_list` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product` varchar(30) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `menu_info`
--

CREATE TABLE `menu_info` (
  `id` int(11) NOT NULL,
  `product` varchar(30) DEFAULT NULL,
  `price` decimal(6,0) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `photo` mediumblob DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menu_info`
--

INSERT INTO `menu_info` (`id`, `product`, `price`, `category_id`, `availability`, `photo`, `store_id`) VALUES
(1, 'Ice Cream', '50', 1, 0, NULL, NULL),
(2, 'Iced Tea', '30', 2, 1, NULL, NULL),
(3, 'Spaghetti', '150', 3, 1, NULL, NULL),
(4, 'Fries', '30', 4, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pending_orders`
--

CREATE TABLE `pending_orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `store_info`
--

CREATE TABLE `store_info` (
  `id` int(11) NOT NULL,
  `store_name` varchar(30) DEFAULT NULL,
  `manager_name` varchar(30) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `logo` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `store_info`
--

INSERT INTO `store_info` (`id`, `store_name`, `manager_name`, `location`, `logo`) VALUES
(1, 'store', 'manager', 'branch', NULL),
(2, 'ren', 'ren', 'cebu', NULL),
(3, 'seth', 'seth nemeno', 'mactan', NULL),
(4, 'mira', 'mira mohammad', 'cebu', NULL),
(5, 'store1', 'manager1', 'branch1', NULL),
(6, 'daisy', 'daisy bolivar', 'guadalupe', NULL),
(7, 'totistore', 'toti', 'cebu', NULL),
(8, 'store4', 'manager4', 'branch4', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_info`
--
ALTER TABLE `account_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `all_orders`
--
ALTER TABLE `all_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customer_order` (`customer_num`);

--
-- Indexes for table `cancelled_orders`
--
ALTER TABLE `cancelled_orders`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `customer_order`
--
ALTER TABLE `customer_order`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `queue_no` (`queue_no`),
  ADD UNIQUE KEY `customer_id` (`customer_id`);

--
-- Indexes for table `customer_order_list`
--
ALTER TABLE `customer_order_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product` (`product`);

--
-- Indexes for table `menu_info`
--
ALTER TABLE `menu_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product` (`product`);

--
-- Indexes for table `pending_orders`
--
ALTER TABLE `pending_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_info`
--
ALTER TABLE `store_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_info`
--
ALTER TABLE `account_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `all_orders`
--
ALTER TABLE `all_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cancelled_orders`
--
ALTER TABLE `cancelled_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_order`
--
ALTER TABLE `customer_order`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pending_orders`
--
ALTER TABLE `pending_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `store_info`
--
ALTER TABLE `store_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account_info`
--
ALTER TABLE `account_info`
  ADD CONSTRAINT `account_info_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store_info` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

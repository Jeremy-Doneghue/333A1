-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 08, 2017 at 10:42 AM
-- Server version: 5.6.35
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `333A1`
--

-- --------------------------------------------------------

--
-- Table structure for table `FavouriteStocks`
--

CREATE TABLE `FavouriteStocks` (
  `user` int(11) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `FavouriteStocks`
--

INSERT INTO `FavouriteStocks` (`user`, `stock`) VALUES
(1, 3),
(1, 2),
(2, 4),
(2, 6),
(3, 1),
(3, 5),
(4, 3),
(4, 4),
(2, 2),
(2, 3),
(2, 1),
(2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Notes`
--

CREATE TABLE `Notes` (
  `user` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `note` text NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Notes`
--

INSERT INTO `Notes` (`user`, `stock`, `note`, `id`) VALUES
(1, 1, 'This is the best stock!', 1),
(4, 3, 'This is a good stock.', 2),
(4, 4, 'This stock is alright.', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Stocks`
--

CREATE TABLE `Stocks` (
  `companyname` varchar(30) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `currentprice` decimal(11,2) NOT NULL,
  `recentchange` decimal(11,2) NOT NULL,
  `annualtrend` varchar(5) NOT NULL,
  `recentchangedirection` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Stocks`
--

INSERT INTO `Stocks` (`companyname`, `id`, `currentprice`, `recentchange`, `annualtrend`, `recentchangedirection`) VALUES
('ABC Company', 1, '0.40', '0.02', 'Up', 'Up'),
('XYZ Logistics', 2, '1.00', '0.05', 'Down', 'Down'),
('Acme Publishing', 3, '1.33', '0.08', 'Up', 'Down'),
('Fling Fing', 4, '0.94', '0.11', 'Down', 'Up'),
('Neutral Networks', 5, '1.25', '0.40', 'Up', 'Up'),
('Total Solutions Inc', 6, '0.55', '0.01', 'Down', 'Up');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `username` varchar(30) NOT NULL,
  `uid` int(11) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`username`, `uid`, `password`) VALUES
('Fred', 1, 'freddo'),
('Jo', 2, 'jobo'),
('Judy', 3, 'judyb'),
('Bill', 4, 'bilbo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `FavouriteStocks`
--
ALTER TABLE `FavouriteStocks`
  ADD KEY `user` (`user`),
  ADD KEY `stock` (`stock`);

--
-- Indexes for table `Notes`
--
ALTER TABLE `Notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `stock` (`stock`);

--
-- Indexes for table `Stocks`
--
ALTER TABLE `Stocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Notes`
--
ALTER TABLE `Notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Stocks`
--
ALTER TABLE `Stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `FavouriteStocks`
--
ALTER TABLE `FavouriteStocks`
  ADD CONSTRAINT `favouritestocks_ibfk_1` FOREIGN KEY (`user`) REFERENCES `Users` (`uid`),
  ADD CONSTRAINT `favouritestocks_ibfk_2` FOREIGN KEY (`stock`) REFERENCES `Stocks` (`id`);

--
-- Constraints for table `Notes`
--
ALTER TABLE `Notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user`) REFERENCES `Users` (`uid`),
  ADD CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`stock`) REFERENCES `Stocks` (`id`);


-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2025 at 05:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrmanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `NewsId` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Category` varchar(100) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `Attachment` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT current_timestamp(),
  `isPinned` tinyint(1) DEFAULT 0,
  `FieldList` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`NewsId`, `Title`, `Category`, `Content`, `Attachment`, `CreatedAt`, `isPinned`, `FieldList`) VALUES
(1, 'ประกาศหยุดวันแรงงาน', 'Announcement', 'บริษัทจะหยุดทำการในวันที่ 1 พฤษภาคม เนื่องในวันแรงงานแห่งชาติ', 'holiday_announcement.pdf', '2023-04-25 09:00:00', 0, NULL),
(2, 'เปิดอบรมระบบ HRMS รุ่นที่ 2', 'Activity', 'เปิดรับลงทะเบียนอบรมระบบ HRMS สำหรับพนักงานใหม่ เริ่มอบรม 10 พ.ค.', 'hrms_training_v2.pdf', '2023-04-26 10:30:00', 0, NULL),
(3, 'แจ้งเปลี่ยนแปลงกะทำงานเดือนพฤษภาคม', 'Announcement', 'มีการเปลี่ยนแปลงเวลาการเข้ากะสำหรับแผนกผลิต กรุณาตรวจสอบ', 'shift_may_update.pdf', '2023-04-27 14:00:00', 0, NULL),
(4, 'ประกาศแต่งตั้งหัวหน้าแผนกใหม่', 'Announcement', 'ขอแสดงความยินดีกับคุณสมชาย ได้รับตำแหน่งหัวหน้าแผนกวิจัย', NULL, '2023-04-28 11:45:00', 0, NULL),
(5, 'กิจกรรม Big Cleaning Day', 'Activity', 'ขอเชิญพนักงานร่วมกิจกรรม Big Cleaning Day วันที่ 12 พ.ค.', 'bigcleaning.pdf', '2023-04-28 16:10:00', 0, NULL),
(6, 'รายงานผลประกวดออกแบบบูธ', 'Activity', 'ทีมการตลาดคว้ารางวัลชนะเลิศการประกวดบูธประจำปี', NULL, '2023-04-29 09:00:00', 0, NULL),
(7, 'แจ้งกำหนดการตรวจสุขภาพประจำปี', 'Announcement', 'ขอให้พนักงานทุกคนตรวจสอบรอบเวลาตรวจสุขภาพตามแผนก', 'health_checkup.pdf', '2023-04-30 10:15:00', 0, NULL),
(8, 'ศึกหุบเขาหลัวสุ่ย: กองทัพเว่ยทำลายฉู่ในยามรุ่งอรุณ', 'Announcement', 'รุ่งสาง ณ หุบเขาหลัวสุ่ย เสียงกลองศึกกึกก้องทั่วพื้นปฐพี กองทัพเว่ยภายใต้การนำของแม่ทัพโหวอิง ตระเตรียมกำลังพลนับแสนในรูปขบวนพิฆาต หลังผ่านการวางแผนซุ่มโจมตีนานกว่าเจ็ดวันเจ็ดคืน กองทัพเว่ยได้บุกเข้าโจมตีค่ายหลักของรัฐฉู่ในยามที่หมอกปกคลุมหนาทึบ การโจมตีอย่างฉับพลันทำให้ทหารรัฐฉู่ไร้การเตรียมตัว ค่ายแตกพ่ายในเวลาเพียงครึ่งชั่วยาม แม่ทัพใหญ่รัฐฉู่ถูกบีบถอยร่นไปยังแนวภูเขาตอนเหนือ สูญเสียเสบียงและอาวุธมหาศาล ประชาชนในพื้นที่แตกตื่นลี้ภัยจำนวนมาก เหล่าปราชญ์ต่างลงความเห็นว่านี่คือความพ่ายแพ้ที่ย่อยยับที่สุดในรอบหลายสิบปีของรัฐฉู่ ก่อให้เกิดการเปลี่ยนแปลงขั้วอำนาจครั้งใหญ่ในลุ่มน้ำแยงซี!', 'intranet_guide.pdf', '2023-05-01 13:30:00', 0, NULL),
(9, 'กิจกรรมจับสลากของขวัญปีใหม่', 'Activity', 'กิจกรรมจับของขวัญปีใหม่จะจัดขึ้นวันที่ 28 ธ.ค.', 'newyear_gift.pdf', '2023-05-02 15:00:00', 0, NULL),
(10, 'อัปเดตสิทธิ์วันลาพักร้อนปี 2023', 'Announcement', 'พนักงานสามารถตรวจสอบสิทธิ์วันลาพักร้อนประจำปีได้ใน HR Portal', NULL, '2023-05-03 09:20:00', 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`NewsId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `NewsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

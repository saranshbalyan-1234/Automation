/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : Main

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 23/12/2022 23:56:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for actionevents
-- ----------------------------
DROP TABLE IF EXISTS `actionevents`;
CREATE TABLE `actionevents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `object` tinyint(1) NOT NULL DEFAULT '0',
  `parameter1` varchar(255) DEFAULT NULL,
  `parameter2` varchar(255) DEFAULT NULL,
  `parameter3` varchar(255) DEFAULT NULL,
  `parameter4` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of actionevents
-- ----------------------------
BEGIN;
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (1, 'Launch Website', 0, 'URL', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (2, 'Click', 1, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (3, 'Wait', 0, 'Time', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (4, 'Enter Text', 1, 'Text', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (5, 'Enter Password', 1, 'Password', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (6, 'Maximize Browser', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (7, 'Close Browser', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (8, 'Wait Until Object Enabled', 1, 'Timeout', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (9, 'Wait Until Object Disabled', 1, 'Timeout', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (10, 'Wait Until Object Selected', 1, 'Timeout', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (11, 'Wait Until Object Not Selected', 1, 'Timout', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (12, 'Wait Until Object Located', 1, 'Timeout', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (13, 'Wait Until Objects Located', 1, 'Timeout', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (14, 'Wait Until Object Visible', 1, 'Timeout', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (15, 'Wait Until Object Not Visible', 1, 'Timeout', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (16, 'Wait Until Object Text Contains', 1, 'Timeout', 'String', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (17, 'Wait Until Object Text Is', 1, 'Timeout', 'String', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (18, 'Wait Until Object Text Matches', 1, 'Timeout', 'RegEx', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (19, 'Wait Until Object Staleness Of', 1, 'Timeout', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (20, 'Wait Until Title Contains', 1, 'Timeout', 'RegEx', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (21, 'Wait Until Title Is', 1, 'Timeout', 'String', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (22, 'Wait Until Title Matches', 1, 'Timeout', 'RegEx', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (23, 'Wait Until Url Contains', 1, 'Timeout', 'String', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (24, 'Wait Until Url Is', 1, 'Timeout', 'String', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (25, 'Wait Until Url Matches', 1, 'Timeout', 'RegEx', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (26, 'Wait Until Alert Present', 0, 'Timeout', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (27, 'Wait Until Able To Switch Frame', 1, 'Timeout', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (28, 'Press Button', 1, 'Button', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (29, 'Double Click', 1, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (30, 'Right Click', 1, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (31, 'Refresh Page', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (32, 'Generate Random Number', 0, 'Length', 'Output', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (33, 'Console Log', 0, 'Value', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (34, 'Get Page Title', 0, 'Output', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (35, 'Clear Input', 1, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (36, 'Scroll To Object', 1, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (37, 'Scroll To End', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (38, 'Scroll To Top', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (39, 'Click By Javascript', 1, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (40, 'Click Link By Text', 0, 'Text', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (41, 'Click Link By Partial Text', 0, 'Text', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (42, 'Hover Mouse', 1, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (43, 'Copy Text', 0, 'Text', 'Output', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (44, 'Copy Password', 0, 'Password', 'Output', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (45, 'Combine String', 0, 'Value1', 'Value2', 'Output', NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (46, 'Get Current Date Time', 0, 'Output', '', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (47, 'If', 0, 'Value1', 'Condition', 'Value2', NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (48, 'Else If', 0, 'Value1', 'Condition', 'Value2', NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (49, 'End Condition', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (50, 'Else', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (51, 'Collect Text', 1, 'Output', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (52, 'Collect Object CSS Property', 1, 'Attribute', 'Output', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (53, 'Collect Object Property', 1, 'Attribute', 'Output', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (54, 'Convert To String', 0, 'Value', 'Output', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (55, 'Convert To Number', 0, 'Value', 'Output', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (56, 'Convert To Integer', 0, 'Value', 'Output', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (57, 'Convert To DateTime', 0, 'Value', 'Output', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (58, 'Convert To Hex', 0, 'Value', 'Output', NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (59, 'Select Option By Value', 1, 'Value', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (60, 'Select Option By Position', 1, 'Position', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (61, 'Switch To Frame', 1, '', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (62, 'Switch To Default Frame', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (63, 'For Loop', 0, 'Initial', 'Final', 'Counter', NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (64, 'End For Loop', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (65, 'Break For Loop', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (66, 'Skip For Loop Iteration', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (67, 'Accespt Alert', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (68, 'Dismiss Alert', 0, NULL, NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (69, 'Get Alert Message', 0, 'Output', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (70, 'Enter Text In Alert', 0, 'Text', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (71, 'Collect Cell Value From Table', 1, 'Row', 'Column', 'Output', NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (72, 'Upload File', 1, 'Path', NULL, NULL, NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (73, 'Copy Substring', 0, 'Value', 'StartIndex', 'EndIndex', 'Output');
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (74, 'Get Date Time', 0, 'DateTime', 'Output', '', NULL);
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (75, 'Add Date Time', 0, 'DateTime', 'Day Month Year', 'Hour Min Sec', 'Output');
INSERT INTO `actionevents` (`id`, `name`, `object`, `parameter1`, `parameter2`, `parameter3`, `parameter4`) VALUES (76, 'Enter Date Time', 1, 'DateTime', 'Format', NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

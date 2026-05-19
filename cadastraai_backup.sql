-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: sistema-usuarios
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_de_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `tipo` varchar(20) DEFAULT 'comum',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `telefone` (`telefone`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'João Pedro ','joao@gmail.com','31999999999','12345678','2026-04-27 23:41:33','admin'),(2,'Cleuza Maria','cleuza@gmail.com','31999999991','23456789','2026-04-27 23:43:00','admin'),(3,'Sueli Maria','sueli@gmail.com','31999999992','34567890','2026-04-27 23:46:03','admin'),(4,'Lucas Eduardo','lucas@gmail.com','31999999993','45678901','2026-04-29 21:22:58','comum'),(5,'Miguel Lucas','Miguel@gmail.com','31999999994','11223344','2026-04-29 21:24:51','comum'),(6,'Victor Eduardo','victor@gmail.com','31999999995','22334455','2026-04-29 21:26:08','comum'),(7,'Franciele Cristina ','franciele@gmail.com','31999999996','33445566','2026-04-29 21:29:20','comum'),(10,'Fernanda Kelly','fernanda@gmail.com','31999999997','44556677','2026-04-29 21:49:13','comum'),(18,'Graciele Simone','graciele@gmail.com','31999999998','55667788','2026-04-29 22:07:23','comum'),(21,'Alexandra Maria','alexandra@gmail.com','31999999910','66778899','2026-04-30 13:15:09','comum'),(22,'Francisco José','francisco@gmail.com','31999999911','77889900','2026-04-30 13:55:21','comum'),(34,'admin','admin@sistema.com','31999999915','87654321','2026-05-02 18:48:49','admin'),(45,'Gabriel Lucas','gabriel@gmail.com','31999999918','23090909','2026-05-08 22:00:03','comum');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-18 21:53:00

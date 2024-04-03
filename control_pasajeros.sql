-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-04-2024 a las 23:09:55
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `control_pasajeros`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `nombre_completo` varchar(255) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id_admin`, `nombre_completo`, `usuario`, `password`) VALUES
(1, 'Agustin Villarroel', 'agustin', '$2b$10$ej.GHutPdOhWNTD2EO3P.eIPMUeKcqq3Up42Cjx2mslfdJuMBPihi');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `id_traslado` int(11) DEFAULT NULL,
  `id_trabajador` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `asistencia` varchar(255) DEFAULT NULL,
  `comentario` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductores`
--

CREATE TABLE `conductores` (
  `id_conductor` int(11) NOT NULL,
  `nombre_completo` varchar(255) NOT NULL,
  `telefono` int(11) NOT NULL,
  `id_vehiculo` int(11) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `conductores`
--

INSERT INTO `conductores` (`id_conductor`, `nombre_completo`, `telefono`, `id_vehiculo`, `usuario`, `password`) VALUES
(1, 'Alfonso villarroel', 912341234, 1, 'chofer1', '$2b$10$.DBz8OGfaaxe1lRYfftOxuvbAKINH2vlWoMCVCjmn8Nd3kezwRt0K'),
(3, 'Andres Villarroel', 912341234, 4, 'chofer2', '$2b$10$HM94/00rlY1LKT2mjbevbePwKF5SsgBIvYvacOhu5sc1TXtiABbAG'),
(4, 'Antonio Villarroel', 912341234, 3, 'chofer3', '$2b$10$Wm5yajyjH2/TykIIrJwste8l0cJTFiG5UdE/QYgPniR/ukNLnBmIm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajadores`
--

CREATE TABLE `trabajadores` (
  `id_trabajador` int(11) NOT NULL,
  `nombre_completo` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` int(11) NOT NULL,
  `transporte` varchar(10) NOT NULL,
  `tipo_empresa` varchar(10) NOT NULL,
  `estado` varchar(10) NOT NULL,
  `viaja_ida` varchar(10) NOT NULL,
  `viaja_vuelta` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trabajadores`
--

INSERT INTO `trabajadores` (`id_trabajador`, `nombre_completo`, `direccion`, `telefono`, `transporte`, `tipo_empresa`, `estado`, `viaja_ida`, `viaja_vuelta`) VALUES
(1, 'Juan Perez', 'Manantiales 0143', 912341234, 'van-1', 'EST', 'inactivo', 'si', 'si'),
(3, 'Sofía García', 'Avenida Bulnes 123', 912345678, 'van-1', 'EST', 'activo', 'si', 'si'),
(4, 'Mateo Rodríguez', 'Calle Magallanes 456', 912348765, 'van-1', 'TP', 'activo', 'si', 'si'),
(5, 'Valentina Martínez', 'Pasaje Croacia 789', 912356789, 'van-1', 'TP', 'activo', 'si', 'no'),
(6, 'Santiago López', 'Plaza de Armas 101', 912367890, 'van-1', 'TP', 'activo', 'no', 'si'),
(7, 'Isabella González', 'Avenida España 234', 912378901, 'van-2', 'TP', 'activo', 'si', 'si'),
(8, 'Sebastián Pérez', 'Calle O\'Higgins 567', 912387654, 'van-2', 'EST', 'activo', 'si', 'no'),
(9, 'Camila Hernández', 'Pasaje Portugal 890', 912394567, 'van-2', 'EST', 'activo', 'si', 'si'),
(10, 'Samuel Gómez', 'Calle Independencia 112', 912405678, 'van-2', 'TP', 'activo', 'si', 'no'),
(11, 'Victoria Díaz', 'Avenida Colón 345', 912416789, 'van-2', 'TP', 'activo', 'no', 'si'),
(12, 'Daniel Castro', 'Pasaje Uruguay 678', 912427890, 'van-2', 'TP', 'activo', 'si', 'si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `traslados`
--

CREATE TABLE `traslados` (
  `id_traslado` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `nombre_conductor` varchar(255) DEFAULT NULL,
  `vehiculo` varchar(255) NOT NULL,
  `valor_por_persona` decimal(10,2) DEFAULT NULL,
  `tipo_viaje` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valortaxi`
--

CREATE TABLE `valortaxi` (
  `id` int(11) NOT NULL,
  `valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valortaxi`
--

INSERT INTO `valortaxi` (`id`, `valor`) VALUES
(1, 15000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valorvan`
--

CREATE TABLE `valorvan` (
  `id` int(11) NOT NULL,
  `valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valorvan`
--

INSERT INTO `valorvan` (`id`, `valor`) VALUES
(1, 53000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id_vehiculo` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `patente` varchar(255) NOT NULL,
  `capacidad` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id_vehiculo`, `nombre`, `patente`, `capacidad`) VALUES
(1, 'van-1', 'BB-CL-34', 8),
(3, 'taxi-1', 'TX-D4-2F', 4),
(4, 'van-2', 'LF-12-QK', 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD KEY `id_trabajador` (`id_trabajador`),
  ADD KEY `fk_asistencia_traslados` (`id_traslado`);

--
-- Indices de la tabla `conductores`
--
ALTER TABLE `conductores`
  ADD PRIMARY KEY (`id_conductor`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `fk_conductores_vehiculos` (`id_vehiculo`);

--
-- Indices de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD PRIMARY KEY (`id_trabajador`);

--
-- Indices de la tabla `traslados`
--
ALTER TABLE `traslados`
  ADD PRIMARY KEY (`id_traslado`);

--
-- Indices de la tabla `valortaxi`
--
ALTER TABLE `valortaxi`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `valorvan`
--
ALTER TABLE `valorvan`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id_vehiculo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `conductores`
--
ALTER TABLE `conductores`
  MODIFY `id_conductor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  MODIFY `id_trabajador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `traslados`
--
ALTER TABLE `traslados`
  MODIFY `id_traslado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `valortaxi`
--
ALTER TABLE `valortaxi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `valorvan`
--
ALTER TABLE `valorvan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id_vehiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`id_traslado`) REFERENCES `traslados` (`id_traslado`),
  ADD CONSTRAINT `asistencia_ibfk_2` FOREIGN KEY (`id_trabajador`) REFERENCES `trabajadores` (`id_trabajador`),
  ADD CONSTRAINT `fk_asistencia_traslados` FOREIGN KEY (`id_traslado`) REFERENCES `traslados` (`id_traslado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `conductores`
--
ALTER TABLE `conductores`
  ADD CONSTRAINT `fk_conductores_vehiculos` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculos` (`id_vehiculo`);

--
-- Filtros para la tabla `traslados`
--
ALTER TABLE `traslados`
  ADD CONSTRAINT `traslados_ibfk_1` FOREIGN KEY (`id_traslado`) REFERENCES `asistencia` (`id_traslado`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

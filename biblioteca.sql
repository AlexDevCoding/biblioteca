-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-08-2024 a las 19:12:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL,
  `cedula` int(8) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `curso` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `fecha_ingreso` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `cedula`, `nombre`, `apellido`, `curso`, `telefono`, `fecha_ingreso`) VALUES
(7, 12572657, 'Carlos', 'Ramirez', 'Canvas', '04244669982', '2024-03-05'),
(8, 12572658, 'Sofia', 'Castillo', 'Ofimática', '04244669983', '2024-03-15'),
(9, 12572659, 'Pedro', 'Vargas', 'PowerPoint', '04244669984', '2024-03-25'),
(10, 12572660, 'Isabel', 'Mendoza', 'Excel', '04244669985', '2024-04-05'),
(11, 12572661, 'Enrique', 'Castro', 'Canvas', '04244669986', '2024-04-15'),
(12, 12572662, 'Gabriela', 'Torres', 'Ofimática', '4244669985', '2024-04-25'),
(13, 12572663, 'Rodrigo', 'Lopez', 'PowerPoint', '04244669988', '2024-05-05'),
(14, 12572664, 'Beatriz', 'Ortega', 'Excel', '04244669989', '2024-05-15'),
(15, 12572665, 'Javier', 'Salazar', 'Canvas', '04244669990', '2024-05-25'),
(16, 12572666, 'Claudia', 'Morales', 'Ofimática', '04244669991', '2024-06-05'),
(17, 12572667, 'Miguel', 'Aguirre', 'PowerPoint', '04244669992', '2024-06-15'),
(18, 12572668, 'Patricia', 'Rios', 'Excel', '04244669993', '2024-06-25'),
(19, 12572669, 'Fernando', 'Arias', 'Canvas', '04244669994', '2024-07-05'),
(20, 12572670, 'Lorena', 'Soto', 'Ofimática', '04244669995', '2024-07-15'),
(21, 12572671, 'Antonio', 'Martinez', 'PowerPoint', '04244669996', '2024-07-25'),
(22, 12572672, 'Silvia', 'Garcia', 'Excel', '04244669997', '2024-08-05'),
(23, 12572673, 'Carlos', 'Naranjo', 'Canvas', '04244669998', '2024-08-15'),
(24, 12572674, 'Daniela', 'Rodriguez', 'Ofimática', '04244669999', '2024-08-25'),
(25, 12572675, 'Jose', 'Lopez', 'PowerPoint', '04244670000', '2024-09-05'),
(26, 12572676, 'Laura', 'Lopez', 'Excel', '04244670001', '2024-09-15'),
(27, 12572677, 'Samuel', 'Castro', 'Canvas', '04244670002', '2024-09-25'),
(28, 12572678, 'Raquel', 'Morales', 'Ofimática', '04244670003', '2024-10-05'),
(29, 12572679, 'Felipe', 'Herrera', 'PowerPoint', '04244670004', '2024-10-15'),
(30, 12572680, 'Natalia', 'Perez', 'Excel', '04244670005', '2024-10-25'),
(31, 12572681, 'Oscar', 'Castro', 'Canvas', '04244670006', '2024-11-05'),
(32, 12572682, 'Monica', 'Salazar', 'Ofimática', '04244670007', '2024-11-15'),
(33, 12572683, 'Marcelo', 'Jaramillo', 'PowerPoint', '04244670008', '2024-11-25'),
(34, 12572684, 'Victoria', 'Rios', 'Excel', '04244670009', '2024-12-05'),
(35, 12572685, 'Eduardo', 'Martinez', 'Canvas', '04244670010', '2024-12-15'),
(36, 12572686, 'Lucia', 'Garcia', 'Excel', '4244670011', '2024-12-25'),
(37, 12572687, 'Hugo', 'Bermudez', 'Excel', '04244670012', '2024-01-10'),
(38, 12572688, 'Elena', 'Gonzalez', 'Canvas', '04244670013', '2024-02-10'),
(39, 12572689, 'Oscar', 'Martinez', 'Ofimática', '04244670014', '2024-03-10'),
(40, 12572690, 'Nina', 'Paredes', 'PowerPoint', '04244670015', '2024-04-10'),
(41, 12572691, 'Raul', 'Vera', 'Excel', '04244670016', '2024-05-10'),
(42, 12572692, 'Carmen', 'Salas', 'Canvas', '04244670017', '2024-06-10'),
(43, 12572693, 'Esteban', 'Cuellar', 'Ofimática', '04244670018', '2024-07-10'),
(44, 12572694, 'Gabriela', 'Rodriguez', 'PowerPoint', '04244670019', '2024-08-10'),
(46, 12572696, 'Lucia', 'Castillo', 'Canvas', '04244670021', '2024-10-10'),
(47, 31480980, 'jose', 'gonzales', 'PowerPoint', '04243164919', '2024-01-01'),
(48, 27820271, 'luis', 'carrizales', 'PowerPoint', '04243164910', '2024-01-01'),
(49, 27820274, 'Lucia', 'Castillo', 'PowerPoint', '04243164920', '2024-01-01'),
(50, 32450980, 'Victor', 'Crrillo', 'PowerPoint', '04243164954', '2024-01-01'),
(51, 31480410, 'Josue', 'rodrigue', 'PowerPoint', '04243164910', '2024-01-01'),
(52, 96894812, 'asdasd', 'asdasd', 'PowerPoint', '0424167864', '2024-01-01'),
(53, 96894811, 'asdasd', 'asdasd', 'PowerPoint', '0424167864', '2024-01-01'),
(54, 31480481, 'Josue', 'Henriquez', 'PowerPoint', '04243164809', '2024-01-01'),
(55, 31480220, 'miguel', 'ruiz', 'Canvas', '04243164917', '2024-01-01'),
(56, 31480210, 'Josue', 'Henriquez', 'Excel', '04243164917', '2024-01-01'),
(57, 31485052, 'alexander', 'herniques', 'Excel', '04243164971', '2024-02-01'),
(58, 31485051, 'asdasd', 'asdasdasd', 'Excel', '04243164970', '2024-01-01'),
(59, 31485050, 'alexander', 'herniques', 'Excel', '04243164971', '2024-09-01'),
(60, 31485020, 'sadasd', 'asdasdasd', 'Excel', '04243164960', '2024-08-01'),
(61, 27820278, 'jose', 'acosta', 'PowerPoint', '04243164918', '2024-01-02'),
(62, 27820261, 'jose', 'acosta', 'Excel', '04243164918', '2024-01-01'),
(63, 27820250, 'jose', 'acosta', 'PowerPoint', '04243164918', '2024-01-01'),
(64, 27820480, 'jose', 'acosta', 'PowerPoint', '04243164918', '2024-01-01'),
(65, 27820210, 'jose', 'acosta', 'Excel', '04243164918', '2024-01-02'),
(66, 27820240, 'jose', 'acosta', 'PowerPoint', '04243164918', '2024-01-01'),
(67, 27820220, 'jose', 'acosta', 'Excel', '04243164918', '2024-01-01'),
(68, 27820101, 'jose', 'acosta', 'Excel', '04243164918', '2024-01-01'),
(69, 27820201, 'jose', 'acosta', 'PowerPoint', '04243164918', '2024-01-01'),
(70, 27820358, 'jose', 'acosta', 'PowerPoint', '04243164918', '2024-01-01'),
(71, 27820352, 'jose', 'acosta', 'PowerPoint', '04243164918', '2024-01-01'),
(72, 27820228, 'jose', 'acosta', 'Excel', '04243164918', '2024-01-01'),
(73, 27820489, 'jose', 'acosta', 'Excel', '04243164918', '2024-08-01'),
(74, 27820110, 'jose', 'acosta', 'Excel', '04243164310', '2024-08-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `usuario`, `correo`, `contrasena`) VALUES
(6, 'josue', 'henriquez', 'zona gamers', 'henriquezjosue384@gmail.com', '$2y$10$OgUJhAM7/K3dVUAc7IRbQOwMdpiMkoV6xJPWLgM863BuUWvODGvYa'),
(7, 'josue', 'henriquez', 'zona gamersasdsad', 'henriquezjosue384213@gmail.com', '$2y$10$BvK39Jawwk1/67VVdGIxeeV/sKLh2iu0c7mn.SkTgvN6KzUgbJFv2'),
(8, 'sadsad', 'Henriquez', 'explosion544', 'henriquezjosue3845@gmail.com', '$2y$10$pukr4e70/38J57NxHE24Ke5VnXffQtfXKDy4CnxeewFKV6h2.APjK');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

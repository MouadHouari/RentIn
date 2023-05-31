-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2023 at 10:42 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentin`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_04_24_193119_create_voitures_table', 1),
(7, '2023_05_16_085254_create_offres_table', 2),
(13, '2023_05_22_192503_create_reservations_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `offres`
--

CREATE TABLE `offres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `agence_id` bigint(20) UNSIGNED NOT NULL,
  `voiture_id` bigint(20) UNSIGNED NOT NULL,
  `ville` varchar(255) NOT NULL,
  `prix` smallint(5) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  `etat` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `offres`
--

INSERT INTO `offres` (`id`, `agence_id`, `voiture_id`, `ville`, `prix`, `description`, `etat`, `created_at`, `updated_at`) VALUES
(1, 4, 2, 'Salé', 1350, 'Bonne voiture pour louer sportive et puissante Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta, dolor et vestibulum sodales, dui libero tempus nisl, non laoreet nisl purus nec mi. Curabitur bibendum tempor neque in mollis. Nunc quis volutpat neque. Maecenas porta enim sit amet iaculis auctor. Integer dictum eros quam, non fringilla elit vestibulum in. Quisque a ligula ut sem tristique volutpat eu quis justo. In maximus, ipsum id ultricies condimentum, mauris diam egestas ipsum, vestibulum blandit augue massa ac urna.', 'Valable', '2023-05-16 11:36:22', '2023-05-23 19:26:54'),
(2, 4, 5, 'Rabat', 300, 'Bonne voiture à louer économique', 'Valable', '2023-05-16 11:36:50', '2023-05-25 11:47:37'),
(5, 4, 14, 'Casablanca', 500, 'Voiture puissante pour tout terrain', 'Valable', '2023-05-17 14:01:46', '2023-05-17 14:28:05'),
(7, 4, 1, 'Rabat', 2300, 'Belle voiture de collection', 'Réservée', '2023-05-17 14:45:42', '2023-05-17 14:45:42'),
(9, 4, 18, 'Casablanca', 700, 'voiture puissante et pour tout terrain', 'Valable', '2023-05-18 16:31:59', '2023-05-18 16:31:59'),
(11, 4, 16, 'Casablanca', 200, 'Bonne voiture pour louer économique', 'Valable', '2023-05-25 02:02:36', '2023-05-25 02:02:36'),
(13, 4, 33, 'Casablanca', 200, 'Voiture électrique SUV familiale', 'Valable', '2023-05-26 13:31:40', '2023-05-26 13:31:40'),
(14, 4, 35, 'SALE', 500, 'Voiture Economique', 'Valable', '2023-05-31 15:09:42', '2023-05-31 15:09:42');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'MyApp', 'a8bb51cb286b2395e1972bfa6360f82a4152b4e3513fd6f79fdfa52d946ddf7d', '[\"*\"]', NULL, NULL, '2023-04-30 12:47:54', '2023-04-30 12:47:54'),
(2, 'App\\Models\\User', 1, 'MyApp', 'ca3af1c0d7bcf00063515b6619e98fcd59eb955d25c4fd139c129fab7932ac81', '[\"*\"]', NULL, NULL, '2023-04-30 12:49:22', '2023-04-30 12:49:22'),
(3, 'App\\Models\\User', 2, 'ahmed@gmail.com_Token', '5f4d3f224c5ef266b22470d8d370d858a8377de8d2d6eb63d0153828bc094b40', '[\"*\"]', NULL, NULL, '2023-05-01 20:29:51', '2023-05-01 20:29:51'),
(4, 'App\\Models\\User', 3, 'ahmed@gmail.com_Token', 'c03e86fdc180f3d6937526d669f19f15d0e1e245a3072fc7140e57ef05af2c9d', '[\"*\"]', NULL, NULL, '2023-05-01 20:32:51', '2023-05-01 20:32:51'),
(8, 'App\\Models\\User', 1, 'mohammed@gmail.com_Token', '24d4f11570e72ed36cdae1d1fbdeaf96ea02ba7538dd03c936f56e6a5e79d8f8', '[\"*\"]', NULL, NULL, '2023-05-01 22:55:08', '2023-05-01 22:55:08'),
(9, 'App\\Models\\User', 1, 'mohammed@gmail.com_Token', 'e1e0c60255fc2ab27e1c9d1a283c39894a89952544d2b22a3a4394cf5c15be30', '[\"*\"]', NULL, NULL, '2023-05-01 22:56:10', '2023-05-01 22:56:10'),
(27, 'App\\Models\\User', 3, 'ahmed@gmail.com_Token', '98c304184edcbf4ffbc5c46f833a0cd96c49d571c4dc61edb0efa0482fb70adf', '[\"*\"]', NULL, NULL, '2023-05-07 08:04:53', '2023-05-07 08:04:53'),
(28, 'App\\Models\\User', 3, 'ahmed@gmail.com_Token', '09fb2bbf7cce8f54e677cc0512e330a713d92fe75a6a0f05cd46f450658b698e', '[\"*\"]', NULL, NULL, '2023-05-07 08:06:45', '2023-05-07 08:06:45'),
(47, 'App\\Models\\User', 11, 'saad@gmail.com_Token', '6c3a5dc2529dcd9001fa54fa2676be9a4fa3e163e4f1d7ed139e70757bc9af0f', '[\"*\"]', NULL, NULL, '2023-05-07 16:25:06', '2023-05-07 16:25:06'),
(93, 'App\\Models\\User', 14, 'test5@gmail.com_Token', 'b1cfdcd064d8820579bb2a8cfbc3e1310bfbf49f926d826e2862a8e35b3d1a22', '[\"*\"]', NULL, NULL, '2023-05-25 23:18:21', '2023-05-25 23:18:21'),
(94, 'App\\Models\\User', 15, 'tayssir@gmail.com_Token', '33b8331a644fe7fd00afa107c052d3bfd4040797662ac9e16328fe0b8d90f752', '[\"*\"]', NULL, NULL, '2023-05-25 23:26:39', '2023-05-25 23:26:39'),
(107, 'App\\Models\\User', 16, 'agence@gmail.com_Token', '38230e18ad531f1f92687eff106f2cdec4d4e59af6d5697dbbfedd04068bb8de', '[\"*\"]', NULL, NULL, '2023-05-26 01:18:48', '2023-05-26 01:18:48'),
(108, 'App\\Models\\User', 17, 'client@gmail.com_Token', 'a99185dcd7554ce53ffd215ac0caff0a06f2c4613bebc0bfbd19afbe3d8b986a', '[\"*\"]', NULL, NULL, '2023-05-26 01:21:00', '2023-05-26 01:21:00'),
(109, 'App\\Models\\User', 18, 'client2@gmail.com_Token', 'd8e11aaccdaf451a14930a6a298aba39a724ea383be4ea9f89f7561d9c3ae628', '[\"*\"]', NULL, NULL, '2023-05-26 01:23:09', '2023-05-26 01:23:09'),
(110, 'App\\Models\\User', 19, 'client3@gmail.com_Token', '3a4c5c3ab0ac223ca8acc2c3c03a7424b3634cf58a68f73c1f0df59431aea648', '[\"*\"]', NULL, NULL, '2023-05-26 01:24:07', '2023-05-26 01:24:07'),
(111, 'App\\Models\\User', 20, 'last@gmail.com_Token', '6bfdd5e313fa83a2c5d741c48693b8f1b941d37c75138bfd7c89852989fd9f1f', '[\"*\"]', NULL, NULL, '2023-05-26 01:32:10', '2023-05-26 01:32:10'),
(112, 'App\\Models\\User', 21, 'last@gmail.com_Token', 'f20ee40c451c0cef75ba07fa4688ab7c78265e4e6eee6bbf0b64916ab69e8d76', '[\"*\"]', NULL, NULL, '2023-05-26 01:32:59', '2023-05-26 01:32:59'),
(113, 'App\\Models\\User', 22, 'hhhhhhhh@gmail.com_Token', '95ab033194e6fbbff956d0a2d3201d8744d68d751ca295b65673d872040c9558', '[\"*\"]', NULL, NULL, '2023-05-26 01:35:47', '2023-05-26 01:35:47'),
(114, 'App\\Models\\User', 23, 'j@gmail.com_Token', 'd413cab6881f98183fbd367b684495a13332b12b3242537a1d24efeb80e334d0', '[\"*\"]', NULL, NULL, '2023-05-26 01:38:28', '2023-05-26 01:38:28'),
(115, 'App\\Models\\User', 24, 'prog@gmail.com_Token', 'd30d5ac40c7d9c86a493e0a470a05a370d13388fad1c1fb12e833f12f041e7a2', '[\"*\"]', NULL, NULL, '2023-05-26 01:43:17', '2023-05-26 01:43:17'),
(116, 'App\\Models\\User', 25, 'lost@gmail.com_Token', '8f5c13f1b015e974d2f78d1a1fb629f79f4f0ed1d5749cedc2cbde821d1af429', '[\"*\"]', NULL, NULL, '2023-05-26 01:46:30', '2023-05-26 01:46:30'),
(118, 'App\\Models\\User', 26, 'auto@gmail.com_Token', 'd11df2ef074e0f3843dd5ef35d4086ee1e71550277aec8969cedf476e8b8c5c4', '[\"*\"]', NULL, NULL, '2023-05-26 02:15:06', '2023-05-26 02:15:06'),
(119, 'App\\Models\\User', 27, 'last@gmail.com_Token', '683dc468668da78b7d50eae6d383a5b3b6c5f87f3ccc5e50c225e6aa41f6288d', '[\"*\"]', NULL, NULL, '2023-05-26 02:19:49', '2023-05-26 02:19:49'),
(120, 'App\\Models\\User', 28, 'hjk@gmail.com_Token', 'fb9583e91c4a8088b344a030e1f6d829eaa0b4e78966ea3cca38b93b1b730b90', '[\"*\"]', NULL, NULL, '2023-05-26 02:21:22', '2023-05-26 02:21:22'),
(121, 'App\\Models\\User', 29, 'ja@123_Token', '50767601a78b4f242411ef57f1a962d743b780e26b7a7868cb17c754fc8c9c21', '[\"*\"]', NULL, NULL, '2023-05-26 02:23:19', '2023-05-26 02:23:19'),
(122, 'App\\Models\\User', 30, 'alahuakbar@gmail.com_Token', 'b959f651a45c9a7df1cbdfa60cc88b4cae415cfef853d77045c9d40b8b75ff3d', '[\"*\"]', NULL, NULL, '2023-05-26 02:34:48', '2023-05-26 02:34:48'),
(123, 'App\\Models\\User', 31, 'jkjl@gmail.com_Token', '1cf600dfb1e9344d7d8864a3e47ece3545679dbabd14937996c3c79db0351efe', '[\"*\"]', NULL, NULL, '2023-05-26 02:35:31', '2023-05-26 02:35:31'),
(126, 'App\\Models\\User', 32, 'today@gmail.com_Token', 'a145ff2984233965b9d36dcb9eed97736c79e99692b13cd0f4897bffdb42d700', '[\"*\"]', NULL, NULL, '2023-05-26 09:54:44', '2023-05-26 09:54:44'),
(151, 'App\\Models\\User', 4, 'houarimouad@gmail.com_Token', '7f10222bc054e0d1ef21c1a8bc6d923b0decb5719fb0cd092943c496116cd83b', '[\"*\"]', NULL, NULL, '2023-05-31 14:21:01', '2023-05-31 14:21:01'),
(152, 'App\\Models\\User', 4, 'houarimouad@gmail.com_Token', 'fbeff4141e4742e3f9467b2328a50ce50d5a6ee7de89eaa48d759edc194580c5', '[\"*\"]', NULL, NULL, '2023-05-31 15:51:13', '2023-05-31 15:51:13');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `offre_id` bigint(20) UNSIGNED NOT NULL,
  `voiture_id` bigint(20) UNSIGNED NOT NULL,
  `agence_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` int(10) UNSIGNED NOT NULL,
  `personnes` tinyint(3) UNSIGNED NOT NULL,
  `bagages` tinyint(3) UNSIGNED NOT NULL,
  `dateDebut` date NOT NULL,
  `dateRetour` date NOT NULL,
  `message` text DEFAULT NULL,
  `totale` smallint(5) UNSIGNED NOT NULL,
  `etat` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `offre_id`, `voiture_id`, `agence_id`, `client_id`, `nom`, `prenom`, `email`, `tel`, `personnes`, `bagages`, `dateDebut`, `dateRetour`, `message`, `totale`, `etat`, `created_at`, `updated_at`) VALUES
(7, 1, 2, 4, 34, 'Test', 'Test', 'test@gmail.com', 60000000, 1, 2, '2023-05-26', '2023-05-30', 'Cette voiture est toujours valable?......', 5400, 'en Traitemant', '2023-05-26 13:26:34', '2023-05-26 13:26:34'),
(8, 11, 16, 4, 34, 'test2', 'Test', 'client@gmail.com', 600541511, 5, 2, '2023-05-26', '2023-05-29', NULL, 600, 'Refusée', '2023-05-26 13:27:28', '2023-05-26 13:32:16'),
(9, 5, 14, 4, 34, 'Client3', 'test', 'test@gmail.com', 600541511, 2, 3, '2023-05-26', '2023-05-30', NULL, 2000, 'Acceptée', '2023-05-26 13:28:06', '2023-05-26 13:32:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` int(10) NOT NULL,
  `agence` tinyint(4) DEFAULT NULL,
  `agence_name` varchar(250) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `tel`, `agence`, `agence_name`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(4, 'Mouad Houari', 'houarimouad@gmail.com', 600541511, 1, 'Tayssir Auto', NULL, '$2y$10$.9E34uwQXp/.8vHDq1x/Yea8goJHactbUc9HsXatMl5fLvtcag6cG', NULL, '2023-05-01 21:24:11', '2023-05-01 21:24:11'),
(5, 'Adnane benaida', 'adnane@gmail.com', 611335566, 0, NULL, NULL, '$2y$10$b/83sKJ0kQ.TgKyqVBCMt.O8FTy8RaohSwWSIhgsRUKSsl7S2sTi2', NULL, '2023-05-01 21:27:27', '2023-05-01 21:27:27'),
(16, 'agence', 'agence@gmail.com', 620334455, 1, 'Hertz', NULL, '$2y$10$z5ehd.rW.UE3AqH6b0savePCtRgYIFWy.bX/mQV2k.PEijo5ATAJi', NULL, '2023-05-26 01:18:48', '2023-05-26 01:18:48'),
(34, 'Client test', 'client@gmail.com', 600000000, 0, NULL, NULL, '$2y$10$XmciIT7LwPZ4bHuF1Vt00.If1W43B3/Jmgec8cA2EJ.fVaNy/Lzqi', NULL, '2023-05-26 13:24:21', '2023-05-26 13:24:21');

-- --------------------------------------------------------

--
-- Table structure for table `voitures`
--

CREATE TABLE `voitures` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `imei` mediumint(3) UNSIGNED NOT NULL,
  `modele` varchar(255) NOT NULL,
  `marque` varchar(255) NOT NULL,
  `photo1` varchar(255) NOT NULL,
  `photo2` varchar(255) NOT NULL,
  `annee` smallint(6) NOT NULL,
  `boitedevitesse` varchar(255) NOT NULL,
  `carburant` varchar(255) NOT NULL,
  `portes` smallint(5) NOT NULL,
  `agence_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `voitures`
--

INSERT INTO `voitures` (`id`, `imei`, `modele`, `marque`, `photo1`, `photo2`, `annee`, `boitedevitesse`, `carburant`, `portes`, `agence_id`, `created_at`, `updated_at`) VALUES
(1, 234, 'miata', 'mazda', 'uploads/voitures/miata2.jpg', 'uploads/voitures/miata.jpg', 1994, 'automatique', 'Essence', 3, 4, NULL, NULL),
(2, 1243, 'M4', 'BMW', 'uploads/voitures/m4.jpg', 'uploads/voitures/m4_2.jpg', 2022, 'Manuelle', 'Essence', 3, 4, '2023-04-25 16:07:44', '2023-05-26 10:02:55'),
(5, 220, 'Focus', 'Ford', 'uploads/voitures/focus.jpg', 'uploads/voitures/focus2.jpg', 2019, 'Automatique', 'Diesel', 5, 4, '2023-04-26 03:00:57', '2023-05-25 00:59:42'),
(14, 9341, 'Hilux', 'Toyota', 'uploads/voitures/hilux.jpg', 'uploads/voitures/hilux2.jpg', 2020, 'Manuelle', 'Diesel', 5, 4, '2023-05-07 11:54:17', '2023-05-25 00:57:21'),
(16, 2452, 'Fiesta', 'Ford', 'uploads/voitures/fiesta.jpg', 'uploads/voitures/fiesta2.jpg', 2019, 'Automatique', 'Essence', 5, 4, '2023-05-07 16:34:18', '2023-05-25 00:53:05'),
(18, 777, 'Jimny', 'Suzuki', 'uploads/voitures/Jimny.jpg', 'uploads/voitures/Jimny2.jpg', 2023, 'manuelle', 'Essence', 3, 4, '2023-05-18 16:19:37', '2023-05-18 16:19:37'),
(33, 447823, 'X', 'Tesla', 'uploads/voitures/tesla1.jpg', 'uploads/voitures/tesla2.jpg', 2023, 'Automatique', 'Electrique', 5, 4, '2023-05-25 16:53:23', '2023-05-26 00:07:57'),
(35, 4572, 'Logan', 'Dacia', 'uploads/voitures/', 'uploads/voitures/', 2023, 'Automatique', 'Diesel', 5, 4, '2023-05-26 13:30:05', '2023-05-26 13:30:05'),
(36, 10, 'TEST', 'TEST', 'uploads/voitures/', 'uploads/voitures/', 4, 'Automatique', 'Essence', 2, 4, '2023-05-31 15:58:43', '2023-05-31 15:58:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offres`
--
ALTER TABLE `offres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `offres_voiture_id_foreign` (`voiture_id`),
  ADD KEY `offres_agence_id_foreign` (`agence_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservations_offre_id_foreign` (`offre_id`),
  ADD KEY `reservations_voiture_id_foreign` (`voiture_id`),
  ADD KEY `reservations_agence_id_foreign` (`agence_id`),
  ADD KEY `reservations_client_id_foreign` (`client_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `voitures`
--
ALTER TABLE `voitures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agence_id` (`agence_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `offres`
--
ALTER TABLE `offres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `voitures`
--
ALTER TABLE `voitures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `offres`
--
ALTER TABLE `offres`
  ADD CONSTRAINT `offres_agence_id_foreign` FOREIGN KEY (`agence_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `offres_voiture_id_foreign` FOREIGN KEY (`voiture_id`) REFERENCES `voitures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_agence_id_foreign` FOREIGN KEY (`agence_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_offre_id_foreign` FOREIGN KEY (`offre_id`) REFERENCES `offres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_voiture_id_foreign` FOREIGN KEY (`voiture_id`) REFERENCES `voitures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `voitures`
--
ALTER TABLE `voitures`
  ADD CONSTRAINT `agence_id` FOREIGN KEY (`agence_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

INSERT INTO public.rol(
	descripcion, created_at, updated_at)
	VALUES ('Administrador', now(), now()),
		   ('Usuario', now(), now());

INSERT INTO public.usuario(
	nombre, correo, clave, activo, created_at, updated_at, "rolId")
	VALUES ('admin.em@gmail.com','admin.em@gmail.com', 'D@N1l01995P1', true, now(), now(), 1);



INSERT INTO public.unidad (id, descripcion, created_at, updated_at) VALUES
(1, 'm/s', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986'),
(2, 'mW/cm²', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986'),
(3, '%', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986'),
(4, 'hPa', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986'),
(5, '°C', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986'),
(6, 'msn', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986'),
(7, 'COV', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986');


INSERT INTO public.tipo_medicion (id, nombre, formato, created_at, updated_at, "unidadId") VALUES
(1, 'Velocidad Viento', '%08d', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986', 1),
(2, 'Radiación', '%08d', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986', 2),
(3, 'Humedad Relativa', '%015.6f', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986', 3),
(4, 'Presión', '%08d', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986', 4),
(5, 'Temperatura', '%015.6f', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986', 5),
(6, 'Altitud', '%08d', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986', 6),
(7, 'Calidad Aire', '%015.6f', '2025-02-03 06:08:28.487986', '2025-02-03 06:08:28.487986', 7);


INSERT INTO public.estacion(
	numero_serie, modelo, descripcion, latitud, longitud, variables, estado, informacion_adicional, created_at, updated_at)
	VALUES ('2232330000888802', '2232330000888802', '2232330000888802', 0.5, 0.5, '', 1, '', now(), now());
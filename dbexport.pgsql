--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-1)
-- Dumped by pg_dump version 11.5 (Ubuntu 11.5-1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: destinations; Type: TABLE; Schema: public; Owner: xellus
--

CREATE TABLE public.destinations (
    id integer NOT NULL,
    title text,
    cost numeric(7,2),
    location text,
    description text,
    startday date,
    endday date,
    available integer,
    total integer,
    imageurl text
);


ALTER TABLE public.destinations OWNER TO xellus;

--
-- Name: destinations_id_seq; Type: SEQUENCE; Schema: public; Owner: xellus
--

CREATE SEQUENCE public.destinations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.destinations_id_seq OWNER TO xellus;

--
-- Name: destinations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xellus
--

ALTER SEQUENCE public.destinations_id_seq OWNED BY public.destinations.id;


--
-- Name: userdestinations; Type: TABLE; Schema: public; Owner: xellus
--

CREATE TABLE public.userdestinations (
    id integer NOT NULL,
    email text NOT NULL,
    locationid integer NOT NULL,
    numof integer NOT NULL
);


ALTER TABLE public.userdestinations OWNER TO xellus;

--
-- Name: userdestinations_id_seq; Type: SEQUENCE; Schema: public; Owner: xellus
--

CREATE SEQUENCE public.userdestinations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userdestinations_id_seq OWNER TO xellus;

--
-- Name: userdestinations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xellus
--

ALTER SEQUENCE public.userdestinations_id_seq OWNED BY public.userdestinations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: xellus
--

CREATE TABLE public.users (
    id integer NOT NULL,
    fname text NOT NULL,
    lname text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO xellus;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: xellus
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO xellus;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xellus
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: destinations id; Type: DEFAULT; Schema: public; Owner: xellus
--

ALTER TABLE ONLY public.destinations ALTER COLUMN id SET DEFAULT nextval('public.destinations_id_seq'::regclass);


--
-- Name: userdestinations id; Type: DEFAULT; Schema: public; Owner: xellus
--

ALTER TABLE ONLY public.userdestinations ALTER COLUMN id SET DEFAULT nextval('public.userdestinations_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: xellus
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: destinations; Type: TABLE DATA; Schema: public; Owner: xellus
--

COPY public.destinations (id, title, cost, location, description, startday, endday, available, total, imageurl) FROM stdin;
3	Monte Carlo	2056.00	Riviera Maya	A nice vacation	2020-03-04	2020-03-12	32	32	rivieraMaya.jpg
4	YES Resorts	9999.99	Riviera Diamante	A cool vacation	2020-09-09	2020-09-20	5	5	rivieraDiamante.jpg
2	Pioneer Resort	857.22	Cancun	A fun vacation	2021-01-01	2021-01-14	8	10	Cancun.jpg
5	Ibarostar	444.00	Cozumel	A beautiful vacation	2020-05-06	2020-05-12	19	20	cozumel.jpg
\.


--
-- Data for Name: userdestinations; Type: TABLE DATA; Schema: public; Owner: xellus
--

COPY public.userdestinations (id, email, locationid, numof) FROM stdin;
6	@	2	1
7	braden.coates@hotmail.com	5	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: xellus
--

COPY public.users (id, fname, lname, email, password) FROM stdin;
14	braden	coates	braden.coates@hotmail.com	$2b$12$Sy6BKCweliLQlkf1dd.sb.8SBf5TCduo6mByQIBLZ5GZ8wY49pd72
15	b	c	@	$2b$12$09Aw1EPfp8AcSn9LS/qwyu7BIbu8vTxO4cfE7Xfgh8dFcWY9Yl.k2
\.


--
-- Name: destinations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xellus
--

SELECT pg_catalog.setval('public.destinations_id_seq', 5, true);


--
-- Name: userdestinations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xellus
--

SELECT pg_catalog.setval('public.userdestinations_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: xellus
--

SELECT pg_catalog.setval('public.users_id_seq', 15, true);


--
-- Name: destinations destinations_pkey; Type: CONSTRAINT; Schema: public; Owner: xellus
--

ALTER TABLE ONLY public.destinations
    ADD CONSTRAINT destinations_pkey PRIMARY KEY (id);


--
-- Name: userdestinations userdestinations_pkey; Type: CONSTRAINT; Schema: public; Owner: xellus
--

ALTER TABLE ONLY public.userdestinations
    ADD CONSTRAINT userdestinations_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: xellus
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: xellus
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: TABLE destinations; Type: ACL; Schema: public; Owner: xellus
--

GRANT ALL ON TABLE public.destinations TO backend;


--
-- Name: SEQUENCE destinations_id_seq; Type: ACL; Schema: public; Owner: xellus
--

GRANT ALL ON SEQUENCE public.destinations_id_seq TO backend;


--
-- Name: TABLE userdestinations; Type: ACL; Schema: public; Owner: xellus
--

GRANT ALL ON TABLE public.userdestinations TO backend;


--
-- Name: SEQUENCE userdestinations_id_seq; Type: ACL; Schema: public; Owner: xellus
--

GRANT ALL ON SEQUENCE public.userdestinations_id_seq TO backend;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: xellus
--

GRANT ALL ON TABLE public.users TO backend;


--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: xellus
--

GRANT ALL ON SEQUENCE public.users_id_seq TO backend;


--
-- PostgreSQL database dump complete
--


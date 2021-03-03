--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6
-- Dumped by pg_dump version 12.6

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

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: liatmeadows
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    comment character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    venue_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.comments OWNER TO liatmeadows;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: liatmeadows
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO liatmeadows;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: liatmeadows
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: liatmeadows
--

CREATE TABLE public.ratings (
    id integer NOT NULL,
    rate integer,
    venue_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.ratings OWNER TO liatmeadows;

--
-- Name: ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: liatmeadows
--

CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratings_id_seq OWNER TO liatmeadows;

--
-- Name: ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: liatmeadows
--

ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;


--
-- Name: reset_codes; Type: TABLE; Schema: public; Owner: liatmeadows
--

CREATE TABLE public.reset_codes (
    id integer NOT NULL,
    email character varying NOT NULL,
    code character varying NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.reset_codes OWNER TO liatmeadows;

--
-- Name: reset_codes_id_seq; Type: SEQUENCE; Schema: public; Owner: liatmeadows
--

CREATE SEQUENCE public.reset_codes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reset_codes_id_seq OWNER TO liatmeadows;

--
-- Name: reset_codes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: liatmeadows
--

ALTER SEQUENCE public.reset_codes_id_seq OWNED BY public.reset_codes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: liatmeadows
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first character varying(255) NOT NULL,
    last character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    image character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO liatmeadows;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: liatmeadows
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO liatmeadows;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: liatmeadows
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: venues; Type: TABLE; Schema: public; Owner: liatmeadows
--

CREATE TABLE public.venues (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying,
    image character varying,
    lat character varying NOT NULL,
    lng character varying NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.venues OWNER TO liatmeadows;

--
-- Name: venues_id_seq; Type: SEQUENCE; Schema: public; Owner: liatmeadows
--

CREATE SEQUENCE public.venues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.venues_id_seq OWNER TO liatmeadows;

--
-- Name: venues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: liatmeadows
--

ALTER SEQUENCE public.venues_id_seq OWNED BY public.venues.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: ratings id; Type: DEFAULT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);


--
-- Name: reset_codes id; Type: DEFAULT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.reset_codes ALTER COLUMN id SET DEFAULT nextval('public.reset_codes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: venues id; Type: DEFAULT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.venues ALTER COLUMN id SET DEFAULT nextval('public.venues_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: liatmeadows
--

COPY public.comments (id, comment, created_at, venue_id, user_id) FROM stdin;
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: liatmeadows
--

COPY public.ratings (id, rate, venue_id, user_id) FROM stdin;
\.


--
-- Data for Name: reset_codes; Type: TABLE DATA; Schema: public; Owner: liatmeadows
--

COPY public.reset_codes (id, email, code, "timestamp") FROM stdin;
1	meadowsliat@gmail.com	24a4b8	2021-02-25 18:00:36.195605
2	meadowsliat@gmail.com	99bdd0	2021-02-25 18:00:36.990154
3	meadowsliat@gmail.com	812fdf	2021-02-25 18:04:08.898016
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: liatmeadows
--

COPY public.users (id, first, last, email, password, image, created_at) FROM stdin;
2	Lucie	Bel	lucie@gmail.com	$2a$10$oEXUk1uiu9hA3X2vZWOesepAWKohGOchAFYZqW8UBP6Zuco3rZFB2	\N	2021-03-01 01:30:34.150843
1	Lia	Mead	meadowsliat@gmail.com	$2a$10$0UQBS3hbFm.LRqadqb6NMenjNTcAsqkOJ4E8cRRqtNyKEfyW3Y.d.	https://s3.amazonaws.com/liatsbucket/9hotbrGT-67NKh4juY1rC96q_iTDgM6W.jpg	2021-02-26 12:16:34.380784
\.


--
-- Data for Name: venues; Type: TABLE DATA; Schema: public; Owner: liatmeadows
--

COPY public.venues (id, name, description, image, lat, lng, user_id, created_at) FROM stdin;
111	White Rabbit Jazz Club	Great vibes	https://s3.amazonaws.com/liatsbucket/OxJ_NsR5qIz-gK_1iGSZ7PWPIlJ8T4SZ.jpg	52.52119257868536	13.42525726347902	1	2021-03-03 02:02:33.971226
113	La Playa Beach & Jazz	Awesome vibes	https://s3.amazonaws.com/liatsbucket/cujt6ar35auIWhynla4ozJhGB35gm_w8.jpg	39.80529470778169	-4.038519423060158	1	2021-03-03 02:11:51.212684
114	Scotch & Love		https://s3.amazonaws.com/liatsbucket/5F5ZvW5NxJ-IN69Do6bGciJpoyGbOMq2.jpg	52.57187535840387	4.860332444571136	1	2021-03-03 02:13:40.264961
115	El Universum	Belisimo	https://s3.amazonaws.com/liatsbucket/sk353ZE3RCVtrkypf3G4zqJsL8NJaoKv.jpg	42.162109200318525	12.186298729687483	1	2021-03-03 02:14:39.033764
116	Papa Joe's	Great cocktails, lovely music 	https://s3.amazonaws.com/liatsbucket/2Y-UMFvx1WMHb0caREuZWe3-_BcX-YG8.jpg	52.51540224423467	13.380630157536677	1	2021-03-03 02:16:45.950386
117	Revival	Great place	https://s3.amazonaws.com/liatsbucket/vpyozyKievyjyaUJ-W0bsOrePzdNhnn7.jpg	51.70430033111309	-99.84676412499998	1	2021-03-03 02:18:33.848119
118	The Cape Bar	Cool place	https://s3.amazonaws.com/liatsbucket/--LU17OMS8hEms8cOrkDx-yEjD9-AcQ7.jpg	-33.90485781292466	22.71671243750001	1	2021-03-03 02:19:37.441031
119	White Rabbit	There were a great vibe and a good jazz band playing the night we went there.	https://s3.amazonaws.com/liatsbucket/y7orCU9xlq-vjTnR1DkB0EKi3GyQg2mo.jpg	52.54926456012464	13.46718239382326	1	2021-03-03 02:27:51.022839
120	Wonderjazz	My happy place, any time	https://s3.amazonaws.com/liatsbucket/xu7-2ngwAq9Dsf1aVLCemjL3vxgwFl_z.png	52.53940413929695	13.384221492784905	1	2021-03-03 02:30:02.285362
123	A-TRANE	My favorite place in Berlin	https://s3.amazonaws.com/liatsbucket/vzlu60Hjh0ZOwdUgOrzKGE5p0LRV6OpN.png	52.519712086816696	13.370969742946883	1	2021-03-03 02:34:10.024584
124	Quasimodo	If you're looking for an intimate experience for jazz, check out Quasimodo. 	https://s3.amazonaws.com/liatsbucket/eX3hSKE5R23P9Gpjw7ARv14MEPFYb6cp.png	52.53630431204484	13.358559857556136	1	2021-03-03 02:38:11.874115
127	My Foolish Heart	Awesome place	https://s3.amazonaws.com/liatsbucket/zv5iQBvqBYoIL74YBOQ_nA3wqF1rTPzl.png	52.55427829174033	13.264025654199209	1	2021-03-03 03:00:35.615906
128	Mike's Place	Awesome jazz bar, with great live music	https://s3.amazonaws.com/liatsbucket/NN34R1uCFsrSg-UyXqgGtnGeQYuyfspu.png	52.56265862123313	13.446813305310057	1	2021-03-03 03:02:31.080224
129	Velvet Sofa	Awesome jazz bar, with great live music!	https://s3.amazonaws.com/liatsbucket/pwz7v_O5_ZQUFO8eMPMPoRcOmauh4Kpb.jpg	52.558755642432	13.414663612475598	1	2021-03-03 10:15:49.127791
130	Midnight inn Paris	And since it is a jazz bar, the music is good.	https://s3.amazonaws.com/liatsbucket/8yHNl4G5eb2YxrAW7-eqOAp3T_KobtLu.png	48.88284742503202	2.355284187320277	1	2021-03-03 10:31:07.703713
131	The Sax Den	jazz music!!!!! love it! very cosy small place	https://s3.amazonaws.com/liatsbucket/HLEXMtiQBQCP_jL0Y4QiOrma3dKypjwT.png	53.356412487398835	-6.473954790625003	1	2021-03-03 10:33:02.158773
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: liatmeadows
--

SELECT pg_catalog.setval('public.comments_id_seq', 33, true);


--
-- Name: ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: liatmeadows
--

SELECT pg_catalog.setval('public.ratings_id_seq', 1, false);


--
-- Name: reset_codes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: liatmeadows
--

SELECT pg_catalog.setval('public.reset_codes_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: liatmeadows
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: venues_id_seq; Type: SEQUENCE SET; Schema: public; Owner: liatmeadows
--

SELECT pg_catalog.setval('public.venues_id_seq', 131, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- Name: reset_codes reset_codes_pkey; Type: CONSTRAINT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.reset_codes
    ADD CONSTRAINT reset_codes_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: venues venues_pkey; Type: CONSTRAINT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.venues
    ADD CONSTRAINT venues_pkey PRIMARY KEY (id);


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: comments comments_venue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_venue_id_fkey FOREIGN KEY (venue_id) REFERENCES public.venues(id);


--
-- Name: ratings ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: ratings ratings_venue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_venue_id_fkey FOREIGN KEY (venue_id) REFERENCES public.venues(id);


--
-- Name: venues venues_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: liatmeadows
--

ALTER TABLE ONLY public.venues
    ADD CONSTRAINT venues_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--


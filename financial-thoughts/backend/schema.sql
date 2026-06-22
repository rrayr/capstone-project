--
-- PostgreSQL database dump
--

\restrict yke4DiP3eeJ5edCyuWJx8XYbtYaycFRyhHrAfdHkgZD0xLwZpRM8U91AwR1vqic

-- Dumped from database version 16.14
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-22 12:36:29

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 220 (class 1259 OID 16430)
-- Name: reminders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reminders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title text NOT NULL,
    description text,
    due_date date NOT NULL,
    completed boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.reminders OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16429)
-- Name: reminders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reminders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reminders_id_seq OWNER TO postgres;

--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 219
-- Name: reminders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reminders_id_seq OWNED BY public.reminders.id;


--
-- TOC entry 218 (class 1259 OID 16414)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    category text NOT NULL,
    type text NOT NULL,
    description text,
    transaction_date date NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT transactions_type_check CHECK ((type = ANY (ARRAY['income'::text, 'expense'::text])))
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16413)
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_id_seq OWNER TO postgres;

--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 217
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- TOC entry 216 (class 1259 OID 16400)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4749 (class 2604 OID 16433)
-- Name: reminders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reminders ALTER COLUMN id SET DEFAULT nextval('public.reminders_id_seq'::regclass);


--
-- TOC entry 4747 (class 2604 OID 16417)
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- TOC entry 4745 (class 2604 OID 16403)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4762 (class 2606 OID 16439)
-- Name: reminders reminders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reminders
    ADD CONSTRAINT reminders_pkey PRIMARY KEY (id);


--
-- TOC entry 4760 (class 2606 OID 16423)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- TOC entry 4754 (class 2606 OID 16412)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4756 (class 2606 OID 16408)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4758 (class 2606 OID 16410)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4764 (class 2606 OID 16440)
-- Name: reminders reminders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reminders
    ADD CONSTRAINT reminders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4763 (class 2606 OID 16424)
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2026-06-22 12:36:30

--
-- PostgreSQL database dump complete
--

\unrestrict yke4DiP3eeJ5edCyuWJx8XYbtYaycFRyhHrAfdHkgZD0xLwZpRM8U91AwR1vqic


--
-- PostgreSQL database dump
--

\restrict wuepQJCdE5FavjjaViuO3Z90fJZ8GnK9w8JdsZzuVmROF6OopGgrTp3UK8zhdHz

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg12+2)
-- Dumped by pg_dump version 18.2 (Postgres.app)

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: expense_workflow_db_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO expense_workflow_db_user;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: expense_workflow_db_user
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'MANAGER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO expense_workflow_db_user;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: expense_workflow_db_user
--

CREATE TYPE public."Status" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."Status" OWNER TO expense_workflow_db_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Expense; Type: TABLE; Schema: public; Owner: expense_workflow_db_user
--

CREATE TABLE public."Expense" (
    id text NOT NULL,
    title text NOT NULL,
    amount double precision NOT NULL,
    status public."Status" DEFAULT 'PENDING'::public."Status" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Expense" OWNER TO expense_workflow_db_user;

--
-- Name: ExpenseAudit; Type: TABLE; Schema: public; Owner: expense_workflow_db_user
--

CREATE TABLE public."ExpenseAudit" (
    id text NOT NULL,
    "expenseId" text NOT NULL,
    "actorId" text NOT NULL,
    "fromStatus" public."Status" NOT NULL,
    "toStatus" public."Status" NOT NULL,
    reason text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ExpenseAudit" OWNER TO expense_workflow_db_user;

--
-- Name: User; Type: TABLE; Schema: public; Owner: expense_workflow_db_user
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL
);


ALTER TABLE public."User" OWNER TO expense_workflow_db_user;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: expense_workflow_db_user
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO expense_workflow_db_user;

--
-- Data for Name: Expense; Type: TABLE DATA; Schema: public; Owner: expense_workflow_db_user
--

COPY public."Expense" (id, title, amount, status, "createdAt", "userId") FROM stdin;
\.


--
-- Data for Name: ExpenseAudit; Type: TABLE DATA; Schema: public; Owner: expense_workflow_db_user
--

COPY public."ExpenseAudit" (id, "expenseId", "actorId", "fromStatus", "toStatus", reason, "createdAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: expense_workflow_db_user
--

COPY public."User" (id, email, password, "createdAt", role) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: expense_workflow_db_user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3ad656fe-7190-48df-a4c0-b4da72c99f43	838a26da5c27c994dc4bcf65f56734368e22b4bf3372664cda03424a1f2bb0a8	2026-02-27 20:25:23.911109+00	20260212033337_init	\N	\N	2026-02-27 20:25:23.814695+00	1
5276454d-dc29-41e6-a1a9-36b852be5dc8	ce32ec73c55c60f37612ad65a78b651efdfe3a5f2fe39ff5fc4f4d08ab1530fc	2026-02-27 20:25:23.931914+00	20260214184749_add_user_roles	\N	\N	2026-02-27 20:25:23.915656+00	1
6ee960a2-ccdb-4c57-90db-6399de0db9bf	d3f486f46ba3948fbd928a7cdaa7b8c9340deaa9b4ee9f7cc94e4f7afdd0634e	2026-02-27 20:25:24.008587+00	20260214213037_add_expense_audit_log	\N	\N	2026-02-27 20:25:23.936212+00	1
\.


--
-- Name: ExpenseAudit ExpenseAudit_pkey; Type: CONSTRAINT; Schema: public; Owner: expense_workflow_db_user
--

ALTER TABLE ONLY public."ExpenseAudit"
    ADD CONSTRAINT "ExpenseAudit_pkey" PRIMARY KEY (id);


--
-- Name: Expense Expense_pkey; Type: CONSTRAINT; Schema: public; Owner: expense_workflow_db_user
--

ALTER TABLE ONLY public."Expense"
    ADD CONSTRAINT "Expense_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: expense_workflow_db_user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: expense_workflow_db_user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: ExpenseAudit_actorId_idx; Type: INDEX; Schema: public; Owner: expense_workflow_db_user
--

CREATE INDEX "ExpenseAudit_actorId_idx" ON public."ExpenseAudit" USING btree ("actorId");


--
-- Name: ExpenseAudit_expenseId_idx; Type: INDEX; Schema: public; Owner: expense_workflow_db_user
--

CREATE INDEX "ExpenseAudit_expenseId_idx" ON public."ExpenseAudit" USING btree ("expenseId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: expense_workflow_db_user
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: ExpenseAudit ExpenseAudit_actorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: expense_workflow_db_user
--

ALTER TABLE ONLY public."ExpenseAudit"
    ADD CONSTRAINT "ExpenseAudit_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ExpenseAudit ExpenseAudit_expenseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: expense_workflow_db_user
--

ALTER TABLE ONLY public."ExpenseAudit"
    ADD CONSTRAINT "ExpenseAudit_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES public."Expense"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Expense Expense_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: expense_workflow_db_user
--

ALTER TABLE ONLY public."Expense"
    ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO expense_workflow_db_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO expense_workflow_db_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO expense_workflow_db_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO expense_workflow_db_user;


--
-- PostgreSQL database dump complete
--

\unrestrict wuepQJCdE5FavjjaViuO3Z90fJZ8GnK9w8JdsZzuVmROF6OopGgrTp3UK8zhdHz


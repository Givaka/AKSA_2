--
-- PostgreSQL database dump
--

-- Dumped from database version 17.1
-- Dumped by pg_dump version 17.1

-- Started on 2025-05-10 01:07:57

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 24942)
-- Name: Admission form; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admission form" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Admission form" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24963)
-- Name: Benefit status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Benefit status" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Benefit status" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 25026)
-- Name: DDT; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DDT" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    department uuid NOT NULL,
    teacher uuid NOT NULL,
    discipline uuid NOT NULL
);


ALTER TABLE public."DDT" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24977)
-- Name: Departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Departments" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Departments" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 25093)
-- Name: Disciplines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Disciplines" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Disciplines" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24949)
-- Name: Form of study; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Form of study" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Form of study" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 25041)
-- Name: GD; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GD" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "group" uuid NOT NULL,
    discipline uuid NOT NULL
);


ALTER TABLE public."GD" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 25019)
-- Name: Groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Groups" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Groups" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 24970)
-- Name: Positions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Positions" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Positions" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24998)
-- Name: Salary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Salary" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "position" uuid NOT NULL,
    amount numeric NOT NULL
);


ALTER TABLE public."Salary" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 25046)
-- Name: Scholarship; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Scholarship" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    amount numeric NOT NULL,
    "statusBenefit" uuid NOT NULL
);


ALTER TABLE public."Scholarship" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 25005)
-- Name: Scientific activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Scientific activity" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Scientific activity" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24956)
-- Name: Student status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Student status" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Student status" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 25012)
-- Name: Students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Students" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    fullname text NOT NULL,
    birthday date NOT NULL,
    "group" uuid NOT NULL,
    "dayEnrollment" date NOT NULL,
    course numeric(1,0) NOT NULL,
    "statusStudy" uuid NOT NULL,
    "formStudy" uuid NOT NULL,
    "statusBenefit" uuid,
    "formAdmission" uuid NOT NULL,
    scholarship uuid,
    is_removed boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Students" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 24991)
-- Name: Teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Teachers" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    fullname text NOT NULL,
    birthday date NOT NULL,
    "dayHiring" date NOT NULL,
    "dayAppointment" date NOT NULL,
    "position" uuid NOT NULL,
    "statusScientific" uuid,
    is_removed boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Teachers" OWNER TO postgres;

--
-- TOC entry 5015 (class 0 OID 24942)
-- Dependencies: 218
-- Data for Name: Admission form; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admission form" (id, name) FROM stdin;
39ae049c-8bb2-424b-b409-ecab3cad87c2	Особая
364a0efe-7595-40d1-9d7e-3e0750d85836	Целевая
e9d671ec-3b7a-40c9-8dbd-9f9da58a5eaf	Общая
\.


--
-- TOC entry 5018 (class 0 OID 24963)
-- Dependencies: 221
-- Data for Name: Benefit status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Benefit status" (id, name) FROM stdin;
db87b244-2dec-4be0-bcaa-775c5a60b59c	Cирота
459f7eec-03e2-4dcc-8ace-fae07483af35	Лишенный попечительства родителей
31abc589-346f-4b34-b8b6-61c7521a3603	Инвалид
88b14db1-6455-40ab-ac90-d94b443ac226	Военнослужащие
\.


--
-- TOC entry 5026 (class 0 OID 25026)
-- Dependencies: 229
-- Data for Name: DDT; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DDT" (id, department, teacher, discipline) FROM stdin;
\.


--
-- TOC entry 5020 (class 0 OID 24977)
-- Dependencies: 223
-- Data for Name: Departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Departments" (id, name) FROM stdin;
c12bc391-4f46-4f33-aca6-6c71182a3ae2	Кафедра информационных систем и технологий
\.


--
-- TOC entry 5029 (class 0 OID 25093)
-- Dependencies: 232
-- Data for Name: Disciplines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Disciplines" (id, name) FROM stdin;
a6c29c63-09b8-47b4-8c28-ee27b3a1ef70	Поиск, обработка и распознавание графической, аудио и видеоинформации
58a87cc4-6d6b-4d52-a05e-89d74155e7c0	Прикладные модели машинного обучения
6406f84b-24a5-40f1-a6ff-723d5da5c425	Разработка клиент-серверных приложений
39f12168-35cc-4c10-8a26-a9422a85bf15	Системная инженерия
18dcf57e-ab5a-4f43-a153-1edcb00af890	Технологии искусственного интеллекта в задачах интеграции знаний и предсказательного моделирования сложных инженерных и биологических процессов
\.


--
-- TOC entry 5016 (class 0 OID 24949)
-- Dependencies: 219
-- Data for Name: Form of study; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Form of study" (id, name) FROM stdin;
f9845aee-7448-46cf-9065-3c6861ca9aae	Очная
7b7b3f4e-5815-4f74-b9ce-8603b71afd2b	Очно-заочная
cd5e4472-c4a6-4228-a1fa-d310da02df70	Заочная
138f6e13-3a13-4ef9-b54b-49013b928a87	Дистанционная
\.


--
-- TOC entry 5027 (class 0 OID 25041)
-- Dependencies: 230
-- Data for Name: GD; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."GD" (id, "group", discipline) FROM stdin;
07dca6d3-b3e9-46d2-ae2d-790fd083093d	9507f727-e554-475a-a64f-898a499fc7e8	18dcf57e-ab5a-4f43-a153-1edcb00af890
f6554346-5226-4072-af18-c40227fdf944	9507f727-e554-475a-a64f-898a499fc7e8	39f12168-35cc-4c10-8a26-a9422a85bf15
06073829-10c9-4caa-86b2-cf475a91e78b	9507f727-e554-475a-a64f-898a499fc7e8	58a87cc4-6d6b-4d52-a05e-89d74155e7c0
2e889f7d-7188-450a-bcfc-5241949c08f1	9507f727-e554-475a-a64f-898a499fc7e8	6406f84b-24a5-40f1-a6ff-723d5da5c425
1afc2ff9-7253-4756-931d-e2d43e306b22	9507f727-e554-475a-a64f-898a499fc7e8	a6c29c63-09b8-47b4-8c28-ee27b3a1ef70
\.


--
-- TOC entry 5025 (class 0 OID 25019)
-- Dependencies: 228
-- Data for Name: Groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Groups" (id, name) FROM stdin;
9507f727-e554-475a-a64f-898a499fc7e8	ПИм
\.


--
-- TOC entry 5019 (class 0 OID 24970)
-- Dependencies: 222
-- Data for Name: Positions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Positions" (id, name) FROM stdin;
c8247602-521b-45b2-9bda-cc130cbef607	Ассистент
8ec3d499-0acb-42df-bbe9-2621adf09413	Старший преподаватель
ecdc18cf-1967-4a31-9022-e4409209f870	Доцент
fa1fedd6-fa13-41ca-bc6d-da7acb853359	Профессор
5cde5fe6-b4b7-4bf2-9a99-9c8da7b4e239	Заведующий кафедрой
\.


--
-- TOC entry 5022 (class 0 OID 24998)
-- Dependencies: 225
-- Data for Name: Salary; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Salary" (id, "position", amount) FROM stdin;
0cfcdbb0-fa06-4199-8e34-a7b4eb44040e	c8247602-521b-45b2-9bda-cc130cbef607	40500
ba0d40e4-4a9a-4ceb-bd7e-90b77e3f6cdb	8ec3d499-0acb-42df-bbe9-2621adf09413	50000
54f49500-3d01-4007-813f-4f8f83a56828	ecdc18cf-1967-4a31-9022-e4409209f870	63500
a22a01cc-42b5-4b38-969b-723805751ba8	fa1fedd6-fa13-41ca-bc6d-da7acb853359	81500
79f9ef40-7a11-4a16-b518-1ef8b35500d1	5cde5fe6-b4b7-4bf2-9a99-9c8da7b4e239	87000
\.


--
-- TOC entry 5028 (class 0 OID 25046)
-- Dependencies: 231
-- Data for Name: Scholarship; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Scholarship" (id, amount, "statusBenefit") FROM stdin;
\.


--
-- TOC entry 5023 (class 0 OID 25005)
-- Dependencies: 226
-- Data for Name: Scientific activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Scientific activity" (id, name) FROM stdin;
5cfd8c1e-c671-4c40-bfd4-e28d147adf8f	Кандидат наук
9b3ff9e9-5cff-4c6a-aeca-7be791803876	Доктор наук
a93d2531-8e87-448a-8e80-92e3cfc8cb35	Доцент
53312a19-e48c-448e-a54e-1aac2218a1d9	Профессор
\.


--
-- TOC entry 5017 (class 0 OID 24956)
-- Dependencies: 220
-- Data for Name: Student status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Student status" (id, name) FROM stdin;
eef31224-c1f1-47e1-9681-8e4f6b5a8ca4	Обучается
86033c43-b87f-4881-ab27-6cca947d6b3d	Окончил
501cdefc-e5d9-4351-9f82-ef1a616db7d8	В академичесокм отпуске
a24e5e31-83b9-493c-b440-f13c893f3551	Отчислен
\.


--
-- TOC entry 5024 (class 0 OID 25012)
-- Dependencies: 227
-- Data for Name: Students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Students" (id, fullname, birthday, "group", "dayEnrollment", course, "statusStudy", "formStudy", "statusBenefit", "formAdmission", scholarship, is_removed) FROM stdin;
\.


--
-- TOC entry 5021 (class 0 OID 24991)
-- Dependencies: 224
-- Data for Name: Teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Teachers" (id, fullname, birthday, "dayHiring", "dayAppointment", "position", "statusScientific", is_removed) FROM stdin;
\.


--
-- TOC entry 4826 (class 2606 OID 24948)
-- Name: Admission form Admission form_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admission form"
    ADD CONSTRAINT "Admission form_pkey" PRIMARY KEY (id);


--
-- TOC entry 4832 (class 2606 OID 24969)
-- Name: Benefit status Benefit status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Benefit status"
    ADD CONSTRAINT "Benefit status_pkey" PRIMARY KEY (id);


--
-- TOC entry 4848 (class 2606 OID 25030)
-- Name: DDT DDT_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DDT"
    ADD CONSTRAINT "DDT_pkey" PRIMARY KEY (id);


--
-- TOC entry 4836 (class 2606 OID 24983)
-- Name: Departments Departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Departments"
    ADD CONSTRAINT "Departments_pkey" PRIMARY KEY (id);


--
-- TOC entry 4854 (class 2606 OID 25099)
-- Name: Disciplines Disciplines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Disciplines"
    ADD CONSTRAINT "Disciplines_pkey" PRIMARY KEY (id);


--
-- TOC entry 4828 (class 2606 OID 24955)
-- Name: Form of study Form of study_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Form of study"
    ADD CONSTRAINT "Form of study_pkey" PRIMARY KEY (id);


--
-- TOC entry 4850 (class 2606 OID 25045)
-- Name: GD GD_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GD"
    ADD CONSTRAINT "GD_pkey" PRIMARY KEY (id);


--
-- TOC entry 4846 (class 2606 OID 25025)
-- Name: Groups Groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Groups"
    ADD CONSTRAINT "Groups_pkey" PRIMARY KEY (id);


--
-- TOC entry 4834 (class 2606 OID 24976)
-- Name: Positions Positions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Positions"
    ADD CONSTRAINT "Positions_pkey" PRIMARY KEY (id);


--
-- TOC entry 4840 (class 2606 OID 25004)
-- Name: Salary Salary_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Salary"
    ADD CONSTRAINT "Salary_pkey" PRIMARY KEY (id);


--
-- TOC entry 4852 (class 2606 OID 25052)
-- Name: Scholarship Scholarship_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Scholarship"
    ADD CONSTRAINT "Scholarship_pkey" PRIMARY KEY (id);


--
-- TOC entry 4842 (class 2606 OID 25011)
-- Name: Scientific activity Scientific activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Scientific activity"
    ADD CONSTRAINT "Scientific activity_pkey" PRIMARY KEY (id);


--
-- TOC entry 4830 (class 2606 OID 24962)
-- Name: Student status Student status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student status"
    ADD CONSTRAINT "Student status_pkey" PRIMARY KEY (id);


--
-- TOC entry 4844 (class 2606 OID 25018)
-- Name: Students Students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_pkey" PRIMARY KEY (id);


--
-- TOC entry 4838 (class 2606 OID 24997)
-- Name: Teachers Teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Teachers"
    ADD CONSTRAINT "Teachers_pkey" PRIMARY KEY (id);


--
-- TOC entry 4864 (class 2606 OID 25105)
-- Name: DDT DDT_department_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DDT"
    ADD CONSTRAINT "DDT_department_fkey" FOREIGN KEY (department) REFERENCES public."Departments"(id) NOT VALID;


--
-- TOC entry 4865 (class 2606 OID 25115)
-- Name: DDT DDT_discipline_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DDT"
    ADD CONSTRAINT "DDT_discipline_fkey" FOREIGN KEY (discipline) REFERENCES public."Disciplines"(id) NOT VALID;


--
-- TOC entry 4866 (class 2606 OID 25110)
-- Name: DDT DDT_teacher_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DDT"
    ADD CONSTRAINT "DDT_teacher_fkey" FOREIGN KEY (teacher) REFERENCES public."Teachers"(id) NOT VALID;


--
-- TOC entry 4867 (class 2606 OID 25100)
-- Name: GD GD_discipline_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GD"
    ADD CONSTRAINT "GD_discipline_fkey" FOREIGN KEY (discipline) REFERENCES public."Disciplines"(id) NOT VALID;


--
-- TOC entry 4868 (class 2606 OID 25088)
-- Name: GD GD_group_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GD"
    ADD CONSTRAINT "GD_group_fkey" FOREIGN KEY ("group") REFERENCES public."Groups"(id) NOT VALID;


--
-- TOC entry 4857 (class 2606 OID 25173)
-- Name: Salary Salary_position_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Salary"
    ADD CONSTRAINT "Salary_position_fkey" FOREIGN KEY ("position") REFERENCES public."Positions"(id) NOT VALID;


--
-- TOC entry 4869 (class 2606 OID 25078)
-- Name: Scholarship Scholarship_statusBenefit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Scholarship"
    ADD CONSTRAINT "Scholarship_statusBenefit_fkey" FOREIGN KEY ("statusBenefit") REFERENCES public."Benefit status"(id) NOT VALID;


--
-- TOC entry 4858 (class 2606 OID 25135)
-- Name: Students Students_admissionForm_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_admissionForm_fkey" FOREIGN KEY ("formAdmission") REFERENCES public."Admission form"(id) NOT VALID;


--
-- TOC entry 4859 (class 2606 OID 25053)
-- Name: Students Students_group_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_group_fkey" FOREIGN KEY ("group") REFERENCES public."Groups"(id) NOT VALID;


--
-- TOC entry 4860 (class 2606 OID 25140)
-- Name: Students Students_scholarship_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_scholarship_fkey" FOREIGN KEY (scholarship) REFERENCES public."Scholarship"(id) NOT VALID;


--
-- TOC entry 4861 (class 2606 OID 25068)
-- Name: Students Students_statusBenefit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_statusBenefit_fkey" FOREIGN KEY ("statusBenefit") REFERENCES public."Benefit status"(id) NOT VALID;


--
-- TOC entry 4862 (class 2606 OID 25058)
-- Name: Students Students_statusStudy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_statusStudy_fkey" FOREIGN KEY ("statusStudy") REFERENCES public."Student status"(id) NOT VALID;


--
-- TOC entry 4863 (class 2606 OID 25063)
-- Name: Students Students_studyForm_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_studyForm_fkey" FOREIGN KEY ("formStudy") REFERENCES public."Form of study"(id) NOT VALID;


--
-- TOC entry 4855 (class 2606 OID 25120)
-- Name: Teachers Teachers_position_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Teachers"
    ADD CONSTRAINT "Teachers_position_fkey" FOREIGN KEY ("position") REFERENCES public."Positions"(id) NOT VALID;


--
-- TOC entry 4856 (class 2606 OID 25125)
-- Name: Teachers Teachers_scientificStatus_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Teachers"
    ADD CONSTRAINT "Teachers_scientificStatus_fkey" FOREIGN KEY ("statusScientific") REFERENCES public."Scientific activity"(id) NOT VALID;


-- Completed on 2025-05-10 01:07:58

--
-- PostgreSQL database dump complete
--


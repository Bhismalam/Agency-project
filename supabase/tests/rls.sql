-- Access-rule checks for supabase/migrations. Run with `npm run db:test`.
-- Each block prints what it expects next to the actual result; read the output top to bottom.
\set QUIET on
\pset tuples_only on
-- Fixtures (as postgres = trusted)
insert into divisions (id, slug, name, vertical) values ('00000000-0000-0000-0000-0000000000d1','development','Development Team','build');
insert into members (id, email, access_role, slug, name, is_published, division_id) values
 ('00000000-0000-0000-0000-00000000000a','owner@x.com','owner','owner','Owner',true,'00000000-0000-0000-0000-0000000000d1'),
 ('00000000-0000-0000-0000-00000000000b','member@x.com','member','member','Member',true,null),
 ('00000000-0000-0000-0000-00000000000c',null,'member','hidden','Hidden',false,null),
 ('00000000-0000-0000-0000-00000000000e','gone@x.com','member','gone','Gone',true,null);
update members set is_active=false where slug='gone';
insert into auth.users (id,email) values
 ('11111111-1111-1111-1111-11111111111a','OWNER@x.com'),
 ('11111111-1111-1111-1111-11111111111b','member@x.com'),
 ('11111111-1111-1111-1111-11111111111e','gone@x.com'),
 ('11111111-1111-1111-1111-1111111111ff','outsider@x.com');
insert into projects (id, slug, vertical, name, is_published) values
 ('22222222-2222-2222-2222-22222222222a','p-linked','build','Linked',true),
 ('22222222-2222-2222-2222-22222222222b','p-other','build','Other',false);
insert into project_members values ('22222222-2222-2222-2222-22222222222a','00000000-0000-0000-0000-00000000000b');
insert into programs (id, slug, title, status) values ('33333333-3333-3333-3333-33333333333a','intern','Intern','open');
insert into applications (program_id,name,email) values ('33333333-3333-3333-3333-33333333333a','A','a@a.com');
insert into posts (slug,title,vertical,status,author_id) values ('pub','Pub','build','published',null),('draft','Draft','build','draft','00000000-0000-0000-0000-00000000000a');

\echo '== T1 trigger linked user_id by email (expect owner,member,gone linked; outsider none)'
select slug, user_id is not null from members order by slug;

\echo '== T2 anon sees only published+active members (expect member, owner)'
set role anon;
select string_agg(slug, ',' order by slug) from members;
\echo '== T3 anon sees 0 applications, only published posts, only published projects'
select count(*) from applications; select string_agg(slug, ',') from posts; select string_agg(slug, ',') from projects;
\echo '== T4 anon insert application (expect ERROR)'
insert into applications (program_id,name,email) values ('33333333-3333-3333-3333-33333333333a','X','x@x.com');
reset role;

\echo '== T5 member edits own bio (expect UPDATE 1)'
set role authenticated; set request.jwt.claims = '{"sub":"11111111-1111-1111-1111-11111111111b"}';
\set QUIET off
update members set bio='hi' where slug='member';
\echo '== T6 member changes own access_role (expect ERROR)'
update members set access_role='owner' where slug='member';
\echo '== T7 member edits someone else (expect UPDATE 0)'
update members set bio='hack' where slug='owner';
\echo '== T8 member inserts a member (expect ERROR)'
insert into members (slug,name) values ('new','New');
\echo '== T9 member edits linked project description (expect UPDATE 1), publishes it (ERROR), edits unlinked (UPDATE 0)'
update projects set description='d' where slug='p-linked';
update projects set is_published=false where slug='p-linked';
update projects set description='d' where slug='p-other';
\echo '== T10 member writes own post (INSERT 1), post as owner (ERROR), sees applications (0)'
insert into posts (slug,title,vertical,author_id) values ('mine','Mine','build','00000000-0000-0000-0000-00000000000b');
insert into posts (slug,title,vertical,author_id) values ('fake','Fake','build','00000000-0000-0000-0000-00000000000a');
\set QUIET on
select count(*) from applications;
\echo '== T11 member storage: own folder (INSERT 1), other folder (ERROR)'
\set QUIET off
insert into storage.objects (bucket_id,name) values ('media','members/00000000-0000-0000-0000-00000000000b/me.jpg');
insert into storage.objects (bucket_id,name) values ('media','members/00000000-0000-0000-0000-00000000000a/me.jpg');
\set QUIET on
reset role;

\echo '== T12 outsider (auth account, not invited): update anything (UPDATE 0), sees applications (0)'
set role authenticated; set request.jwt.claims = '{"sub":"11111111-1111-1111-1111-1111111111ff"}';
\set QUIET off
update members set bio='x';
\set QUIET on
select count(*) from applications;
reset role;

\echo '== T13 deactivated member edits own profile (expect UPDATE 0)'
set role authenticated; set request.jwt.claims = '{"sub":"11111111-1111-1111-1111-11111111111e"}';
\set QUIET off
update members set bio='x' where slug='gone';
\set QUIET on
reset role;

\echo '== T14 owner: publishes hidden member (UPDATE 1), reads applications (1), inserts member (INSERT 1)'
set role authenticated; set request.jwt.claims = '{"sub":"11111111-1111-1111-1111-11111111111a"}';
\set QUIET off
update members set is_published=true where slug='hidden';
\set QUIET on
select count(*) from applications;
\set QUIET off
insert into members (slug,name) values ('new','New');
\set QUIET on
reset role;
\echo '== T15 anon reads email (expect ERROR), reads profile columns (expect member,owner + hidden now published)'
set role anon;
select email from members;
select string_agg(slug, ',' order by slug) from members;
\echo '== T16 anon select * (expect ERROR — public queries must list columns)'
select * from members limit 1;
reset role;

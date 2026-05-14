create or replace function public.fn_login_usuario(
  p_email text,
  p_senha text
)
returns table (
  "ID" uuid,
  "ID_AUTH" uuid,
  "NM_USUARIO" character varying,
  "DS_EMAIL" character varying,
  "DT_NASCIMENTO" date,
  "URL_FOTO" text,
  "FL_ATIVO" boolean,
  "DT_CRIACAO" timestamp without time zone,
  "DT_ATUALIZACAO" timestamp without time zone,
  "DS_SENHA" text,
  "IS_ADM" boolean,
  tipo_usuario integer,
  "TP_USUARIO" integer,
  "FL_IS_ADM" boolean
)
language sql
security definer
set search_path = public
as $$
  select
    u."ID",
    u."ID_AUTH",
    u."NM_USUARIO",
    u."DS_EMAIL",
    u."DT_NASCIMENTO",
    u."URL_FOTO",
    u."FL_ATIVO",
    u."DT_CRIACAO",
    u."DT_ATUALIZACAO",
    u."DS_SENHA",
    u."IS_ADM",
    u.tipo_usuario,
    u."TP_USUARIO",
    u."FL_IS_ADM"
  from public."TB_USUARIO" u
  where lower(trim(u."DS_EMAIL")) = lower(trim(p_email))
    and trim(coalesce(u."DS_SENHA", '')) = trim(coalesce(p_senha, ''))
    and u."FL_ATIVO" = true
  limit 1;
$$;

revoke all on function public.fn_login_usuario(text, text) from public;
grant execute on function public.fn_login_usuario(text, text) to anon;
grant execute on function public.fn_login_usuario(text, text) to authenticated;

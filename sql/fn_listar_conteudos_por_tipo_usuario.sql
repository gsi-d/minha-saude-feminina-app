create or replace function public.fn_listar_conteudos_por_tipo_usuario(
  p_tp_usuario integer
)
returns table (
  "ID" uuid,
  "DS_TITULO" character varying,
  "DS_RESUMO" text,
  "DS_DESCRICAO" text,
  "DS_TAG" character varying,
  "FL_ATIVO" boolean,
  "DT_CRIACAO" timestamp without time zone,
  "TP_USUARIO" integer
)
language sql
security definer
set search_path = public
as $$
  select
    c."ID",
    c."DS_TITULO",
    c."DS_RESUMO",
    c."DS_DESCRICAO",
    c."DS_TAG",
    c."FL_ATIVO",
    c."DT_CRIACAO",
    c."TP_USUARIO"
  from public."TB_CONTEUDO" c
  where c."FL_ATIVO" = true
    and coalesce(c."TP_USUARIO", 5) = coalesce(p_tp_usuario, 5)
  order by c."DT_CRIACAO" desc, c."DS_TITULO" asc;
$$;

revoke all on function public.fn_listar_conteudos_por_tipo_usuario(integer) from public;
grant execute on function public.fn_listar_conteudos_por_tipo_usuario(integer) to anon;
grant execute on function public.fn_listar_conteudos_por_tipo_usuario(integer) to authenticated;

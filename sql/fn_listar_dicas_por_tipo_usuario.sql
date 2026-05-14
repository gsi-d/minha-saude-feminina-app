create or replace function public.fn_listar_dicas_por_tipo_usuario(
  p_tp_usuario integer,
  p_tags text[] default null
)
returns table (
  "ID" uuid,
  "DS_TITULO" character varying,
  "DS_CONTEUDO" text,
  "DS_CATEGORIA" character varying,
  "DS_ICONE" character varying,
  "NR_ORDEM" integer,
  "FL_DESTAQUE" boolean,
  "FL_ATIVO" boolean,
  "DT_CRIACAO" timestamp without time zone,
  "DT_ATUALIZACAO" timestamp without time zone,
  "ID_CONTEUDO" uuid,
  "TP_USUARIO" integer,
  "DS_TAG" character varying
)
language sql
security definer
set search_path = public
as $$
  select
    d."ID",
    d."DS_TITULO",
    d."DS_CONTEUDO",
    d."DS_CATEGORIA",
    d."DS_ICONE",
    d."NR_ORDEM",
    d."FL_DESTAQUE",
    d."FL_ATIVO",
    d."DT_CRIACAO",
    d."DT_ATUALIZACAO",
    d."ID_CONTEUDO",
    d."TP_USUARIO",
    d."DS_TAG"
  from public."TB_DICA" d
  where d."FL_ATIVO" = true
    and coalesce(d."TP_USUARIO", 5) = coalesce(p_tp_usuario, 5)
    and (
      p_tags is null
      or array_length(p_tags, 1) is null
      or lower(coalesce(d."DS_TAG", '')) = any (
        select lower(unnest(p_tags))
      )
    )
  order by d."FL_DESTAQUE" desc, d."NR_ORDEM" asc, d."DT_CRIACAO" desc;
$$;

revoke all on function public.fn_listar_dicas_por_tipo_usuario(integer, text[]) from public;
grant execute on function public.fn_listar_dicas_por_tipo_usuario(integer, text[]) to anon;
grant execute on function public.fn_listar_dicas_por_tipo_usuario(integer, text[]) to authenticated;

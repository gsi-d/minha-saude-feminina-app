import { getDataSourceProvider, type DataSourceProvider } from '../config/env';

export function resolveDataSourceProvider(
  env: Record<string, string | undefined>
): DataSourceProvider {
  return getDataSourceProvider(env);
}

# Implementação do Rastreador de Ciclo Menstrual

## ✅ Funcionalidades Implementadas

### 1. **Registro de Ciclo**
- ✅ Iniciar novo ciclo com data de início
- ✅ Adicionar notas opcionais (intensidade, sintomas, etc.)
- ✅ Encerrar ciclo registrado com data de término
- ✅ Cálculo automático de duração

### 2. **Armazenamento Local**
- ✅ Dados persistidos em AsyncStorage
- ✅ Sem dependência de servidor (funciona offline)
- ✅ Todos os registros salvos localmente no dispositivo

### 3. **Visualização em Calendário**
- ✅ Histórico completo de ciclos registrados
- ✅ Visualização das datas de início e término
- ✅ Status do ciclo atual (em andamento/finalizado)

### 4. **Identificação de Períodos Menstruais**
- ✅ Exibição clara do ciclo em andamento
- ✅ Indicação de dias decorridos
- ✅ Diferenciação visual entre ciclos ativos e passados

### 5. **Previsão de Próximo Ciclo**
- ✅ Cálculo automático baseado no histórico
- ✅ Ciclo padrão detectado (média dos últimos ciclos)
- ✅ Data prevista de início e término
- ✅ Dias restantes até o próximo ciclo

### 6. **Consulta de Registros**
- ✅ Lista completa de todos os registros
- ✅ Ordenação por data (mais recentes primeiro)
- ✅ Possibilidade de deletar registros antigos

## 📁 Estrutura de Arquivos Criada

```
/data/ciclo/
  ├── ciclo.types.ts         # Tipos (RegistroCiclo, CicloPrevisao)
  ├── ciclo.storage.ts       # Camada de persistência (AsyncStorage)
  ├── ciclo.repository.ts    # Lógica de negócio e cálculos
  └── index.ts               # Exports

/contexts/
  └── CicloContext.tsx        # Context para gerenciar estado global

/components/
  ├── NovoRegistroDialog.tsx      # Dialog para iniciar ciclo
  ├── EncerrarRegistroDialog.tsx  # Dialog para encerrar ciclo
  ├── CartaoCicloAtivo.tsx        # Card do ciclo em andamento
  ├── CartaoPrevisao.tsx          # Card com previsão
  └── HistoricoRegistros.tsx      # Lista de registros anteriores

/app/(tabs)/
  └── ciclo.tsx               # Tela principal atualizada
```

## 🎨 Padrão de Design

A implementação segue os padrões existentes do app:

- **Cores**: Rosa/roxo (#D946A6, #9333EA)
- **Componentes**: React Native Paper
- **Ícones**: Material Community Icons
- **Layout**: Scroll + Cards + FAB (Floating Action Button)
- **Contexto**: Gerenciamento de estado com React Context

## 🚀 Como Usar

### Iniciar um Novo Ciclo
1. Na tela "Ciclo", clique no botão "+" (FAB) no canto inferior direito
2. Selecione a data de início do ciclo
3. Adicione notas opcionais (opcional)
4. Clique em "Salvar"

### Encerrar um Ciclo
1. Na tela "Ciclo", veja o "Ciclo em andamento"
2. Clique em "Encerrar Ciclo"
3. Selecione a data de término
4. Confirme

### Visualizar Histórico
- Todos os ciclos anteriores são listados abaixo da previsão
- Mostra data, duração e notas (se houver)
- Pode-se deletar ciclos antigos

### Ver Previsão
- O card "Próximo Ciclo Previsto" mostra:
  - Data prevista de início
  - Data prevista de término
  - Dias até o próximo ciclo
  - Duração padrão do ciclo

## 💾 Armazenamento

Os dados são salvos em:
- **Chave**: `@menstrual_cycle_registros`
- **Formato**: JSON array com todos os registros
- **Local**: AsyncStorage (específico do dispositivo)

## 🔄 Fluxo de Dados

```
CicloScreen
    ↓
useCiclo() → CicloContext
    ↓
CicloRepository
    ↓
CicloStorage → AsyncStorage
```

## 📊 Exemplo de Dados

```typescript
{
  id: "1234567890_abc123def",
  dataInicio: "2024-08-01",
  dataFim: "2024-08-06",
  duracaoEmDias: 6,
  notas: "Fluxo moderado, sem cólicas",
  criadoEm: "2024-08-01T10:30:00Z",
  atualizadoEm: "2024-08-06T14:20:00Z"
}
```

## ⚠️ Dependências Instaladas

- `@react-native-async-storage/async-storage` - Armazenamento local
- `@react-native-community/datetimepicker` - Seletor de datas

## 🔧 Próximas Melhorias (Sugestões)

- [ ] Integração com calendário visual (react-native-calendars)
- [ ] Sincronização com iCloud/Google Drive
- [ ] Notificações de proximidade do ciclo
- [ ] Exportar dados em PDF
- [ ] Integração com Supabase para backup
- [ ] Temas personalizáveis
- [ ] Multilíngue

---

**Status**: ✅ Pronto para testes e ajustes

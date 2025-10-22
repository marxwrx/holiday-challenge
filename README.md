# Holiday Challenge

Aplicação desenvolvida em **Next.js + TypeScript + Material UI**.

A ideia do projeto é listar os feriados de 2025 consumindo a [BrasilAPI](https://brasilapi.com.br/), permitindo aplicar filtros, busca, ordenação e exibir os dados de forma organizada e responsiva. (API conta apenas com feriados nacionais)

---

## Contexto e decisões

O desafio pedia a implementação da listagem de feriados com filtros e ordenação.  
Além disso, haviam três abas no layout (`Tela A`, `Tela B`, `Tela C`) que ficariam vazias.  
Como seria estranho entregar as telas “mortas”, aproveitei o espaço para **adicionar funcionalidades extras**

- A **primeira aba** virou um **calendário**, onde o usuário pode visualizar os feriados no mês e, ao clicar em uma data, ver o nome e o tipo do feriado.
- A **segunda aba** se tornou uma tela de **exportação** (CSV e JSON) dos feriados listados.
- A **terceira aba** permanece como a **tabela principal**, com busca, filtros e ordenação


---

## Tecnologias e stack usada

**Next.js**,
**TypeScript**,
**Material UI (MUI)**,
**SWR**,
**date-fns**,
**Jest + React Testing Library**,
**ESLint + Prettier**

---

## 🧱 Estrutura do projeto

````
src/
├─ app/
│ ├─ layout.tsx
│ ├─ page.tsx
│ └─ globals.css
├─ components/
│ ├─ ExportHolidays/
│ ├─ Filters/
│ ├─ HolidayCalendar/
│ ├─ HolidaysTable/
│ ├─ SearchBar/
│ ├─ SortButton/
│ ├─ Tabs/
│ └─ TypeChip/
├─ hooks/
│ └─ useHolidays.ts
├─ lib/
│ ├─ download.ts
│ ├─ exporters.ts / exporters.test.ts
│ ├─ holidays.ts
│ └─ types.ts
├─ theme/
│ ├─ theme.ts
│ └─ setupTests.ts
````

## 🧭 Funcionalidades principais

###  **Holiday Table**
- Consome `https://brasilapi.com.br/api/feriados/v1/2025`
- Permite filtrar por tipo e data
- Busca por nome (ao clicar na lupa)
- Ordenação asc/desc
- Mostra total de registros

### **Calendário interativo**
- Marca os feriados diretamente no calendário
- Ao clicar na data, mostra os detalhes do feriado na lateral

### **Exportação**
- Exporta todos os feriados listados em **CSV** ou **JSON**
- Cria os arquivos diretamente no navegador (via Blob API)

---

## Testes

testes foram feitos com **Jest + React Testing Library**:
- comportamento dos filtros e botões
- renderização correta das tabelas e chips
- exportação de dados
- mudança de abas

## Como rodar o projeto

```bash
# Instalar dependências
npm install

# Rodar
npm dev

# Rodar testes
npm test

```
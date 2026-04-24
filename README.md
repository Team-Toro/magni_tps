# Registro de Participantes - TP5

Aplicación React con backend Express + SQLite, Context API y useReducer.

## Requisitos

- Node.js 18+

## Instalación

```bash
npm install
```

## Ejecutar

```bash
npm run start
```

Esto inicia:
- Backend API en `http://localhost:3001`
- Frontend React en `http://localhost:5173`

## Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/participantes` | Lista todos los participantes |
| POST | `/participantes` | Crea un participante |
| PUT | `/participantes/:id` | Actualiza un participante por ID |
| DELETE | `/participantes/:id` | Elimina un participante por ID |

## Estructura

```
src/
├── context/
│   ├── ParticipantesContext.tsx   # Context
│   ├── ParticipantesProvider.tsx # Provider
│   └── useParticipantes.ts      # Hook
├── reducers/
│   └── participantesReducer.ts   # Reducer con acciones
├── components/
│   ├── Formulario.tsx
│   ├── Filtros.tsx
│   └── ParticipanteCard.tsx
├── models/
│   └── Participante.ts
├── Home.tsx
├── App.tsx
└── main.tsx

server/
├── database.ts
└── index.ts
```

## Cambios vs versión anterior (TP3)

- **useReducer**: El estado se maneja con reducer en lugar de useState
- **Acciones centralizadas**: Todas las operaciones de estado pasan por el reducer
- **Editar participante**: Nueva funcionalidad para editar participantes existentes
- **Botón dinámico**: El botón del formulario cambia entre "Registrar" y "Actualizar"

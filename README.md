# Registro de Participantes - TP4

Aplicación React con backend Express + SQLite y Context API.

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
| DELETE | `/participantes/:id` | Elimina un participante por ID |

## Estructura

```
src/
├── context/
│   ├── ParticipantesContext.tsx   # Context
│   ├── ParticipantesProvider.tsx # Provider
│   └── useParticipantes.ts      # Hook
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

## Cambios visibles vs versión anterior (TP3)

- **Persistencia**: Los datos ahora se guardan en SQLite (backend), no en localStorage
- **Context API**:any component puede acceder a participantes sin pasar props
- **API REST**: Frontend y backend se comunican via JSON
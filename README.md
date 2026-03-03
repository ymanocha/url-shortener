# URL Shortener Service

A backend URL shortening service built with Node.js, Express.js, and PostgreSQL (via Supabase). Uses Base62 encoding to generate compact, collision-resistant short URLs.

## Features

- **Base62 Encoding** – Generates short, compact URLs with a large collision-resistant namespace
- **PostgreSQL Persistence** – All URLs stored and retrieved via Supabase-hosted PostgreSQL
- **Clean REST API** – Simple endpoints for creating and resolving short URLs
- **Redirect Support** – Short URLs resolve and redirect to the original destination

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** PostgreSQL (via Supabase)
- **Driver:** `pg` / `postgres`

## Getting Started

### Prerequisites

- Node.js v16+
- A PostgreSQL database (local or Supabase)

### Installation

```bash
git clone https://github.com/ymanocha/url-shortener.git
cd url-shortener
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_postgresql_connection_string
```

### Database Setup

Create the URLs table in your PostgreSQL database:

```sql
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Run the Server

```bash
npm start
```

Server runs on `http://localhost:3000` by default.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/shorten` | Create a new short URL |
| GET | `/shorten/:code` | Redirect to the original URL |

### POST `/shorten`

**Request Body:**
```json
{
  "url": "https://www.example.com/some/very/long/url"
}
```

**Response:**
```json
{
  "shortUrl": "http://localhost:3000/shorten/aB3xYz"
}
```

### GET `/shorten/:code`

Redirects to the original URL associated with the short code.

## How It Works

1. A long URL is received via POST request
2. A unique ID is generated and encoded using **Base62** (characters: `0-9`, `a-z`, `A-Z`)
3. The short code and original URL are persisted in PostgreSQL via Supabase
4. On GET request, the short code is decoded, the original URL is fetched, and the client is redirected

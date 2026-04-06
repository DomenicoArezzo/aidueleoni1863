## Piano di implementazione

### 1. Abilitare Lovable Cloud
- Database PostgreSQL per prenotazioni, disponibilità, feed iCal, log sync
- Autenticazione per accesso dashboard admin
- Edge Functions per sync iCal (polling)

### 2. Schema Database
- `properties` — strutture (multi-property ready)
- `bookings` — prenotazioni (fonte: manual/booking/airbnb/website)
- `availability_blocks` — blocchi manuali date
- `ical_feeds` — URL feed iCal configurati (Booking, Airbnb)
- `sync_logs` — log sincronizzazioni con errori
- `user_roles` — ruoli admin

### 3. Edge Functions
- **sync-ical**: Polling dei feed iCal, parsing eventi, upsert prenotazioni
- **export-ical**: Genera feed ICS da esportare verso Booking/Airbnb
- **check-availability**: API pubblica per verificare disponibilità date

### 4. Dashboard Admin (`/admin`)
- Login con email/password
- Calendario unificato con tutte le fonti
- Gestione manuale blocchi/aperture
- Configurazione feed iCal (URL Booking, Airbnb)
- Log sincronizzazioni e errori
- Override manuale date

### 5. Frontend Pubblico
- Calendario interattivo con date non disponibili disabilitate
- Aggiornamento automatico via API
- Prevenzione double booking

### 6. Gestione conflitti
- Priorità: prenotazioni confermate > blocchi manuali > pending
- Caching e fallback su failure
- Near real-time polling (configurabile 5-15 min)

### Come ottenere i feed iCal
Ti guiderò su come recuperare gli URL iCal da Booking.com e Airbnb nel pannello di ciascuna piattaforma.

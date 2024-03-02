# Appizza REST API

> Nota: tutti i comandi shell devono essere eseguiti dalla directory che contiene questo documento.

## Build

L'applicazione viene eseguita in container Docker.

> Nota: prima di eseguire la build è necessario impostare alcune variabili d'ambiente. Riferirsi al file `.env` di esempio per capire quali variabili devono essere definite.

Per la build lanciare il comando:

`docker compose build`

## Esecuzione

Per eseguire l'applicazione, lanciare il comando:

`docker compose up -d`

L'API viene esposta sulla porta 8080. All'avvio è presente un solo utente con username "admin" e password "admin".

## Script utili

- `get-token.sh` restituisce il token di autenticazione di un utente
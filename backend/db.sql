CREATE TABLE tab_utenti (
    ID_utente INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    userlevel TINYINT NOT NULL,
    classe VARCHAR(2),
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    citta VARCHAR(100)
);

CREATE TABLE tab_pizze (
    ID_pizza INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    prezzo FLOAT NOT NULL,
    disponibile TINYINT NOT NULL,
    descrizione VARCHAR(200),
    foto VARCHAR(300),
    id_venditore INT NOT NULL,
    FOREIGN KEY(id_venditore) REFERENCES tab_utenti(ID_utente)
);

CREATE TABLE tab_valutazioni (
    id_pizza INT,
    id_classe INT,
    voto TINYINT NOT NULL,
    commento VARCHAR(500),
    PRIMARY KEY(id_pizza, id_classe),
    FOREIGN KEY(id_pizza) REFERENCES tab_pizze(ID_pizza),
    FOREIGN KEY(id_classe) REFERENCES tab_utenti(ID_utente)
);

CREATE TABLE tab_ordini (
    ID_ordine INT AUTO_INCREMENT PRIMARY KEY,
    data_effettuato DATETIME NOT NULL,
    data_consegna DATETIME NOT NULL,
    stato VARCHAR(100) NOT NULL
);

CREATE TABLE tab_quantita_ordinate (
    id_ordine INT, 
    id_pizza INT,
    id_classe INT,
    quantita INT NOT NULL,
    PRIMARY KEY(id_ordine, id_pizza, id_classe),
    FOREIGN KEY(id_pizza) REFERENCES tab_pizze(ID_pizza),
    FOREIGN KEY(id_classe) REFERENCES tab_utenti(ID_utente),
    FOREIGN KEY(id_ordine) REFERENCES tab_ordini(ID_ordine)
);
---
title: 'Apache Guacamole: Intro'
publishDate: "17 June 2024"
description: "An overview of authentication methods in apache."
coverImage:
    src: "./cover.png"
    alt: 'The full Astro logo.'
tags: ["web development", "apache guacamole"]
---

During a recent freelance project, I was tasked with researching [Apache Guacamole](https://guacamole.apache.org/doc/gug/#).  Guacamole is an open source HTML5 web application that provides access to remote desktop environments through protocols like VNC, RDP, and SSH. Below is an overview of the package's architecture, steps to installation using Docker, and various authentication methods available.

## What is Apache Guacamole?

Guacamole separates concerns so that each component handles what is relevant to it. The client is written in Javascript and connects to the Guacamole server over HTTP via the Guacamole protocol.  The web application forwards the guacamole protocol to guacd, the native guacamole proxy which interprets its contents and connects to any number of remote desktop servers.

![Guacamole Architecture](guac-arch.png "Architecture")

The **guacamole protocol** is a procotol for remote desktop display rendering and event transport. Recall a <i>protocol</i> is just a system of rules that define how data is exchanged within or between computers. Note the Guacamole protocol is not intended to implement the features of a specific desktop environment.

Adding support for a particular protocol, like RDP involves a "middle layer" that translates between the remote desktop protocol and the Guac protocol.  The middle layer is called **guacd**.

guacd is a daemon process, so it runs in the background and listens for TCP connections from the client. guacd implements just enough of the Guacamole protocol to understand which remote protocol should be loaded and what args should be passed to it.  It loads suppot for that protocol (called a "client plugin").  The client 
plugin runs independently of guacd and communicates with web app until the connection is terminated. guacd and all client plugins depend on a common lib called 'libguac'

The **client** web application relies on guacd for the remote desktop protocol and simply contains an interface and authentication layer.

## Installation via Docker

Docker makes the installation of guacamole apache fast and painless.  According to the docs, 
>`the Guacamole project provides officially-supported Docker images for both Guacamole and guacd which are kept up-to-date with each release.`

Great news! 

So to get started, it should be noted there will be 3 separate docker containers, <i>guacamole/guacd</i>, <i>guacamole/guacamole</i>, and a <i>database instance</i> running mysql or postgres.  For the purposes of this article, we will be running a postgres docker container.

---

Run **guacd** with the following command:\
`docker run --name some-guacd -d guacamole/guacd`\
(Note the default port is 4482).

---

To create the **postgres database**:

1. Create a volume:\
`docker volume create guac-db`.
2. Run the postgres container:\
`docker run --name some-postgres -e POSTGRES_PASSWORD=my_pw -d --mount type=volume,src=guac-db,target=/etc/guac-db postgres`.
3. Copy the init script to the container:\
`docker cp init.sql db:/init.sql`.
4. Exec into the postgres container and create the database **guacamole_db**.
5. Once you create the db, connect to it and run the script:\
`\i init.sql`.
6. Create a user and grant priviliges with the following:\
`CREATE USER guacamole_user WITH PASSWORD 'some_password';`\
`GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA public TO guacamole_user;`\
`GRANT SELECT,USAGE ON ALL SEQUENCES IN SCHEMA public TO guacamole_user;`.

## Types of Authentication

List type of auth here (xml, database, ldap, saml, header, encrypted json, etc...)

### XML
### Database
### LDAP
### SAML
### Header
### Encrypted JSON
### Others?
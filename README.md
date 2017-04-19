CouchDBManager Design Documents
===============================
> CouchDB Design Documents companion for CouchDBManager API

## Tabla de contenidos
- **[Gestión de bloqueos](#gestión-de-bloqueos)**
    - [Instalación](#instalación)
- **Gestión de versiones extendida**
- **Resolución de incidencias**

## Novedades 2017

### Gestión de bloqueos

Ahora los documentos bloqueados en el servidor remoto no se actualizarán con las sincronizaciones desde los equipos locales.

A continuación se detalla la instalación de la acutalización.

_[Arriba](#tabla-de-contenidos)_

#### Instalación

Basta con desplegar el *Desgin Document* **commons** en el servidor remoto.

```bash
cd ./commons
couchapp push http://<usuario>:<clave>@<nombre.o.ip>:5984/<base_de_datos>
```

_[Arriba](#tabla-de-contenidos)_

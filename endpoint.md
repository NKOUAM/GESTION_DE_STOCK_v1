# API Gestion de Stock - Documentation des Endpoints

Base URL : http://localhost:8080
Format : JSON

Auteur : Franck (endpoints de base) + Guilbert Ange (completion et securisation)

---

## Sommaire

1. Authentification
2. Categories
3. Fournisseurs
4. Produits
5. Mouvements de stock
6. Utilisateurs
7. Roles et permissions
8. Codes HTTP
9. Exemples d'appels
10. Comptes de demonstration
11. Bonnes pratiques pour le frontend React

---

## 1. Authentification

### 1.1 Login

POST /api/auth/login - Public

Body :
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Reponse 200 :
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "id": 1,
  "username": "admin",
  "nome": "Administrateur",
  "email": "admin@estoque.com",
  "role": "ADMIN"
}
```

Erreur 401 : identifiants incorrects

---

### 1.2 Inscription

POST /api/auth/register - Public

Body :
```json
{
  "username": "nouveau",
  "password": "motdepasse123",
  "nome": "Nouveau Utilisateur",
  "email": "nouveau@estoque.com",
  "role": "OBSERVATEUR"
}
```

Reponse 200 :
```json
{
  "id": 8,
  "username": "nouveau",
  "nome": "Nouveau Utilisateur",
  "email": "nouveau@estoque.com",
  "role": "OBSERVATEUR",
  "actif": true
}
```

Erreur 400 : username ou email deja utilise

---

### 1.3 Mot de passe oublie

POST /api/auth/forgot-password - Public

Body :
```json
{
  "email": "admin@estoque.com"
}
```

Reponse 200 :
```json
{
  "message": "Si un compte existe avec cet email, vous recevrez un lien de reinitialisation.",
  "devToken": "abc123def456...",
  "devResetLink": "http://localhost:4200/reset-password?token=abc123def456..."
}
```

Attention : devToken et devResetLink sont uniquement en mode demo. En production, ils doivent etre envoyes par email et retires de la reponse.

---

### 1.4 Reinitialisation par token

POST /api/auth/reset-password - Public

Body :
```json
{
  "token": "abc123def456...",
  "newPassword": "nouveauMdp123"
}
```

Reponse 200 :
```json
{
  "message": "Mot de passe reinitialise avec succes"
}
```

Erreur 400 : token invalide, expire ou deja utilise

---

### 1.5 Changement de mot de passe connecte

POST /api/auth/change-password - Authentifie JWT requis

Headers :
```
Authorization: Bearer <token>
```

Body :
```json
{
  "currentPassword": "admin123",
  "newPassword": "nouveauMdp123"
}
```

Reponse 200 :
```json
{
  "message": "Mot de passe modifie avec succes"
}
```

Erreur 400 : mot de passe actuel incorrect ou nouveau identique a l'ancien

---

## 2. Categories

### 2.1 Lister toutes les categories

GET /api/categorias - Authentifie

Reponse 200 :
```json
[
  { "id": 1, "nome": "Notebooks" },
  { "id": 2, "nome": "Souris" }
]
```

---

### 2.2 Rechercher une categorie

GET /api/categorias/{id} - Authentifie

Reponse 200 :
```json
{ "id": 1, "nome": "Notebooks" }
```

Erreur 404 : categorie introuvable

---

### 2.3 Creer une categorie

POST /api/categorias - ADMIN, GERANT

Body :
```json
{ "nome": "Claviers" }
```

Reponse 201 :
```json
{ "id": 3, "nome": "Claviers" }
```

---

### 2.4 Mettre a jour une categorie

PUT /api/categorias/{id} - ADMIN, GERANT

Body :
```json
{ "nome": "Claviers mecaniques" }
```

Reponse 200 : objet mis a jour

---

### 2.5 Supprimer une categorie

DELETE /api/categorias/{id} - ADMIN uniquement

Reponse 204 : pas de contenu

Erreur 409 : impossible de supprimer, des produits y sont rattaches

---

## 3. Fournisseurs

### 3.1 Lister tous les fournisseurs

GET /api/fornecedores - Authentifie

Reponse 200 :
```json
[
  {
    "id": 1,
    "nome": "Tech Distribuidora",
    "cnpj": "12.345.678/0001-99",
    "telefone": "(11) 99999-8888",
    "email": "contato@techdistribuidora.com"
  }
]
```

---

### 3.2 Rechercher un fournisseur

GET /api/fornecedores/{id} - Authentifie

---

### 3.3 Creer un fournisseur

POST /api/fornecedores - ADMIN, GERANT, ACHETEUR

Body :
```json
{
  "nome": "Nouveau Fournisseur",
  "cnpj": "11.222.333/0001-44",
  "telefone": "(11) 98888-7777",
  "email": "contact@fournisseur.com"
}
```

Reponse 201 : objet cree

---

### 3.4 Mettre a jour un fournisseur

PUT /api/fornecedores/{id} - ADMIN, GERANT, ACHETEUR

---

### 3.5 Supprimer un fournisseur

DELETE /api/fornecedores/{id} - ADMIN uniquement

Reponse 204 : pas de contenu

Erreur 409 : impossible de supprimer, des produits y sont rattaches

---

## 4. Produits

### 4.1 Lister les produits

GET /api/produtos - Authentifie

Reponse 200 tableau ou page selon backend :
```json
[
  {
    "id": 1,
    "nome": "Notebook Lenovo IdeaPad 3",
    "descricao": "Intel i5, 8GB RAM, 256GB SSD",
    "preco": 3999.9,
    "quantidade": 15,
    "categoriaId": 1,
    "categoriaNome": "Notebooks",
    "fornecedorId": 1,
    "fornecedorNome": "Tech Distribuidora"
  }
]
```

Attention : le backend peut retourner un objet pagine content, totalElements, etc. ou un tableau direct. Prevoir les deux cas cote React.

---

### 4.2 Rechercher un produit

GET /api/produtos/{id} - Authentifie

---

### 4.3 Creer un produit

POST /api/produtos - ADMIN, GERANT

Body :
```json
{
  "nome": "Notebook HP Pavilion 14",
  "descricao": "AMD Ryzen 5, 8GB RAM",
  "preco": 4299.5,
  "quantidade": 8,
  "categoriaId": 1,
  "fornecedorId": 3
}
```

Reponse 201 : objet cree avec categoriaNome et fornecedorNome remplis

Erreur 400 : nom vide ou produit deja existant

---

### 4.4 Mettre a jour un produit

PUT /api/produtos/{id} - ADMIN, GERANT

Body : identique a la creation

---

### 4.5 Supprimer un produit

DELETE /api/produtos/{id} - ADMIN uniquement

Reponse 204 : pas de contenu

---

## 5. Mouvements de stock

### 5.1 Lister les mouvements d'un produit

GET /api/movimentacoes?produtoId={id} - Authentifie

Reponse 200 :
```json
[
  {
    "id": 1,
    "tipo": "ENTRADA",
    "quantidade": 20,
    "observacao": "Stock initial",
    "data": "2026-09-17T15:39:18",
    "produtoId": 1,
    "produtoNome": "Notebook Lenovo IdeaPad 3"
  },
  {
    "id": 11,
    "tipo": "SAIDA",
    "quantidade": 3,
    "observacao": "Vente client A",
    "data": "2026-09-17T15:39:18",
    "produtoId": 1,
    "produtoNome": "Notebook Lenovo IdeaPad 3"
  }
]
```

---

### 5.2 Enregistrer un mouvement

POST /api/movimentacoes - ADMIN, GERANT, MAGASINIER, VENDEUR, ACHETEUR

Body Entree :
```json
{
  "tipo": "ENTRADA",
  "quantidade": 5,
  "observacao": "Reapprovisionnement",
  "produto": { "id": 1 }
}
```

Body Sortie :
```json
{
  "tipo": "SAIDA",
  "quantidade": 3,
  "observacao": "Vente client",
  "produto": { "id": 1 }
}
```

Reponse 201 : objet mouvement cree

Erreur 400 : stock insuffisant pour une sortie

Regles metier :
- ENTRADA augmente la quantite du produit
- SAIDA diminue la quantite du produit et refuse si stock insuffisant
- La date est automatiquement remplie par le backend

---

## 6. Utilisateurs

### 6.1 Lister tous les utilisateurs

GET /api/usuarios - ADMIN uniquement

Reponse 200 :
```json
[
  {
    "id": 1,
    "username": "admin",
    "nome": "Administrateur",
    "email": "admin@estoque.com",
    "role": "ADMIN",
    "actif": true
  }
]
```

Le mot de passe n'est jamais retourne.

---

### 6.2 Activer ou desactiver un utilisateur

PATCH /api/usuarios/{id}/actif - ADMIN uniquement

Reponse 200 : utilisateur avec actif bascule

---

### 6.3 Supprimer un utilisateur

DELETE /api/usuarios/{id} - ADMIN uniquement

Reponse 204 : pas de contenu

Erreur 400 : impossible de supprimer son propre compte

---

## 7. Roles et permissions

| Role         | Produits | Categories | Fournisseurs | Mouvements      | Utilisateurs |
|--------------|----------|------------|--------------|-----------------|--------------|
| ADMIN        | CRUD     | CRUD       | CRUD         | Create          | CRUD         |
| GERANT       | CRUD     | CRUD       | CRUD         | Create          | -            |
| MAGASINIER   | Lecture  | Lecture    | Lecture      | Create          | -            |
| VENDEUR      | Lecture  | Lecture    | Lecture      | Create sorties  | -            |
| ACHETEUR     | Lecture  | Lecture    | CRUD         | Create entrees  | -            |
| COMPTABLE    | Lecture  | Lecture    | Lecture      | Lecture         | -            |
| OBSERVATEUR  | Lecture  | Lecture    | Lecture      | Lecture         | -            |

Legende :
- CRUD : Create, Read, Update, Delete
- Lecture : GET uniquement
- - : aucun acces

---

## 8. Codes HTTP

| Code | Signification                                    |
|------|--------------------------------------------------|
| 200  | Succes                                           |
| 201  | Ressource creee                                  |
| 204  | Succes sans contenu suppression                  |
| 400  | Requete invalide ou regle metier violee          |
| 401  | Non authentifie token manquant ou invalide       |
| 403  | Acces refuse role insuffisant                    |
| 404  | Ressource introuvable                            |
| 409  | Conflit doublon ou contrainte FK                 |
| 500  | Erreur interne du serveur                        |

---

## 9. Exemples d'appels

### 9.1 Login avec fetch

```javascript
const response = await fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123'
  })
});

const data = await response.json();
localStorage.setItem('token', data.token);
```

### 9.2 Appel authentifie avec fetch

```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:8080/api/produtos', {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
});

const produtos = await response.json();
```

### 9.3 Axios avec intercepteur recommande React

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 9.4 Login avec Axios

```javascript
import api from './api';

const login = async (username, password) => {
  const { data } = await api.post('/api/auth/login', { username, password });
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};
```

### 9.5 Creer un produit

```javascript
const createProduto = async (produto) => {
  const { data } = await api.post('/api/produtos', produto);
  return data;
};

await createProduto({
  nome: 'Notebook',
  descricao: 'Intel i5',
  preco: 3999.90,
  quantidade: 10,
  categoriaId: 1,
  fornecedorId: 1
});
```

### 9.6 Enregistrer un mouvement

```javascript
const createMovimentacao = async (produtoId, tipo, quantidade, observacao) => {
  const { data } = await api.post('/api/movimentacoes', {
    tipo,
    quantidade,
    observacao,
    produto: { id: produtoId }
  });
  return data;
};

await createMovimentacao(1, 'ENTRADA', 5, 'Reapprovisionnement');
await createMovimentacao(1, 'SAIDA', 3, 'Vente client');
```

---

## 10. Comptes de demonstration

| Utilisateur   | Mot de passe     | Role         |
|---------------|------------------|--------------|
| admin         | admin123         | ADMIN        |
| gerant        | gerant123        | GERANT       |
| magasinier    | magasin123       | MAGASINIER   |
| vendeur       | vendeur123       | VENDEUR      |
| acheteur      | acheteur123      | ACHETEUR     |
| comptable     | comptable123     | COMPTABLE    |
| observateur   | observateur123   | OBSERVATEUR  |

Ces comptes sont crees automatiquement au premier demarrage du backend.

---

## 11. Bonnes pratiques pour le frontend React

1. Stocker le token dans localStorage ou sessionStorage
2. Creer un intercepteur Axios pour ajouter automatiquement le header Authorization
3. Gerer les erreurs 401 en redirigeant vers /login
4. Verifier le role avant d'afficher les boutons CRUD
5. Utiliser un Context ou Redux pour stocker l'utilisateur connecte
6. Proteger les routes avec un composant PrivateRoute
7. Faire un try/catch sur chaque appel API
8. Afficher les messages d'erreur du backend avec error.response.data.message

---

Fin de la documentation

Pour toute question sur les endpoints, contacter Franck ou Guilbert Ange.

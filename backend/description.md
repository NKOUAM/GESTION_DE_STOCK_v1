
```markdown
 📦 API de Gestion de Stock

Ce projet est une API RESTful développée avec Spring Boot** pour gérer le stock d’un magasin d’électronique, permettant de contrôler les produits, catégories, fournisseurs et mouvements de stock (entrées et sorties).

Projet réalisé par Guilbert Ange** dans le cadre de l’examen de Spring Boot.

 🚀 Objectif

Faciliter le contrôle interne du stock du magasin, en offrant des endpoints pour :

Enregistrer, mettre à jour, lister et supprimer des produits, catégories et fournisseurs ;
Enregistrer des mouvements de stock (entrée et sortie) ;
Consulter la quantité disponible de chaque produit.

L’API répond en JSON et utilise les codes HTTP appropriés pour chaque opération.



🛠️ Technologies utilisées

Java 17+
Spring Boot
Spring Web
Spring Data JPA
MySQL (via XAMPP)
Lombok
Spring Validation
Postman (pour les tests)



📂 Structure du projet

src
└── main
├── java
│    └── anapicoli.estoque
│         ├── EstoqueApplication.java              # Classe principale
│         ├── controller
│         │     ├── CategoriaController.java       # Endpoints des catégories
│         │     ├── FornecedorController.java      # Endpoints des fournisseurs
│         │     ├── ProdutoController.java         # Endpoints des produits
│         │     └── MovimentacaoController.java    # Endpoints des mouvements de stock
│         ├── model
│         │     ├── Categoria.java                 # Modèle Catégorie
│         │     ├── Fornecedor.java                # Modèle Fournisseur
│         │     ├── Produto.java                   # Modèle Produit
│         │     └── MovimentacaoEstoque.java       # Modèle Mouvement de Stock
│         ├── repository
│         │     ├── CategoriaRepository.java
│         │     ├── FornecedorRepository.java
│         │     ├── ProdutoRepository.java
│         │     └── MovimentacaoEstoqueRepository.java
│         └── service
│               └── MovimentacaoEstoqueService.java # Règles métier entrées/sorties
└── resources
└── application.properties                     # Configuration BDD et JPA
```

---

## 🔍 Endpoints

### 🔹 Catégories

| Méthode | Endpoint             | Description                     |
| ------- | -------------------- | ------------------------------- |
| GET     | /api/categorias      | Lister toutes les catégories    |
| GET     | /api/categorias/{id} | Rechercher une catégorie par ID |
| POST    | /api/categorias      | Créer une nouvelle catégorie    |
| PUT     | /api/categorias/{id} | Mettre à jour une catégorie     |
| DELETE  | /api/categorias/{id} | Supprimer une catégorie         |

### 🔹 Fournisseurs

| Méthode | Endpoint               | Description                       |
| ------- | ---------------------- | --------------------------------- |
| GET     | /api/fornecedores      | Lister tous les fournisseurs      |
| GET     | /api/fornecedores/{id} | Rechercher un fournisseur par ID  |
| POST    | /api/fornecedores      | Créer un nouveau fournisseur      |
| PUT     | /api/fornecedores/{id} | Mettre à jour un fournisseur      |
| DELETE  | /api/fornecedores/{id} | Supprimer un fournisseur          |

### 🔹 Produits

| Méthode | Endpoint           | Description                                       |
| ------- | ------------------ | ------------------------------------------------- |
| GET     | /api/produtos      | Lister les produits (pagination et tri)           |
| GET     | /api/produtos/{id} | Rechercher un produit par ID                      |
| POST    | /api/produtos      | Créer un nouveau produit                          |
| PUT     | /api/produtos/{id} | Mettre à jour un produit                          |
| DELETE  | /api/produtos/{id} | Supprimer un produit                              |

### 🔹 Mouvements de stock

| Méthode | Endpoint                          | Description                               |
| ------- | --------------------------------- | ----------------------------------------- |
| GET     | /api/movimentacoes?produtoId={id} | Lister les mouvements d’un produit        |
| POST    | /api/movimentacoes                | Enregistrer une entrée ou sortie de stock |

---

## 🧪 Tester avec Postman

1. Exécutez le projet :

```bash
mvn spring-boot:run
```

2. Ouvrez **Postman**.
3. Créez une **Collection** nommée `Estoque API`.
4. Configurez les requêtes selon les endpoints ci-dessus, en utilisant du **JSON** dans le corps (`Body → raw → JSON`) et l’en-tête :

```
Content-Type: application/json
```

5. Exemples d’utilisation :

* Créer une catégorie :

```json
{
  "nome": "Notebooks"
}
```

* Créer un fournisseur :

```json
{
  "nome": "Tech Distribuidora",
  "cnpj": "12.345.678/0001-99",
  "telefone": "(11) 99999-8888",
  "email": "contato@techdistribuidora.com"
}
```

* Créer un produit :

```json
{
  "nome": "Notebook Lenovo",
  "descricao": "Intel i5, 8GB RAM, 256GB SSD",
  "preco": 3999.90,
  "quantidade": 10,
  "categoria": { "id": 1 },
  "fornecedor": { "id": 1 }
}
```

* Enregistrer une entrée de stock :

```json
{
  "tipo": "ENTRADA",
  "quantidade": 5,
  "observacao": "Chegada de novos notebooks",
  "produto": { "id": 1 }
}
```

* Enregistrer une sortie de stock :

```json
{
  "tipo": "SAIDA",
  "quantidade": 3,
  "observacao": "Venda de 3 notebooks",
  "produto": { "id": 1 }
}
```

---

## 💡 Fonctionnement interne

* **Controller :** reçoit les requêtes HTTP et retourne du JSON.
* **Service :** contient les règles métier (par exemple, vérifier le stock suffisant avant d’enregistrer une sortie).
* **Repository :** abstrait l’accès à la base MySQL via JPA.
* **Model :** représente les entités du système (Produit, Catégorie, Fournisseur, MouvementDeStock).

> Lors d’une entrée, la quantité du produit augmente.
> Lors d’une sortie, le système vérifie s’il y a suffisamment de stock ; sinon, il retourne **HTTP 400**.

---

## 🧾 Cas de test

1. Créer un produit valide → HTTP 201 Created
2. Mettre à jour un produit existant → HTTP 200 OK
3. Supprimer un produit inexistant → HTTP 404 Not Found
4. Enregistrer une entrée → le stock augmente
5. Enregistrer une sortie avec stock suffisant → le stock diminue
6. Enregistrer une sortie avec stock insuffisant → HTTP 400 Bad Request
7. Valider les champs obligatoires → HTTP 400 Bad Request

---

## 🧑‍💻 Auteur

**Guilbert Ange**
*Projet réalisé dans le cadre de l’examen de Spring Boot.*
```


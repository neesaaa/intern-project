# 🧠 Project Overview

This project was refactored from a **multi-database + Redis** architecture  
(still in ![Master Branch](https://img.shields.io/badge/branch-master-blue))  
into a **single unified database**  
(now in ![Combined DB Branch](https://img.shields.io/badge/branch-combined--db-green))  
for simplicity and consistency.

---

## ⚙️ Before vs After

| Component | Before | After |
|------------|---------|-------|
| Main Data | SQL Database #1 | Unified Main Database |
| Identity / Auth | SQL Database #2 | Unified Main Database |
| Basket | Redis | SQL (EF Core Entity) |

---

## 🔁 Basket Migration

- Basket data was previously stored in **Redis**.  
- Now it’s managed directly in the main database using **Entity Framework Core**.  
- Basket ID = User ID for easy lookup.



# nftcards
nft card browser

This is a REACT/node MVC App which is not dockerized as I didnt have enough time(it does work for some features). The DB is postgres. Make appropriate credential changes in backend/src/ormconfig.ts

Loom video 1: 
https://www.loom.com/share/1b35edfb63324d9f98c7a36492b698ce?sid=0ceac55e-3ed2-462c-be62-0e80254c49f7

Loom video 2: 
https://www.loom.com/share/c69c6d13dad34634b19448877b4770c8?sid=e7ea9e31-1587-41b3-b631-4fce5108cd3a

Steps:
1. Do a git clone of the repo
2. There are 2 folders: frontend and backend
3. Follow these steps to build:
   a) cd frontend
   b) npm run build
   c) cd ../backend
   d) tsc
   e) npx ts-node src/index.ts (to start the server)

   ![image](https://github.com/user-attachments/assets/796c7db1-1f10-4254-a185-71608bf91201)

At this point my DB state was as follows:

![image](https://github.com/user-attachments/assets/42e4b7d0-d22c-4b7b-ab77-12df858d97be)

So on clicking "Cart" it shows as:
![image](https://github.com/user-attachments/assets/068d3d44-c03f-44dc-80f5-144d31ad75e9)

Next I click on "Add to Cart"
![image](https://github.com/user-attachments/assets/6bb4a6e0-8d87-4c50-97e1-5451ef460bf6)

Now the cart shows:
![image](https://github.com/user-attachments/assets/0d2b018f-30ca-41c2-9dd8-b354d1d4f9d9)

and DB shows the state:
![image](https://github.com/user-attachments/assets/e42809d9-9fe7-42b5-bc48-6b3e9275b2e9)





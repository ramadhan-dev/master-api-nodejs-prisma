#### Project Ini 
---

## Table of contents
* [Fungsi](#Fungsi)
* [Install](#Install)
* [Dokumentasi](#Dokumentasi)

## Fungsi 
fungsi yang tersedia pada peoject ini antara lain

Function      | Create             | Read                | Update             | Delete            |
:------------ | :------------------| :-------------------| :------------------|-------------------|
Tenant        | :heavy_check_mark: |  :white_check_mark: | :heavy_check_mark: | :heavy_check_mark:|
Company        | :heavy_check_mark: |  :white_check_mark: | :heavy_check_mark: | :heavy_check_mark:|
Division        | :heavy_check_mark: |  :white_check_mark: | :heavy_check_mark: | :heavy_check_mark:|
USER        | :heavy_check_mark: |  :white_check_mark: | :heavy_check_mark: | :heavy_check_mark:|


AUTH Login   :heavy_check_mark:    


-       


## Install
Apabila anda ingin menjalankan aplikasi ini di local anda bisa melakukan clone project ini di [ github repo](https://github.com/ramadhan-dev/Master-APis)
    
    ```
        ### clone project
        git clone git@github.com:ramadhan-dev/master-api-nodejs-prisma.git attendance
        
        ### masuk ke project yang telah di clone
        cd attendance
        
        ### install dependencies
        ### npm
        npm install
        
        ### yarn
        yarn install
        
        ### Generate Prisma Engine
        ### npm
        npm  prisma generate --schema=prisma/database2/schema.prisma
        
        ### yarn
        yarn prisma generate --schema=prisma/database2/schema.prisma



        ### Generate Database
        ### npm
        npm run prisma migrate dev --schema=prisma/database2/schema.prisma --name inisialisasi

        ### yarn
        yarn prisma migrate dev --schema=prisma/database2/schema.prisma --name inisialisasi


         ### Generate Seeder
        ### npm
        npm run seed

        ### yarn
        yarn seed



        ### Jalankan aplikasi, aplikasi secara defualt akan dijalankan di port 5000
        ### npm 
        npm run dev

        ### yarn
        yarn dec
    ```

## Dokumentasi
untuk dokumentasi bisa di liat di  [ Apidog](https://ramadhan-dev.apidog.io/)

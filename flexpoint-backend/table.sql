-- CREATE TABLE USER
create table user(
    id int primary key auto_increment,
    name varchar(255) not null ,
    email varchar(255) not null unique ,
    contact varchar(20) ,
    password varchar(100) not null ,
    role varchar(50) not null ,
    status int not null default 0,
    created_at datetime default now() not null
);
-- ADD ADMIN USER
insert into user(name,email,contact,password,role,status) values(
        'Admin',
        'admin@flexpoint.com',
        '',
        'admin',
        'admin',
        1
);


-- CREATE TABLE CUSTOMER
create table customer(
    id int primary key auto_increment,
    name varchar(255) not null ,
    address varchar(255) not null ,
    email varchar(255) not null unique ,
    contact varchar(20) ,
    status int not null default 0,
    created_at datetime default now() not null,
    updated_at datetime default now() not null on update now()
);

-- CREATE TABLE SUPPLIER
create table supplier(
    id int primary key auto_increment,
    name varchar(255) not null ,
    company_name varchar(255) not null ,
    email varchar(255) not null unique ,
    contact varchar(20) ,
    status int not null default 0,
    created_at datetime default now() not null,
    updated_at datetime default now() not null on update now()
);

-- CREATE TABLE CATEGORY
create table category(
    id int primary key auto_increment,
    name varchar(255) not null ,
    description text not null,
    status int not null default 0,
    created_at datetime default now() not null,
    updated_at datetime default now() not null on update now()
);

-- CREATE TABLE PRODUCT
create table product(
    id int auto_increment,
    name varchar(255) not null UNIQUE,
    unit_price decimal(10,2) not null,
    stock int not null,
    category_id int not null,
    supplier_id int not null,
    status int not null default 0,
    created_at datetime default now() not null,
    updated_at datetime default now() not null on update now(),
    primary key(id),
    foreign key(category_id) references category(id),
    foreign key(supplier_id) references supplier(id)
);

-- CREATE TABLE ORDER
create table orders(
    id int primary key auto_increment,
    customerId int not null,
    productDetails JSON default null,
    totalAmount decimal(10,2) not null,
    paymentMethod varchar(50) not null,
    status int not null default 0,
    saleBy int not null,
    created_at datetime default now() not null,
    updated_at datetime default now() not null on update now(),
    foreign key(customerId) references customer(id),
    foreign key(saleBy) references user(id)
);

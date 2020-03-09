create table users(
    user_id serial primary key,
    first_name varchar(30),
    last_name varchar(30),
    email varchar(200),
    user_picture varchar(250),
    password varchar(200),
    dealer boolean,
    admin boolean,
    premium boolean
);
create table cars(
    car_id serial primary key,
    make varchar(30),
    model varchar(30),
    vin varchar(30),
    year int
);
create table car_ownership(
    owner_id serial primary key,
    car_id int REFERENCES cars(car_id),
    user_id int REFERENCES users(user_id),
    current_owner boolean
);
create table car_maintenance(
    maint_id serial primary key,
    car_id int REFERENCES cars(car_id),
    user_id int REFERENCES users(user_id),
    verified boolean,
    services_done varchar(150),
    desciption varchar(350)
);
create table car_sale(
    maint_id serial primary key,
    car_id int REFERENCES cars(car_id),
    user_id int REFERENCES users(user_id),
    sold boolean,
    desciption varchar(350),
    milage int,
    price int,
    location varchar(50)
)
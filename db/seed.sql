create table users(
    user_id serial primary key,
    first_name varchar(30),
    last_name varchar(30),
    email varchar(200),
    user_picture varchar(250),
    password varchar(200),
    username varchar(20),
    dealer boolean,
    admin boolean,
    premium boolean
    -- username 
);
create table cars(
    car_id serial primary key,
    make varchar(30),
    model varchar(30),
    vin varchar(30),
    year int,
    car_image varchar(250)
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
    description varchar(350),
    milage int,
    date_serviced varchar(10),
    date_verified varchar(10),
    receipt varchar(250)
);
create table car_sale(
    maint_id serial primary key,
    car_id int REFERENCES cars(car_id),
    user_id int REFERENCES users(user_id),
    sold boolean,
    description varchar(350),
    milage int,
    price int,
    location varchar(50)
    -- owner info 
)
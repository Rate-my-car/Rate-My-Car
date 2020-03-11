insert into car_sale(
    car_id, user_id, description, milage, price, location, sold
) values (
    $1, $2, $3, $4, $5, $6, false
)
insert into car_ownership (
    car_id, user_id, current_owner
) values (
    $1, $2, TRUE
)
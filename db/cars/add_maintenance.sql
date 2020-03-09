insert into car_maintenance (
    user_id, car_id, description, service_done, verified
) values (
    $1, $2, $3, $4, false
);
select * from car_maintenance
where car_id = $2;
insert into car_maintenance (
    user_id, car_id, description, service_done, verified, milage, date_serviced, receipt
) values (
    $1, $2, $3, $4, false, $5, $6, $7
);
select * from car_maintenance
where car_id = $2;
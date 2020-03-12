select * from car_maintenance cm
join cars c on c.car_id = cm.car_id
where c.car_id = $1;
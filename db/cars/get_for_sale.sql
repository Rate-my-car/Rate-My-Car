-- select * from car_sale
-- where sold = false;

-- select * from cars c
-- join car_sale cs on c.car_id = cs.car_id
-- where c.car_id = 


select * from car_sale cs
join cars c on cs.cars_id = c.car_id
where sold = false;
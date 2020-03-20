-- select * from car_sale
-- where sold = false;

select * from car_sale cs
join cars c on cs.car_id = c.car_id
where cs.sold = 'false';
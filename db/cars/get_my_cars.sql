select * from car_ownership co 
join users u on co.user_id = u.user_id
join cars c on co.car_id = c.car_id
where u.user_id = $1
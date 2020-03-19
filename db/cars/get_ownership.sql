select * from users s
join car_ownership co on co.user_id = s.user_id
where co.car_id = $1
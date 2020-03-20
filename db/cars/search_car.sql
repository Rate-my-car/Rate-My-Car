select * from cars
where model ilike '%' || $1 || '%'
order by model;
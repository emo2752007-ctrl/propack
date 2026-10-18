-- اختياري: يضيف المنتجات الثمانية الأصلية لقاعدة البيانات (الأسعار تجريبية، عدّلها من الداشبورد)
insert into products (name, category, price, active, featured) values
('أكواب كرتون للمشروبات الساخنة','cups',450,true,true),
('أكواب للمشروبات الباردة','cups',520,true,true),
('أكياس سكر فردية','sugar',180,true,true),
('معالق تقليب للقهوة','sugar',95,true,true),
('شاليموه بأحجام متنوعة','straws',120,true,true),
('مناديل ورقية ومناديل سفرة','paper',160,true,true),
('عبوات طعام وتيك أواي','takeaway',350,true,false),
('أغطية أكواب كرتون','cups',210,true,false);

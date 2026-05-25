-- Cho phép tất cả mọi người được quyền Xem, Thêm, Sửa, Xóa ảnh trong bucket "images"
CREATE POLICY "Cho_Phep_Tat_Ca"
ON storage.objects FOR ALL
USING (bucket_id = 'images')
WITH CHECK (bucket_id = 'images');
